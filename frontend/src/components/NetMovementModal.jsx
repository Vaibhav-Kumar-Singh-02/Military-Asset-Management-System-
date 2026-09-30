import React, { useState } from 'react';
import { X, ShoppingCart, ArrowDownLeft, ArrowUpRight, Calculator } from 'lucide-react';

const NetMovementModal = ({ isOpen, onClose, data }) => {
  const [activeTab, setActiveTab] = useState('purchases');

  if (!isOpen || !data) return null;

  const purchases = data.purchases || [];
  const transfersIn = data.transfersIn || [];
  const transfersOut = data.transfersOut || [];

  const purchasesCount = data.totalPurchasesCount || 0;
  const inCount = data.totalTransfersInCount || 0;
  const outCount = data.totalTransfersOutCount || 0;
  const netCount = data.netMovementCount || 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--modal-header-bg)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              background: 'rgba(234, 88, 12, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(234, 88, 12, 0.25)'
            }}>
              <Calculator size={18} color="var(--accent-orange)" />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Net Movement Detailed Breakdown
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                Purchases (+) + Transfers In (+) - Transfers Out (-)
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--pill-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tactical Equation Summary Bar */}
        <div style={{
          padding: '14px 24px',
          background: 'var(--pill-bg)',
          borderBottom: '1px solid var(--border-color)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
        }}>
          <div style={{
            background: 'rgba(22, 163, 74, 0.08)',
            border: '1px solid rgba(22, 163, 74, 0.25)',
            borderRadius: '6px',
            padding: '10px 14px',
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>(+) TOTAL PURCHASES</div>
            <div style={{ fontSize: '1.2rem', color: '#16a34a', fontWeight: 800 }}>
              +{purchasesCount.toLocaleString()}
            </div>
          </div>

          <div style={{
            background: 'rgba(234, 88, 12, 0.08)',
            border: '1px solid rgba(234, 88, 12, 0.25)',
            borderRadius: '6px',
            padding: '10px 14px',
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>(+) TRANSFERS IN</div>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent-orange)', fontWeight: 800 }}>
              +{inCount.toLocaleString()}
            </div>
          </div>

          <div style={{
            background: 'rgba(220, 38, 38, 0.08)',
            border: '1px solid rgba(220, 38, 38, 0.25)',
            borderRadius: '6px',
            padding: '10px 14px',
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>(-) TRANSFERS OUT</div>
            <div style={{ fontSize: '1.2rem', color: '#dc2626', fontWeight: 800 }}>
              -{outCount.toLocaleString()}
            </div>
          </div>

          <div style={{
            background: 'rgba(217, 119, 6, 0.08)',
            border: '1px solid rgba(217, 119, 6, 0.25)',
            borderRadius: '6px',
            padding: '10px 14px',
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>(=) NET MOVEMENT</div>
            <div style={{ fontSize: '1.2rem', color: '#d97706', fontWeight: 800 }}>
              {netCount >= 0 ? `+${netCount.toLocaleString()}` : netCount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 24px 0 24px',
          borderBottom: '1px solid var(--border-color)',
        }}>
          <button
            onClick={() => setActiveTab('purchases')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              background: activeTab === 'purchases' ? 'rgba(22, 163, 74, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'purchases' ? '2px solid #16a34a' : '2px solid transparent',
              color: activeTab === 'purchases' ? '#16a34a' : 'var(--text-dim)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ShoppingCart size={15} /> Purchases ({purchases.length})
          </button>

          <button
            onClick={() => setActiveTab('transfersIn')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              background: activeTab === 'transfersIn' ? 'rgba(234, 88, 12, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'transfersIn' ? '2px solid var(--accent-orange)' : '2px solid transparent',
              color: activeTab === 'transfersIn' ? 'var(--accent-orange)' : 'var(--text-dim)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowDownLeft size={15} /> Transfers In ({transfersIn.length})
          </button>

          <button
            onClick={() => setActiveTab('transfersOut')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              background: activeTab === 'transfersOut' ? 'rgba(220, 38, 38, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'transfersOut' ? '2px solid #dc2626' : '2px solid transparent',
              color: activeTab === 'transfersOut' ? '#dc2626' : 'var(--text-dim)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowUpRight size={15} /> Transfers Out ({transfersOut.length})
          </button>
        </div>

        {/* Tab Content Table */}
        <div style={{ padding: '20px 24px', minHeight: '300px' }}>
          {activeTab === 'purchases' && (
            <div className="table-container">
              {purchases.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)' }}>
                  No purchases recorded in the selected filter criteria.
                </div>
              ) : (
                <table className="table-tactical">
                  <thead>
                    <tr>
                      <th>PO NUMBER</th>
                      <th>BASE</th>
                      <th>ASSET / EQUIPMENT</th>
                      <th>QTY</th>
                      <th>UNIT COST (₹)</th>
                      <th>TOTAL COST (₹)</th>
                      <th>SUPPLIER</th>
                      <th>DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((p) => (
                      <tr key={p.id}>
                        <td className="font-mono" style={{ color: '#ea580c', fontWeight: 600 }}>{p.purchaseOrderNumber}</td>
                        <td>{p.base?.name}</td>
                        <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{p.asset?.name}</td>
                        <td className="font-military" style={{ color: '#059669', fontWeight: 700 }}>+{p.quantity}</td>
                        <td>₹{Number(p.unitCost).toLocaleString('en-IN')}</td>
                        <td style={{ color: '#ea580c', fontWeight: 700 }}>₹{Number(p.totalCost).toLocaleString('en-IN')}</td>
                        <td>{p.supplier}</td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{p.purchaseDate ? new Date(p.purchaseDate).toLocaleDateString() : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'transfersIn' && (
            <div className="table-container">
              {transfersIn.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)' }}>
                  No incoming transfers recorded in the selected filter criteria.
                </div>
              ) : (
                <table className="table-tactical">
                  <thead>
                    <tr>
                      <th>TRANSFER #</th>
                      <th>SOURCE BASE (ORIGIN)</th>
                      <th>DESTINATION BASE</th>
                      <th>ASSET</th>
                      <th>QTY</th>
                      <th>DISPATCH DATE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transfersIn.map((t) => (
                      <tr key={t.id}>
                        <td className="font-mono" style={{ color: '#ea580c', fontWeight: 600 }}>{t.transferNumber}</td>
                        <td>{t.sourceBase?.name}</td>
                        <td style={{ color: '#ea580c', fontWeight: 600 }}>{t.destinationBase?.name}</td>
                        <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{t.asset?.name}</td>
                        <td className="font-military" style={{ color: '#ea580c', fontWeight: 700 }}>+{t.quantity}</td>
                        <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.dispatchedAt ? new Date(t.dispatchedAt).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <span className="badge-tactical badge-success">{t.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'transfersOut' && (
            <div className="table-container">
              {transfersOut.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)' }}>
                  No outgoing transfers recorded in the selected filter criteria.
                </div>
              ) : (
                <table className="table-tactical">
                  <thead>
                    <tr>
                      <th>TRANSFER #</th>
                      <th>SOURCE BASE (ORIGIN)</th>
                      <th>DESTINATION BASE</th>
                      <th>ASSET</th>
                      <th>QTY</th>
                      <th>DISPATCH DATE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transfersOut.map((t) => (
                      <tr key={t.id}>
                        <td className="font-mono" style={{ color: '#ea580c', fontWeight: 600 }}>{t.transferNumber}</td>
                        <td>{t.sourceBase?.name}</td>
                        <td style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>{t.destinationBase?.name}</td>
                        <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{t.asset?.name}</td>
                        <td className="font-military" style={{ color: '#dc2626', fontWeight: 700 }}>-{t.quantity}</td>
                        <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.dispatchedAt ? new Date(t.dispatchedAt).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <span className="badge-tactical badge-info">{t.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'var(--modal-header-bg)'
        }}>
          <button onClick={onClose} className="btn-tactical btn-secondary">
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetMovementModal;
