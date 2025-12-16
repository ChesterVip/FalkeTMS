
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import FinancialReports from './components/FinancialReports';
import FleetMap from './components/FleetMap';
import MailIntegration from './components/MailIntegration';
import Architecture from './components/Architecture';
import Simulation from './components/Simulation';
import DriverSettlements from './components/DriverSettlements';
import Thesis from './components/Thesis';
import Settings from './components/Settings';
import { Order } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Blokada kopiowania na całej stronie
  useEffect(() => {
    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const preventSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Dodaj event listenery
    document.addEventListener('copy', preventCopy);
    document.addEventListener('cut', preventCopy);
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('selectstart', preventSelectStart);

    // Dodaj style CSS blokujące zaznaczanie
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('cut', preventCopy);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('selectstart', preventSelectStart);
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
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
      case 'finance':
        return <FinancialReports />;
      case 'settlements':
        return <DriverSettlements />;
      case 'simulation':
        return <Simulation />;
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
