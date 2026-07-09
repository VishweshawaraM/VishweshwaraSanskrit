import React, { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, RefreshCw, FileSpreadsheet, Mail, Calendar, FileText, Loader2, TrendingUp, Download, Trash2, Activity, Shield, Users, Lock } from 'lucide-react';
import { PageView } from '../types';
import { Button } from '../components/Button';
import { getLeads, Lead, deleteLead, getAdminLogs, AdminLog } from '../lib/firebase';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ─── Password Gate ───────────────────────────────────────────────
const ADMIN_PASSWORD = 'vishu2026';

function AdminPasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth_token', 'authenticated');
      onUnlock();
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-ground flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface-2 border border-gold-dim rounded-xl p-8 shadow-2xl space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-gold-dim/20 border border-gold-mid flex items-center justify-center">
            <Lock className="w-7 h-7 text-text-gold" />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="font-serif text-xl text-text-primary font-semibold">Admin Access</h2>
          <p className="font-sans text-xs text-text-tertiary">Enter your password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Password"
            autoFocus
            className={`w-full bg-ground border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none transition-colors ${
              error ? 'border-red-500 shake' : 'border-gold-dim focus:border-gold-base'
            }`}
          />
          {error && <p className="text-xs text-red-400 font-mono">Incorrect password</p>}
          <button
            type="submit"
            className="w-full px-6 py-3 rounded bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-xs tracking-widest uppercase font-semibold transition-all active:scale-95"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────
import { PageView } from '../types';
import { Button } from '../components/Button';
import { getLeads, Lead, deleteLead, getAdminLogs, AdminLog } from '../lib/firebase';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminViewProps {
  onViewChange: (view: PageView) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onViewChange }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_auth_token') === 'authenticated';
  });
  const [activeTab, setActiveTab] = useState<'inquiries' | 'activity'>('inquiries');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  // Calculate dashboard stats
  const chartData = useMemo(() => {
    if (!leads.length) return [];
    
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

  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [leadsData, logsData] = await Promise.all([
        getLeads(),
        getAdminLogs(100)
      ]);
      setLeads(leadsData);
      setAdminLogs(logsData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth_token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminPasswordGate onUnlock={() => setIsAuthenticated(true)} />;
  }

  const handleSyncToSheets = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to export ${leads.length} leads as CSV?`
    );
    if (!confirmed) return;

    setIsSyncing(true);
    try {
      // Simple CSV export for now
      const headers = ['Date', 'Name', 'Email', 'Phone', 'Subject', 'Timezone', 'Message'];
      
      const csvContent = [
        headers.join(','),
        ...leads.map(lead => {
          const date = lead.createdAt instanceof Date 
            ? lead.createdAt.toLocaleDateString() 
            : (lead.createdAt as any)?.toDate?.()?.toLocaleDateString() || '';
          
          return [
            `"${date}"`,
            `"${lead.name || ''}"`,
            `"${lead.email || ''}"`,
            `"${lead.phone || ''}"`,
            `"${lead.subject || ''}"`,
            `"${lead.timezone || ''}"`,
            `"${(lead.message || '').replace(/"/g, '""')}"`
          ].join(',');
        })
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export leads.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSendEmail = async (lead: Lead) => {
    if (!lead.email) return;
    
    setActiveActionId(`email-${lead.id}`);
    try {
      const { sendNotificationEmail } = await import("../lib/emailjs");
      await sendNotificationEmail({ name: lead.name, email: lead.email, subject: "Admin Outreach", message: "Admin sent an email to the lead." });
      /* fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: lead.email,
          subject: 'Welcome to Vishweshwara Sanskrit',
          html: `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
              <h2 style="color: #C8860A;">Hari Om ${lead.name},</h2>
              <p>Thank you for your interest in joining.</p>
              <p>We have received your inquiry regarding "${lead.subject}".</p>
              <p>Acharya will review your application and we will get back to you shortly to schedule a diagnostic call.</p>
              <br/>
              <p>In service of the tradition,</p>
              <p><strong>Vishweshwara Sanskrit</strong></p>
            </div>
          `
        })
      }); */


      alert('Welcome email sent successfully!');
    } catch (error: any) {
      console.error('Error sending email:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setActiveActionId(null);
    }
  };

  const handleSchedule = (lead: Lead) => {
    if (!lead.email) return;
    setActiveActionId(`cal-${lead.id}`);
    
    // In a real app, this would integrate with Google Calendar API
    // For now, we open a mailto link with a scheduling template
    const subject = encodeURIComponent(`Scheduling Diagnostic Call - ${lead.name}`);
    const body = encodeURIComponent(`Hari Om ${lead.name},\n\nI would like to schedule a brief diagnostic call to discuss your Sanskrit journey.\n\nPlease let me know your availability for this week.\n\nRegards,\nAcharya Vishweshwara`);
    
    window.location.href = `mailto:${lead.email}?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setActiveActionId(null);
    }, 1000);
  };

  const confirmDelete = (leadId: string) => {
    setLeadToDelete(leadId);
  };

  const cancelDelete = () => {
    setLeadToDelete(null);
  };

  const executeDelete = async () => {
    if (!leadToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteLead(leadToDelete);
      setLeads(leads.filter(l => l.id !== leadToDelete));
      setLeadToDelete(null);
    } catch (err) {
      console.error('Failed to delete lead:', err);
      alert('Failed to delete lead. Check console for details.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-24 space-y-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Button to="/" variant="ghost" className="!px-0 text-text-gold hover:text-gold-bright transition-colors -ml-2 mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Site
          </Button>
          <h1 className="font-serif text-3xl md:text-4xl text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary">Manage inquiries and student applications</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button 
            onClick={fetchData} 
            variant="secondary" 
            disabled={isLoading}
            className="flex-1 md:flex-none"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            onClick={handleSyncToSheets} 
            variant="outline" 
            disabled={isSyncing || leads.length === 0 || activeTab === 'activity'}
            className="flex-1 md:flex-none"
          >
            {isSyncing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Export CSV
          </Button>
          <Button 
            onClick={handleLogout} 
            variant="ghost" 
            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-gold-dim/30">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-3 font-mono tracking-widest text-xs uppercase flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'inquiries' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
        >
          <Users className="w-4 h-4" />
          Inquiries
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-3 font-mono tracking-widest text-xs uppercase flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'activity' ? 'border-gold-base text-gold-base' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
        >
          <Shield className="w-4 h-4" />
          Activity Log
        </button>
      </div>

      {activeTab === 'inquiries' && (
        <>
          {chartData.length > 0 && (
            <div className="bg-surface-1/50 backdrop-blur-md border border-gold-dim/40 p-6 md:p-8 rounded-2xl shadow-2xl">
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
        </>
      )}

      {activeTab === 'activity' && (
        <div className="bg-surface-1/50 backdrop-blur-md border border-gold-dim/40 rounded-2xl overflow-hidden shadow-2xl">
          {isLoading && adminLogs.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-8 h-8 text-gold-base animate-spin opacity-50" />
              <p className="text-text-secondary font-mono text-sm uppercase tracking-widest">Loading logs...</p>
            </div>
          ) : adminLogs.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center justify-center space-y-4">
              <Activity className="w-8 h-8 text-gold-dim opacity-50" />
              <p className="text-text-secondary font-mono text-sm uppercase tracking-widest">No activity found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-2/80 border-b border-gold-dim/50 backdrop-blur-sm">
                    <th className="p-5 font-mono text-[10px] uppercase text-text-gold tracking-widest whitespace-nowrap">Time</th>
                    <th className="p-5 font-mono text-[10px] uppercase text-text-gold tracking-widest whitespace-nowrap">Action</th>
                    <th className="p-5 font-mono text-[10px] uppercase text-text-gold tracking-widest whitespace-nowrap">Status</th>
                    <th className="p-5 font-mono text-[10px] uppercase text-text-gold tracking-widest whitespace-nowrap w-full">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-dim/20">
                  {adminLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-surface-2/60 transition-colors group">
                      <td className="p-5 font-mono text-xs text-text-secondary whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
                        {log.createdAt instanceof Date ? log.createdAt.toLocaleString() : (log.createdAt as any)?.toDate?.()?.toLocaleString()}
                      </td>
                      <td className="p-5 font-sans text-sm text-text-primary font-medium whitespace-nowrap uppercase tracking-wider text-xs">
                        {log.action}
                      </td>
                      <td className="p-5 font-sans text-xs whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-[10px] font-mono tracking-wider ${
                          log.status === 'success' 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="p-5 font-sans text-xs text-text-secondary">{log.details || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

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
