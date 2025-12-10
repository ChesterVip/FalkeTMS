
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { MOCK_ORDERS } from '../constants';
import { TimeRange } from '../types';
import { TrendingUp, TrendingDown, DollarSign, Wallet, Calendar, PieChart as PieChartIcon, Activity, Truck } from 'lucide-react';

const FinancialReports: React.FC = () => {
  const [period, setPeriod] = useState<TimeRange>('DAY');
  const [fuelDelta, setFuelDelta] = useState(0); // symulacja wrażliwości ceny paliwa w %

  // Filter Logic with period-based filtering
  const relevantOrders = useMemo(() => {
    const now = new Date();
    return MOCK_ORDERS.filter(order => {
      if (order.status === 'NEW') return false;
      
      const orderDate = new Date(order.dates.delivery);
      
      if (period === 'DAY') {
        // Last 7 days
        const daysAgo = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
        return daysAgo >= 0 && daysAgo <= 7;
      } else if (period === 'WEEK') {
        // Last 8 weeks
        const weeksAgo = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
        return weeksAgo >= 0 && weeksAgo <= 8;
      } else if (period === 'MONTH') {
        // Last 12 months
        return orderDate.getFullYear() >= now.getFullYear() - 1;
      } else {
        // Last 3 years (YEAR)
        return orderDate.getFullYear() >= now.getFullYear() - 2;
      }
    });
  }, [period]);

  // --- CALCULATIONS FOR MANAGERIAL ACCOUNTING ---

  // 1. Revenue (Przychód)
  const totalRevenue = relevantOrders.reduce((acc, o) => acc + o.financials.freightPrice, 0);

  // 2. Variable Costs (Mobility Package included)
  const totalFuel = relevantOrders.reduce((acc, o) => acc + o.financials.costs.fuel, 0);
  const totalTolls = relevantOrders.reduce((acc, o) => acc + o.financials.costs.tolls, 0);
  const totalDiems = relevantOrders.reduce((acc, o) => acc + o.financials.costs.driverDiems, 0);
  const totalCrossBorder = relevantOrders.reduce((acc, o) => acc + o.financials.costs.crossBorderAllowance, 0);
  const totalNight = relevantOrders.reduce((acc, o) => acc + o.financials.costs.nightRestAllowance, 0);
  const totalCorridor = relevantOrders.reduce((acc, o) => acc + o.financials.costs.corridorPay, 0);
  const totalAdBlue = relevantOrders.reduce((acc, o) => acc + o.financials.costs.adBlue, 0);
  const totalMaint = relevantOrders.reduce((acc, o) => acc + o.financials.costs.maintenance, 0);
  
  const totalVariableCosts = totalFuel + totalTolls + totalDiems + totalCrossBorder + totalNight + totalCorridor + totalAdBlue + totalMaint;

  // 3. Contribution Margin I
  const contributionMargin1 = totalRevenue - totalVariableCosts;
  const cm1Percent = totalRevenue > 0 ? (contributionMargin1 / totalRevenue) * 100 : 0;

  // 4. Fixed Costs
  const totalLeasing = relevantOrders.reduce((acc, o) => acc + o.financials.costs.leasing, 0);
  const totalInsurance = relevantOrders.reduce((acc, o) => acc + o.financials.costs.insurance, 0);
  const totalBaseSalary = relevantOrders.reduce((acc, o) => acc + o.financials.costs.driverBaseSalary, 0);
  const totalSocial = relevantOrders.reduce((acc, o) => acc + o.financials.costs.socialSecurity, 0);
  const totalOverhead = relevantOrders.reduce((acc, o) => acc + o.financials.costs.overhead, 0);

  const totalFixedCosts = totalLeasing + totalInsurance + totalBaseSalary + totalSocial + totalOverhead;

  // 5. EBIT
  const ebit = contributionMargin1 - totalFixedCosts;
  const ebitMargin = totalRevenue > 0 ? (ebit / totalRevenue) * 100 : 0;

  // What-if: zmiana ceny paliwa
  const adjustedFuel = totalFuel * (1 + fuelDelta / 100);
  const adjustedVariable = adjustedFuel + (totalVariableCosts - totalFuel);
  const adjustedContribution = totalRevenue - adjustedVariable;
  const adjustedEbit = adjustedContribution - totalFixedCosts;

  // 6. Unit Economics
  const totalKm = relevantOrders.reduce((acc, o) => acc + o.route.distanceKm, 0);
  const revenuePerKm = totalKm > 0 ? totalRevenue / totalKm : 0;
  const costPerKm = totalKm > 0 ? (totalVariableCosts + totalFixedCosts) / totalKm : 0;

  // --- DYNAMIC TREND DATA AGGREGATION with proper filtering ---
  const trendData = useMemo(() => {
    const groupedData: Record<string, { name: string, Revenue: number, Profit: number, Costs: number, count: number }> = {};

    // relevantOrders is already filtered by period
    relevantOrders.forEach(order => {
        const date = new Date(order.dates.delivery);
        let key = '';
        
        if (period === 'DAY') {
            key = date.toLocaleDateString('pl-PL', { day: '2-digit', month: 'short' });
        } else if (period === 'WEEK') {
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay() + 1);
            key = `W${Math.ceil((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000))}`;
        } else if (period === 'MONTH') {
            key = date.toLocaleDateString('pl-PL', { month: 'short', year: '2-digit' });
        } else {
            key = date.getFullYear().toString();
        }

        if (!groupedData[key]) {
            groupedData[key] = { name: key, Revenue: 0, Profit: 0, Costs: 0, count: 0 };
        }

        const costs = order.financials.costs;
        const totalOrderCost = costs.fuel + costs.adBlue + costs.tolls + costs.driverDiems + costs.crossBorderAllowance + costs.nightRestAllowance + costs.corridorPay + costs.maintenance + costs.driverBaseSalary + costs.socialSecurity + costs.leasing + costs.insurance + costs.overhead;
        const profit = order.financials.freightPrice - totalOrderCost;

        groupedData[key].Revenue += order.financials.freightPrice;
        groupedData[key].Costs += totalOrderCost;
        groupedData[key].Profit += profit;
        groupedData[key].count += 1;
    });

    return Object.values(groupedData)
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(-10); // Show last 10 periods for better visibility
  }, [relevantOrders, period]);

  // Waterfall Data (Cascade)
  const waterfallData = [
      { name: 'Przychód', start: 0, end: totalRevenue, value: totalRevenue, fill: '#3b82f6' },
      { name: 'Paliwo & AdBlue', start: totalRevenue, end: totalRevenue - (totalFuel + totalAdBlue), value: -(totalFuel + totalAdBlue), fill: '#f59e0b' },
      { name: 'Opłaty Drogowe', start: totalRevenue - (totalFuel + totalAdBlue), end: totalRevenue - (totalFuel + totalAdBlue) - totalTolls, value: -totalTolls, fill: '#f59e0b' },
      { name: 'Pakiet Mobilności', start: totalRevenue - (totalFuel + totalAdBlue) - totalTolls, end: totalRevenue - (totalFuel + totalAdBlue) - totalTolls - (totalDiems + totalCrossBorder + totalNight + totalCorridor), value: -(totalDiems + totalCrossBorder + totalNight + totalCorridor), fill: '#f59e0b' },
      { name: 'Marża Pokrycia I', start: 0, end: contributionMargin1, value: contributionMargin1, fill: '#10b981', isTotal: true }, 
      { name: 'Kierowca (Podstawa + ZUS)', start: contributionMargin1, end: contributionMargin1 - (totalBaseSalary + totalSocial), value: -(totalBaseSalary + totalSocial), fill: '#8b5cf6' },
      { name: 'Leasing & Ubezp.', start: contributionMargin1 - (totalBaseSalary + totalSocial), end: contributionMargin1 - (totalBaseSalary + totalSocial) - (totalLeasing + totalInsurance), value: -(totalLeasing + totalInsurance), fill: '#8b5cf6' },
      { name: 'Biuro', start: contributionMargin1 - (totalBaseSalary + totalSocial) - (totalLeasing + totalInsurance), end: ebit, value: -totalOverhead, fill: '#8b5cf6' },
      { name: 'Zysk (EBIT)', start: 0, end: ebit, value: ebit, fill: ebit > 0 ? '#10b981' : '#ef4444', isResult: true }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50 min-h-full max-w-7xl mx-auto">
        {/* Header & Controls */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Rachunkowość Zarządcza</h1>
                <p className="text-slate-500 mt-1">Analiza marż pokrycia, kosztów stałych i zmiennych</p>
            </div>
            <div className="flex flex-col items-start md:items-end space-y-2">
                <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm overflow-x-auto">
                    {(['DAY', 'WEEK', 'MONTH', 'YEAR'] as TimeRange[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setPeriod(t)}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all whitespace-nowrap ${period === t ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            {t === 'DAY' ? 'Dzień' : t === 'WEEK' ? 'Tydzień' : t === 'MONTH' ? 'Miesiąc' : 'Rok'}
                        </button>
                    ))}
                </div>
                <p className="text-[11px] text-slate-500 leading-tight text-left md:text-right max-w-xs">
                    Przełącznik filtruje wszystkie dane (KPI, trend, tabela) według wybranego okresu.
                </p>
            </div>
        </header>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Przychód (Fracht)</p>
                <div className="flex justify-between items-end">
                    <p className="text-2xl font-black text-slate-800">{totalRevenue.toLocaleString()} <span className="text-sm font-normal text-slate-400">EUR</span></p>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><DollarSign size={20}/></div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-emerald-50 to-transparent"></div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Marża Pokrycia I (CM1)</p>
                <div className="flex justify-between items-end relative z-10">
                    <div>
                        <p className="text-2xl font-black text-emerald-600">{contributionMargin1.toLocaleString()} <span className="text-sm font-normal text-emerald-400">EUR</span></p>
                        <p className="text-xs font-bold text-emerald-500 mt-1">{cm1Percent.toFixed(1)}% Przychodu</p>
                    </div>
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Activity size={20}/></div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Koszty Stałe (Struktura)</p>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-2xl font-black text-purple-600">{totalFixedCosts.toLocaleString()} <span className="text-sm font-normal text-purple-400">EUR</span></p>
                        <p className="text-xs text-slate-400 mt-1">Leasing, Ubezp., Biuro</p>
                    </div>
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Wallet size={20}/></div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm border-l-4 border-l-slate-800">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Zysk Operacyjny (EBIT)</p>
                <div className="flex justify-between items-end">
                    <p className={`text-2xl font-black ${ebit > 0 ? 'text-slate-800' : 'text-red-600'}`}>
                        {ebit.toLocaleString()} <span className="text-sm font-normal text-slate-400">EUR</span>
                    </p>
                    <div className={`p-2 rounded-lg ${ebit > 0 ? 'bg-slate-100 text-slate-700' : 'bg-red-50 text-red-600'}`}>
                        {ebit > 0 ? <TrendingUp size={20}/> : <TrendingDown size={20}/>}
                    </div>
                </div>
                <p className="text-xs font-bold text-slate-400 mt-1">{ebitMargin.toFixed(1)}% ROS</p>
            </div>
        </div>

        {/* Unit Economics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Stawka za km (Przychód)</p>
                    <p className="text-3xl font-black">{revenuePerKm.toFixed(2)} EUR<span className="text-lg text-slate-500">/km</span></p>
                </div>
                <div className="h-12 w-px bg-slate-700 mx-4"></div>
                <div>
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Koszt całkowity za km</p>
                    <p className="text-3xl font-black text-amber-400">{costPerKm.toFixed(2)} EUR<span className="text-lg text-slate-500">/km</span></p>
                </div>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-600 flex items-center">
                        <Calendar className="mr-2 text-amber-500" size={16}/> What-if: zmiana ceny paliwa
                    </h3>
                    <span className="text-xs font-mono text-slate-500">{fuelDelta > 0 ? '+' : ''}{fuelDelta}%</span>
                </div>
                <input 
                    type="range" 
                    min={-20} 
                    max={30} 
                    step={1} 
                    value={fuelDelta}
                    onChange={(e) => setFuelDelta(Number(e.target.value))}
                    className="w-full accent-amber-500"
                />
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                        <p className="text-amber-700 font-bold text-xs uppercase">Zm. koszt paliwa</p>
                        <p className="font-black text-amber-700">{(adjustedFuel - totalFuel).toFixed(0)} EUR</p>
                    </div>
                    <div className={`p-3 rounded-xl border ${adjustedEbit >= 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                        <p className="font-bold text-xs uppercase">EBIT (symulacja)</p>
                        <p className="font-black">{adjustedEbit.toFixed(0)} EUR</p>
                    </div>
                </div>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <h3 className="text-sm font-bold text-slate-600 mb-3 flex items-center">
                    <Truck className="mr-2 text-blue-500" size={16}/> Efektywność Paliwowa Floty
                </h3>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden mb-1">
                    <div className="bg-emerald-500 h-full rounded-full" style={{width: '78%'}}></div>
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-500 mt-1">
                    <span>Śr. spalanie: 26.5 L/100km</span>
                    <span>Cel: 25.0 L/100km</span>
                </div>
             </div>
        </div>

        {/* Dynamic Trends Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center">
                    <TrendingUp className="mr-2 text-blue-500" size={20}/>
                    Trend Rentowności ({period === 'DAY' ? 'Dzienny' : period === 'WEEK' ? 'Tygodniowy' : period === 'MONTH' ? 'Miesięczny' : 'Roczny'})
                </h3>
                <div className="text-xs text-slate-500 text-right">
                    <p>Zleceń w okresie: {trendData.reduce((acc, d) => acc + (d.count || 0), 0)}</p>
                    <p>Punktów danych: {trendData.length}</p>
                </div>
             </div>
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 11}} 
                            dy={10} 
                            angle={period === 'DAY' ? -45 : 0}
                            textAnchor={period === 'DAY' ? 'end' : 'middle'}
                        />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <Tooltip 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                            formatter={(value: number) => [`${value.toFixed(0)} EUR`, '']}
                            labelFormatter={(label) => `Okres: ${label}`}
                        />
                        <Legend wrapperStyle={{paddingTop: '10px'}} />
                        <Line type="monotone" dataKey="Revenue" stroke="#3b82f6" strokeWidth={3} dot={{r: 5, fill: '#3b82f6'}} name="Przychód" />
                        <Line type="monotone" dataKey="Costs" stroke="#f59e0b" strokeWidth={2} dot={{r: 4, fill: '#f59e0b'}} name="Koszty" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="Profit" stroke="#10b981" strokeWidth={3} dot={{r: 5, fill: '#10b981'}} name="Zysk" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-blue-600 font-bold uppercase mb-1">Średni przychód</p>
                    <p className="text-xl font-black text-blue-700">
                        {trendData.length > 0 ? (trendData.reduce((acc, d) => acc + d.Revenue, 0) / trendData.length).toFixed(0) : '0'} EUR
                    </p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <p className="text-amber-600 font-bold uppercase mb-1">Średnie koszty</p>
                    <p className="text-xl font-black text-amber-700">
                        {trendData.length > 0 ? (trendData.reduce((acc, d) => acc + d.Costs, 0) / trendData.length).toFixed(0) : '0'} EUR
                    </p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                    <p className="text-emerald-600 font-bold uppercase mb-1">Średni zysk</p>
                    <p className="text-xl font-black text-emerald-700">
                        {trendData.length > 0 ? (trendData.reduce((acc, d) => acc + d.Profit, 0) / trendData.length).toFixed(0) : '0'} EUR
                    </p>
                </div>
            </div>
        </div>

        {/* Advanced Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Waterfall Chart - Managerial P&L Flow */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                    <Activity className="mr-2 text-blue-500" size={20}/>
                    Przepływ Finansowy (Wodospad Kosztów)
                </h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={waterfallData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} interval={0}/>
                            <YAxis axisLine={false} tickLine={false}/>
                            <Tooltip 
                                formatter={(val: number) => `${Math.abs(val).toLocaleString()} EUR`}
                                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}
                            />
                            {/* Invisible bars for positioning */}
                            <Bar dataKey="start" stackId="a" fill="transparent" />
                            {/* Visible bars */}
                            <Bar dataKey="value" stackId="a" radius={[4, 4, 4, 4]}>
                                {waterfallData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Cost Breakdown Pie */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                    <PieChartIcon className="mr-2 text-purple-500" size={20}/>
                    Struktura Kosztów
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={[
                                    {name: 'Paliwo', value: totalFuel},
                                    {name: 'Opłaty', value: totalTolls},
                                    {name: 'Kierowca (Diety)', value: totalDiems},
                                    {name: 'Koszty Stałe', value: totalFixedCosts},
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                <Cell fill="#0ea5e9" /> {/* Fuel */}
                                <Cell fill="#f59e0b" /> {/* Tolls */}
                                <Cell fill="#10b981" /> {/* Driver */}
                                <Cell fill="#8b5cf6" /> {/* Fixed */}
                            </Pie>
                            <Tooltip formatter={(value: number) => `${value.toLocaleString()} EUR`} />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Driver Settlements (Mobility Package) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-slate-800">Rozliczenia kierowców (Pakiet Mobilności)</h3>
                    <p className="text-xs text-slate-500">Diety, dodatki transgraniczne, noclegi, korytarzowe, ZUS</p>
                </div>
                <div className="text-right text-xs font-mono text-slate-500">
                    <p>Diety: {totalDiems.toFixed(0)} EUR</p>
                    <p>Transgraniczne: {totalCrossBorder.toFixed(0)} EUR</p>
                    <p>Nocleg+Korytarz: {(totalNight + totalCorridor).toFixed(0)} EUR</p>
                    <p>ZUS/Ubezp.: {totalSocial.toFixed(0)} EUR</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 text-sm">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                    <p className="text-emerald-600 text-xs font-bold uppercase">Koszt km (kierowcy)</p>
                    <p className="text-2xl font-black text-emerald-700">{totalKm > 0 ? ((totalDiems + totalCrossBorder + totalNight + totalCorridor + totalBaseSalary + totalSocial) / totalKm).toFixed(2) : '0.00'} EUR/km</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-blue-600 text-xs font-bold uppercase">Diety / zlecenie</p>
                    <p className="text-2xl font-black text-blue-700">{(relevantOrders.length ? totalDiems / relevantOrders.length : 0).toFixed(0)} EUR</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <p className="text-amber-600 text-xs font-bold uppercase">Transgraniczne / zlecenie</p>
                    <p className="text-2xl font-black text-amber-700">{(relevantOrders.length ? totalCrossBorder / relevantOrders.length : 0).toFixed(0)} EUR</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <p className="text-slate-600 text-xs font-bold uppercase">Noclegi + korytarz</p>
                    <p className="text-2xl font-black text-slate-800">{(totalNight + totalCorridor).toFixed(0)} EUR</p>
                </div>
            </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-800">Szczegółowy Rejestr Zleceń (Managerial P&L)</h3>
             </div>
             <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left whitespace-nowrap">
                     <thead className="bg-white text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-100">
                         <tr>
                             <th className="px-6 py-4">ID Zlecenia</th>
                             <th className="px-6 py-4">Data</th>
                             <th className="px-6 py-4 text-right">Fracht</th>
                             <th className="px-6 py-4 text-right text-amber-600 bg-amber-50/30">K. Zmienne</th>
                            <th className="px-6 py-4 text-right text-emerald-700 bg-emerald-50/30">Marża I</th>
                            <th className="px-6 py-4 text-right text-purple-600 bg-purple-50/30">K. Stałe</th>
                             <th className="px-6 py-4 text-right font-black">EBIT</th>
                             <th className="px-6 py-4 text-center">ROS %</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {relevantOrders.map(o => {
                            const c = o.financials.costs;
                            const varCost = c.fuel + c.adBlue + c.tolls + c.driverDiems + c.crossBorderAllowance + c.nightRestAllowance + c.corridorPay + c.maintenance;
                            const fixCost = c.driverBaseSalary + c.socialSecurity + c.leasing + c.insurance + c.overhead;
                            const cm1 = o.financials.freightPrice - varCost;
                            const orderEbit = cm1 - fixCost;
                            const ros = (orderEbit / o.financials.freightPrice) * 100;

                            return (
                                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-slate-500">{o.id}</td>
                                    <td className="px-6 py-4 text-slate-600">{o.dates.delivery}</td>
                                    <td className="px-6 py-4 text-right font-bold">{o.financials.freightPrice}</td>
                                    <td className="px-6 py-4 text-right text-amber-700 bg-amber-50/10">{varCost.toFixed(0)}</td>
                                    <td className="px-6 py-4 text-right font-bold text-emerald-700 bg-emerald-50/10">{cm1.toFixed(0)}</td>
                                    <td className="px-6 py-4 text-right text-purple-700 bg-purple-50/10">{fixCost.toFixed(0)}</td>
                                    <td className={`px-6 py-4 text-right font-black ${orderEbit > 0 ? 'text-slate-800' : 'text-red-600'}`}>
                                        {orderEbit.toFixed(0)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                         <span className={`px-2 py-1 rounded text-xs font-bold ${ros > 10 ? 'bg-emerald-100 text-emerald-700' : ros > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                            {ros.toFixed(1)}%
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                     </tbody>
                 </table>
             </div>
        </div>
    </div>
  );
};

export default FinancialReports;
