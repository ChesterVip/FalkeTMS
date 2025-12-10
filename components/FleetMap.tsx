import React, { useEffect, useState } from 'react';
import { MOCK_DRIVERS, MOCK_VEHICLES, MOCK_ORDERS } from '../constants';
import { MapPin, Navigation, Truck, User, AlertTriangle, Route as RouteIcon } from 'lucide-react';

const FleetMap: React.FC = () => {

    // Realistyczne pozycje GPS dla tras cross-trade DE-CH
    const vehiclePositions = [
        // V1 - na trasie Berlin → Zurich (ORD-2024-001)
        { 
            id: 'V1', 
            top: '42%', 
            left: '39%', 
            name: 'V1 DAF XF', 
            driver: 'Jan Kowalski',
            location: 'A8 koło Stuttgart → Zürich',
            route: 'Berlin → Zürich',
            eta: '14:00',
            progress: 65
        },
        // V2 - na trasie München → Bern (ORD-2024-002)
        { 
            id: 'V2', 
            top: '54%', 
            left: '34%', 
            name: 'V2 IVECO', 
            driver: 'Serhii Yarovyi',
            location: 'A1 przed Bern',
            route: 'München → Bern',
            eta: '10:00',
            progress: 85
        },
        // V3 - postój na bazie w Polsce
        { 
            id: 'V3', 
            top: '40%', 
            left: '51%', 
            name: 'V3 DAF XF', 
            driver: 'Tomasz Nowak',
            location: 'Baza Włoszyn (PL)',
            route: 'Postój/serwis',
            eta: '—',
            progress: 0
        }
    ];

    const positions = vehiclePositions.map(pos => {
        const vehicle = MOCK_VEHICLES.find(v => v.id === pos.id);
        return {
            ...pos,
            status: vehicle?.status || 'UNKNOWN'
        };
    });

    return (
        <div className="flex flex-col-reverse md:flex-row h-full min-h-[70vh] overflow-hidden bg-slate-50">
            {/* Sidebar List - Bottom on Mobile, Left on Desktop */}
            <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-r border-slate-200 flex flex-col z-10 shadow-lg h-1/2 md:h-full">
                <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center">
                        <Navigation className="mr-2 text-blue-600" />
                        Lokalizacja Floty
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">Live data: DBK Fleet Management</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                    {positions.map((pos) => {
                        const vehicle = MOCK_VEHICLES.find(v => v.id === pos.id);
                        const order = MOCK_ORDERS.find(o => o.vehicleId === pos.id && (o.status === 'IN_TRANSIT' || o.status === 'PLANNED'));
                        return (
                            <div key={pos.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 cursor-pointer transition-all active:scale-[0.98]">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-slate-800">{vehicle?.plateNumber || pos.id}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                                        pos.status === 'ACTIVE' 
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                            : 'bg-red-50 text-red-700 border-red-100'
                                    }`}>
                                        {pos.status}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-600 mb-3 font-medium">{vehicle?.model}</div>
                                <div className="flex items-center text-xs text-slate-500 mb-1.5">
                                    <User size={12} className="mr-2 text-slate-400"/>
                                    {pos.driver}
                                </div>
                                <div className="flex items-center text-xs text-blue-600 font-medium mb-1.5">
                                    <MapPin size={12} className="mr-2"/>
                                    {pos.location}
                                </div>
                                {order && (
                                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs">
                                        <div className="flex items-center text-slate-600 mb-1">
                                            <RouteIcon size={11} className="mr-1.5 text-blue-500"/>
                                            <span className="font-semibold">{order.route.from} → {order.route.to}</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] text-slate-500">
                                            <span>Dystans: {order.route.distanceKm} km</span>
                                            {pos.progress > 0 && <span className="text-emerald-600 font-bold">{pos.progress}%</span>}
                                        </div>
                                    </div>
                                )}
                                {vehicle?.mileage && (
                                    <div className="mt-2 text-[10px] text-slate-400">
                                        Przebieg: {vehicle.mileage.toLocaleString()} km
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Map Area - Top on Mobile, Right on Desktop */}
            <div
                className="flex-1 relative overflow-hidden group h-1/2 md:h-full min-h-[420px]"
                style={{
                    background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #dbeafe 100%)'
                }}
            >
                {/* Simplified Map Background */}
                <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.3"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Geographic Labels */}
                <div className="absolute top-[20%] left-[40%] text-4xl md:text-6xl font-black text-blue-900/20 select-none">
                    NIEMCY
                </div>
                <div className="absolute top-[60%] left-[20%] text-3xl md:text-5xl font-black text-emerald-900/20 select-none">
                    SZWAJCARIA
                </div>
                <div className="absolute top-[25%] right-[15%] text-3xl md:text-5xl font-black text-red-900/20 select-none">
                    POLSKA
                </div>

                {/* Legend */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-3 rounded-xl shadow-lg border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-700 mb-2 flex items-center">
                        <Navigation className="mr-2 text-blue-600" size={16} />
                        Monitoring Floty DBK
                    </h3>
                    <div className="space-y-1 text-xs text-slate-600">
                        <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>Niemcy (DE)</div>
                        <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></span>Szwajcaria (CH)</div>
                        <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-600 mr-2"></span>Polska (PL)</div>
                    </div>
                </div>
                
                <div className="absolute bottom-4 right-4 text-[10px] text-slate-500 bg-white/80 backdrop-blur px-2 py-1 rounded shadow-sm">
                    © DBK Fleet Management
                </div>

                {/* Vehicles on Map */}
                {positions.map(pos => (
                    <div 
                        key={pos.id}
                        className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 hover:z-50 transition-all duration-500 group-hover:scale-105 cursor-pointer"
                        style={{ top: pos.top, left: pos.left }}
                        title={`${pos.name} - ${pos.route}`}
                    >
                        <div className={`relative p-2 md:p-3 rounded-full shadow-xl border-4 border-white ring-2 ${
                            pos.status === 'ACTIVE' 
                                ? 'bg-blue-600 ring-blue-200 animate-pulse' 
                                : pos.status === 'SERVICE'
                                ? 'bg-red-600 ring-red-200'
                                : 'bg-slate-500 ring-slate-200'
                        }`}>
                            <Truck className="text-white w-4 h-4 md:w-6 md:h-6" />
                            {pos.progress > 0 && (
                                <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow">
                                    {pos.progress}%
                                </div>
                            )}
                        </div>
                        <div className="mt-2 bg-white/95 backdrop-blur px-3 py-2 rounded-xl shadow-2xl text-xs font-bold text-slate-800 whitespace-nowrap flex flex-col items-start border-2 border-blue-100 min-w-[180px]">
                            <div className="flex items-center justify-between w-full mb-1">
                                <span className="font-black text-blue-700">{pos.name}</span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                                    pos.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                }`}>{pos.status}</span>
                            </div>
                            <div className="flex items-center text-[10px] text-slate-600 mb-0.5">
                                <User size={10} className="mr-1.5"/> {pos.driver}
                            </div>
                            <div className="flex items-center text-[10px] text-blue-600 font-semibold mb-0.5">
                                <MapPin size={10} className="mr-1.5"/> {pos.location}
                            </div>
                            <div className="flex items-center text-[10px] text-slate-500 border-t border-slate-100 pt-1 mt-1 w-full">
                                <RouteIcon size={10} className="mr-1.5"/> {pos.route}
                                {pos.eta !== '—' && <span className="ml-auto text-emerald-600 font-bold">ETA {pos.eta}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FleetMap;
