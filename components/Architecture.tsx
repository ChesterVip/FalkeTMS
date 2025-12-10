import React, { useState } from 'react';
import { Brain, Database, Network, Server, Shield, Smartphone, Workflow, Zap, Mail, MessageSquare, FileText, TrendingUp, MapPin, GraduationCap, BookOpen, Building2, CheckCircle2, Layers, ChartPie, AlertCircle, Fuel, Route as RouteIcon, Truck, ShieldCheck } from 'lucide-react';

const Architecture: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'architecture' | 'overview' | 'theory' | 'company' | 'system' | 'implementation'>('architecture');
  
  const layers = [
    {
      id: 'frontend',
      title: 'Warstwa Prezentacji (Frontend)',
      icon: <Network size={20} />,
      tech: 'React + TypeScript + Vite + Recharts',
      items: [
        'Dashboard z KPI i alertami real-time',
        'Interaktywna mapa floty z trasami GPS',
        'Zarządzanie zleceniami z czatem kierowców',
        'Poczta z automatycznym przetwarzaniem AI',
        'Raporty finansowe i analiza marż pokrycia',
        'Symulator what-if dla kosztów'
      ],
      accent: 'from-blue-500/10 to-blue-500/0',
      color: 'blue',
      connections: ['backend']
    },
    {
      id: 'backend',
      title: 'Warstwa Logiki Biznesowej (Backend)',
      icon: <Server size={20} />,
      tech: 'NestJS + Node.js + TypeScript',
      items: [
        'REST API dla komunikacji z frontendem',
        'WebSocket dla powiadomień real-time',
        'Kolejki zadań dla AI/OCR (Bull/Redis)',
        'Menadżer integracji z systemami zewn.',
        'Kontroler przepływu procesów logistycznych',
        'Walidacja i transformacja danych'
      ],
      accent: 'from-violet-500/10 to-violet-500/0',
      color: 'violet',
      connections: ['database', 'integrations', 'ai']
    },
    {
      id: 'database',
      title: 'Warstwa Danych (PostgreSQL)',
      icon: <Database size={20} />,
      tech: 'PostgreSQL + TypeORM',
      items: [
        'Zlecenia transportowe + historia statusów',
        'Koszty zmienne i stałe per zlecenie',
        'Dokumenty CMR/faktury (metadata + linki)',
        'Kontrahenci, kierowcy, pojazdy, trasy',
        'Dane telematyczne (GPS, spalanie)',
        'Logi integracji i audyt zmian'
      ],
      accent: 'from-sky-500/10 to-sky-500/0',
      color: 'sky',
      connections: []
    },
    {
      id: 'ai',
      title: 'Usługi AI i ML',
      icon: <Brain size={20} />,
      tech: 'OpenAI GPT-4 + OCR engines',
      items: [
        'GPT-4: ekstrakcja zleceń z emaili',
        'GPT-4: walidacja dokumentów CMR',
        'OCR: odczyt tekstu z PDF/zdjęć',
        'NLP: analiza i interpretacja treści',
        'Predykcja rentowności zleceń',
        'Rekomendacje optymalizacji tras/kosztów'
      ],
      accent: 'from-emerald-500/10 to-emerald-500/0',
      color: 'emerald',
      connections: []
    },
    {
      id: 'integrations',
      title: 'Integracje Zewnętrzne',
      icon: <Zap size={20} />,
      tech: 'REST API + Webhooks',
      items: [
        'wFirma: faktury sprzedażowe i kosztowe',
        'DBK Telematics: GPS, spalanie, tachograf',
        'Impargo TMS: optymalizacja tras, opłaty',
        'WhatsApp Business API: komunikacja',
        'Email (SMTP/IMAP): poczta zleceniowa',
        'SMSAPI: powiadomienia fallback'
      ],
      accent: 'from-amber-500/10 to-amber-500/0',
      color: 'amber',
      connections: []
    },
  ];

  const flows = [
    { title: 'Nowe zlecenie z e-maila', steps: ['IMAP → GPT ekstrakcja', 'Walidacja danych', 'Utworzenie ORD-*', 'Sugestia kierowcy/pojazdu', 'Powiadomienie WhatsApp/Teams'] },
    { title: 'Dostawa i dokumenty', steps: ['GPS: wejście w geofence', 'Bot WA prosi o CMR', 'OCR + walidacja pól', 'Status DOCS_RECEIVED/COMPLETED', 'Faktura do wFirma'] },
    { title: 'Kontrola marży', steps: ['Impargo + DBK: koszty zmienne', 'Stałe: leasing, ubezp., biuro', 'Alarm niskiej marży', 'Propozycja renegocjacji / ładunek powrotny'] },
  ];

  const dataFlows = [
    { from: 'Klient', to: 'Email/Teams', description: 'Zamówienie transportu', icon: <Mail size={14} /> },
    { from: 'Email', to: 'GPT-4', description: 'Ekstrakcja danych zlecenia', icon: <Brain size={14} /> },
    { from: 'Backend', to: 'Frontend', description: 'Nowe zlecenie + sugestie', icon: <Zap size={14} /> },
    { from: 'Frontend', to: 'WhatsApp', description: 'Powiadomienie kierowcy', icon: <MessageSquare size={14} /> },
    { from: 'DBK GPS', to: 'Backend', description: 'Lokalizacja, spalanie live', icon: <MapPin size={14} /> },
    { from: 'Kierowca', to: 'WhatsApp', description: 'Zdjęcie CMR po dostawie', icon: <FileText size={14} /> },
    { from: 'OCR+AI', to: 'Backend', description: 'Walidacja dokumentu', icon: <Brain size={14} /> },
    { from: 'Backend', to: 'wFirma', description: 'Automatyczna faktura', icon: <TrendingUp size={14} /> }
  ];

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
      icon: <MessageSquare className="text-slate-600" size={20} />,
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

  const tabs = [
    { id: 'architecture', label: 'Architektura Techniczna', icon: <Network size={16} /> },
    { id: 'overview', label: 'Przegląd Pracy', icon: <GraduationCap size={16} /> },
    { id: 'theory', label: 'Teoria', icon: <BookOpen size={16} /> },
    { id: 'company', label: 'Przedsiębiorstwo', icon: <Building2 size={16} /> },
    { id: 'system', label: 'System AI', icon: <Brain size={16} /> },
    { id: 'implementation', label: 'Wdrożenie', icon: <CheckCircle2 size={16} /> },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <header className="pb-6 border-b-2 border-slate-200">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          <GraduationCap size={18} className="text-blue-600" />
          <span>Praca Magisterska & Architektura Systemu</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-2">
          Wielowymiarowa Ocena Kosztów w Przedsiębiorstwie Logistycznym
        </h1>
        <p className="text-lg md:text-xl text-blue-600 font-bold mb-6">
          z Wykorzystaniem Systemów Informatycznych
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
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

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* ARCHITECTURE TAB */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {layers.map(layer => (
              <div 
                key={layer.id} 
                className={`bg-white border-2 rounded-2xl shadow-lg overflow-hidden relative cursor-pointer transition-all transform hover:scale-[1.02] ${
                  selectedLayer === layer.id ? `border-${layer.color}-500` : 'border-slate-200'
                }`}
                onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${layer.accent} opacity-50`} />
                <div className="relative p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 bg-${layer.color}-600 text-white rounded-xl shadow-lg`}>
                      {layer.icon}
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-${layer.color}-100 text-${layer.color}-700 border border-${layer.color}-200`}>
                      {layer.id.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-1">{layer.title}</h3>
                    <p className="text-xs text-slate-500 font-mono">{layer.tech}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {layer.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className={`mt-1 w-2 h-2 rounded-full bg-${layer.color}-500 flex-shrink-0`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {selectedLayer === layer.id && layer.connections.length > 0 && (
                    <div className={`mt-4 pt-4 border-t border-${layer.color}-100`}>
                      <p className="text-xs font-bold text-slate-600 uppercase mb-2">Połączenia:</p>
                      <div className="flex flex-wrap gap-2">
                        {layer.connections.map(conn => (
                          <span key={conn} className="text-xs px-2 py-1 bg-slate-100 rounded-md text-slate-700 font-semibold">
                            → {conn}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 border-2 border-slate-200 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg">
                <Workflow size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">Przepływ Danych w Systemie</h2>
                <p className="text-sm text-slate-500">End-to-end: od zamówienia do faktury</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {dataFlows.map((flow, idx) => (
                <div key={idx} className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                      {flow.icon}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">{flow.from} → {flow.to}</p>
                  <p className="text-sm text-slate-700 font-medium">{flow.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 text-slate-100 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Workflow size={18} />
              <h2 className="text-xl font-bold">Kluczowe przepływy end-to-end</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {flows.map(flow => (
                <div key={flow.title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-3">{flow.title}</h3>
                  <ol className="space-y-2 text-sm text-slate-200 list-decimal list-inside">
                    {flow.steps.map(step => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Bezpieczeństwo</h3>
              <div className="flex items-start space-x-3">
                <Shield className="text-emerald-600 mt-1" size={18} />
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>Szyfrowanie danych w tranzycie i w spoczynku.</li>
                  <li>Segmentacja dostępów (dispatcher, księgowość, management).</li>
                  <li>Maskowanie danych wrażliwych w logach AI.</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Mobilność</h3>
              <div className="flex items-start space-x-3">
                <Smartphone className="text-blue-600 mt-1" size={18} />
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>WhatsApp jako kanał bazowy, fallback SMS.</li>
                  <li>Plan pod aplikację natywną (offline sync, skanowanie dokumentów).</li>
                  <li>Push do kierowców i klientów (ETA, statusy).</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Skalowalność</h3>
              <div className="flex items-start space-x-3">
                <Network className="text-purple-600 mt-1" size={18} />
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>Oddzielne moduły integracyjne (wFirma, Impargo, DBK).</li>
                  <li>Możliwość multi-tenant (oddzielne przestrzenie klientów).</li>
                  <li>Kolejki/webhooki dla zadań OCR i GPT.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <section className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-8 rounded-2xl border-2 border-blue-200 shadow-lg">
            <div className="mb-6">
              <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm mb-3">
                Streszczenie Pracy Magisterskiej
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                Wielowymiarowa Ocena Kosztów w Przedsiębiorstwie Logistycznym
                <br />
                <span className="text-2xl text-blue-700">z Wykorzystaniem Systemów Informatycznych</span>
              </h2>
            </div>
            
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong className="text-slate-900">Przedmiot pracy:</strong> Niniejsza praca magisterska prezentuje kompleksową 
                koncepcję projektowania, implementacji i wdrożenia zaawansowanego systemu informatycznego wspomaganego 
                sztuczną inteligencją dla przedsiębiorstwa transportowego FG Falke Sp. z o.o. System łączy funkcje 
                zarządzania transportem (TMS), rachunkowości zarządczej oraz automatyzacji procesów logistycznych 
                w celu umożliwienia wielowymiarowej oceny kosztów operacyjnych.
              </p>
              
              <p>
                <strong className="text-slate-900">Problem badawczy:</strong> FG Falke, mikroprzedsiębiorstwo działające w branży 
                międzynarodowego transportu drogowego (cross-trade: relacje Niemcy–Szwajcaria), boryka się z problemem 
                fragmentacji systemów IT. Dane o przychodach (wFirma), kosztach floty (DBK Telematics), wynagrodzeniach 
                kierowców (usługi MAWEX) oraz planowaniu tras (Impargo TMS) przechowywane są w odrębnych silosach. 
                Prowadzi to do opóźnień w analizie rentowności zleceń, konieczności ręcznego łączenia danych 
                oraz wysokich kosztów usług zewnętrznych.
              </p>
              
              <p>
                <strong className="text-slate-900">Cel pracy:</strong> Głównym celem jest zaprojektowanie i implementacja 
                zintegrowanego systemu FalkeTMS, który automatyzuje pełny cykl życia zlecenia transportowego:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Pozyskanie zlecenia z e-maila z wykorzystaniem GPT-4 (ekstrakcja strukturalna danych)</li>
                <li>Monitorowanie realizacji w czasie rzeczywistym (integracja z GPS/telematyką DBK)</li>
                <li>Weryfikacja dokumentów przewozowych (OCR + AI dla CMR, faktur kosztowych, paragonów)</li>
                <li>Automatyczne wystawianie faktur sprzedażowych (integracja z wFirma API)</li>
                <li>Szczegółowa analiza rentowności per zlecenie z podziałem na koszty zmienne i stałe</li>
                <li>Symulacje "what-if" dla scenariuszy zmian kosztów (np. wzrost cen paliwa, wydłużenie trasy)</li>
              </ul>
              
              <p>
                <strong className="text-slate-900">Metodyka:</strong> Praca opiera się na badaniach literaturowych dotyczących 
                logistyki i kosztów logistycznych (Rozdział 1), analizie środowiska biznesowego FG Falke (Rozdział 2), 
                projektowaniu architektury systemu AI/TMS (Rozdział 3) oraz symulacjach na rzeczywistych danych 
                operacyjnych z I kwartału 2023 (Rozdział 4).
              </p>
              
              <p>
                <strong className="text-slate-900">Wyniki:</strong> Implementacja systemu FalkeTMS przyniosła wymierne korzyści:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Finansowe:</strong> Oszczędności min. 8,000 PLN miesięcznie (~96,000 PLN rocznie)</li>
                <li><strong>Operacyjne:</strong> Redukcja czasu fakturowania o 60-70%, uniknięcie zatrudnienia 1 etatu administracyjnego</li>
                <li><strong>Analityczne:</strong> Wielowymiarowa analiza kosztów w czasie rzeczywistym (per zlecenie/kierowca/klient/trasa)</li>
                <li><strong>Jakościowe:</strong> Automatyczna walidacja dokumentów, redukcja błędów, szybsza analiza rentowności</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border-2 border-blue-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center text-lg">
                  <ChartPie className="mr-2 text-blue-600" size={20} />
                  Cele pracy
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start"><span className="text-blue-600 mr-2 font-bold">•</span>Identyfikacja obszarów generowania kosztów logistycznych w FG Falke</li>
                  <li className="flex items-start"><span className="text-blue-600 mr-2 font-bold">•</span>Projektowanie architektury systemu AI/TMS zintegrowanego z istniejącymi narzędziami</li>
                  <li className="flex items-start"><span className="text-blue-600 mr-2 font-bold">•</span>Implementacja integracji API (wFirma, DBK, Impargo, WhatsApp, OCR)</li>
                  <li className="flex items-start"><span className="text-blue-600 mr-2 font-bold">•</span>Automatyzacja kontrolingu logistycznego i rachunkowości zarządczej</li>
                  <li className="flex items-start"><span className="text-blue-600 mr-2 font-bold">•</span>Ocena efektywności wdrożenia na podstawie symulacji</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl border-2 border-emerald-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center text-lg">
                  <BookOpen className="mr-2 text-emerald-600" size={20} />
                  Struktura pracy
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start"><span className="text-emerald-600 mr-2 font-bold">1.</span><strong>Rozdział 1:</strong> Logistyka i koszty logistyczne (teoria)</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2 font-bold">2.</span><strong>Rozdział 2:</strong> FG Falke Sp. z o.o. (charakterystyka firmy)</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2 font-bold">3.</span><strong>Rozdział 3:</strong> Projekt systemu AI (architektura FalkeTMS)</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2 font-bold">4.</span><strong>Rozdział 4:</strong> Badania symulacyjne i wyniki</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2 font-bold">✓</span><strong>Podsumowanie</strong> i wnioski końcowe</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl border-2 border-purple-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center text-lg">
                  <CheckCircle2 className="mr-2 text-purple-600" size={20} />
                  Kluczowe wyniki
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start"><span className="text-purple-600 mr-2 font-bold">✓</span>Redukcja czasu fakturowania o 60-70%</li>
                  <li className="flex items-start"><span className="text-purple-600 mr-2 font-bold">✓</span>Oszczędności 96,000 PLN rocznie</li>
                  <li className="flex items-start"><span className="text-purple-600 mr-2 font-bold">✓</span>Analiza rentowności w czasie rzeczywistym</li>
                  <li className="flex items-start"><span className="text-purple-600 mr-2 font-bold">✓</span>Automatyczna walidacja dokumentów (OCR+AI)</li>
                  <li className="flex items-start"><span className="text-purple-600 mr-2 font-bold">✓</span>Symulacje "what-if" dla optymalizacji tras i kosztów</li>
                </ul>
              </div>
            </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Bibliografia główna</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Gołembska E. (red.):</strong> "Kompendium wiedzy o logistyce", PWN 2013</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Dokumentacja operacyjna FG Falke Sp. z o.o.:</strong> Dane z systemów wFirma, DBK Telematics, kalkulatory płacowe (Q1 2023)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Repozytorium kodu źródłowego:</strong> <a href="https://github.com/ChesterVip/FalkeTMS" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/ChesterVip/FalkeTMS</a></span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Wdrożenie produkcyjne:</strong> <a href="https://falke-tms.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">falke-tms.vercel.app</a></span>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* THEORY TAB */}
      {activeTab === 'theory' && (
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

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
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
          </div>
        </section>
      )}

      {/* COMPANY TAB */}
      {activeTab === 'company' && (
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
                    Dane o przychodach (faktury w ING/wFirma), kosztach floty (DBK), wynagrodzeniach (MAWEX) i trasach (TMS) są w osobnych silosach
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
        </section>
      )}

      {/* SYSTEM TAB */}
      {activeTab === 'system' && (
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
        </section>
      )}

      {/* IMPLEMENTATION TAB */}
      {activeTab === 'implementation' && (
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
                    <RouteIcon className="mr-2" size={20} />
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
              <RouteIcon size={14} />
              <span>Efekt końcowy: raport rentowności per zlecenie/klient/kierowca dostępny bez ręcznego łączenia danych.</span>
            </div>
          </section>
        </section>
      )}
    </div>
  );
};

export default Architecture;
