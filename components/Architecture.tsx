import React, { useState } from 'react';
import { Brain, Database, Network, Server, Shield, Smartphone, Workflow, Zap, Mail, MessageSquare, FileText, TrendingUp, MapPin } from 'lucide-react';

const Architecture: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  
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
    {
      from: 'Klient',
      to: 'Email/Teams',
      description: 'Zamówienie transportu',
      icon: <Mail size={14} />
    },
    {
      from: 'Email',
      to: 'GPT-4',
      description: 'Ekstrakcja danych zlecenia',
      icon: <Brain size={14} />
    },
    {
      from: 'Backend',
      to: 'Frontend',
      description: 'Nowe zlecenie + sugestie',
      icon: <Zap size={14} />
    },
    {
      from: 'Frontend',
      to: 'WhatsApp',
      description: 'Powiadomienie kierowcy',
      icon: <MessageSquare size={14} />
    },
    {
      from: 'DBK GPS',
      to: 'Backend',
      description: 'Lokalizacja, spalanie live',
      icon: <MapPin size={14} />
    },
    {
      from: 'Kierowca',
      to: 'WhatsApp',
      description: 'Zdjęcie CMR po dostawie',
      icon: <FileText size={14} />
    },
    {
      from: 'OCR+AI',
      to: 'Backend',
      description: 'Walidacja dokumentu',
      icon: <Brain size={14} />
    },
    {
      from: 'Backend',
      to: 'wFirma',
      description: 'Automatyczna faktura',
      icon: <TrendingUp size={14} />
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <header>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Architektura techniczna</p>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          System AI/TMS dla FG Falke <span className="text-blue-600">Sp. z o.o.</span>
        </h1>
        <p className="text-slate-600 mt-3 leading-relaxed max-w-4xl">
          Wielowarstwowa architektura integrująca frontend (React), backend (NestJS), bazę danych (PostgreSQL), 
          systemy zewnętrzne (wFirma, DBK, Impargo) oraz sztuczną inteligencję (GPT-4, OCR) 
          dla automatyzacji pełnego cyklu życia zlecenia transportowego.
        </p>
      </header>

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
  );
};

export default Architecture;

