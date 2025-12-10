import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { User, Calendar, DollarSign, TrendingUp, FileText, MapPin, Truck } from 'lucide-react';

interface MonthlySettlement {
  month: string;
  driverId: string;
  driverName: string;
  orders: typeof MOCK_ORDERS;
  totalRevenue: number;
  totalCosts: number;
  totalProfit: number;
  totalKm: number;
  daysWorked: number;
  // Driver compensation breakdown
  baseSalary: number;
  diems: number;
  crossBorder: number;
  nightRest: number;
  corridor: number;
  socialSecurity: number;
  totalDriverCompensation: number;
}

const DriverSettlements: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('2023-01');

  // Calculate settlements for Serhii Yarovyi (D2) - Jan-Mar 2023
  const calculateMonthlySettlement = (year: number, month: number): MonthlySettlement | null => {
    const monthKey = `${year}-${String(month).padStart(2, '0')}`;
    const driverId = 'D2'; // Serhii Yarovyi
    
    // Filter orders for this driver and month
    const monthOrders = MOCK_ORDERS.filter(order => {
      const orderDate = new Date(order.dates.delivery);
      const orderMonth = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
      return order.driverId === driverId && orderMonth === monthKey;
    });

    if (monthOrders.length === 0) return null;

    // Calculate totals
    const totalRevenue = monthOrders.reduce((sum, o) => sum + o.financials.freightPrice, 0);
    const totalKm = monthOrders.reduce((sum, o) => sum + o.route.distanceKm, 0);
    
    // Driver compensation
    const baseSalary = monthOrders.reduce((sum, o) => sum + o.financials.costs.driverBaseSalary, 0);
    const diems = monthOrders.reduce((sum, o) => sum + o.financials.costs.driverDiems, 0);
    const crossBorder = monthOrders.reduce((sum, o) => sum + o.financials.costs.crossBorderAllowance, 0);
    const nightRest = monthOrders.reduce((sum, o) => sum + o.financials.costs.nightRestAllowance, 0);
    const corridor = monthOrders.reduce((sum, o) => sum + o.financials.costs.corridorPay, 0);
    const socialSecurity = monthOrders.reduce((sum, o) => sum + o.financials.costs.socialSecurity, 0);
    
    const totalDriverCompensation = baseSalary + diems + crossBorder + nightRest + corridor + socialSecurity;
    
    // Total costs (all)
    const totalCosts = monthOrders.reduce((sum, o) => {
      const c = o.financials.costs;
      return sum + c.fuel + c.adBlue + c.tolls + c.driverDiems + c.crossBorderAllowance + 
             c.nightRestAllowance + c.corridorPay + c.maintenance + c.driverBaseSalary + 
             c.socialSecurity + c.leasing + c.insurance + c.overhead;
    }, 0);
    
    const totalProfit = totalRevenue - totalCosts;
    
    // Estimate days worked (assume average 2 days per order)
    const daysWorked = monthOrders.length * 2;

    return {
      month: monthKey,
      driverId,
      driverName: 'Serhii Yarovyi',
      orders: monthOrders,
      totalRevenue,
      totalCosts,
      totalProfit,
      totalKm,
      daysWorked,
      baseSalary,
      diems,
      crossBorder,
      nightRest,
      corridor,
      socialSecurity,
      totalDriverCompensation
    };
  };

  // Calculate settlements for Jan, Feb, Mar 2023
  const settlements: MonthlySettlement[] = [
    calculateMonthlySettlement(2023, 1),
    calculateMonthlySettlement(2023, 2),
    calculateMonthlySettlement(2023, 3)
  ].filter((s): s is MonthlySettlement => s !== null);

  const currentSettlement = settlements.find(s => s.month === selectedMonth) || settlements[0];

  if (!currentSettlement) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>Brak danych rozliczeniowych dla wybranego okresu.</p>
      </div>
    );
  }

  // Calculate margin percentage
  const marginPercent = currentSettlement.totalRevenue > 0 
    ? ((currentSettlement.totalProfit / currentSettlement.totalRevenue) * 100) 
    : 0;

  // Convert EUR to PLN (approximate exchange rate 4.3)
  const eurToPln = 4.3;
  const convertToPLN = (eur: number) => (eur * eurToPln).toFixed(0);

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50 min-h-full max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center">
            <User className="mr-3 text-blue-600" size={32}/>
            Rozliczenia Kierowcy
          </h1>
          <p className="text-slate-500 mt-1">Szczegółowe rozliczenie za okres: styczeń–marzec 2023</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm overflow-x-auto">
          {settlements.map((settlement) => (
            <button
              key={settlement.month}
              onClick={() => setSelectedMonth(settlement.month)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all whitespace-nowrap ${
                selectedMonth === settlement.month 
                  ? 'bg-slate-800 text-white shadow' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {new Date(settlement.month + '-01').toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}
            </button>
          ))}
        </div>
      </header>

      {/* Driver Info Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm uppercase font-bold mb-1">Kierowca</p>
            <p className="text-3xl font-black">{currentSettlement.driverName}</p>
            <p className="text-blue-200 text-sm mt-1">ID: {currentSettlement.driverId} | Okres: {new Date(currentSettlement.month + '-01').toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-xs uppercase font-bold">Dni robocze</p>
            <p className="text-4xl font-black">{currentSettlement.daysWorked}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Przychód (Fracht)</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-black text-slate-800">{currentSettlement.totalRevenue.toLocaleString()} <span className="text-sm font-normal text-slate-400">EUR</span></p>
              <p className="text-xs text-slate-400 mt-1">~{convertToPLN(currentSettlement.totalRevenue)} PLN</p>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><DollarSign size={20}/></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Koszty całkowite</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-black text-amber-600">{currentSettlement.totalCosts.toLocaleString()} <span className="text-sm font-normal text-amber-400">EUR</span></p>
              <p className="text-xs text-slate-400 mt-1">~{convertToPLN(currentSettlement.totalCosts)} PLN</p>
            </div>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><FileText size={20}/></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Zysk</p>
          <div className="flex justify-between items-end">
            <div>
              <p className={`text-2xl font-black ${currentSettlement.totalProfit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {currentSettlement.totalProfit.toLocaleString()} <span className="text-sm font-normal">EUR</span>
              </p>
              <p className="text-xs text-emerald-500 mt-1">{marginPercent.toFixed(1)}% marża</p>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp size={20}/></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Przejechane km</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-black text-slate-800">{currentSettlement.totalKm.toLocaleString()} <span className="text-sm font-normal text-slate-400">km</span></p>
              <p className="text-xs text-slate-400 mt-1">{currentSettlement.orders.length} zleceń</p>
            </div>
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><MapPin size={20}/></div>
          </div>
        </div>
      </div>

      {/* Driver Compensation Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Rozliczenie kierowcy (wynagrodzenie + dodatki)</h3>
              <p className="text-xs text-slate-500 mt-1">Podstawa, diety, dodatki, ZUS - Pakiet Mobilności</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase font-bold text-slate-500">Suma wynagrodzenia</p>
              <p className="text-2xl font-black text-emerald-600">{currentSettlement.totalDriverCompensation.toLocaleString()} EUR</p>
              <p className="text-xs text-slate-500">~{convertToPLN(currentSettlement.totalDriverCompensation)} PLN</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-blue-600 text-xs font-bold uppercase mb-2">Podstawa</p>
            <p className="text-2xl font-black text-blue-700">{currentSettlement.baseSalary.toFixed(0)} EUR</p>
            <p className="text-xs text-slate-500 mt-1">~{convertToPLN(currentSettlement.baseSalary)} PLN</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <p className="text-emerald-600 text-xs font-bold uppercase mb-2">Diety</p>
            <p className="text-2xl font-black text-emerald-700">{currentSettlement.diems.toFixed(0)} EUR</p>
            <p className="text-xs text-slate-500 mt-1">~{convertToPLN(currentSettlement.diems)} PLN</p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-amber-600 text-xs font-bold uppercase mb-2">Transgraniczne</p>
            <p className="text-2xl font-black text-amber-700">{currentSettlement.crossBorder.toFixed(0)} EUR</p>
            <p className="text-xs text-slate-500 mt-1">~{convertToPLN(currentSettlement.crossBorder)} PLN</p>
          </div>

          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
            <p className="text-purple-600 text-xs font-bold uppercase mb-2">Noclegi</p>
            <p className="text-2xl font-black text-purple-700">{currentSettlement.nightRest.toFixed(0)} EUR</p>
            <p className="text-xs text-slate-500 mt-1">~{convertToPLN(currentSettlement.nightRest)} PLN</p>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
            <p className="text-indigo-600 text-xs font-bold uppercase mb-2">Korytarzowe</p>
            <p className="text-2xl font-black text-indigo-700">{currentSettlement.corridor.toFixed(0)} EUR</p>
            <p className="text-xs text-slate-500 mt-1">~{convertToPLN(currentSettlement.corridor)} PLN</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-slate-600 text-xs font-bold uppercase mb-2">ZUS/Ubezp.</p>
            <p className="text-2xl font-black text-slate-800">{currentSettlement.socialSecurity.toFixed(0)} EUR</p>
            <p className="text-xs text-slate-500 mt-1">~{convertToPLN(currentSettlement.socialSecurity)} PLN</p>
          </div>
        </div>
      </div>

      {/* Orders Details Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800">Szczegóły zleceń ({currentSettlement.orders.length})</h3>
          <p className="text-xs text-slate-500 mt-1">Wszystkie zlecenia wykonane w okresie rozliczeniowym</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-white text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">ID Zlecenia</th>
                <th className="px-6 py-4">Trasa</th>
                <th className="px-6 py-4 text-right">Dystans</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4 text-right">Fracht</th>
                <th className="px-6 py-4 text-right">Koszty</th>
                <th className="px-6 py-4 text-right">Zysk</th>
                <th className="px-6 py-4 text-center">Marża %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentSettlement.orders.map(order => {
                const c = order.financials.costs;
                const totalCost = c.fuel + c.adBlue + c.tolls + c.driverDiems + c.crossBorderAllowance + 
                                 c.nightRestAllowance + c.corridorPay + c.maintenance + c.driverBaseSalary + 
                                 c.socialSecurity + c.leasing + c.insurance + c.overhead;
                const profit = order.financials.freightPrice - totalCost;
                const margin = (profit / order.financials.freightPrice) * 100;

                return (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-500 text-xs">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Truck size={16} className="text-blue-500"/>
                        <div>
                          <p className="font-semibold text-slate-800 text-xs">{order.route.from}</p>
                          <p className="text-[10px] text-slate-400">→ {order.route.to}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-600">{order.route.distanceKm} km</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{order.dates.delivery}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800">{order.financials.freightPrice} EUR</td>
                    <td className="px-6 py-4 text-right text-amber-700">{totalCost.toFixed(0)} EUR</td>
                    <td className={`px-6 py-4 text-right font-bold ${profit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {profit.toFixed(0)} EUR
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        margin >= 15 ? 'bg-emerald-100 text-emerald-700' : 
                        margin >= 8 ? 'bg-amber-100 text-amber-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {margin.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-slate-300 text-xs uppercase font-bold mb-2">Średnia za zlecenie</p>
            <p className="text-2xl font-black">{(currentSettlement.totalRevenue / currentSettlement.orders.length).toFixed(0)} EUR</p>
            <p className="text-xs text-slate-400 mt-1">Przychód / {currentSettlement.orders.length} zleceń</p>
          </div>
          <div>
            <p className="text-slate-300 text-xs uppercase font-bold mb-2">Średnia km na zlecenie</p>
            <p className="text-2xl font-black">{(currentSettlement.totalKm / currentSettlement.orders.length).toFixed(0)} km</p>
            <p className="text-xs text-slate-400 mt-1">Łącznie {currentSettlement.totalKm.toLocaleString()} km</p>
          </div>
          <div>
            <p className="text-slate-300 text-xs uppercase font-bold mb-2">Wynagrodzenie za dzień</p>
            <p className="text-2xl font-black text-emerald-400">{(currentSettlement.totalDriverCompensation / currentSettlement.daysWorked).toFixed(0)} EUR</p>
            <p className="text-xs text-slate-400 mt-1">~{convertToPLN(currentSettlement.totalDriverCompensation / currentSettlement.daysWorked)} PLN/dzień</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverSettlements;
