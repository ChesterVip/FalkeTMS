
import React, { useState } from 'react';
import { LayoutDashboard, List, Truck, PieChart, Settings, LogOut, Box, Menu, X, Mail, FlaskConical, GraduationCap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Pulpit', icon: <LayoutDashboard size={20} /> },
    { id: 'orders', label: 'Zlecenia', icon: <List size={20} /> },
    { id: 'mail', label: 'Poczta & API', icon: <Mail size={20} /> },
    { id: 'fleet', label: 'Flota i GPS', icon: <Truck size={20} /> },
    { id: 'finance', label: 'Raporty', icon: <PieChart size={20} /> },
    { id: 'simulation', label: 'Symulacje (4.x)', icon: <FlaskConical size={20} /> },
    { id: 'architecture', label: 'Praca & Architektura', icon: <GraduationCap size={20} /> },
    { id: 'settings', label: 'Ustawienia', icon: <Settings size={20} /> },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-800 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 z-50 flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Box className="text-white" size={20} />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">FalkeTMS</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="text-white p-2 focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Desktop Header */}
        <div className="hidden md:flex p-6 items-center space-x-3 border-b border-slate-800/50 bg-slate-900">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/50">
            <Box className="text-white" size={24} />
          </div>
          <div>
            <h1 className="font-bold text-white text-xl tracking-tight">FalkeTMS</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Logistics AI</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-16 md:mt-0">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative ${
                activePage === item.id 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/30' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className={`relative z-10 ${activePage === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                {item.icon}
              </span>
              <span className="font-medium relative z-10">{item.label}</span>
              {activePage === item.id && (
                  <div className="absolute right-3 w-2 h-2 bg-white rounded-full shadow-glow animate-pulse"></div>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4 px-2 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-md">
              JS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">Jan Spedytor</p>
              <p className="text-xs text-slate-500 truncate">fgfalke.eu</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium border border-transparent hover:border-red-500/20">
            <LogOut size={18} />
            <span>Wyloguj się</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        {/* Spacer for Mobile Header */}
        <div className="h-16 md:hidden flex-shrink-0" />
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 scroll-smooth">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
