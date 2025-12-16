

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_ORDERS, MOCK_DRIVERS, MOCK_ALERTS, MOCK_INTEGRATIONS } from '../constants';
import { TrendingUp, Truck, Users, Package, AlertCircle, ArrowUpRight, Shield, Radio } from 'lucide-react';

const Dashboard: React.FC = () => {
  const revenueData = MOCK_ORDERS
    .filter(o => o.status === 'COMPLETED' || o.status === 'IN_TRANSIT')
    .map(o => {
      const c = o.financials.costs;
      const totalCost = c.fuel + c.adBlue + c.tolls + c.driverDiems + c.crossBorderAllowance + c.nightRestAllowance + c.corridorPay + c.maintenance + c.driverBaseSalary + c.socialSecurity + c.leasing + c.insurance + c.overhead;
      return {
        name: o.id.split('-')[2],
        Revenue: o.financials.freightPrice,
        Cost: totalCost,
        Profit: o.financials.freightPrice - totalCost
      };
    });

  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.Revenue, 0);
  const totalProfit = revenueData.reduce((acc, curr) => acc + curr.Profit, 0);
  const activeOrders = MOCK_ORDERS.filter(o => o.status === 'IN_TRANSIT' || o.status === 'PLANNED').length;
  const availableDrivers = MOCK_DRIVERS.filter(d => d.status === 'AVAILABLE').length;
  const runningIntegrations = MOCK_INTEGRATIONS.filter(i => i.status !== 'DOWN').length;

  const KPICard = ({ title, value, icon: Icon, colorClass, bgClass, trend }: any) => (
    <div className="card flex items-start justify-between hover:shadow-md transition-shadow duration-300">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-2">{title}</p>
        <p className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
        {trend && (
            <div className="flex items-center mt-3 text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-full">
                <ArrowUpRight size={12} className="mr-1" /> {trend}
            </div>
        )}
      </div>
      <div className={`p-3.5 rounded-xl ${bgClass} ${colorClass} shadow-inner`}>
        <Icon size={24} />
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 section-spacing max-w-7xl mx-auto">
      <header className="mb-6 md:mb-10">
        <h1 className="page-header">Panel Zarządzania</h1>
        <p className="page-subtitle">Przegląd operacyjny floty i finansów (Real-time)</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KPICard 
            title="Przychód (Msc)" 
            value={`${totalRevenue.toLocaleString()} €`} 
            icon={TrendingUp} 
            colorClass="text-blue-600" 
            bgClass="bg-blue-50"
            trend="+12.5% m/m"
        />
        <KPICard 
            title="Zysk Netto (Est.)" 
            value={`${totalProfit.toLocaleString()} €`} 
            icon={Package} 
            colorClass="text-emerald-600" 
            bgClass="bg-emerald-50"
            trend="Wysoka marża"
        />
        <KPICard 
            title="Aktywne Zlecenia" 
            value={activeOrders} 
            icon={Truck} 
            colorClass="text-orange-600" 
            bgClass="bg-orange-50"
        />
        <KPICard 
            title="Dostępni Kierowcy" 
            value={`${availableDrivers} / ${MOCK_DRIVERS.length}`} 
            icon={Users} 
            colorClass="text-purple-600" 
            bgClass="bg-purple-50"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <div className="w-2 h-6 bg-blue-500 rounded mr-3"></div>
            Analiza Finansowa Zleceń
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="Revenue" fill="#0ea5e9" name="Przychód" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Bar dataKey="Cost" fill="#cbd5e1" name="Koszt" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <div className="w-2 h-6 bg-emerald-500 rounded mr-3"></div>
            Efektywność Paliwowa (Eco-Score)
          </h3>
          <div className="space-y-4 overflow-y-auto max-h-64 pr-2">
            {MOCK_DRIVERS.map(driver => (
              <div key={driver.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-600 shadow-sm border border-white">
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{driver.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{driver.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-black ${driver.ecoScore >= 9 ? 'text-emerald-500' : driver.ecoScore >= 8 ? 'text-blue-500' : 'text-amber-500'}`}>
                    {driver.ecoScore}
                  </span>
                  <span className="text-xs text-slate-400 font-medium ml-1">/10</span>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-xs text-slate-600 flex items-start space-x-2">
                <AlertCircle size={14} className="mt-0.5 text-blue-500 flex-shrink-0" />
                <span className="leading-relaxed">AI Prediction: Serhii ma najwyższą szansę na dowiezienie ładunku przed czasem z najniższym spalaniem.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Integracje i alerty */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <Radio className="mr-2 text-emerald-600" size={18}/>
              Integracje w trybie live
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
              {runningIntegrations}/{MOCK_INTEGRATIONS.length} online
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MOCK_INTEGRATIONS.map(integration => (
              <div key={integration.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-all bg-gradient-to-br from-white to-slate-50 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-slate-800">{integration.name}</p>
                    <p className="text-xs text-slate-500">{integration.desc}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold border ${
                    integration.status === 'OK'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      : 'bg-amber-50 text-amber-700 border-amber-100'
                  }`}>
                    {integration.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">Latency: {integration.latency}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <Shield className="mr-2 text-amber-500" size={18}/>
              Alerty AI / SLA
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-bold">live</span>
          </div>
          <div className="space-y-3">
            {MOCK_ALERTS.map(alert => (
              <div key={alert.id} className="p-3 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-semibold text-slate-800">{alert.title}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                    alert.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>{alert.severity}</span>
                </div>
                <p className="text-xs text-slate-600">{alert.description}</p>
                <p className="text-[10px] text-slate-400 mt-1">{alert.time}</p>
              </div>
            ))}
            <div className="flex items-center text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
              <ArrowUpRight size={12} className="mr-1"/> Plan: automatyczne przekierowanie alertów do Teams/Email.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
