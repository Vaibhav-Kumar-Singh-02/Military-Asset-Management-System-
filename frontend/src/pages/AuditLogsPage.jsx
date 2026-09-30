import React, { useState, useEffect } from 'react';
import { auditApi } from '../services/api';
import ExportButton from '../components/ExportButton';
import { ShieldAlert, RefreshCw, Search, Clock, Key, User } from 'lucide-react';

const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await auditApi.getLogs();
      if (res.success) {
        setLogs(res.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(l => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      l.username?.toLowerCase().includes(term) ||
      l.action?.toLowerCase().includes(term) ||
      l.entityName?.toLowerCase().includes(term) ||
      l.details?.toLowerCase().includes(term) ||
      l.ipAddress?.toLowerCase().includes(term)
    );
  });

  const exportCols = [
    { header: 'Timestamp', accessor: l => l.timestamp },
    { header: 'User', accessor: l => l.username },
    { header: 'Role', accessor: l => l.role },
    { header: 'Action', accessor: l => l.action },
    { header: 'Entity', accessor: l => `${l.entityName} (${l.entityId || ''})` },
    { header: 'Details', accessor: l => l.details },
    { header: 'IP Address', accessor: l => l.ipAddress },
  ];

  const getActionBadgeClass = (action) => {
    if (action.includes('PURCHASE')) return 'badge-success';
    if (action.includes('TRANSFER')) return 'badge-commander';
    if (action.includes('EXPENDED')) return 'badge-warning';
    if (action.includes('ASSIGNED') || action.includes('RETURNED')) return 'badge-admin';
    return 'badge-info';
  };

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div className="glass-panel" style={{
        padding: '20px 24px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: 'var(--bg-card)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-tactical badge-admin">SECURITY & COMPLIANCE</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Logged Events: <strong>{logs.length}</strong>
            </span>
          </div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            Security Audit Trail & Transaction Logs
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <ExportButton title="Security Audit Logs" columns={exportCols} data={filteredLogs} filename="mams_audit_trail" />
          <button onClick={fetchLogs} className="btn-tactical btn-secondary">
            <RefreshCw size={14} /> Refresh Logs
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="glass-panel" style={{ padding: '12px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Search size={16} color="var(--text-dim)" />
        <input
          type="text"
          className="input-tactical"
          style={{ border: 'none', padding: '0', fontSize: '0.85rem' }}
          placeholder="Filter audit entries by Username, Action type, Entity, or Details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Logs Table */}
      <div className="tactical-table-wrapper">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>Loading audit records...</div>
        ) : filteredLogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>No audit events found.</div>
        ) : (
          <table className="tactical-table">
            <thead>
              <tr>
                <th>TIMESTAMP</th>
                <th>OFFICER / USER</th>
                <th>ROLE</th>
                <th>ACTION TRIGGERED</th>
                <th>ENTITY TARGET</th>
                <th>TRANSACTION AUDIT DETAILS</th>
                <th>SOURCE IP</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((l) => (
                <tr key={l.id}>
                  <td className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                    {l.timestamp ? new Date(l.timestamp).toLocaleString() : 'N/A'}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{l.username}</div>
                  </td>
                  <td>
                    <span className="badge-tactical badge-admin" style={{ fontSize: '0.65rem' }}>{l.role}</span>
                  </td>
                  <td>
                    <span className={`badge-tactical ${getActionBadgeClass(l.action)}`}>
                      {l.action}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--accent-orange)' }}>
                    {l.entityName} {l.entityId ? `[${l.entityId}]` : ''}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-main)', maxWidth: '400px' }}>
                    {l.details}
                  </td>
                  <td className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {l.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AuditLogsPage;
