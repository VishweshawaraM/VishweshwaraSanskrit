import React, { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, RefreshCw, LogIn, FileSpreadsheet, Mail, Calendar, FileText, Loader2, TrendingUp, Download, Trash2 } from 'lucide-react';
import { PageView } from '../types';
import { Button } from '../components/Button';
import { initAuth, googleSignIn, emailSignIn, emailSignUp, anonymousSignIn, logout, getAccessToken } from '../lib/auth';
import { getLeads, Lead, deleteLead } from '../lib/firebase';
import { User } from 'firebase/auth';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  // Calculate dashboard stats
  const chartData = useMemo(() => {
    if (!leads.length) return [];
    
    // Group by date (MM/DD)
    const grouped = leads.reduce((acc: any, lead) => {
      let dateObj = lead.createdAt instanceof Date ? lead.createdAt : (lead.createdAt as any)?.toDate?.();
      if (!dateObj) dateObj = new Date(); // fallback
      
      const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!acc[dateStr]) {
        acc[dateStr] = { date: dateStr, inquiries: 0 };
      }
      acc[dateStr].inquiries += 1;
      return acc;
    }, {});
    
    // Convert to array and sort chronologically (assuming leads are somewhat ordered or we sort by key)
    // A more robust sort would require the original date objects, but for a simple display this works if we sort by the Date object first
    
    // Better sorting: sort leads by date ascending, then map
    const sortedLeads = [...leads].sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : (a.createdAt as any)?.toDate?.()?.getTime() || 0;
      const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : (b.createdAt as any)?.toDate?.()?.getTime() || 0;
      return dateA - dateB;
    });

    const finalGrouped = sortedLeads.reduce((acc: any, lead) => {
      let dateObj = lead.createdAt instanceof Date ? lead.createdAt : (lead.createdAt as any)?.toDate?.();
      if (!dateObj) dateObj = new Date();
      
      const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!acc[dateStr]) {
        acc[dateStr] = { date: dateStr, inquiries: 0 };
      }
      acc[dateStr].inquiries += 1;
      return acc;
    }, {});

    return Object.values(finalGrouped);
  }, [leads]);

  // Email login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
      if (email === 'admin') {
        if (password === 'admin@V12') {
          setUser({ email: 'admin@visanskrit.com', uid: 'admin-bypass' } as unknown as User);
          setNeedsAuth(false);
          fetchLeads();
          setIsLoggingIn(false);
          return;
        } else {
          throw new Error('Incorrect admin password.');
        }
      }

      // Basic client-side email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw { code: 'auth/invalid-email' };
      }

      if (isSignUp) {
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
      let errorMessage = 'Invalid email or password';
      if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMessage = 'Incorrect email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setLoginError(errorMessage);
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
    } catch (err: any) {
      console.error('Login failed:', err);
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setLoginError(err.message || 'Failed to sign in with Google');
      }
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
      const headerRow = ['Date', 'Name', 'Email', 'Phone', 'Subject', 'Timezone', 'Background', 'Message'];
      const dataRows = leads.map(lead => [
        lead.createdAt instanceof Date ? lead.createdAt.toLocaleString() : (lead.createdAt as any).toDate().toLocaleString(),
        lead.name,
        lead.email || '',
        lead.phone || '',
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

  const handleExportToCSV = () => {
    if (leads.length === 0) return;
    
    // Define headers
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Subject', 'Timezone', 'Background', 'Message'];
    
    // Create rows
    const rows = leads.map(lead => {
      const date = lead.createdAt instanceof Date ? lead.createdAt.toLocaleString() : (lead.createdAt as any)?.toDate?.()?.toLocaleString() || '';
      return [
        `"${date}"`,
        `"${(lead.name || '').replace(/"/g, '""')}"`,
        `"${(lead.email || '').replace(/"/g, '""')}"`,
        `"${(lead.phone || '').replace(/"/g, '""')}"`,
        `"${(lead.subject || '').replace(/"/g, '""')}"`,
        `"${(lead.timezone || '').replace(/"/g, '""')}"`,
        `"${(lead.background || '').replace(/"/g, '""')}"`,
        `"${(lead.message || '').replace(/"/g, '""')}"`
      ].join(',');
    });
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmDelete = (id: string) => {
    setLeadToDelete(id);
  };

  const cancelDelete = () => {
    setLeadToDelete(null);
  };

  const executeDelete = async () => {
    if (!leadToDelete) return;
    setIsDeleting(true);
    try {
      await deleteLead(leadToDelete);
      setLeads(leads.filter(lead => lead.id !== leadToDelete));
      setLeadToDelete(null);
    } catch (err: any) {
      console.error(err);
      alert('Error deleting lead: ' + err.message);
    } finally {
      setIsDeleting(false);
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
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-8 bg-surface-1/50 backdrop-blur-xl border border-gold-dim/40 rounded-2xl p-8 shadow-2xl">
          <div className="text-center space-y-3">
            <h1 className="font-serif text-3xl text-text-gold">Admin Access</h1>
            <p className="font-sans text-sm text-text-secondary">Please sign in to view leads and manage data.</p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider block">Email or Username</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/50 transition-all shadow-inner" 
                placeholder="admin" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider block">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/50 transition-all shadow-inner" 
                placeholder="••••••••" 
              />
            </div>
            
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium p-3 rounded-md text-center">
                {loginError}
              </div>
            )}

            <Button type="submit" variant="primary" disabled={isLoggingIn} className="w-full mt-2">
              <LogIn className="w-4 h-4 mr-2" />
              <span>{isLoggingIn ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign in')}</span>
            </Button>
            
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-text-tertiary hover:text-gold-bright transition-colors border-b border-transparent hover:border-gold-bright/30 pb-0.5"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>
          </form>

          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center pt-2">
              <div className="w-full border-t border-gold-dim/30"></div>
            </div>
            <div className="relative flex justify-center text-xs pt-2">
              <span className="bg-surface-1 px-3 text-text-tertiary">Or</span>
            </div>
          </div>

          <Button onClick={handleLogin} variant="outline" disabled={isLoggingIn} className="w-full mt-4">
            <LogIn className="w-4 h-4 mr-2" />
            <span>Sign in with Google</span>
          </Button>

          <div className="pt-6 flex justify-center border-t border-gold-dim/20 mt-6">
            <Button to="/" variant="ghost" className="text-text-tertiary hover:text-text-secondary">
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
          <Button to="/" variant="ghost" className="!px-0 text-text-gold hover:text-gold-bright transition-colors -ml-2 mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Return Home</span>
          </Button>
          <h1 className="font-serif text-3xl md:text-4xl text-text-primary font-medium tracking-tight">
            Leads Documentation
          </h1>
          <p className="font-sans text-sm text-text-secondary bg-surface-1 inline-block px-3 py-1 rounded-full border border-gold-dim/30">
            Logged in as <span className="text-text-gold">{user?.email}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <Button onClick={handleCreateForm} variant="outline" disabled={activeActionId === 'form'} className="shadow-lg shadow-black/20">
            {activeActionId === 'form' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
            <span>Create Feedback Form</span>
          </Button>
          <Button onClick={fetchLeads} variant="outline" disabled={isLoading} className="shadow-lg shadow-black/20">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
          <Button onClick={handleSyncToSheets} variant="emerald" disabled={isSyncing || leads.length === 0} className="shadow-lg shadow-emerald-500/10">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            <span>{isSyncing ? 'Syncing...' : 'Export to Google Sheets'}</span>
          </Button>
          <Button onClick={handleExportToCSV} variant="secondary" disabled={leads.length === 0} className="shadow-lg shadow-black/20">
            <Download className="w-4 h-4 mr-2 text-text-gold" />
            <span>Export CSV</span>
          </Button>
          <Button onClick={logout} variant="secondary" className="shadow-lg shadow-black/20">
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="bg-surface-1/50 backdrop-blur-md border border-gold-dim/40 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-gold-base" />
            <h2 className="font-serif text-xl text-text-primary">Inquiry Growth Trend</h2>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8860A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C8860A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  stroke="#8B7B61" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#8B7B61" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#251E13" vertical={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0E0B07', 
                    border: '1px solid rgba(200, 134, 10, 0.3)',
                    borderRadius: '8px',
                    color: '#F5F5F5'
                  }} 
                  itemStyle={{ color: '#E0A32E' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="inquiries" 
                  stroke="#C8860A" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorInquiries)" 
                  name="Inquiries"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="bg-surface-1/50 backdrop-blur-md border border-gold-dim/40 rounded-2xl overflow-hidden shadow-2xl">
        {isLoading && leads.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-gold-base animate-spin opacity-50" />
            <p className="text-text-secondary font-mono text-sm uppercase tracking-widest">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center justify-center space-y-4">
            <FileText className="w-8 h-8 text-gold-dim opacity-50" />
            <p className="text-text-secondary font-mono text-sm uppercase tracking-widest">No leads found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-2/80 border-b border-gold-dim/50 backdrop-blur-sm">
                  <th className="p-5 font-mono text-[10px] uppercase text-text-gold tracking-widest whitespace-nowrap">Date</th>
                  <th className="p-5 font-mono text-[10px] uppercase text-text-gold tracking-widest whitespace-nowrap">Name</th>
                  <th className="p-5 font-mono text-[10px] uppercase text-text-gold tracking-widest whitespace-nowrap">Email</th>
                  <th className="p-5 font-mono text-[10px] uppercase text-text-gold tracking-widest whitespace-nowrap">Phone</th>
                  <th className="p-5 font-mono text-[10px] uppercase text-text-gold tracking-widest whitespace-nowrap">Subject</th>
                  <th className="p-5 font-mono text-[10px] uppercase text-text-gold tracking-widest whitespace-nowrap">Timezone</th>
                  <th className="p-5 font-mono text-[10px] uppercase text-text-gold tracking-widest text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-dim/20">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface-2/60 transition-colors group">
                    <td className="p-5 font-mono text-xs text-text-secondary whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
                      {lead.createdAt instanceof Date ? lead.createdAt.toLocaleDateString() : (lead.createdAt as any)?.toDate?.()?.toLocaleDateString()}
                    </td>
                    <td className="p-5 font-sans text-sm text-text-primary font-medium whitespace-nowrap">{lead.name}</td>
                    <td className="p-5 font-sans text-xs text-text-secondary whitespace-nowrap">{lead.email || '-'}</td>
                    <td className="p-5 font-sans text-xs text-text-secondary whitespace-nowrap">{lead.phone || '-'}</td>
                    <td className="p-5 font-sans text-xs text-text-secondary whitespace-nowrap">{lead.subject}</td>
                    <td className="p-5 font-sans text-xs text-text-secondary whitespace-nowrap">
                      <span className="bg-surface-3/50 px-2 py-1 rounded text-[10px] font-mono tracking-wider">{lead.timezone}</span>
                    </td>
                    <td className="p-5 flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        onClick={() => handleSendEmail(lead)}
                        disabled={!lead.email || activeActionId === `email-${lead.id}`}
                        className="!p-2 !h-auto hover:text-gold-bright hover:border-gold-bright transition-colors"
                        title="Send Welcome Email"
                      >
                        {activeActionId === `email-${lead.id}` ? <Loader2 className="w-4 h-4 animate-spin text-text-secondary" /> : <Mail className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleSchedule(lead)}
                        disabled={!lead.email || activeActionId === `cal-${lead.id}`}
                        className="!p-2 !h-auto hover:text-gold-bright hover:border-gold-bright transition-colors"
                        title="Schedule Diagnostic Call"
                      >
                        {activeActionId === `cal-${lead.id}` ? <Loader2 className="w-4 h-4 animate-spin text-text-secondary" /> : <Calendar className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => confirmDelete(lead.id!)}
                        className="!p-2 !h-auto hover:text-red-400 hover:border-red-400/50 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {leadToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-surface-1 border border-red-500/20 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6">
            <div className="space-y-2">
              <h3 className="font-serif text-xl text-red-400">Confirm Deletion</h3>
              <p className="text-sm text-text-secondary">Are you sure you want to delete this inquiry? This action cannot be undone.</p>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <Button onClick={cancelDelete} variant="ghost" disabled={isDeleting}>Cancel</Button>
              <Button onClick={executeDelete} variant="primary" className="!bg-red-500/10 hover:!bg-red-500/20 !border-red-500/30 !text-red-400" disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
