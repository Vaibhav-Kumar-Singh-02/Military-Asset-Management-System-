import React, { useState, useEffect } from 'react';
import { inventoryApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import FilterBar from '../components/FilterBar';
import ExportButton from '../components/ExportButton';
import { Package, Search, Layers, TrendingUp, IndianRupee } from 'lucide-react';

const InventoryLedgerPage = () => {
  const { user, isCommander } = useAuth();

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBase, setSelectedBase] = useState(isCommander && user?.baseId ? user.baseId : null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await inventoryApi.getInventory({
        baseId: selectedBase || undefined,
        categoryId: selectedCategory || undefined,
      });
      if (res.success) {
        setInventory(res.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [selectedBase, selectedCategory]);

  const filteredInventory = inventory.filter(item => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.asset?.name?.toLowerCase().includes(term) ||
      item.asset?.assetCode?.toLowerCase().includes(term) ||
      item.base?.name?.toLowerCase().includes(term) ||
      item.asset?.category?.name?.toLowerCase().includes(term)
    );
  });

  const exportCols = [
    { header: 'Base', accessor: i => i.base?.name },
    { header: 'Category', accessor: i => i.asset?.category?.name },
    { header: 'Asset Code', accessor: i => i.asset?.assetCode },
    { header: 'Asset Name', accessor: i => i.asset?.name },
    { header: 'Opening Balance', accessor: i => i.openingBalance },
    { header: 'Purchased (+)', accessor: i => i.totalPurchased },
    { header: 'Transfers In (+)', accessor: i => i.totalTransferredIn },
    { header: 'Transfers Out (-)', accessor: i => i.totalTransferredOut },
    { header: 'Assigned', accessor: i => i.assignedQuantity },
    { header: 'Expended', accessor: i => i.expendedQuantity },
    { header: 'Closing Balance', accessor: i => i.closingBalance },
    { header: 'Current Available', accessor: i => i.currentBalance },
  ];

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
            <span className="badge-tactical badge-admin">MASTER LEDGER MATRIX</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Total Ledger Records: <strong>{inventory.length}</strong>
            </span>
          </div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            Master Inventory Stock Ledger
          </h1>
        </div>

        <ExportButton title="Inventory Ledger Report" columns={exportCols} data={filteredInventory} filename="mams_inventory_ledger" />
      </div>

      {/* Filter Bar */}
      <FilterBar
        selectedBase={selectedBase}
        setSelectedBase={setSelectedBase}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        dateRange="ALL"
        setDateRange={() => {}}
        onRefresh={fetchInventory}
      />

      {/* Search Bar */}
      <div className="glass-panel" style={{ padding: '12px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Search size={16} color="var(--text-dim)" />
        <input
          type="text"
          className="input-tactical"
          style={{ border: 'none', padding: '0', fontSize: '0.85rem' }}
          placeholder="Filter inventory records by Asset name, Code, Base, or Category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Master Inventory Table */}
      <div className="tactical-table-wrapper">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>Loading inventory ledger data...</div>
        ) : filteredInventory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>No inventory records found matching filters.</div>
        ) : (
          <table className="tactical-table">
            <thead>
              <tr>
                <th>MILITARY BASE</th>
                <th>CATEGORY</th>
                <th>ASSET / EQUIPMENT</th>
                <th>OPENING BAL</th>
                <th>PURCHASED (+)</th>
                <th>TRANSFERS IN (+)</th>
                <th>TRANSFERS OUT (-)</th>
                <th>NET MOVEMENT</th>
                <th>ASSIGNED</th>
                <th>EXPENDED</th>
                <th>CLOSING BAL</th>
                <th>AVAILABLE STOCK</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const netMovement = (item.totalPurchased || 0) + (item.totalTransferredIn || 0) - (item.totalTransferredOut || 0);
                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.base?.name}</td>
                    <td>
                      <span className="badge-tactical badge-admin">{item.asset?.category?.name}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.asset?.name}</div>
                      <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{item.asset?.assetCode}</div>
                    </td>
                    <td className="font-mono" style={{ fontWeight: 600 }}>{item.openingBalance}</td>
                    <td className="font-mono" style={{ color: '#16a34a', fontWeight: 600 }}>+{item.totalPurchased}</td>
                    <td className="font-mono" style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>+{item.totalTransferredIn}</td>
                    <td className="font-mono" style={{ color: '#dc2626', fontWeight: 600 }}>-{item.totalTransferredOut}</td>
                    <td className="font-mono" style={{ color: netMovement >= 0 ? '#d97706' : '#dc2626', fontWeight: 700 }}>
                      {netMovement >= 0 ? `+${netMovement}` : netMovement}
                    </td>
                    <td className="font-mono" style={{ color: '#4f46e5', fontWeight: 600 }}>{item.assignedQuantity}</td>
                    <td className="font-mono" style={{ color: '#dc2626', fontWeight: 600 }}>{item.expendedQuantity}</td>
                    <td className="font-mono" style={{ color: '#16a34a', fontWeight: 800 }}>
                      {item.closingBalance}
                    </td>
                    <td>
                      <span className={`badge-tactical ${item.currentBalance > 0 ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.75rem' }}>
                        {item.currentBalance} {item.asset?.unitOfMeasure || 'Units'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InventoryLedgerPage;
