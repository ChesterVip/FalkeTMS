import React from 'react';
import { AlertCircle, Brain, Building2, ChartPie, CheckCircle2, Fuel, GraduationCap, Layers, MessageCircle, Route, ShieldCheck, Truck, Workflow } from 'lucide-react';

const Thesis: React.FC = () => {
  const costDimensions = [
    {
      title: 'Przekroje klasyfikacyjne',
      points: [
        'Fazy przepływu: zaopatrzenie, produkcja, dystrybucja, logistyka zwrotna.',
        'Funkcje logistyczne: transport, magazynowanie, zapasy, pakowanie, obsługa zamówień, infrastruktura.',
        'Miejsca powstawania: magazyn centralny/regionalny, dział transportu, obsługa klienta.',
        'Zachowanie kosztów: stałe, zmienne i mieszane (w relacji do strumieni).'
      ]
    },
    {
      title: 'Rachunkowość zarządcza',
      points: [
        'Podział na koszty zmienne (paliwo, myto, diety, eksploatacja) i stałe (leasing, ubezpieczenia, płace bazowe, biuro).',
        'Budżetowanie ośrodków odpowiedzialności (transport, administracja) i porównanie plan vs wykonanie.',
        'Analiza marży pokrycia + EBIT per zlecenie/kierowca/klient – kontroling logistyczny.'
      ]
    }
  ];

  const costAreas = [
    {
      icon: <Truck className="text-blue-600" size={20} />,
      name: 'Flota i telematyka',
      detail: '3 pojazdy w wynajmie długoterminowym (Truck Care) + DBK Fleet Management (GPS, spalanie, tachograf).',
      pain: 'Koszt stały wynajmu i utrzymania, potrzeba wiarygodnych danych o spalaniu i przebiegach.'
    },
    {
      icon: <Fuel className="text-amber-600" size={20} />,
      name: 'Paliwo i eksploatacja',
      detail: 'Zużycie paliwa z telematyki, koszty opłat drogowych (myto, winiety), AdBlue, serwis.',
      pain: 'Brak automatycznego przypięcia kosztów do zlecenia i kontroli odchyleń.'
    },
    {
      icon: <ShieldCheck className="text-emerald-600" size={20} />,
      name: 'Praca kierowców',
      detail: 'Rozliczenia MAWEX (ok. 800 zł netto/m-c/kierowcę), Pakiet Mobilności: diety, dodatki transgraniczne, ryczałty nocne.',
      pain: 'Złożone rozliczenia, potencjalne błędy, konieczność łączenia danych z tachografu i tras.'
    },
    {
      icon: <Building2 className="text-purple-600" size={20} />,
      name: 'Usługi obce i biuro',
      detail: 'Księgowość zewnętrzna (Kancelaria Księgowo‑Biznesowa), opłaty za licencje TMS/telematyki/Office.',
      pain: 'Silosy danych – koszty trafiają późno, ręczne wprowadzanie do Excela/wFirma.'
    },
    {
      icon: <MessageCircle className="text-slate-600" size={20} />,
      name: 'Komunikacja i dokumenty',
      detail: 'WhatsApp (kierowcy), Teams/e‑mail (klienci), fakturowanie z bankowości ING, skany CMR po kursie.',
      pain: 'Brak integracji API; dokumenty i dane o kosztach spływają asynchronicznie.'
    }
  ];

  const systemGoals = [
    'Automatyzacja cyklu zlecenia: e‑mail → OCR/GPT → TMS → komunikacja z kierowcą → faktura w wFirma.',
    'Wielowymiarowa ocena kosztów (trasa, pojazd, kierowca, klient) w trybie quasi real‑time.',
    'Integracja API z Impargo (plan tras), DBK/Onyx (GPS, spalanie), wFirma (faktury sprzedaż/kosztowe), WhatsApp/Teams/SMS.',
    'Bezpieczeństwo danych i zgodność z przepisami (Pakiet Mobilności, KSeF w dalszym etapie).',
  ];

  const processFlow = [
    'Zgłoszenie klienta (mail/Teams) i wstępna marża w TMS.',
    'Decyzja i przydział zasobów; komunikat na WhatsApp do kierowcy.',
    'Monitoring przejazdu (GPS, tachograf) + alerty odchyleń.',
    'Rozładunek, zdjęcie CMR, OCR + walidacja pól, status DOCS_RECEIVED.',
    'Automatyczne fakturowanie w wFirma + księgowanie kosztów (paliwo, drogi, MAWEX).',
    'Raport rentowności zlecenia i porównanie plan vs wykonanie.'
  ];

  const mockRoutes = [
    {
      id: 'ORD-2025-001',
      relation: 'Berlin → Zurich',
      driver: 'Serhii Yarovyi',
      vehicle: 'DAF XF 480 (V1)',
      revenue: 1800,
      costs: { fuel: 520, tolls: 260, mobility: 280, leasing: 82, insurance: 24, overhead: 36 },
    },
    {
      id: 'ORD-2025-002',
      relation: 'Monachium → Bern',
      driver: 'Jan Kowalski',
      vehicle: 'IVECO S‑WAY (V2)',
      revenue: 1050,
      costs: { fuel: 245, tolls: 155, mobility: 165, leasing: 42, insurance: 12, overhead: 18 },
    },
    {
      id: 'ORD-2025-003',
      relation: 'Wrocław → Drezno',
      driver: 'Tomasz Nowak',
      vehicle: 'DAF XF 480 (V1)',
      revenue: 580,
      costs: { fuel: 165, tolls: 90, mobility: 130, leasing: 40, insurance: 11, overhead: 16 },
    },
  ].map((row) => {
    const totalCost = row.costs.fuel + row.costs.tolls + row.costs.mobility + row.costs.leasing + row.costs.insurance + row.costs.overhead;
    const profit = row.revenue - totalCost;
    const margin = row.revenue > 0 ? (profit / row.revenue) * 100 : 0;
    return { ...row, totalCost, profit, margin };
  });

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto">
      <header className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-500">
          <GraduationCap size={16} className="text-blue-600" />
          <span>Założenia pracy magisterskiej</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Wielowymiarowa ocena kosztów logistycznych – FG Falke Sp. z o.o.
        </h1>
        <p className="text-slate-600 max-w-4xl leading-relaxed">
          Kierunek: Zarządzanie Finansami i Rachunkowość. Cel: zbudowanie zintegrowanego systemu (ERP/TMS/AI),
          który automatyzuje procesy transportowe, fakturowanie i controlling kosztów w mikroprzedsiębiorstwie cross‑trade (DE–CH).
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">Profil firmy</p>
          <h3 className="text-lg font-black text-slate-900">FG Falke</h3>
          <p className="text-sm text-slate-600 mt-1">
            Mikroprzedsiębiorstwo (zał. 2021, Włoszyn), specjalizacja: przewozy cross‑trade DE–CH, brak magazynów,
            zaplecze administracyjne w PL.
          </p>
          <div className="mt-3 text-xs text-slate-500">PKD 49.41.Z • kapitał 12 500 zł</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">Flota i IT</p>
          <h3 className="text-lg font-black text-slate-900">3 pojazdy • DBK</h3>
          <p className="text-sm text-slate-600 mt-1">
            Wynajem długoterminowy (Truck Care), telematyka DBK Fleet Management: GPS, spalanie, zdalny tachograf,
            eco‑driving.
          </p>
          <div className="mt-3 text-xs text-slate-500">Brak magazynu • door‑to‑door</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">Procesy i komunikacja</p>
          <h3 className="text-lg font-black text-slate-900">WhatsApp + Teams</h3>
          <p className="text-sm text-slate-600 mt-1">
            Zamówienia: e‑mail/Teams, komunikacja z kierowcami: WhatsApp (skany CMR, paragony), faktury: ING/wFirma,
            rozliczenia czasu pracy: MAWEX, księgowość: biuro zewnętrzne.
          </p>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Struktura kosztów logistycznych</p>
            <h2 className="text-xl font-black text-slate-900 mt-1">Podejście wielowymiarowe</h2>
          </div>
          <ChartPie className="text-blue-600" size={24} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {costDimensions.map((block) => (
            <div key={block.title} className="p-4 border border-slate-100 rounded-xl bg-slate-50/60">
              <h3 className="font-semibold text-slate-800 mb-2 flex items-center">
                <Layers size={16} className="mr-2 text-blue-500" />
                {block.title}
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                {block.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl border border-amber-100 bg-amber-50 text-sm text-amber-800 flex items-start space-x-3">
          <AlertCircle className="mt-0.5" size={18} />
          <span>Problem badawczy: dane o przychodach, kosztach floty, wynagrodzeniach i dokumentach są w silosach – analiza rentowności następuje z opóźnieniem i ręcznie (Excel).</span>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {costAreas.map((area) => (
          <div key={area.name} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center space-x-2">
              {area.icon}
              <h3 className="font-semibold text-slate-800">{area.name}</h3>
            </div>
            <p className="text-sm text-slate-600">{area.detail}</p>
            <p className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md inline-flex items-center space-x-1">
              <AlertCircle size={12} />
              <span>{area.pain}</span>
            </p>
          </div>
        ))}
      </section>

      <section className="bg-slate-900 text-slate-50 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Założenia projektowe systemu</p>
            <h2 className="text-xl font-black text-white mt-1">AI + integracje API</h2>
          </div>
          <Brain size={24} className="text-emerald-400" />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {systemGoals.map((goal) => (
            <li key={goal} className="flex items-start space-x-2 text-sm">
              <CheckCircle2 size={16} className="text-emerald-400 mt-0.5" />
              <span>{goal}</span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">Kanały: WhatsApp + SMS fallback + Teams</div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">OCR: CMR, faktury kosztowe, paragony za paliwo</div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">Cele SLA: faktura ≤ 24h po dostawie, alert marży < 10%</div>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Przepływ end‑to‑end (stan obecny + target)</p>
            <h2 className="text-xl font-black text-slate-900 mt-1">Od pozyskania zlecenia do raportu kosztowego</h2>
          </div>
          <Workflow className="text-blue-600" size={22} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {processFlow.map((step, idx) => (
            <div key={step} className="flex items-start space-x-3 p-4 rounded-xl border border-slate-100 bg-slate-50">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <div className="text-sm text-slate-700">{step}</div>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 flex items-center space-x-2">
          <Route size={14} />
          <span>Efekt końcowy: raport rentowności per zlecenie/klient/kierowca dostępny bez ręcznego łączenia danych.</span>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Mock danych do symulacji</p>
            <h2 className="text-xl font-black text-slate-900 mt-1">Marża pokrycia na trasach (cross‑trade)</h2>
          </div>
          <ChartPie className="text-purple-600" size={22} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-slate-100 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">Zlecenie</th>
                <th className="px-4 py-3">Trasa</th>
                <th className="px-4 py-3">Kierowca / Pojazd</th>
                <th className="px-4 py-3 text-right">Przychód</th>
                <th className="px-4 py-3 text-right">Koszt całk.</th>
                <th className="px-4 py-3 text-right">Marża</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockRoutes.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-600">{row.id}</td>
                  <td className="px-4 py-3 text-slate-800">{row.relation}</td>
                  <td className="px-4 py-3 text-slate-600">{row.driver} • {row.vehicle}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-800">{row.revenue.toFixed(0)} EUR</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.totalCost.toFixed(0)} EUR</td>
                  <td className="px-4 py-3 text-right font-bold">
                    <span className={`px-2 py-1 rounded-md text-xs font-black ${
                      row.margin >= 15 ? 'bg-emerald-50 text-emerald-700' :
                      row.margin >= 8 ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {row.margin.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center space-x-2">
            <Fuel size={14} className="text-amber-600" />
            <span>Zmiana ceny paliwa +10% obniża marżę ORD-2025-001 o ~2.9 pp.</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center space-x-2">
            <Truck size={14} className="text-blue-600" />
            <span>Leasing/ubezpieczenie alokowane proporcjonalnie do dni i przebiegu (stałe).</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center space-x-2">
            <AlertCircle size={14} className="text-amber-600" />
            <span>Niska marża (< 8%) wymaga renegocjacji lub ładunku powrotnego.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Thesis;
