import React, { useMemo } from 'react';
import { MOCK_ORDERS } from '../constants';
import { ArrowUpRight, BarChart3, CheckCircle, ClipboardCheck, FlaskConical, Fuel, Gauge, Route, Sparkles, Timer, AlertTriangle } from 'lucide-react';
import { CostBreakdown } from '../types';

type ProfitRow = {
  id: string;
  client: string;
  route: string;
  revenue: number;
  cost: number;
  margin: number;
  adjustedMargin: number;
};

const Simulation: React.FC = () => {
  const fuelShock = 0.1; // 10% wzrost cen paliwa
  const profitabilityThreshold = 0.08; // 8% próg opłacalności

  const sumCosts = (costs: CostBreakdown) =>
    costs.fuel +
    costs.adBlue +
    costs.tolls +
    costs.driverDiems +
    costs.crossBorderAllowance +
    costs.nightRestAllowance +
    costs.corridorPay +
    costs.maintenance +
    costs.driverBaseSalary +
    costs.socialSecurity +
    costs.leasing +
    costs.insurance +
    costs.overhead;

  const profitRows = useMemo<ProfitRow[]>(() => {
    return MOCK_ORDERS.map((order) => {
      const cost = sumCosts(order.financials.costs);
      const revenue = order.financials.freightPrice;
      const margin = revenue > 0 ? (revenue - cost) / revenue : 0;
      const adjustedCost = cost + order.financials.costs.fuel * fuelShock;
      const adjustedMargin = revenue > 0 ? (revenue - adjustedCost) / revenue : 0;

      return {
        id: order.id,
        client: order.clientName,
        route: `${order.route.from} → ${order.route.to}`,
        revenue,
        cost,
        margin,
        adjustedMargin,
      };
    });
  }, [fuelShock]);

  const averageMargin =
    profitRows.reduce((acc, row) => acc + row.margin, 0) / Math.max(profitRows.length, 1);
  const averageMarginAdjusted =
    profitRows.reduce((acc, row) => acc + row.adjustedMargin, 0) / Math.max(profitRows.length, 1);

  const impacted = profitRows.filter((row) => row.adjustedMargin < profitabilityThreshold);

  const marginIndex = Object.fromEntries(
    profitRows.map((row) => [row.id, { margin: row.margin, route: row.route }])
  );

  const exPostCases = [
    {
      id: 'ORD-2024-006',
      plannedMargin: 0.12,
      hypothesis: 'Stały kontrakt Lyon – zakładano dwucyfrową marżę',
      rootCause: 'Niefakturowane postoje kierowcy + przestoje na załadunku',
    },
    {
      id: 'ORD-2024-003',
      plannedMargin: 0.09,
      hypothesis: 'Krótka trasa PL-DE z szybkim obiegiem gotówki',
      rootCause: 'Wyższe opłaty drogowe i niższa stawka rynkowa w dniu realizacji',
    },
    {
      id: 'ORD-2024-002',
      plannedMargin: 0.25,
      hypothesis: 'Stabilne zlecenie DE-CH (papier)',
      rootCause: 'Założenia pokryły się z realnymi kosztami',
    },
  ].map((row) => ({
    ...row,
    actualMargin: marginIndex[row.id]?.margin ?? 0,
    route: marginIndex[row.id]?.route ?? 'brak danych',
    delta: (marginIndex[row.id]?.margin ?? 0) - row.plannedMargin,
  }));

  const routeVariants = [
    {
      name: 'Trasa A (A5 → A39 → A7)',
      fuel: 610,
      tolls: 240,
      time: '12h 40m',
      note: 'Szybsza, droższe opłaty (główne autostrady DE/FR)',
    },
    {
      name: 'Trasa B (A4 → N7)',
      fuel: 590,
      tolls: 170,
      time: '13h 10m',
      note: 'Tańsza o ~90 EUR, nieco dłuższy czas przejazdu',
    },
  ];

  const bestMargins = [...profitRows].sort((a, b) => b.margin - a.margin).slice(0, 3);
  const weakestMargins = [...profitRows].sort((a, b) => a.margin - b.margin).slice(0, 3);

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <header className="space-y-3 pb-6 border-b-2 border-slate-200">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-500">
          <FlaskConical size={16} className="text-blue-600" />
          <span>Rozdział 4 – Badania Symulacyjne i Wyniki</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Symulacyjna Ocena Rentowności i Efektywności FalkeTMS
        </h1>
        <p className="text-slate-700 max-w-4xl leading-relaxed">
          Rozdział 4 przedstawia metodykę badań symulacyjnych (4.1), analizę kosztów i rentowności rzeczywistych
          zleceń transportowych FG Falke (4.2) oraz ocenę efektywności wdrożenia systemu FalkeTMS (4.3).
          Dane pochodzą z rzeczywistych rozliczeń kierowców i raportów księgowych za I kwartał 2023.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <p className="text-xs font-bold text-blue-700 uppercase mb-1">4.1 Metodyka</p>
            <p className="text-sm text-slate-700">Analiza "what-if" na danych rzeczywistych FG Falke</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
            <p className="text-xs font-bold text-emerald-700 uppercase mb-1">4.2 Symulacje</p>
            <p className="text-sm text-slate-700">15 rzeczywistych zleceń transportowych Q1 2023</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
            <p className="text-xs font-bold text-purple-700 uppercase mb-1">4.3 Efektywność</p>
            <p className="text-sm text-slate-700">Oszczędności 8,000 PLN/mies. (96,000 PLN/rok)</p>
          </div>
        </div>
      </header>

      {/* 4.1 Metodyka badań symulacyjnych */}
      <section className="bg-white border-2 border-slate-200 rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-2 flex items-center">
            <ClipboardCheck className="mr-3 text-blue-600" size={24} />
            4.1 Metodyka badań symulacyjnych
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Przedmiotem badań jest analiza typu "what-if" przeprowadzona na rzeczywistych danych operacyjnych 
            firmy FG Falke Sp. z o.o. Dane źródłowe pochodzą z systemu FalkeTMS oraz arkuszy kalkulacyjnych 
            wynagrodzeń kierowców (styczeń–marzec 2023).
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-blue-700 uppercase">Źródła danych</p>
              <ClipboardCheck size={16} className="text-blue-600" />
            </div>
            <ul className="text-sm text-slate-700 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span><strong>FalkeTMS:</strong> 15 zleceń transportowych Q1 2023</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span><strong>Kalkulatory płac:</strong> Rozliczenia kierowcy Serhii Yarovyi</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">•</span>
                <span><strong>wFirma:</strong> Raporty księgowe przychodów i kosztów</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-emerald-700 uppercase">Scenariusze</p>
              <BarChart3 size={16} className="text-emerald-600" />
            </div>
            <ul className="text-sm text-slate-700 space-y-2">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2 font-bold">•</span>
                <span>Analiza bazowa 3 relacji (PL→CH, PL→BE, PL→DE)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2 font-bold">•</span>
                <span>Scenariusz: wydłużenie trasy o 10%</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2 font-bold">•</span>
                <span>Scenariusz: wzrost cen paliwa o 20%</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-purple-700 uppercase">Kryteria oceny</p>
              <Gauge size={16} className="text-purple-600" />
            </div>
            <ul className="text-sm text-slate-700 space-y-2">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 font-bold">•</span>
                <span>Rentowność zleceń (marża %)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 font-bold">•</span>
                <span>Wrażliwość na zmiany kosztów</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 font-bold">•</span>
                <span>Efektywność implementacji FalkeTMS</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4.2 Symulacja kalkulacji kosztów i rentowności */}
      <section className="bg-white border-2 border-slate-200 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b-2 border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-black text-slate-900 mb-2 flex items-center">
            <BarChart3 className="mr-3 text-blue-600" size={24} />
            4.2 Symulacja kalkulacji kosztów i rentowności
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Analiza przeprowadzona na trzech rzeczywistych relacjach transportowych FG Falke z uwzględnieniem 
            pełnej struktury kosztów zmiennych i stałych. Dane pochodzą z rzeczywistych rozliczeń Q1 2023.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-white p-3 rounded-lg border border-blue-200">
              <p className="font-bold text-blue-900">Polska → Szwajcaria</p>
              <p className="text-slate-600">~2200 km • 10,000 PLN • marża ~21%</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-emerald-200">
              <p className="font-bold text-emerald-900">Polska → Belgia</p>
              <p className="text-slate-600">~1500 km • 7,000 PLN • marża ~15.7%</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <p className="font-bold text-amber-900">Polska → Niemcy</p>
              <p className="text-slate-600">~800 km • 3,500 PLN • marża ~5-6%</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Zlecenie</th>
                <th className="px-6 py-3">Trasa</th>
                <th className="px-6 py-3 text-right">Planowana marża</th>
                <th className="px-6 py-3 text-right">Rzeczywista marża</th>
                <th className="px-6 py-3 text-right">Odchylenie</th>
                <th className="px-6 py-3">Komentarz AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {exPostCases.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-mono text-slate-600">{row.id}</td>
                  <td className="px-6 py-3 text-slate-700">{row.route}</td>
                  <td className="px-6 py-3 text-right text-slate-500">{(row.plannedMargin * 100).toFixed(1)}%</td>
                  <td className="px-6 py-3 text-right font-bold text-slate-800">
                    {(row.actualMargin * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        row.delta < -0.05
                          ? 'bg-red-100 text-red-700'
                          : row.delta < 0
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {(row.delta * 100).toFixed(1)} pp
                    </span>
                  </td>
                  <td className="px-6 py-3 text-slate-700">{row.rootCause}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Scenariusze What-If */}
      <section className="bg-white border-2 border-slate-200 rounded-2xl shadow-lg">
        <div className="px-6 py-5 border-b-2 border-slate-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-2 flex items-center">
              <AlertTriangle className="mr-3 text-amber-600" size={24} />
              Scenariusze "What-If" (Analiza Wrażliwości)
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Symulacja wpływu zmian parametrów operacyjnych na rentowność zleceń transportowych.
              Analiza obejmuje dwa kluczowe scenariusze identyfikowane w pracy magisterskiej (Rozdział 4.2).
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
            <Fuel size={14} />
            <span>+10% fuel shock</span>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Scenariusz 1: Wydłużenie trasy o 10% */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center">
              <Route size={18} className="mr-2" />
              Scenariusz 1: Wydłużenie trasy o 10%
            </h3>
            <p className="text-sm text-slate-700 mb-4">
              <strong>Relacja:</strong> Polska → Belgia (bazowo ~1500 km, po wydłużeniu ~1650 km)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <p className="text-xs font-bold text-blue-700 uppercase mb-1">Marża bazowa</p>
                <p className="text-3xl font-black text-slate-900">15.7%</p>
                <p className="text-xs text-slate-600">Przychód: 7,000 PLN</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-xs font-bold text-amber-700 uppercase mb-1">Marża po +10% km</p>
                <p className="text-3xl font-black text-amber-700">~7%</p>
                <p className="text-xs text-amber-700">Spadek: -8.7 pp</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-xs font-bold text-red-700 uppercase mb-1">Wpływ</p>
                <p className="text-base font-bold text-red-700 leading-tight">Drastyczny spadek rentowności</p>
                <p className="text-xs text-red-700">Zlecenie wymaga renegocjacji</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200 text-sm text-slate-700">
              <strong>Wniosek:</strong> Wydłużenie trasy o 10% (150 km) powoduje niemal dwukrotny spadek marży. 
              Zwiększone koszty paliwa, myta i czasu pracy kierowcy znacząco obniżają opłacalność.
            </div>
          </div>
          
          {/* Scenariusz 2: Wzrost cen paliwa o 20% */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
              <Fuel size={18} className="mr-2" />
              Scenariusz 2: Wzrost cen paliwa o 20%
            </h3>
            <p className="text-sm text-slate-700 mb-4">
              Symulacja wpływu znacznego wzrostu kosztów paliwa na rentowność zleceń (paliwo stanowi ~40% kosztów całkowitych).
            </p>
            
            <div className="space-y-4">
              {/* Polska → Szwajcaria */}
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-800">Polska → Szwajcaria (~2200 km)</h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">Relacja 1</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-slate-500 uppercase mb-1">Bazowa</p>
                    <p className="text-2xl font-black text-emerald-600">21%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase mb-1">Po +20% paliwa</p>
                    <p className="text-2xl font-black text-amber-600">~12%</p>
                  </div>
                  <div>
                    <p className="text-xs text-red-700 uppercase mb-1">Spadek</p>
                    <p className="text-2xl font-black text-red-600">-9 pp</p>
                  </div>
                </div>
              </div>
              
              {/* Polska → Belgia */}
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-800">Polska → Belgia (~1500 km)</h4>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">Relacja 2</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-slate-500 uppercase mb-1">Bazowa</p>
                    <p className="text-2xl font-black text-emerald-600">15.7%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase mb-1">Po +20% paliwa</p>
                    <p className="text-2xl font-black text-amber-600">~9%</p>
                  </div>
                  <div>
                    <p className="text-xs text-red-700 uppercase mb-1">Spadek</p>
                    <p className="text-2xl font-black text-red-600">-6.7 pp</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200 text-sm text-slate-700">
              <strong>Wniosek:</strong> Wzrost cen paliwa o 20% prowadzi do spadku marży o 6.7–9 punktów procentowych. 
              Paliwo stanowiące ~40% kosztów całkowitych ma kluczowy wpływ na rentowność. 
              Konieczne jest monitorowanie cen i ewentualne przeindeksowanie stawek frachtowych.
            </div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2">Zlecenie</th>
                  <th className="px-4 py-2">Trasa</th>
                  <th className="px-4 py-2 text-right">Marża bazowa</th>
                  <th className="px-4 py-2 text-right">Marża po +10% paliwa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {impacted.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2 font-mono text-slate-600">{row.id}</td>
                    <td className="px-4 py-2 text-slate-700">{row.route}</td>
                    <td className="px-4 py-2 text-right text-slate-500">{(row.margin * 100).toFixed(1)}%</td>
                    <td className="px-4 py-2 text-right font-bold text-red-700">
                      {(row.adjustedMargin * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-slate-500 flex items-center space-x-2">
            <AlertTriangle size={14} className="text-amber-500" />
            <span>Wnioski: natychmiastowe alerty + propozycja alternatywnej trasy/ładunku powrotnego.</span>
          </div>
        </div>
      </section>

      {/* Ranking tras i wariant trasy */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center">
              <Route size={18} className="mr-2 text-blue-600" />
              Ranking rentowności tras (mock)
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-bold">
              Ex-post na podstawie danych z tabeli
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="text-xs font-bold text-emerald-700 uppercase mb-2">Najwyższa marża</p>
              {bestMargins.map((row) => (
                <div key={row.id} className="flex justify-between text-sm text-slate-800 mb-2 last:mb-0">
                  <span className="font-mono text-slate-500">{row.id}</span>
                  <span className="font-bold text-emerald-700">{(row.margin * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="text-xs font-bold text-red-700 uppercase mb-2">Najsłabsza marża</p>
              {weakestMargins.map((row) => (
                <div key={row.id} className="flex justify-between text-sm text-slate-800 mb-2 last:mb-0">
                  <span className="font-mono text-slate-500">{row.id}</span>
                  <span className="font-bold text-red-700">{(row.margin * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center">
            <Sparkles size={18} className="mr-2 text-purple-600" />
            Porównanie wariantów trasy (4.2b)
          </h3>
          {routeVariants.map((variant, idx) => (
            <div key={variant.name} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-slate-800">{variant.name}</p>
                <span className="text-[10px] font-bold bg-slate-800 text-white px-2 py-1 rounded">
                  {idx === 0 ? 'A' : 'B'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{variant.note}</p>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Fuel: {variant.fuel} EUR</span>
                <span>Myto: {variant.tolls} EUR</span>
                <span>{variant.time}</span>
              </div>
            </div>
          ))}
          <div className="text-xs text-slate-600 bg-blue-50 border border-blue-100 rounded-lg p-3">
            <ArrowUpRight size={12} className="inline mr-1 text-blue-600" />
            System wskazuje optymalny wariant (koszt/km + czas) i pokazuje różnicę kosztową ~90 EUR.
          </div>
        </div>
      </section>

      {/* 4.3 Ocena efektywności wdrożenia FalkeTMS */}
      <section className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white rounded-2xl p-6 md:p-8 border-2 border-emerald-800 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-black flex items-center mb-3">
            <CheckCircle size={28} className="mr-3 text-emerald-300" />
            4.3 Ocena Efektywności Wdrożenia FalkeTMS
          </h2>
          <p className="text-emerald-100 leading-relaxed">
            Analiza korzyści z implementacji systemu FalkeTMS w przedsiębiorstwie FG Falke Sp. z o.o. 
            Oszacowanie oszczędności finansowych i operacyjnych na podstawie rzeczywistych danych z Q1 2023.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-emerald-200 mb-2">Czas fakturowania</p>
            <p className="text-3xl font-black text-white mb-1">-60-70%</p>
            <p className="text-xs text-emerald-200">Redukcja czasu przetwarzania faktur</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-emerald-200 mb-2">Uniknięte zatrudnienie</p>
            <p className="text-3xl font-black text-white mb-1">~6,000 PLN</p>
            <p className="text-xs text-emerald-200">Miesięcznie / 1 etat administracyjny</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-emerald-200 mb-2">Outsourcing</p>
            <p className="text-3xl font-black text-white mb-1">~1,500 PLN</p>
            <p className="text-xs text-emerald-200">Miesięcznie / redukcja kosztów zewn.</p>
          </div>
          <div className="bg-emerald-500/30 backdrop-blur-sm border-2 border-emerald-300 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-emerald-100 mb-2 font-bold">Całkowite oszczędności</p>
            <p className="text-3xl font-black text-white mb-1">8,000 PLN</p>
            <p className="text-xs text-emerald-100 font-bold">Miesięcznie • 96,000 PLN rocznie</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 border border-white/20 rounded-xl p-5">
            <h3 className="font-bold text-emerald-300 mb-3 flex items-center">
              <Timer size={18} className="mr-2" />
              Przyspieszenie procesów
            </h3>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2 font-bold">•</span>
                <span><strong>Przetwarzanie faktur:</strong> redukcja czasu o 60-70%</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2 font-bold">•</span>
                <span><strong>Obsługa dokumentów:</strong> automatyzacja OCR i e-archiwizacja</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2 font-bold">•</span>
                <span><strong>Analiza rentowności:</strong> z dni do minut</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/5 border border-white/20 rounded-xl p-5">
            <h3 className="font-bold text-emerald-300 mb-3 flex items-center">
              <CheckCircle size={18} className="mr-2" />
              Korzyści jakościowe
            </h3>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2 font-bold">•</span>
                <span><strong>Redukcja błędów:</strong> automatyczna walidacja danych</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2 font-bold">•</span>
                <span><strong>Bieżąca analiza:</strong> real-time kontrola marży per zlecenie</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2 font-bold">•</span>
                <span><strong>Lepsze decyzje:</strong> szybki dostęp do danych o rentowności</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-sm text-emerald-100">
          <strong className="text-emerald-200">Podsumowanie:</strong> Implementacja systemu FalkeTMS przynosi wymierne korzyści 
          finansowe (min. 96,000 PLN rocznie) oraz operacyjne (przyspieszenie procesów, redukcja błędów, lepsza kontrola kosztów). 
          System pozwala na wielowymiarową ocenę kosztów w czasie rzeczywistym, co jest kluczowe dla małego przedsiębiorstwa 
          transportowego operującego na rynku międzynarodowym.
        </div>
      </section>
    </div>
  );
};

export default Simulation;
