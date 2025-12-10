
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import FinancialReports from './components/FinancialReports';
import FleetMap from './components/FleetMap';
import MailIntegration from './components/MailIntegration';
import { Order } from './types';
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
      case 'settings':
         return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Bot size={64} className="mb-4 text-slate-200" />
            <h2 className="text-xl font-semibold text-slate-600">Konfiguracja AI & API</h2>
            <div className="mt-6 bg-white p-6 rounded-lg border border-slate-200 shadow-sm max-w-lg w-full text-left space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm font-medium text-slate-700">OpenAI API Key</span>
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Skonfigurowano</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm font-medium text-slate-700">WhatsApp Business API</span>
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Skonfigurowano</span>
                </div>
                 <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm font-medium text-slate-700">WFirma Integration</span>
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">Sandbox Mode</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Impargo Routing</span>
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Skonfigurowano</span>
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
