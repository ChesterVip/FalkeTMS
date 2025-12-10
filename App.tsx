
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import FinancialReports from './components/FinancialReports';
import FleetMap from './components/FleetMap';
import MailIntegration from './components/MailIntegration';
import Architecture from './components/Architecture';
import Simulation from './components/Simulation';
import { Order } from './types';
import { MOCK_INTEGRATIONS } from './constants';
import { Bot } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const renderContent = () => {
    if (currentPage === 'orders' && selectedOrder) {
      return (
        <OrderDetails 
          order={selectedOrder} 
          onBack={() => setSelectedOrder(null)} 
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <OrderList onSelectOrder={setSelectedOrder} />;
      case 'mail':
        return <MailIntegration />;
      case 'fleet':
        return <FleetMap />;
      case 'finance':
        return <FinancialReports />;
      case 'simulation':
        return <Simulation />;
      case 'architecture':
        return <Architecture />;
      case 'settings':
         return (
          <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center space-x-3">
              <Bot size={36} className="text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Konfiguracja AI & Integracje</h2>
                <p className="text-slate-500 text-sm">Status połączeń produkcja/sandbox + parametry AI</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {MOCK_INTEGRATIONS.map(integration => (
                <div key={integration.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-800">{integration.name}</p>
                      <p className="text-xs text-slate-500">{integration.desc}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold border ${
                      integration.status === 'OK'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mb-2">Latency: {integration.latency}</p>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                    <span>Testuj połączenie</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 mb-3">Parametry AI / klucze</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-500 text-xs uppercase font-bold">OpenAI API Key</p>
                  <p className="text-emerald-600 font-semibold">Skonfigurowano</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-500 text-xs uppercase font-bold">Tryb OCR</p>
                  <p className="text-slate-700 font-semibold">Inteligentny (OCR + NLP)</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-500 text-xs uppercase font-bold">Kanały komunikacji</p>
                  <p className="text-slate-700 font-semibold">WhatsApp, SMS, Teams, Email</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
            <div className="p-10 text-center text-slate-500">
                Funkcjonalność w trakcie budowy.
            </div>
        );
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={(page) => {
        setCurrentPage(page);
        setSelectedOrder(null);
    }}>
      {renderContent()}
    </Layout>
  );
};

export default App;
