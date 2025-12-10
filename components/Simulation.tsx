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
      <header className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-500">
          <FlaskConical size={16} className="text-blue-600" />
          <span>Rozdział 4 – symulacje i wyniki</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Metodyka badań symulacyjnych (4.1) i wyniki (4.2–4.3)
        </h1>
        <p className="text-slate-600 max-w-4xl">
          Panel prezentuje mock danych użytych w pracy magisterskiej: analiza ex-post rentowności,
          scenariusze what-if (paliwo +10%, warianty trasy) oraz test ofertowania AI vs tradycyjnie.
          Wszystko uruchomione w środowisku testowym na kopii danych – brak wpływu na operacje produkcyjne.
        </p>
      </header>

      {/* Metodyka 4.1 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase">Zbiór danych</p>
            <ClipboardCheck size={16} className="text-emerald-600" />
          </div>
          <p className="text-lg font-black text-slate-900">64 zlecenia</p>
          <p className="text-sm text-slate-600">historyczne FG Falke (ostatnie 12 miesięcy), plan vs. wykonanie kosztów.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase">Scenariusze</p>
            <BarChart3 size={16} className="text-blue-600" />
          </div>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• Ex-post marża na wykonanych zleceniach.</li>
            <li>• What-if: paliwo +10%, alternatywna trasa.</li>
            <li>• Test ofertowania AI vs manual.</li>
          </ul>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase">Kryteria oceny</p>
            <Gauge size={16} className="text-purple-600" />
          </div>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• Trafność wykrycia nierentownych tras.</li>
            <li>• Oszczędność czasu (oferta AI).</li>
            <li>• Poprawa średniej marży %.</li>
          </ul>
        </div>
      </section>

      {/* Wyniki ex-post */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Analiza ex-post rentowności (4.2a)</h2>
            <p className="text-sm text-slate-500">Porównanie założeń z rzeczywistymi marżami (mock danych).</p>
          </div>
          <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">
            Wykryto 2 przypadki ryzyka
          </span>
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

      {/* What-if paliwo +10% */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Scenariusz what-if: paliwo +10% (4.2b)</h2>
            <p className="text-sm text-slate-500">
              Symulacja wrażliwości kosztów – ile zleceń spadnie poniżej progu opłacalności 8%.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
            <Fuel size={14} />
            <span>+10% fuel shock</span>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Średnia marża (bazowa)</p>
            <p className="text-2xl font-black text-slate-900">{(averageMargin * 100).toFixed(1)}%</p>
            <p className="text-xs text-slate-500">na podstawie mock danych</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50">
            <p className="text-xs font-bold text-amber-700 uppercase mb-1">Po wzroście paliwa</p>
            <p className="text-2xl font-black text-amber-700">{(averageMarginAdjusted * 100).toFixed(1)}%</p>
            <p className="text-xs text-amber-700">spadek {(averageMarginAdjusted - averageMargin).toFixed(2)} pp</p>
          </div>
          <div className="p-4 rounded-xl border border-red-100 bg-red-50">
            <p className="text-xs font-bold text-red-700 uppercase mb-1">Zlecenia &lt; 8%</p>
            <p className="text-2xl font-black text-red-700">{impacted.length}</p>
            <p className="text-xs text-red-700">do renegocjacji / odrzucenia</p>
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

      {/* Test ofertowania 4.2c / 4.3 */}
      <section className="bg-slate-900 text-slate-100 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              <Timer size={18} className="mr-2 text-emerald-400" />
              Test ofertowania: AI vs tradycyjnie
            </h3>
            <p className="text-sm text-slate-300">
              Symulacja 10 zapytań: czas przygotowania oferty i odrzucanie zleceń o niskiej marży.
            </p>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-200 px-2 py-1 rounded-full font-bold">
            100% tryb testowy
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Śr. czas oferty (AI)</p>
            <p className="text-2xl font-black text-emerald-300">1m 40s</p>
            <p className="text-xs text-slate-400">vs manual: 12m 10s (-86%)</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Odrzucone nierentowne</p>
            <p className="text-2xl font-black text-amber-200">3 / 10</p>
            <p className="text-xs text-slate-400">AI wykryło marżę &lt; 5% i zasugerowało odmowę</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Poprawa marży</p>
            <p className="text-2xl font-black text-emerald-300">+2.4 pp</p>
            <p className="text-xs text-slate-400">średnia marża po automatycznej selekcji</p>
          </div>
        </div>
        <div className="mt-6 text-xs text-slate-400 flex items-center space-x-2">
          <CheckCircle size={14} className="text-emerald-400" />
          <span>Badanie ma charakter symulowany – pełna separacja od systemów produkcyjnych (WFirma/DBK/Impargo).</span>
        </div>
      </section>
    </div>
  );
};

export default Simulation;
