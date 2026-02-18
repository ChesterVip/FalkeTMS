
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import FleetMap from './components/FleetMap';
import MailIntegration from './components/MailIntegration';
import Architecture from './components/Architecture';
import DriverSettlements from './components/DriverSettlements';
import Reports from './components/Reports';
import Thesis from './components/Thesis';
import Settings from './components/Settings';
import { Order } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Blokada kopiowania tylko w środowisku demonstracyjnym
  useEffect(() => {
    // Usuń blokadę w środowisku produkcyjnym
    if (process.env.NODE_ENV === 'production') return;

    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Dodaj event listenery tylko dla prawokliku (bez blokowania zaznaczania)
    document.addEventListener('contextmenu', preventContextMenu);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
    };
  }, []);

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
      case 'reports':
        return <Reports />;
      case 'settlements':
        return <DriverSettlements />;
      case 'architecture':
        return <Architecture />;
      case 'settings':
        return <Settings />;
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
