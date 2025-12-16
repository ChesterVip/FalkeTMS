import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { Order, OrderStatus } from '../types';
import { ArrowRight, MapPin, Calendar, DollarSign, Bot, Filter } from 'lucide-react';

interface OrderListProps {
  onSelectOrder: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({ onSelectOrder }) => {
  const [filter, setFilter] = useState<string>('ALL');
  const [query, setQuery] = useState('');

  const filteredOrders = (filter === 'ALL' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(o => o.status === filter))
    .filter(o => {
        const q = query.toLowerCase();
        return o.clientName.toLowerCase().includes(q) 
            || o.route.from.toLowerCase().includes(q) 
            || o.route.to.toLowerCase().includes(q) 
            || o.id.toLowerCase().includes(q);
    });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.NEW: return 'bg-blue-50 text-blue-700 border-blue-100';
      case OrderStatus.IN_TRANSIT: return 'bg-amber-50 text-amber-700 border-amber-100';
      case OrderStatus.COMPLETED: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case OrderStatus.PLANNED: return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="p-3 md:p-4 lg:p-6 h-full flex flex-col max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 md:mb-6 space-y-4 lg:space-y-0">
        <div className="flex-1 min-w-0">
            <h2 className="page-header">Zlecenia Transportowe</h2>
            <p className="page-subtitle">Zarządzaj aktywnymi przewozami</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex-1 sm:flex-initial">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Szukaj klient/trasy</label>
                <div className="flex items-center bg-white border border-slate-200 rounded-lg md:rounded-xl px-3 py-2 shadow-sm">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="np. Zurich, IKEA, ORD-2024"
                        className="flex-1 text-sm outline-none"
                    />
                    <ArrowRight size={16} className="text-slate-300 ml-2 flex-shrink-0" />
                </div>
            </div>

            {/* Mobile Scrollable Filters */}
            <div className="overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                <div className="flex space-x-2 bg-white p-1 rounded-lg md:rounded-xl border border-slate-200 shadow-sm w-max">
                    {['ALL', 'NEW', 'IN_TRANSIT', 'COMPLETED'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 md:px-4 py-2 rounded-md md:rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                            filter === f ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                            }`}
                        >
                            {f === 'ALL' ? 'Wszystkie' : f.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="grid gap-4 flex-1 overflow-y-auto pb-20 md:pb-0 pr-1">
        {filteredOrders.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Filter size={48} className="mb-4 opacity-20" />
                <p>Brak zleceń o statusie {filter}</p>
             </div>
        ) : (
            filteredOrders.map(order => (
            <div 
                key={order.id} 
                onClick={() => onSelectOrder(order)}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer group relative active:scale-[0.99] duration-200"
            >
                <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">#{order.id.split('-')[1] + '-' + order.id.split('-')[2]}</span>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold border ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                    </span>
                    {order.aiAnalysis && (
                        <span className="flex items-center text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md border border-purple-100">
                            <Bot size={12} className="mr-1"/> AI
                        </span>
                    )}
                </div>
                <p className="font-bold text-slate-800 text-sm md:text-base">{order.clientName}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex flex-col space-y-2 relative">
                         {/* Connection Line */}
                        <div className="absolute left-[7px] top-6 bottom-1 w-0.5 bg-slate-100"></div>
                        
                        <div className="flex items-start z-10">
                            <div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-white mt-0.5 mr-3 flex-shrink-0"></div>
                            <div>
                                <span className="text-xs text-slate-400 block mb-0.5">Załadunek</span>
                                <span className="font-semibold text-slate-700 block leading-tight">{order.route.from}</span>
                                <span className="text-xs text-slate-500">{order.dates.pickup}</span>
                            </div>
                        </div>
                        <div className="flex items-start z-10">
                            <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white mt-0.5 mr-3 flex-shrink-0"></div>
                            <div>
                                <span className="text-xs text-slate-400 block mb-0.5">Rozładunek</span>
                                <span className="font-semibold text-slate-700 block leading-tight">{order.route.to}</span>
                                <span className="text-xs text-slate-500">{order.dates.delivery}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col justify-between md:justify-center items-end md:items-end space-y-0 md:space-y-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-50">
                        <div className="flex items-center text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg">
                            <DollarSign size={16} className="mr-1" />
                            {order.financials.freightPrice} {order.financials.currency}
                        </div>
                         {order.cargo && (
                            <div className="text-xs text-slate-400 text-right">
                                {order.cargo.weightKg / 1000}t <span className="mx-1">•</span> {order.cargo.pallets} palet
                            </div>
                        )}
                    </div>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default OrderList;