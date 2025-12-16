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
  // Driver compensation breakdown (from real salary calculators)
  baseSalary: number; // Wynagrodzenie za pracę w Polsce
  diems: number;
  crossBorder: number;
  nightRest: number;
  corridor: number;
  socialSecurity: number;
  totalDriverCompensation: number; // Gross salary (brutto)
  netPayment?: number; // Net payment to driver (do wypłaty) - optional for real data
}

const DriverSettlements: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('2023-01');

  // Calculate settlements for Serhii Yarovyi (D2) - Jan-Mar 2023
  // REAL DATA from salary calculators (SerwisKadrowego.pl)
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
    
    // Total costs (all)
    const totalCosts = monthOrders.reduce((sum, o) => {
      const c = o.financials.costs;
      return sum + c.fuel + c.adBlue + c.tolls + c.driverDiems + c.crossBorderAllowance + 
             c.nightRestAllowance + c.corridorPay + c.maintenance + c.driverBaseSalary + 
             c.socialSecurity + c.leasing + c.insurance + c.overhead;
    }, 0);
    
    const totalProfit = totalRevenue - totalCosts;
    
    // REAL SALARY DATA FROM CALCULATORS (SerwisKadrowego.pl)
    let daysWorked: number;
    let totalDriverCompensation: number; // Total gross (brutto)
    let netPayment: number; // Net payment to driver (do wypłaty)
    let baseSalary: number; // Wynagrodzenie za pracę w Polsce
    let foreignSalary: number; // Wynagrodzenie za pracę za granicą
    
    if (monthKey === '2023-01') {
      // January 2023: 20 working days
      daysWorked = 20;
      baseSalary = 860; // 3700 PLN / 4.3 = ~860 EUR
      foreignSalary = 1126; // 4841.82 PLN / 4.3 = ~1126 EUR
      totalDriverCompensation = 1986; // 8541.82 PLN / 4.3 = ~1986 EUR (brutto)
      netPayment = 1547; // 6650 PLN / 4.3 = ~1547 EUR (netto)
    } else if (monthKey === '2023-02') {
      // February 2023: 23 working days
      daysWorked = 23;
      baseSalary = 860; // 3700 PLN / 4.3
      foreignSalary = 2047; // 8803.54 PLN / 4.3 = ~2047 EUR
      totalDriverCompensation = 2908; // 12503.54 PLN / 4.3 = ~2908 EUR (brutto)
      netPayment = 2279; // 9800 PLN / 4.3 = ~2279 EUR (netto)
    } else if (monthKey === '2023-03') {
      // March 2023: 25 working days
      daysWorked = 25;
      baseSalary = 860; // 3700 PLN / 4.3
      foreignSalary = 1693; // 7278.82 PLN / 4.3 = ~1693 EUR
      totalDriverCompensation = 2553; // 10978.82 PLN / 4.3 = ~2553 EUR (brutto)
      netPayment = 2035; // 8750 PLN / 4.3 = ~2035 EUR (netto)
    } else {
      daysWorked = monthOrders.length * 2;
      totalDriverCompensation = monthOrders.reduce((sum, o) => {
        const c = o.financials.costs;
        return sum + c.driverBaseSalary + c.driverDiems + c.crossBorderAllowance + 
               c.nightRestAllowance + c.corridorPay + c.socialSecurity;
      }, 0);
      baseSalary = 860;
      foreignSalary = totalDriverCompensation - baseSalary;
      netPayment = totalDriverCompensation * 0.78; // Approximate net
    }
    
    // Breakdown of compensation (approximate distribution)
    const diems = monthOrders.reduce((sum, o) => sum + o.financials.costs.driverDiems, 0);
    const crossBorder = monthOrders.reduce((sum, o) => sum + o.financials.costs.crossBorderAllowance, 0);
    const nightRest = monthOrders.reduce((sum, o) => sum + o.financials.costs.nightRestAllowance, 0);
    const corridor = monthOrders.reduce((sum, o) => sum + o.financials.costs.corridorPay, 0);
    const socialSecurity = monthOrders.reduce((sum, o) => sum + o.financials.costs.socialSecurity, 0);

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

        {/* Real salary data from calculator */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-100 text-xs uppercase font-bold mb-1">Dane rzeczywiste z kalkulatora płac</p>
              <p className="text-white text-sm">SerwisKadrowego.pl - {new Date(currentSettlement.month + '-01').toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
              <p className="text-xs font-bold">{currentSettlement.daysWorked} dni roboczych</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <p className="text-blue-100 text-xs font-bold uppercase mb-2">Wynagrodzenie brutto</p>
              <p className="text-white text-3xl font-black mb-1">{currentSettlement.totalDriverCompensation.toLocaleString()} EUR</p>
              <p className="text-blue-200 text-xs">~{convertToPLN(currentSettlement.totalDriverCompensation)} PLN</p>
              <p className="text-blue-100 text-[10px] mt-2">Praca w PL + zagranica</p>
            </div>

            <div className="bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/40 rounded-xl p-4">
              <p className="text-emerald-100 text-xs font-bold uppercase mb-2">Kwota do wypłaty (netto)</p>
              <p className="text-white text-3xl font-black mb-1">{currentSettlement.netPayment ? currentSettlement.netPayment.toLocaleString() : (currentSettlement.totalDriverCompensation * 0.78).toFixed(0)} EUR</p>
              <p className="text-emerald-200 text-xs">~{convertToPLN(currentSettlement.netPayment || currentSettlement.totalDriverCompensation * 0.78)} PLN</p>
              <p className="text-emerald-100 text-[10px] mt-2">Po odliczeniu ZUS i podatku</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <p className="text-blue-100 text-xs font-bold uppercase mb-2">Średnia dzienna (netto)</p>
              <p className="text-white text-3xl font-black mb-1">{((currentSettlement.netPayment || currentSettlement.totalDriverCompensation * 0.78) / currentSettlement.daysWorked).toFixed(0)} EUR</p>
              <p className="text-blue-200 text-xs">~{convertToPLN((currentSettlement.netPayment || currentSettlement.totalDriverCompensation * 0.78) / currentSettlement.daysWorked)} PLN/dzień</p>
              <p className="text-blue-100 text-[10px] mt-2">Wypłata / dni robocze</p>
            </div>
          </div>

          <div className="mt-4 bg-black/20 rounded-lg p-3 text-xs text-blue-100">
            <p className="font-bold mb-1">📋 Źródło danych:</p>
            <p>Kalkulator wynagrodzeń kierowców {currentSettlement.month === '2023-01' ? 'styczeń' : currentSettlement.month === '2023-02' ? 'luty' : 'marzec'} 2023 - Serhii Yarovyi.pdf</p>
            <p className="mt-1">Rozliczenie uwzględnia: pakiet mobilności, diety zagraniczne, koszty uzyskania przychodu, ulgi podatkowe</p>
          </div>
        </div>
      </div>

      {/* Orders Details Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800">Szczegóły zleceń ({currentSettlement.orders.length})</h3>
          <p className="text-xs text-slate-500 mt-1">Wszystkie zlecenia wykonane w okresie rozliczeniowym</p>
        </div>
        <div className="table-shell">
          <table className="table-base">
            <thead className="table-head">
              <tr>
                <th className="table-cell">ID Zlecenia</th>
                <th className="table-cell hidden sm:table-cell">Trasa</th>
                <th className="table-cell text-right hidden md:table-cell">Dystans</th>
                <th className="table-cell hidden lg:table-cell">Data</th>
                <th className="table-cell text-right">Fracht</th>
                <th className="table-cell text-right">Koszty</th>
                <th className="table-cell text-right">Zysk</th>
                <th className="table-cell text-center">Marża %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentSettlement.orders.map(order => {
                const c = order.financials.costs;
                const totalCost = c.fuel + c.adBlue + c.tolls + c.driverDiems + c.crossBorderAllowance + 
                                 c.nightRestAllowance + c.corridorPay + c.maintenance + c.driverBaseSalary + 
                                 c.socialSecurity + c.leasing + c.insurance + c.overhead;
                const profit = order.financials.freightPrice - totalCost;
                const margin = (profit / order.financials.freightPrice) * 100;

                return (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="table-cell font-mono text-slate-500 text-xs">{order.id}</td>
                    <td className="table-cell hidden sm:table-cell">
                      <div className="flex items-center space-x-2">
                        <Truck size={16} className="text-blue-500"/>
                        <div>
                          <p className="font-semibold text-slate-800 text-xs">{order.route.from}</p>
                          <p className="text-[10px] text-slate-400">→ {order.route.to}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-right font-mono text-slate-600 hidden md:table-cell">{order.route.distanceKm} km</td>
                    <td className="table-cell text-slate-600 text-xs hidden lg:table-cell">{order.dates.delivery}</td>
                    <td className="table-cell text-right font-bold text-slate-800">{order.financials.freightPrice} EUR</td>
                    <td className="table-cell text-right text-amber-700 bg-amber-50/10">{totalCost.toFixed(0)} EUR</td>
                    <td className={`table-cell text-right font-bold ${profit > 0 ? 'text-emerald-600' : 'text-red-600'} bg-slate-50/10`}>
                      {profit.toFixed(0)} EUR
                    </td>
                    <td className="table-cell text-center">
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
