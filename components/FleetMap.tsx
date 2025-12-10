import React from 'react';
import { MOCK_DRIVERS, MOCK_VEHICLES } from '../constants';
import { MapPin, Navigation, Truck, User } from 'lucide-react';

const FleetMap: React.FC = () => {
    // Simulated positions for the "Map" background
    const positions = [
        { id: 'V1', top: '40%', left: '60%', name: 'V1 (DAF)', status: 'ACTIVE', driver: 'Jan Kowalski' },
        { id: 'V2', top: '70%', left: '45%', name: 'V2 (Iveco)', status: 'ACTIVE', driver: 'Serhii Yarovyi' },
        { id: 'V3', top: '45%', left: '80%', name: 'V3 (DAF)', status: 'SERVICE', driver: 'Tomasz Nowak' },
    ];

    return (
        <div className="flex flex-col-reverse md:flex-row h-full overflow-hidden">
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
                    {MOCK_VEHICLES.map((vehicle, idx) => {
                        const driver = MOCK_DRIVERS.find(d => d.id === `D${idx + 1}`); 
                        return (
                            <div key={vehicle.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 cursor-pointer transition-all active:scale-[0.98]">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-slate-800">{vehicle.plateNumber}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${vehicle.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                        {vehicle.status}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-600 mb-3 font-medium">{vehicle.model}</div>
                                <div className="flex items-center text-xs text-slate-500 mb-1.5">
                                    <User size={12} className="mr-2 text-slate-400"/>
                                    {driver ? driver.name : 'Brak kierowcy'}
                                </div>
                                <div className="flex items-center text-xs text-blue-600 font-medium">
                                    <MapPin size={12} className="mr-2"/>
                                    {driver?.currentLocation || 'Baza'}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Map Area - Top on Mobile, Right on Desktop */}
            <div className="flex-1 bg-slate-200 relative overflow-hidden group h-1/2 md:h-full">
                {/* Simulated Map Background - CSS Pattern */}
                <div className="absolute inset-0 bg-[#e5e7eb]" 
                     style={{
                         backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)',
                         backgroundSize: '20px 20px'
                     }}
                ></div>
                
                {/* Decorative Map Elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl md:text-8xl font-black text-slate-300/50 pointer-events-none select-none tracking-widest">
                    MAPA
                </div>
                <div className="absolute bottom-4 right-4 text-[10px] text-slate-500 bg-white/80 backdrop-blur px-2 py-1 rounded shadow-sm">© OpenStreetMap Contributors</div>

                {/* Vehicles on Map */}
                {positions.map(pos => (
                    <div 
                        key={pos.id}
                        className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 hover:z-50 transition-all duration-500 group-hover:scale-105 cursor-pointer"
                        style={{ top: pos.top, left: pos.left }}
                    >
                        <div className={`p-2 md:p-2.5 rounded-full shadow-xl border-4 border-white ring-1 ring-black/5 ${pos.status === 'ACTIVE' ? 'bg-blue-600 animate-pulse' : 'bg-slate-500'}`}>
                            <Truck className="text-white w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div className="mt-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold text-slate-800 whitespace-nowrap flex flex-col items-center border border-slate-200">
                            <span>{pos.name}</span>
                            <span className="text-[9px] text-slate-500 font-normal">{pos.driver}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FleetMap;