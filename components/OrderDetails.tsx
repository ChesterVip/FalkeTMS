
import React, { useState, useRef, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { ArrowLeft, MessageSquare, Truck, FileText, Send, Paperclip, Bot, CheckCircle, Calculator, BrainCircuit, Clock, PlayCircle, FileCheck, Banknote } from 'lucide-react';
import { MOCK_DRIVERS as DRIVERS } from '../constants';

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order: initialOrder, onBack }) => {
  const [order, setOrder] = useState(initialOrder); // Local state for simulation
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'CHAT' | 'AI_ANALYSIS' | 'FINANCE'>('DETAILS');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(initialOrder.chatHistory || []);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, activeTab]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const newMessage = {
        sender: 'SYSTEM' as const,
        message: chatMessage,
        timestamp: new Date().toISOString()
    };
    setChatHistory([...chatHistory, newMessage]);
    setChatMessage('');
    
    // Simulate AI/Driver response
    setTimeout(() => {
        setChatHistory(prev => [...prev, {
            sender: 'BOT',
            message: 'Wiadomość dostarczona do kierowcy (WhatsApp API).',
            timestamp: new Date().toISOString()
        }]);
    }, 1000);
  };

  // Workflow Simulation Handlers
  const handleStatusChange = (newStatus: OrderStatus, description: string) => {
      const newHistoryEvent = {
          status: newStatus,
          timestamp: new Date().toISOString(),
          description: description,
          user: 'System'
      };
      setOrder(prev => ({
          ...prev,
          status: newStatus,
          history: [...prev.history, newHistoryEvent]
      }));
  };

  const calculateProfit = () => {
      const costs = order.financials.costs;
      const totalCost = costs.fuel + costs.adBlue + costs.tolls + costs.driverDiems + costs.crossBorderAllowance + costs.nightRestAllowance + costs.corridorPay + costs.maintenance + costs.driverBaseSalary + costs.socialSecurity + costs.leasing + costs.insurance + costs.overhead;
      const profit = order.financials.freightPrice - totalCost;
      const margin = (profit / order.financials.freightPrice) * 100;
      return { totalCost, profit, margin };
  };

  const { totalCost, profit, margin } = calculateProfit();

  // Helper to format date
  const fmtDate = (iso: string) => {
      const d = new Date(iso);
      return d.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 md:bg-white w-full absolute inset-0 z-10">
      {/* Header */}
      <div className="px-4 py-3 md:p-4 border-b border-slate-200 flex items-center justify-between bg-white shadow-sm sticky top-0 z-20">
        <div className="flex items-center space-x-2 md:space-x-4 overflow-hidden">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div className="min-w-0">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 flex items-center truncate">
                <span className="truncate">Zlecenie {order.id}</span>
                {order.aiAnalysis && (
                  <span title="Przetworzone przez AI" className="ml-2 flex items-center text-purple-500 flex-shrink-0">
                    <Bot size={16} />
                  </span>
                )}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 truncate max-w-[150px] md:max-w-none">
                {order.clientName} • {order.route.from} → {order.route.to}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-2">
            <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold border whitespace-nowrap 
                ${order.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                {order.status}
            </span>
        </div>
      </div>

      {/* Workflow Action Bar */}
      {order.status !== 'COMPLETED' && (
          <div className="bg-blue-50 border-b border-blue-100 px-4 py-3 flex flex-wrap md:flex-nowrap items-center gap-3 overflow-x-auto whitespace-nowrap">
              <span className="text-xs font-bold text-blue-800 flex items-center">
                  <BrainCircuit size={14} className="mr-1"/> Sugestia AI:
              </span>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                  {order.status === 'NEW' && (
                      <button onClick={() => handleStatusChange(OrderStatus.PLANNED, 'Zweryfikowano i przydzielono kierowcę')} className="action-btn bg-white text-blue-600 border border-blue-200 hover:bg-blue-100">
                          <CheckCircle size={14} className="mr-1"/> Przydziel Kierowcę (AI)
                      </button>
                  )}
                  {order.status === 'PLANNED' && (
                      <button onClick={() => handleStatusChange(OrderStatus.IN_TRANSIT, 'Rozpoczęto trasę (GPS)')} className="action-btn bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200">
                          <PlayCircle size={14} className="mr-1"/> Symuluj Start GPS
                      </button>
                  )}
                  {order.status === 'IN_TRANSIT' && (
                      <button onClick={() => handleStatusChange(OrderStatus.DELIVERED, 'Potwierdzono dostawę')} className="action-btn bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-200">
                          <Truck size={14} className="mr-1"/> Potwierdź Dostawę
                      </button>
                  )}
                  {order.status === 'DELIVERED' && (
                      <button onClick={() => handleStatusChange(OrderStatus.DOCS_RECEIVED, 'Dokumenty CMR zweryfikowane (OCR)')} className="action-btn bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-200">
                          <FileCheck size={14} className="mr-1"/> Weryfikuj CMR (OCR)
                      </button>
                  )}
                  {order.status === 'DOCS_RECEIVED' && (
                      <button onClick={() => handleStatusChange(OrderStatus.COMPLETED, 'Faktura wystawiona (WFirma)')} className="action-btn bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200">
                          <Banknote size={14} className="mr-1"/> Wystaw Fakturę (WFirma)
                      </button>
                  )}
              </div>
          </div>
      )}

      {/* Scrollable Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="flex overflow-x-auto scrollbar-hide px-2 md:px-6">
            {[
                { id: 'DETAILS', label: 'Szczegóły', icon: <FileText size={16}/> },
                { id: 'CHAT', label: 'Czat WA', icon: <MessageSquare size={16}/> },
                { id: 'AI_ANALYSIS', label: 'AI & OCR', icon: <BrainCircuit size={16}/> },
                { id: 'FINANCE', label: 'Finanse', icon: <Calculator size={16}/> },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                >
                    {tab.icon}
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6 pb-20 md:pb-6">
        
        {/* DETAILS TAB */}
        {activeTab === 'DETAILS' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                     <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold mb-4 text-slate-800 flex items-center">
                            <Truck className="mr-2 text-blue-500" size={20}/> Trasa i Ładunek
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            {/* Mobile Visual Connector */}
                            <div className="absolute left-[7px] top-8 bottom-24 w-0.5 bg-slate-100 md:hidden"></div>

                            <div className="space-y-6 md:space-y-0 md:contents">
                                <div className="pl-6 md:pl-0 relative">
                                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-slate-300 bg-white md:hidden"></div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Załadunek</span>
                                    <p className="font-semibold text-slate-800 text-lg">{order.route.from}</p>
                                    <p className="text-sm text-slate-500 bg-slate-50 inline-block px-2 py-1 rounded mt-1">{order.dates.pickup}</p>
                                </div>
                                
                                <div className="pl-6 md:pl-0 relative">
                                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-blue-500 bg-white md:hidden"></div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Rozładunek</span>
                                    <p className="font-semibold text-slate-800 text-lg">{order.route.to}</p>
                                    <p className="text-sm text-slate-500 bg-slate-50 inline-block px-2 py-1 rounded mt-1">{order.dates.delivery}</p>
                                </div>
                            </div>

                            <div className="md:col-span-2 grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 mt-2">
                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase">Ładunek</span>
                                    <p className="font-medium text-slate-800">{order.cargo.description}</p>
                                    <p className="text-sm text-slate-500">{order.cargo.weightKg}kg • {order.cargo.pallets} pal</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase">Zasoby</span>
                                    <p className="font-medium text-slate-800">{order.vehicleId || '---'}</p>
                                    <p className="text-sm text-slate-500">{order.driverId ? DRIVERS.find(d => d.id === order.driverId)?.name : '---'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline Component */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 h-fit">
                    <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center">
                        <Clock className="mr-2 text-blue-500" size={20}/> Przebieg Zlecenia
                    </h3>
                    <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
                        {order.history && order.history.length > 0 ? (
                            order.history.map((event, idx) => (
                                <div key={idx} className="relative pl-8 group">
                                    <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white transition-all duration-300 ${idx === order.history.length - 1 ? 'bg-blue-600 ring-4 ring-blue-50 scale-110' : 'bg-slate-300 group-hover:bg-blue-400'}`}></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{fmtDate(event.timestamp)}</span>
                                        <span className="font-bold text-slate-800 text-sm">{event.status}</span>
                                        <span className="text-sm text-slate-600 mt-0.5">{event.description}</span>
                                        <span className="text-[10px] text-slate-400 mt-1 italic flex items-center">
                                            {event.user}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400 pl-8 text-sm">Brak historii dla tego zlecenia.</p>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* CHAT TAB */}
        {activeTab === 'CHAT' && (
            <div className="flex flex-col h-[calc(100vh-220px)] md:h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700 flex items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5 mr-2" alt="WA"/>
                        Kierowca (WhatsApp)
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wide">Online</span>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#efeae2]" ref={scrollRef}>
                    {chatHistory.length === 0 ? (
                        <p className="text-center text-slate-400 text-sm mt-10">Brak historii rozmów dla tego zlecenia.</p>
                    ) : (
                        chatHistory.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'DRIVER' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2 shadow-sm text-sm relative ${
                                    msg.sender === 'DRIVER' ? 'bg-white text-slate-800 rounded-tl-none' : 
                                    msg.sender === 'BOT' ? 'bg-[#dcf8c6] text-slate-900 rounded-tr-none' : 'bg-slate-200 text-slate-600 italic rounded-tr-none'
                                }`}>
                                    <p className="font-bold text-[10px] mb-1 opacity-60 uppercase">{msg.sender}</p>
                                    <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                    {msg.attachmentUrl && (
                                        <div className="mt-2">
                                            <img src={msg.attachmentUrl} alt="Attachment" className="rounded-lg border border-black/10 max-h-40 w-full object-cover" />
                                            <div className="text-[10px] text-emerald-600 flex items-center mt-2 font-bold bg-white/50 p-1 rounded">
                                                <CheckCircle size={10} className="mr-1"/> Dokument zweryfikowany przez AI
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-[9px] text-right mt-1 opacity-50 flex justify-end items-center">
                                        {msg.timestamp.split('T')[1]?.substring(0,5) || msg.timestamp}
                                        {msg.sender !== 'DRIVER' && <span className="ml-1">✓✓</span>}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="p-3 border-t border-slate-200 bg-white">
                    <label htmlFor="chatMessage" className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                        Wiadomość do kierowcy
                    </label>
                    <div className="flex space-x-2 items-center">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0">
                            <Paperclip size={20} />
                        </button>
                        <input
                            id="chatMessage"
                            type="text"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Wpisz wiadomość do kierowcy..."
                            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-300 focus:outline-none py-2.5 transition-shadow"
                            aria-label="Wpisz wiadomość do kierowcy"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md flex-shrink-0"
                            aria-label="Wyślij wiadomość"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* AI ANALYSIS TAB */}
        {activeTab === 'AI_ANALYSIS' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                    <h3 className="font-bold text-slate-700 mb-3 flex items-center">
                        <div className="w-1.5 h-4 bg-slate-800 rounded mr-2"></div>
                        Źródło (Email/PDF)
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-600 whitespace-pre-wrap flex-1 overflow-y-auto max-h-96">
                        {order.aiAnalysis ? order.aiAnalysis.emailSource : "Brak danych źródłowych."}
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                    <h3 className="font-bold text-slate-700 mb-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-1.5 h-4 bg-purple-500 rounded mr-2"></div>
                            Dane Strukturalne (GPT-4)
                        </div>
                        {order.aiAnalysis && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full uppercase tracking-wide">Pewność: {order.aiAnalysis.confidence * 100}%</span>}
                    </h3>
                    <div className="bg-[#1e1e1e] p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-y-auto max-h-96 shadow-inner">
                        {order.aiAnalysis ? order.aiAnalysis.extractedData : "{}"}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800 shadow-sm">
                        <p className="flex items-center font-medium"><Bot size={14} className="mr-2"/> System automatycznie utworzył zlecenie na podstawie tych danych.</p>
                    </div>
                </div>
            </div>
        )}

        {/* FINANCE TAB */}
        {activeTab === 'FINANCE' && (
            <div className="max-w-3xl mx-auto space-y-6">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Kalkulacja Rentowności</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Przychód (Fracht)</p>
                            <p className="text-3xl font-black text-slate-800">{order.financials.freightPrice.toFixed(0)} <span className="text-lg text-slate-500 font-medium">{order.financials.currency}</span></p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-right">
                             <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Marża Zysku</p>
                             <p className={`text-3xl font-black ${margin > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {margin.toFixed(1)}%
                             </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-2 flex items-center">
                            <div className="h-px bg-slate-200 flex-1 mr-4"></div>
                            Struktura Kosztów
                            <div className="h-px bg-slate-200 flex-1 ml-4"></div>
                        </h4>
                        {[
                            { label: 'Paliwo (Est. wg telematyki)', value: order.financials.costs.fuel },
                            { label: 'Opłaty Drogowe (Impargo)', value: order.financials.costs.tolls },
                            { label: 'Diety + Pakiet Mobilności', value: order.financials.costs.driverDiems + order.financials.costs.crossBorderAllowance + order.financials.costs.nightRestAllowance + order.financials.costs.corridorPay },
                            { label: 'Wynagrodzenie Kierowcy (Podstawa + ZUS)', value: order.financials.costs.driverBaseSalary + order.financials.costs.socialSecurity },
                            { label: 'Leasing / Amortyzacja', value: order.financials.costs.leasing },
                            { label: 'Inne (AdBlue, Serwis, Ubezp., Biuro)', value: order.financials.costs.adBlue + order.financials.costs.maintenance + order.financials.costs.insurance + order.financials.costs.overhead },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 border-dashed">
                                <span className="text-slate-600 text-sm font-medium">{item.label}</span>
                                <span className="font-mono text-slate-800">{item.value.toFixed(2)} EUR</span>
                            </div>
                        ))}
                         <div className="flex justify-between items-center py-3 bg-red-50 px-4 rounded-lg font-bold mt-4 border border-red-100">
                            <span className="text-red-800 text-sm">Suma Kosztów</span>
                            <span className="text-red-700">-{totalCost.toFixed(2)} EUR</span>
                        </div>
                        <div className="flex justify-between items-center py-4 mt-4 bg-emerald-50/50 px-4 rounded-xl border border-emerald-100">
                            <span className="text-lg font-bold text-slate-800">Zysk Netto</span>
                            <span className="text-xl font-black text-emerald-600 tracking-tight">
                                {profit.toFixed(2)} EUR
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pb-8">
                    <button className="btn btn-ghost px-6 py-3 rounded-xl text-sm font-bold w-full sm:w-auto">
                        Eksportuj do PDF
                    </button>
                </div>
            </div>
        )}

      </div>
      <style>{`
          .action-btn {
              padding: 0.5rem 1rem;
              border-radius: 9999px;
              font-size: 0.75rem;
              font-weight: 700;
              display: flex;
              align-items: center;
              transition: all 0.2s;
          }
          .action-btn:active {
              transform: scale(0.95);
          }
      `}</style>
    </div>
  );
};

export default OrderDetails;
