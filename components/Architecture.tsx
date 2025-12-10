import React from 'react';
import { Brain, Database, Network, Server, Shield, Smartphone, Workflow } from 'lucide-react';

const Architecture: React.FC = () => {
  const layers = [
    {
      title: 'Warstwa Danych (PostgreSQL)',
      icon: <Database size={18} />,
      items: ['Zlecenia + historia statusów', 'Koszty zmienne i stałe', 'Dokumenty (linki do skanów)', 'Kontrahenci, pojazdy, kierowcy'],
      accent: 'from-sky-500/10 to-sky-500/0',
    },
    {
      title: 'Backend (NestJS + Integracje)',
      icon: <Server size={18} />,
      items: ['WFirma (faktury sprzedaż/kosztowe)', 'DBK Telematics (GPS, spalanie)', 'Impargo (trasy, opłaty drogowe)', 'Webhooki WhatsApp + Email/IMAP'],
      accent: 'from-violet-500/10 to-violet-500/0',
    },
    {
      title: 'Usługi AI',
      icon: <Brain size={18} />,
      items: ['GPT-4: ekstrakcja zleceń z emaili, podsumowania', 'OCR+NLP: CMR, paragony, faktury kosztowe', 'Rekomendacje: marża, dobór kierowcy/pojazdu', 'Alerty: brak podpisu, niska marża, opóźnienie GPS'],
      accent: 'from-emerald-500/10 to-emerald-500/0',
    },
    {
      title: 'Frontend (React/Vite)',
      icon: <Network size={18} />,
      items: ['Dashboard KPI + mapa floty', 'Zlecenia z podglądem dokumentów i czatem', 'Poczta + status przetwarzania AI/OCR', 'Raporty finansowe i symulacje kosztów'],
      accent: 'from-amber-500/10 to-amber-500/0',
    },
  ];

  const flows = [
    { title: 'Nowe zlecenie z e-maila', steps: ['IMAP → GPT ekstrakcja', 'Walidacja danych', 'Utworzenie ORD-*', 'Sugestia kierowcy/pojazdu', 'Powiadomienie WhatsApp/Teams'] },
    { title: 'Dostawa i dokumenty', steps: ['GPS: wejście w geofence', 'Bot WA prosi o CMR', 'OCR + walidacja pól', 'Status DOCS_RECEIVED/COMPLETED', 'Faktura do wFirma'] },
    { title: 'Kontrola marży', steps: ['Impargo + DBK: koszty zmienne', 'Stałe: leasing, ubezp., biuro', 'Alarm niskiej marży', 'Propozycja renegocjacji / ładunek powrotny'] },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto">
      <header>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Architektura koncepcyjna</p>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System AI dla TMS + koszty (FG Falke)</h1>
        <p className="text-slate-600 mt-2 leading-relaxed">
          Widok wysokopoziomowy pokazujący jak frontend współpracuje z backendem, integracjami i usługami AI/OCR, aby zautomatyzować cały cykl zlecenia.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {layers.map(layer => (
          <div key={layer.title} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${layer.accent}`} />
            <div className="relative p-6 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-slate-900 text-white rounded-lg shadow">{layer.icon}</div>
                <h3 className="text-lg font-bold text-slate-900">{layer.title}</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                {layer.items.map(item => (
                  <li key={item} className="flex items-start space-x-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
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

