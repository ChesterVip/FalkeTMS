import React, { useState } from 'react';
import { AlertCircle, Brain, Building2, ChartPie, CheckCircle2, Fuel, GraduationCap, Layers, MessageCircle, Route, ShieldCheck, Truck, Workflow, BookOpen, FileText, Database, Network } from 'lucide-react';

const Thesis: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'theory' | 'company' | 'system' | 'implementation'>('overview');
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

  const sections = [
    { id: 'overview', label: 'Przegląd', icon: <GraduationCap size={16} /> },
    { id: 'theory', label: 'Teoria', icon: <BookOpen size={16} /> },
    { id: 'company', label: 'Przedsiębiorstwo', icon: <Building2 size={16} /> },
    { id: 'system', label: 'System AI', icon: <Brain size={16} /> },
    { id: 'implementation', label: 'Wdrożenie', icon: <CheckCircle2 size={16} /> },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <header className="space-y-3 pb-6 border-b border-slate-200">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-500">
          <GraduationCap size={18} className="text-blue-600" />
          <span>Praca Magisterska</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Wielowymiarowa Ocena Kosztów w Przedsiębiorstwie Logistycznym<br/>
          <span className="text-blue-600">z Wykorzystaniem Systemów Informatycznych</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-slate-500 font-bold mb-1">Autor</p>
            <p className="text-slate-800 font-semibold">Mariusz Sokołowski</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-slate-500 font-bold mb-1">Kierunek studiów</p>
            <p className="text-slate-800 font-semibold">Zarządzanie Finansami i Rachunkowość</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-slate-500 font-bold mb-1">Promotor</p>
            <p className="text-slate-800 font-semibold">dr Karolina Rybicka</p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
              activeSection === section.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
            }`}
          >
            {section.icon}
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Content based on active section */}
      {activeSection === 'overview' && (
        <section className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 rounded-2xl border border-blue-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Streszczenie pracy</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Praca magisterska prezentuje koncepcję i implementację zaawansowanego systemu informatycznego 
              wspieranego sztuczną inteligencją dla przedsiębiorstwa transportowego FG Falke Sp. z o.o. 
              System integruje funkcje zarządzania transportem (TMS), rachunkowości zarządczej oraz automatyzacji 
              procesów logistycznych w celu wielowymiarowej oceny kosztów.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Głównym celem jest automatyzacja pełnego cyklu życia zlecenia transportowego – od pozyskania zamówienia 
              poprzez email, przez monitorowanie realizacji w czasie rzeczywistym, weryfikację dokumentów z wykorzystaniem 
              OCR i GPT-4, aż po automatyczne wystawianie faktur i szczegółową analizę rentowności z podziałem na 
              koszty zmienne i stałe.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-5 rounded-xl border border-blue-200">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                  <ChartPie className="mr-2 text-blue-600" size={18} />
                  Cele pracy
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Identyfikacja obszarów generowania kosztów logistycznych</li>
                  <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Projektowanie architektury systemu AI/TMS</li>
                  <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Implementacja integracji z systemami zewnętrznymi</li>
                  <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Automatyzacja kontrolingu logistycznego</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl border border-emerald-200">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                  <CheckCircle2 className="mr-2 text-emerald-600" size={18} />
                  Zakres pracy
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">•</span>Rozdział 1: Teoria kosztów logistycznych</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">•</span>Rozdział 2: Charakterystyka FG Falke</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">•</span>Rozdział 3: Projekt systemu AI</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">•</span>Podsumowanie i wnioski</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'theory' && (
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
              <BookOpen className="mr-3 text-blue-600" size={24} />
              Rozdział 1: Logistyka i Koszty Logistyczne
            </h2>
            
            <div className="space-y-6">
              <div className="pl-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-slate-800 mb-3">1.1. Istota i znaczenie logistyki</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Logistyka jako koncepcja zarządzania przepływem dóbr i informacji w przedsiębiorstwie oraz łańcuchu dostaw. 
                  Obejmuje planowanie, realizację i kontrolę przepływu materiałów i wyrobów od punktu pozyskania surowców 
                  do końcowego odbiorcy, zapewniając efektywność kosztową i czasową przy wymaganym poziomie obsługi.
                </p>
                <p className="text-sm text-slate-600 italic">
                  Źródła: Gołembska E. (red.), "Kompendium wiedzy o logistyce", PWN 2013
                </p>
              </div>

              <div className="pl-6 border-l-4 border-emerald-500">
                <h3 className="text-lg font-bold text-slate-800 mb-3">1.2. Procesy logistyczne i łańcuch dostaw</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Uporządkowany ciąg działań związanych z przepływem dóbr i informacji. Główne obszary: logistyka zaopatrzenia, 
                  produkcji, magazynowa i dystrybucji. W przedsiębiorstwach transportowych kluczowe są procesy planowania tras, 
                  monitorowania przesyłek i optymalizacji wykorzystania floty.
                </p>
              </div>

              <div className="pl-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-bold text-slate-800 mb-3">1.3. Klasyfikacja kosztów logistycznych</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <h4 className="font-bold text-amber-900 mb-2 flex items-center">
                      <Fuel size={16} className="mr-2" />
                      Koszty zmienne
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Paliwo i AdBlue</li>
                      <li>• Opłaty drogowe (myto, winiety)</li>
                      <li>• Diety kierowców</li>
                      <li>• Pakiet Mobilności (dodatki)</li>
                      <li>• Konserwacja i naprawy</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-2 flex items-center">
                      <Building2 size={16} className="mr-2" />
                      Koszty stałe
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Leasing/wynajem pojazdów</li>
                      <li>• Ubezpieczenia</li>
                      <li>• Wynagrodzenia bazowe</li>
                      <li>• Składki ZUS</li>
                      <li>• Koszty biura i administracji</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pl-6 border-l-4 border-slate-500">
                <h3 className="text-lg font-bold text-slate-800 mb-3">1.4. Rachunkowość zarządcza w logistyce</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Metoda kalkulacji kosztów według marż pokrycia (Contribution Margin). Marża Pokrycia I = Przychód - Koszty Zmienne. 
                  EBIT (Earnings Before Interest and Taxes) = Marża Pokrycia I - Koszty Stałe. Pozwala na wielowymiarową analizę 
                  rentowności według klienta, trasy, kierowcy czy pojazdu.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm font-mono">
                  <p className="text-slate-600">Przychód (Fracht)</p>
                  <p className="text-amber-600">− Koszty Zmienne</p>
                  <p className="text-emerald-600 font-bold">= Marża Pokrycia I</p>
                  <p className="text-purple-600">− Koszty Stałe</p>
                  <p className="text-slate-800 font-bold">= EBIT (Zysk Operacyjny)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'company' && (
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
              <Building2 className="mr-3 text-blue-600" size={24} />
              Rozdział 2: FG Falke Sp. z o.o.
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-2">Profil działalności</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li><strong>Forma prawna:</strong> Sp. z o.o.</li>
                    <li><strong>Rok założenia:</strong> 2021</li>
                    <li><strong>Siedziba:</strong> Włoszyn (woj. małopolskie)</li>
                    <li><strong>PKD:</strong> 49.41.Z - Transport drogowy towarów</li>
                    <li><strong>Kapitał:</strong> 12 500 zł</li>
                    <li><strong>Specjalizacja:</strong> Cross-trade DE–CH</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
                  <h3 className="font-bold text-emerald-900 mb-2">Zasoby techniczne</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li><strong>Flota:</strong> 3 pojazdy ciężarowe</li>
                    <li><strong>Wynajem:</strong> Truck Care (długoterminowy)</li>
                    <li><strong>Telematyka:</strong> DBK Fleet Management</li>
                    <li><strong>Monitoring:</strong> GPS, spalanie, tachograf</li>
                    <li><strong>Magazyny:</strong> Brak (door-to-door)</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-2">Systemy IT</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li><strong>TMS:</strong> Imago TMS (kalkulacja tras)</li>
                    <li><strong>Faktury:</strong> ING Bank + wFirma</li>
                    <li><strong>Rozliczenia:</strong> MAWEX (800 zł/m-c/os.)</li>
                    <li><strong>Księgowość:</strong> Biuro zewnętrzne</li>
                    <li><strong>Komunikacja:</strong> WhatsApp, Teams</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center text-lg">
                  <AlertCircle className="mr-2" size={20} />
                  Problem badawczy
                </h3>
                <p className="text-slate-800 leading-relaxed mb-4">
                  <strong>Brak integracji systemów prowadzi do opóźnień w analizie rentowności:</strong>
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2 font-bold">•</span>
                    Dane o przychodach (faktury w ING/wFirma), kosztach floty (DBK), wynagrodz enkach (MAWEX) i trasach (TMS) są w osobnych silosach
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2 font-bold">•</span>
                    Analiza rentowności zlecenia wymaga ręcznego łączenia danych w Excelu
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2 font-bold">•</span>
                    Informacja o opłacalności pojawia się często po zakończeniu pełnego okresu rozliczeniowego
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2 font-bold">•</span>
                    Wysokie koszty usług zewnętrznych (rozliczenia, księgowość) przy małej skali działalności
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'system' && (
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
              <Brain className="mr-3 text-blue-600" size={24} />
              Rozdział 3: Projekt Systemu AI
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">3.1. Cele systemu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {systemGoals.map((goal, idx) => (
                    <div key={idx} className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-blue-100">
                      <CheckCircle2 size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 text-white p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Network className="mr-2 text-emerald-400" size={20} />
                  3.2. Architektura systemu
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                    <h4 className="font-bold text-emerald-400 mb-2 flex items-center">
                      <Database size={16} className="mr-2" />
                      Backend (NestJS)
                    </h4>
                    <ul className="text-sm space-y-1 text-slate-200">
                      <li>• PostgreSQL (dane operacyjne)</li>
                      <li>• API REST dla frontendu</li>
                      <li>• Integracje z systemami zewn.</li>
                      <li>• Kolejki zadań AI/OCR</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                    <h4 className="font-bold text-blue-400 mb-2 flex items-center">
                      <Network size={16} className="mr-2" />
                      Frontend (Next.js)
                    </h4>
                    <ul className="text-sm space-y-1 text-slate-200">
                      <li>• React + TypeScript</li>
                      <li>• Interfejs webowy responsywny</li>
                      <li>• WebSocket (live updates)</li>
                      <li>• Recharts (wykresy)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'OpenAI GPT-4', desc: 'Ekstrakcja danych z emaili, walidacja dokumentów, podsumowania', color: 'emerald' },
                  { title: 'OCR + NLP', desc: 'Odczyt CMR, faktur, paragonów z auto-walidacją pól', color: 'blue' },
                  { title: 'Integracje API', desc: 'wFirma, DBK Telematics, Impargo TMS, WhatsApp Business', color: 'purple' }
                ].map((item, idx) => (
                  <div key={idx} className={`bg-${item.color}-50 p-5 rounded-xl border border-${item.color}-200`}>
                    <h4 className={`font-bold text-${item.color}-900 mb-2`}>{item.title}</h4>
                    <p className="text-sm text-slate-700">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'implementation' && (
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
              <Workflow className="mr-3 text-blue-600" size={24} />
              Implementacja i Scenariusze
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Scenariusz realizacji zlecenia (end-to-end)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {processFlow.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3 bg-white p-4 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="text-sm text-slate-700">{step}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800">Przykładowa analiza kosztów (mock data)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 text-left">Zlecenie</th>
                        <th className="px-4 py-3 text-left">Trasa</th>
                        <th className="px-4 py-3 text-right">Przychód</th>
                        <th className="px-4 py-3 text-right text-amber-700">K. Zmienne</th>
                        <th className="px-4 py-3 text-right text-emerald-700">Marża I</th>
                        <th className="px-4 py-3 text-right text-purple-700">K. Stałe</th>
                        <th className="px-4 py-3 text-right font-black">EBIT</th>
                        <th className="px-4 py-3 text-center">ROS %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mockRoutes.map((row) => {
                        const varCost = row.costs.fuel + row.costs.tolls + row.costs.mobility;
                        const cm1 = row.revenue - varCost;
                        const fixCost = row.costs.leasing + row.costs.insurance + row.costs.overhead;
                        const ebit = cm1 - fixCost;
                        const ros = (ebit / row.revenue) * 100;
                        
                        return (
                          <tr key={row.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-mono text-slate-600">{row.id}</td>
                            <td className="px-4 py-3 text-slate-700">{row.relation}</td>
                            <td className="px-4 py-3 text-right font-semibold">{row.revenue} EUR</td>
                            <td className="px-4 py-3 text-right text-amber-700">{varCost} EUR</td>
                            <td className="px-4 py-3 text-right font-bold text-emerald-700">{cm1} EUR</td>
                            <td className="px-4 py-3 text-right text-purple-700">{fixCost} EUR</td>
                            <td className="px-4 py-3 text-right font-black text-slate-800">{ebit.toFixed(0)} EUR</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                ros >= 15 ? 'bg-emerald-100 text-emerald-700' :
                                ros >= 8 ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {ros.toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                  <h3 className="font-bold text-emerald-900 mb-3 flex items-center">
                    <CheckCircle2 className="mr-2" size={20} />
                    Korzyści wdrożenia
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Skrócenie czasu fakturowania z dni do godzin</li>
                    <li>• Bieżąca analiza rentowności per zlecenie</li>
                    <li>• Redukcja błędów w rozliczeniach</li>
                    <li>• Oszczędność czasu pracy administracyjnej</li>
                    <li>• Lepsza kontrola kosztów i marż</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                    <Route className="mr-2" size={20} />
                    Możliwości rozwoju
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Komercjalizacja jako produkt SaaS</li>
                    <li>• Predykcyjne analizy kosztów (ML)</li>
                    <li>• Aplikacja mobilna dla kierowców</li>
                    <li>• Integracja z giełdami transportowymi</li>
                    <li>• Moduły dla większych flot</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">Cele SLA: faktura &lt;= 24h po dostawie, alert marży &lt; 10%</div>
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
            <span>Niska marża (&lt; 8%) wymaga renegocjacji lub ładunku powrotnego.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Thesis;
