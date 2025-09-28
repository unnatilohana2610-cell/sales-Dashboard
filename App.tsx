import React, { useMemo, useState } from 'react';
import { useSalesData } from './hooks/useSalesData';
import { totalRevenue, salesByMonth, salesByRegion, topProducts } from './utils/aggregations';
import { RevenueTrend } from './components/RevenueTrend';
import { RegionPie } from './components/RegionPie';
import { TopProductsBar } from './components/TopProductsBar';
import { Filters } from './components/Filters';
import { KPICard } from './components/KPICard';

export default function App() {
  const { sales, loading, error } = useSalesData();
  const [regionFilter, setRegionFilter] = useState<string>('');
  const [productFilter, setProductFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const filtered = useMemo(() => {
    return sales.filter(s => {
      if (regionFilter && s.region !== regionFilter) return false;
      if (productFilter && s.product !== productFilter) return false;
      if (startDate && new Date(s.date) < new Date(startDate)) return false;
      if (endDate && new Date(s.date) > new Date(endDate)) return false;
      return true;
    });
  }, [sales, regionFilter, productFilter, startDate, endDate]);

  const revenue = totalRevenue(filtered);
  const trend = salesByMonth(filtered);
  const byRegion = salesByRegion(filtered);
  const top = topProducts(filtered, 5, 'quantity');

  if (loading) return <div className="p-6">Loading sales data...</div>;
  if (error) return <div className="p-6">Error loading data: {String(error)}</div>;

  const regions = Array.from(new Set(sales.map(s => s.region)));
  const products = Array.from(new Set(sales.map(s => s.product)));

  return (
    <div className="container">
      <header className="header">
        <h1>Sales Dashboard</h1>
        <div className="meta">Source API: mockapi</div>
      </header>

      <section className="kpis">
        <KPICard title="Total Revenue" value={'₹' + revenue.toFixed(2)} />
        <KPICard title="Number of Sales" value={filtered.length} />
        <KPICard title="Avg Order Value" value={filtered.length ? '₹' + (revenue/filtered.length).toFixed(2) : '₹0.00'} />
      </section>

      <Filters
        regions={regions}
        products={products}
        region={regionFilter}
        setRegion={setRegionFilter}
        product={productFilter}
        setProduct={setProductFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <section className="grid">
        <div className="card">
          <h2>Revenue Trend (monthly)</h2>
          <RevenueTrend data={trend} />
        </div>

        <div className="card">
          <h2>Sales by Region</h2>
          <RegionPie data={byRegion} />
        </div>

        <div className="card wide">
          <h2>Top 5 Products (by quantity)</h2>
          <TopProductsBar data={top} />
        </div>
      </section>

      <footer className="footer">
        <small>Built for interview task — simple, clear, and extendable.</small>
      </footer>
    </div>
  );
}
