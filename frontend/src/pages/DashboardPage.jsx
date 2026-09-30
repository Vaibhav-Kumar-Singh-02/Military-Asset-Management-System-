import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import HeroBanner from '../components/HeroBanner';
import FilterBar from '../components/FilterBar';
import StatCard from '../components/StatCard';
import NetMovementModal from '../components/NetMovementModal';
import { 
  Package, 
  Archive, 
  TrendingUp, 
  UserCheck, 
  Flame, 
  IndianRupee, 
  ArrowDownLeft, 
  BarChart3, 
  PieChart as PieIcon,
  Building2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const COLORS = ['#ea580c', '#16a34a', '#d97706', '#f97316', '#dc2626', '#c2410c'];

const DashboardPage = () => {
  const { user, isCommander } = useAuth();

  const [selectedBase, setSelectedBase] = useState(isCommander && user?.baseId ? user.baseId : null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dateRange, setDateRange] = useState('ALL');

  const [metrics, setMetrics] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [baseDistData, setBaseDistData] = useState([]);
  const [netMovementDetails, setNetMovementDetails] = useState(null);
  const [isNetModalOpen, setIsNetModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Helper to convert dateRange to ISO strings
  const getDateParams = () => {
    let startDate = null;
    let endDate = null;
    const now = new Date();

    if (dateRange === 'TODAY') {
      const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      startDate = start.toISOString();
      endDate = now.toISOString();
    } else if (dateRange === '7D') {
      const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      startDate = start.toISOString();
      endDate = now.toISOString();
    } else if (dateRange === '30D') {
      const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      startDate = start.toISOString();
      endDate = now.toISOString();
    }
    return { startDate, endDate };
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { startDate, endDate } = getDateParams();
      const params = {
        baseId: selectedBase || undefined,
        categoryId: selectedCategory || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      };

      const [metricsRes, catRes, baseRes, netRes] = await Promise.all([
        dashboardApi.getMetrics(params),
        dashboardApi.getCategorySummary(selectedBase || undefined),
        dashboardApi.getBaseDistribution(selectedCategory || undefined),
        dashboardApi.getNetMovementDetails(params),
      ]);

      if (metricsRes.success) setMetrics(metricsRes.data);
      if (catRes.success) setCategoryData(catRes.data || []);
      if (baseRes.success) setBaseDistData(baseRes.data || []);
      if (netRes.success) setNetMovementDetails(netRes.data);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedBase, selectedCategory, dateRange]);

  const handleOpenNetMovementModal = async () => {
    try {
      const { startDate, endDate } = getDateParams();
      const res = await dashboardApi.getNetMovementDetails({
        baseId: selectedBase || undefined,
        categoryId: selectedCategory || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      if (res.success) {
        setNetMovementDetails(res.data);
      }
    } catch (e) {
      console.error(e);
    }
    setIsNetModalOpen(true);
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Tactical Hero Banner */}
      <HeroBanner onExploreNetMovement={handleOpenNetMovementModal} />

      {/* Strategic Filters (Base, Category, Date) */}
      <FilterBar
        selectedBase={selectedBase}
        setSelectedBase={setSelectedBase}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={fetchDashboardData}
      />

      {/* 5 Core Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        {/* 1. Opening Balance */}
        <StatCard
          title="OPENING BALANCE"
          value={metrics ? metrics.openingBalance : 0}
          subtitle="Baseline stock at period start"
          icon={Archive}
          accentColor="orange"
          badgeText="START"
        />

        {/* 2. Closing Balance */}
        <StatCard
          title="CLOSING BALANCE"
          value={metrics ? metrics.closingBalance : 0}
          subtitle="Opening + Net Movement - Expended"
          icon={Package}
          accentColor="emerald"
          badgeText="CURRENT"
        />

        {/* 3. Net Movement (CLICKABLE POP-UP MODAL) */}
        <StatCard
          title="NET MOVEMENT"
          value={metrics ? (metrics.netMovement >= 0 ? `+${metrics.netMovement.toLocaleString()}` : metrics.netMovement.toLocaleString()) : 0}
          subtitle="Purchases + Transfers In - Out"
          icon={TrendingUp}
          accentColor="amber"
          interactive={true}
          badgeText="AUDIT DRILLDOWN"
          onClick={handleOpenNetMovementModal}
        />

        {/* 4. Assigned Assets */}
        <StatCard
          title="ASSIGNED TO TROOPS"
          value={metrics ? metrics.assignedAssets : 0}
          subtitle="Active field gear checkouts"
          icon={UserCheck}
          accentColor="indigo"
          badgeText="DEPLOYED"
        />

        {/* 5. Expended Assets */}
        <StatCard
          title="EXPENDED MUNITIONS"
          value={metrics ? metrics.expendedAssets : 0}
          subtitle="Consumables expended in ops"
          icon={Flame}
          accentColor="rose"
          badgeText="EXPENDED"
        />
      </div>

      {/* Secondary Financial & Strategic Stats Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '6px',
            background: 'rgba(22, 163, 74, 0.1)',
            border: '1px solid rgba(22, 163, 74, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <IndianRupee size={20} color="#16a34a" />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>TOTAL INVENTORY VALUE</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a' }}>
              ₹{metrics?.totalInventoryValue ? Number(metrics.totalInventoryValue).toLocaleString('en-IN') : '0'}
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '6px',
            background: 'rgba(234, 88, 12, 0.1)',
            border: '1px solid rgba(234, 88, 12, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ArrowDownLeft size={20} color="var(--accent-orange)" />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>TOTAL PROCUREMENT EXPENDITURE</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
              ₹{metrics?.totalPurchasesCost ? Number(metrics.totalPurchasesCost).toLocaleString('en-IN') : '0'}
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '6px',
            background: 'rgba(217, 119, 6, 0.1)',
            border: '1px solid rgba(217, 119, 6, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Building2 size={20} color="#d97706" />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>OPERATIONAL BASES</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {metrics?.activeBasesCount || 5} Active Installations
            </div>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
        gap: '20px',
        marginBottom: '24px',
      }}>
        {/* Category Breakdown Chart */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <BarChart3 size={17} color="var(--accent-orange)" />
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 700, margin: 0 }}>
              Equipment Ledger by Category (Opening vs Purchases vs Closing)
            </h3>
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="category" stroke="var(--text-dim)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-dim)" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', fontSize: '0.8rem' }}
                />
                <Legend wrapperStyle={{ paddingTop: '8px', fontSize: '0.8rem' }} />
                <Bar dataKey="opening" fill="#ea580c" name="Opening Balance" radius={[3, 3, 0, 0]} />
                <Bar dataKey="purchases" fill="#16a34a" name="Purchases (+)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="closing" fill="#d97706" name="Closing Balance" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Base Distribution Pie / Bar */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <PieIcon size={18} color="var(--accent-emerald)" />
            <h3 className="font-military" style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>
              ASSET DISTRIBUTION ACROSS MILITARY BASES
            </h3>
          </div>

          <div style={{ width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={baseDistData}
                  dataKey="totalAssets"
                  nameKey="baseName"
                  cx="50%"
                  cy="50%"
                  outerRadius={105}
                  innerRadius={50}
                  paddingAngle={4}
                  label={({ baseName, percent }) => `${baseName.split(' ')[0]} (${(percent * 100).toFixed(0)}%)`}
                >
                  {baseDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Net Movement Interactive Drilldown Modal */}
      <NetMovementModal
        isOpen={isNetModalOpen}
        onClose={() => setIsNetModalOpen(false)}
        data={netMovementDetails}
      />
    </div>
  );
};

export default DashboardPage;
