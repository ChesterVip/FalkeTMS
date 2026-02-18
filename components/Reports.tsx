import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { MOCK_ORDERS } from '../constants';
import { OrderStatus } from '../types';
import { TrendingUp, Percent, DollarSign } from 'lucide-react';

const PERIODS = ['Miesiąc', 'Kwartał', 'Rok'] as const;
const COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#ec4899', '#14b8a6', '#f97316', '#84cc16', '#06b6d4', '#a855f7'];

const Reports: React.FC = () => {
  const [period, setPeriod] = useState<'Miesiąc' | 'Kwartał' | 'Rok'>('Miesiąc');

  const completedOrders = useMemo(
    () => MOCK_ORDERS.filter((o) => o.status === OrderStatus.COMPLETED),
    []
  );

  const totals = useMemo(() => {
    let revenue = 0;
    let totalCost = 0;
    const costByCategory: Record<string, number> = {
      'Paliwo': 0,
      'AdBlue': 0,
      'Opłaty drogowe': 0,
      'Diety': 0,
      'Dodatki (transgr., nocleg, korytarz)': 0,
      'Eksploatacja': 0,
      'Wynagrodzenie + ZUS': 0,
      'Leasing': 0,
      'Ubezpieczenia': 0,
      'Koszty biura': 0,
    };
    completedOrders.forEach((o) => {
      const c = o.financials.costs;
      revenue += o.financials.freightPrice;
      const variable =
        c.fuel +
        c.adBlue +
        c.tolls +
        c.driverDiems +
        c.crossBorderAllowance +
        c.nightRestAllowance +
        c.corridorPay +
        c.maintenance;
      const fixed =
        c.driverBaseSalary +
        c.socialSecurity +
        c.leasing +
        c.insurance +
        c.overhead;
      totalCost += variable + fixed;
      costByCategory['Paliwo'] += c.fuel;
      costByCategory['AdBlue'] += c.adBlue;
      costByCategory['Opłaty drogowe'] += c.tolls;
      costByCategory['Diety'] += c.driverDiems;
      costByCategory['Dodatki (transgr., nocleg, korytarz)'] +=
        c.crossBorderAllowance + c.nightRestAllowance + c.corridorPay;
      costByCategory['Eksploatacja'] += c.maintenance;
      costByCategory['Wynagrodzenie + ZUS'] += c.driverBaseSalary + c.socialSecurity;
      costByCategory['Leasing'] += c.leasing;
      costByCategory['Ubezpieczenia'] += c.insurance;
      costByCategory['Koszty biura'] += c.overhead;
    });
    const variableTotal =
      costByCategory['Paliwo'] +
      costByCategory['AdBlue'] +
      costByCategory['Opłaty drogowe'] +
      costByCategory['Diety'] +
      costByCategory['Dodatki (transgr., nocleg, korytarz)'] +
      costByCategory['Eksploatacja'];
    const marginI = revenue > 0 ? ((revenue - variableTotal) / revenue) * 100 : 0;
    const profit = revenue - totalCost;
    const ros = revenue > 0 ? (profit / revenue) * 100 : 0;
    return {
      revenue,
      totalCost,
      profit,
      marginI,
      ros,
      costByCategory,
    };
  }, [completedOrders]);

  const pieData = useMemo(
    () =>
      Object.entries(totals.costByCategory)
        .filter(([, v]) => v > 0)
        .map(([name, value]) => ({ name, value: Math.round(value) })),
    [totals.costByCategory]
  );

  const trendByMonth = useMemo(() => {
    const byMonth: Record<string, { revenue: number; cost: number; profit: number }> = {};
    const monthFromOrder = (o: (typeof completedOrders)[0]): string => {
      const dateStr = o.dates?.delivery || o.dates?.pickup;
      if (dateStr) {
        const m = dateStr.match(/(\d{4})-(\d{2})/);
        if (m) return `${m[1]}-${m[2]}`;
      }
      if (o.id.includes('JAN')) return '2023-01';
      if (o.id.includes('FEB')) return '2023-02';
      if (o.id.includes('MAR')) return '2023-03';
      if (o.id.includes('NOV')) return '2023-11';
      if (o.id.includes('DEC') || o.id.includes('012')) return '2023-12';
      if (o.id.includes('001') || o.id.includes('006') || o.id.includes('009')) return '2024-01';
      if (o.id.includes('002') || o.id.includes('201')) return '2024-02';
      if (o.id.includes('003')) return '2024-03';
      if (o.id.includes('004')) return '2024-04';
      if (o.id.includes('005')) return '2024-05';
      return '2024-06';
    };
    completedOrders.forEach((o) => {
      const key = monthFromOrder(o);
      if (!byMonth[key]) byMonth[key] = { revenue: 0, cost: 0, profit: 0 };
      const c = o.financials.costs;
      const cost =
        c.fuel +
        c.adBlue +
        c.tolls +
        c.driverDiems +
        c.crossBorderAllowance +
        c.nightRestAllowance +
        c.corridorPay +
        c.maintenance +
        c.driverBaseSalary +
        c.socialSecurity +
        c.leasing +
        c.insurance +
        c.overhead;
      byMonth[key].revenue += o.financials.freightPrice;
      byMonth[key].cost += cost;
      byMonth[key].profit += o.financials.freightPrice - cost;
    });
    const months = Object.keys(byMonth).sort();
    return months.slice(-12).map((m) => ({
      month: m,
      Przychód: Math.round(byMonth[m].revenue),
      Koszt: Math.round(byMonth[m].cost),
      Zysk: Math.round(byMonth[m].profit),
    }));
  }, [completedOrders]);

  return (
    <div className="p-4 md:p-8 section-spacing max-w-7xl mx-auto">
      <header className="mb-6 md:mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="page-header">Raporty finansowe</h1>
          <p className="page-subtitle">
            Rachunkowość zarządcza, marża pokrycia i analiza kosztów (dane z zleceń zakończonych)
          </p>
        </div>
        <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === p
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </header>

      {/* KPI: Marża pokrycia I, EBIT (zysk), ROS% */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="card flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-2">Marża pokrycia I</p>
            <p className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              {totals.marginI.toFixed(1)}%
            </p>
            <p className="text-xs text-slate-500 mt-1">(Przychód − Koszty zmienne) / Przychód</p>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600 shadow-inner">
            <Percent size={24} />
          </div>
        </div>
        <div className="card flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-2">Zysk (EBIT est.)</p>
            <p className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              {totals.profit.toLocaleString()} €
            </p>
            <p className="text-xs text-slate-500 mt-1">Przychód − Koszty całkowite</p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 shadow-inner">
            <DollarSign size={24} />
          </div>
        </div>
        <div className="card flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-2">ROS %</p>
            <p className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              {totals.ros.toFixed(1)}%
            </p>
            <p className="text-xs text-slate-500 mt-1">Zysk / Przychód</p>
          </div>
          <div className="p-3.5 rounded-xl bg-violet-50 text-violet-600 shadow-inner">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* Trend: przychód / koszt / zysk w czasie */}
      <div className="card mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
          <div className="w-2 h-6 bg-blue-500 rounded mr-3" />
          Trend przychodów i kosztów (miesiąc)
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendByMonth} barGap={4} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="Przychód" fill="#0ea5e9" name="Przychód" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Koszt" fill="#cbd5e1" name="Koszt" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Zysk" fill="#10b981" name="Zysk" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Struktura kosztów (Pie) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <div className="w-2 h-6 bg-violet-500 rounded mr-3" />
            Struktura kosztów (łącznie)
          </h3>
          {pieData.length > 0 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => [`${v.toLocaleString()} €`, 'Koszt']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-slate-500 text-sm">Brak danych o kosztach dla zleceń zakończonych.</p>
          )}
        </div>
        <div className="card flex flex-col justify-center">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <div className="w-2 h-6 bg-emerald-500 rounded mr-3" />
            Podsumowanie
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Przychód łącznie</dt>
              <dd className="font-semibold text-slate-800">{totals.revenue.toLocaleString()} €</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Koszty łącznie</dt>
              <dd className="font-semibold text-slate-800">{totals.totalCost.toLocaleString()} €</dd>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-100">
              <dt className="text-slate-700 font-medium">Zysk netto</dt>
              <dd className={`font-bold ${totals.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {totals.profit.toLocaleString()} €
              </dd>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Dane na podstawie zleceń o statusie „Zakończone”. Zgodne z rozdziałem 4 pracy magisterskiej (wielowymiarowa ocena kosztów).
            </p>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Reports;
