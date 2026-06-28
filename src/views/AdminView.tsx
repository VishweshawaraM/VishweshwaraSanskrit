import React, { useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw, LogIn, FileSpreadsheet, Mail, Calendar, FileText, Loader2 } from 'lucide-react';
import { PageView } from '../types';
import { Button } from '../components/Button';
import { initAuth, googleSignIn, emailSignIn, emailSignUp, anonymousSignIn, logout, getAccessToken } from '../lib/auth';
import { getLeads, Lead } from '../lib/firebase';
import { User } from 'firebase/auth';

interface AdminViewProps {
  onViewChange: (view: PageView) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onViewChange }) => {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  // Email login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setUser(user);
        setNeedsAuth(false);
        fetchLeads();
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      let result;
      // Hardcoded bypass for ease of access
      if (email === 'admin' && password === 'admin@V12') {
        setUser({ email: 'admin@visanskrit.com', uid: 'admin-bypass' } as unknown as User);
        setNeedsAuth(false);
        fetchLeads();
        setIsLoggingIn(false);
        return;
      } else if (isSignUp) {
        result = await emailSignUp(email, password);
      } else {
        result = await emailSignIn(email, password);
      }
      
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        fetchLeads();
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setLoginError(err.message || 'Invalid email or password');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        fetchLeads();
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSyncToSheets = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to create a new Google Spreadsheet with ${leads.length} leads?`
    );
    if (!confirmed) return;

    setIsSyncing(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        alert('Authentication error. Please login again.');
        setNeedsAuth(true);
        return;
      }

      // 1. Create Spreadsheet
      const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            title: `Vishweshwara Leads - ${new Date().toLocaleDateString()}`
          }
        })
      });
      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData.error?.message || 'Failed to create sheet');
      
      const spreadsheetId = createData.spreadsheetId;
      const sheetUrl = createData.spreadsheetUrl;

      // 2. Format Data for sheets
      const headerRow = ['Date', 'Name', 'Email', 'Subject', 'Timezone', 'Background', 'Message'];
      const dataRows = leads.map(lead => [
        lead.createdAt instanceof Date ? lead.createdAt.toLocaleString() : (lead.createdAt as any).toDate().toLocaleString(),
        lead.name,
        lead.email || '',
        lead.subject,
        lead.timezone,
        lead.background,
        lead.message
      ]);

      // 3. Update spreadsheet
      const updateRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          range: 'Sheet1!A1',
          values: [headerRow, ...dataRows]
        })
      });

      if (!updateRes.ok) {
        const updateData = await updateRes.json();
        throw new Error(updateData.error?.message || 'Failed to update sheet');
      }

      alert(`Successfully synced to Google Sheets!\nURL: ${sheetUrl}`);
      window.open(sheetUrl, '_blank');

    } catch (err: any) {
      console.error(err);
      alert('Error syncing to sheets: ' + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSendEmail = async (lead: Lead) => {
    if (!lead.email) {
      alert("No email address provided by this lead.");
      return;
    }
    setActiveActionId(`email-${lead.id}`);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error('Auth error');

      const emailLines = [
        `To: ${lead.email}`,
        `Subject: Hari Om - Vishweshwara Sanskrit Diagnostic Call`,
        'Content-Type: text/html; charset=utf-8',
        '',
        `Hari Om ${lead.name},<br><br>`,
        `Thank you for expressing interest in learning ${lead.subject}.<br>`,
        `We have received your details. Please let us know your availability for a 15-minute diagnostic session on Zoom.<br><br>`,
        `Dhanyavadah,<br>Acharya Vishweshwara`
      ];

      const emailContent = emailLines.join('\r\n');
      const encodedEmail = btoa(unescape(encodeURIComponent(emailContent))).replace(/\+/g, '-').replace(/\//g, '_');

      const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          raw: encodedEmail
        })
      });

      if (!res.ok) throw new Error('Failed to send email');
      alert(`Welcome email sent to ${lead.email}!`);
    } catch (e: any) {
      alert('Error sending email: ' + e.message);
    } finally {
      setActiveActionId(null);
    }
  };

  const handleSchedule = async (lead: Lead) => {
    if (!lead.email) {
      alert("No email address provided by this lead.");
      return;
    }
    setActiveActionId(`cal-${lead.id}`);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error('Auth error');

      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1); // Tomorrow
      startDate.setHours(10, 0, 0, 0); // 10 AM

      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + 15);

      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          summary: `Diagnostic Session: ${lead.name}`,
          description: `Subject: ${lead.subject}\nBackground: ${lead.background}\nMessage: ${lead.message}`,
          start: {
            dateTime: startDate.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          end: {
            dateTime: endDate.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          attendees: [
            { email: lead.email }
          ],
          conferenceData: {
            createRequest: {
              requestId: `meet-${lead.id}-${Date.now()}`,
              conferenceSolutionKey: { type: "hangoutsMeet" }
            }
          }
        })
      });

      if (!res.ok) throw new Error('Failed to create calendar event');
      const data = await res.json();
      alert(`Event created! Link: ${data.htmlLink}`);
      window.open(data.htmlLink, '_blank');
    } catch (e: any) {
      alert('Error creating event: ' + e.message);
    } finally {
      setActiveActionId(null);
    }
  };

  const handleCreateForm = async () => {
    setActiveActionId('form');
    try {
      const token = await getAccessToken();
      if (!token) throw new Error('Auth error');

      const res = await fetch('https://forms.googleapis.com/v1/forms', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          info: {
            title: `Student Feedback - ${new Date().toLocaleDateString()}`,
            documentTitle: 'Cohort Feedback Form'
          }
        })
      });

      if (!res.ok) throw new Error('Failed to create form');
      const data = await res.json();
      
      alert(`Feedback form created! URL: ${data.responderUri}`);
      window.open(data.responderUri, '_blank');
    } catch (e: any) {
      alert('Error creating form: ' + e.message);
    } finally {
      setActiveActionId(null);
    }
  };

  if (needsAuth) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl text-text-primary">Admin Access</h1>
            <p className="font-sans text-sm text-text-secondary">Please sign in to view leads and manage data.</p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary block">Email or Username</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base transition-colors" 
                placeholder="admin" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary block">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base transition-colors" 
                placeholder="••••••••" 
              />
            </div>
            
            {loginError && (
              <p className="text-red-500 text-xs font-medium">{loginError}</p>
            )}

            <Button type="submit" variant="primary" disabled={isLoggingIn} className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              <span>{isLoggingIn ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign in')}</span>
            </Button>
            
            <div className="text-center mt-2">
              <button 
                type="button" 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-text-tertiary hover:text-gold-base transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gold-dim/30"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface-0 px-2 text-text-tertiary">Or</span>
            </div>
          </div>

          <Button onClick={handleLogin} variant="outline" disabled={isLoggingIn} className="w-full">
            <LogIn className="w-4 h-4 mr-2" />
            <span>Sign in with Google</span>
          </Button>

          <div className="pt-4 flex justify-center">
            <Button to="/" variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Return Home</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-24 space-y-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Button to="/" variant="ghost" className="!px-0 text-text-gold">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Return Home</span>
          </Button>
          <h1 className="font-serif text-3xl md:text-4xl text-text-primary font-medium">
            Leads Documentation
          </h1>
          <p className="font-sans text-sm text-text-secondary">
            Logged in as {user?.email}
          </p>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap">
          <Button onClick={handleCreateForm} variant="outline" disabled={activeActionId === 'form'}>
            {activeActionId === 'form' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
            <span>Create Feedback Form</span>
          </Button>
          <Button onClick={fetchLeads} variant="outline" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
          <Button onClick={handleSyncToSheets} variant="emerald" disabled={isSyncing || leads.length === 0}>
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            <span>{isSyncing ? 'Syncing...' : 'Export to Google Sheets'}</span>
          </Button>
          <Button onClick={logout} variant="secondary">
            <span>Logout</span>
          </Button>
        </div>
      </div>

      <div className="bg-surface-1 border border-gold-dim rounded-xl overflow-hidden">
        {isLoading && leads.length === 0 ? (
          <div className="p-12 text-center text-text-secondary font-mono text-sm">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-text-secondary font-mono text-sm">No leads found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-2 border-b border-gold-dim">
                  <th className="p-4 font-mono text-[10px] uppercase text-text-gold tracking-wider">Date</th>
                  <th className="p-4 font-mono text-[10px] uppercase text-text-gold tracking-wider">Name</th>
                  <th className="p-4 font-mono text-[10px] uppercase text-text-gold tracking-wider">Email</th>
                  <th className="p-4 font-mono text-[10px] uppercase text-text-gold tracking-wider">Subject</th>
                  <th className="p-4 font-mono text-[10px] uppercase text-text-gold tracking-wider">Timezone</th>
                  <th className="p-4 font-mono text-[10px] uppercase text-text-gold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gold-dim/20 hover:bg-surface-2/50 transition-colors">
                    <td className="p-4 font-sans text-xs text-text-secondary whitespace-nowrap">
                      {lead.createdAt instanceof Date ? lead.createdAt.toLocaleDateString() : (lead.createdAt as any)?.toDate?.()?.toLocaleDateString()}
                    </td>
                    <td className="p-4 font-sans text-sm text-text-primary font-medium">{lead.name}</td>
                    <td className="p-4 font-sans text-xs text-text-secondary">{lead.email || '-'}</td>
                    <td className="p-4 font-sans text-xs text-text-secondary">{lead.subject}</td>
                    <td className="p-4 font-sans text-xs text-text-secondary">{lead.timezone}</td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleSendEmail(lead)}
                        disabled={!lead.email || activeActionId === `email-${lead.id}`}
                        className="!p-2 !h-auto"
                        title="Send Welcome Email"
                      >
                        {activeActionId === `email-${lead.id}` ? <Loader2 className="w-4 h-4 animate-spin text-text-secondary" /> : <Mail className="w-4 h-4 text-text-secondary" />}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleSchedule(lead)}
                        disabled={!lead.email || activeActionId === `cal-${lead.id}`}
                        className="!p-2 !h-auto"
                        title="Schedule Diagnostic Call"
                      >
                        {activeActionId === `cal-${lead.id}` ? <Loader2 className="w-4 h-4 animate-spin text-text-secondary" /> : <Calendar className="w-4 h-4 text-text-secondary" />}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
