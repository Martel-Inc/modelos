import React, { useState } from 'react';
import { Truck, MapPin, Activity, CheckCircle, Eye, Navigation, CreditCard, UserPlus, FileText, AlertCircle, ShieldCheck } from 'lucide-react';
import { ServiceStatus } from '../types';

interface AppointmentOperation {
    id: string;
    modelName: string;
    clientName: string;
    service: string;
    status: ServiceStatus;
    location: string;
    amount: number;
    isNewUser?: boolean;
    transportId?: string;
    paymentValidated?: boolean;
}

const OperationsDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentOperation[]>([
    { id: 'S-1024', modelName: 'Elena', clientName: 'Eleazar T.', service: 'Acompañante VIP', status: ServiceStatus.VALIDATING_PAYMENT, location: 'Hotel RIU, Hab 402', amount: 2000, isNewUser: true },
    { id: 'S-1025', modelName: 'Valeria', clientName: 'Carlos R.', service: 'Servicio Íntimo', status: ServiceStatus.READY_FOR_TRANSPORT, location: 'Avenida Tulum #45', amount: 3500 },
    { id: 'S-1026', modelName: 'Sofia', clientName: 'Marco P.', service: 'Acompañante VIP', status: ServiceStatus.IN_TRANSIT, location: 'Playa Mamitas', amount: 2000, isNewUser: true, transportId: 'TX-20', paymentValidated: true },
  ]);

  const [tempTransportIds, setTempTransportIds] = useState<Record<string, string>>({});

  const updateStatus = (id: string, newStatus: ServiceStatus) => {
    setAppointments(prev => prev.map(app => {
        if (app.id === id) {
            return { 
                ...app, 
                status: newStatus,
                paymentValidated: newStatus === ServiceStatus.READY_FOR_TRANSPORT ? true : app.paymentValidated,
                transportId: newStatus === ServiceStatus.IN_TRANSIT ? tempTransportIds[id] || 'TR-PENDING' : app.transportId
            };
        }
        return app;
    }));
  };

  const getStatusStyle = (status: ServiceStatus) => {
    switch(status) {
        case ServiceStatus.VALIDATING_PAYMENT: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
        case ServiceStatus.READY_FOR_TRANSPORT: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        case ServiceStatus.IN_TRANSIT: return 'bg-green-500/10 text-green-500 border-green-500/20';
        default: return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <header className="border-b border-neutral-800 pb-8 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
            <div className="flex items-center space-x-2 text-rose-500 mb-3">
              <Activity size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Panel Operativo</span>
            </div>
            <h1 className="text-5xl font-black font-outfit uppercase italic tracking-tighter text-white">
              CONTROL DE <span className="text-rose-500">FLUJO</span>
            </h1>
        </div>
        <div className="flex space-x-4">
            <div className="bg-neutral-900 px-6 py-3 rounded-2xl border border-neutral-800 text-center">
                <p className="text-[8px] font-black text-neutral-500 uppercase">Activos</p>
                <p className="text-xl font-black text-white">{appointments.length}</p>
            </div>
            <div className="bg-rose-600/10 px-6 py-3 rounded-2xl border border-rose-500/20 text-center">
                <p className="text-[8px] font-black text-rose-500 uppercase">Alertas Nuevos</p>
                <p className="text-xl font-black text-rose-500">{appointments.filter(a => a.isNewUser && !a.paymentValidated).length}</p>
            </div>
        </div>
      </header>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
            {appointments.map((app) => (
                <div key={app.id} className="bg-neutral-900/60 border border-neutral-800 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-neutral-700 transition-all group overflow-hidden relative">
                    {app.isNewUser && !app.paymentValidated && (
                        <div className="absolute top-0 left-0 bg-rose-600 px-6 py-1 rounded-br-2xl text-[8px] font-black uppercase tracking-widest text-white flex items-center space-x-2 animate-pulse">
                           <AlertCircle size={10} /> <span>VALIDACIÓN CRÍTICA: USUARIO NUEVO</span>
                        </div>
                    )}

                    <div className="flex items-center space-x-6 w-full md:w-auto pt-4 md:pt-0">
                        <div className="relative">
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-black text-2xl italic border transition-all ${app.isNewUser ? 'bg-rose-600/10 border-rose-500/50 text-rose-500' : 'bg-neutral-800 border-neutral-700 text-white'}`}>
                                {app.modelName[0]}
                            </div>
                            {app.paymentValidated && (
                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg border-2 border-neutral-900">
                                    <CheckCircle size={16} />
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center space-x-3 mb-1">
                                <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">{app.id}</span>
                                <span className={`px-3 py-0.5 rounded-full text-[8px] font-black uppercase border ${getStatusStyle(app.status)}`}>
                                    {app.status.replace('_', ' ')}
                                </span>
                            </div>
                            <h3 className="text-2xl font-black text-white italic tracking-tighter">
                                {app.modelName} 
                                <span className="text-neutral-500 text-sm font-normal ml-2">vs {app.clientName}</span>
                            </h3>
                            <div className="flex items-center text-neutral-400 text-[10px] font-bold uppercase mt-1">
                                <MapPin size={12} className="mr-1 text-rose-500" /> {app.location}
                                <span className="mx-2 text-neutral-800">|</span>
                                <CreditCard size={12} className="mr-1 text-neutral-600" /> ${app.amount} MXN
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
                        {app.status === ServiceStatus.VALIDATING_PAYMENT && (
                            <>
                                <button className="flex items-center space-x-2 px-6 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all border border-neutral-700 shadow-lg">
                                    <FileText size={16} className="text-rose-500" /> <span>Ver Comprobante</span>
                                </button>
                                <button 
                                    onClick={() => updateStatus(app.id, ServiceStatus.READY_FOR_TRANSPORT)}
                                    className="flex items-center space-x-2 px-8 py-4 bg-green-600 hover:bg-green-500 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-green-600/20 border-b-4 border-green-800 active:translate-y-1"
                                >
                                    <CheckCircle size={16} /> <span>Validar Pago</span>
                                </button>
                            </>
                        )}

                        {app.status === ServiceStatus.READY_FOR_TRANSPORT && (
                            <div className="flex items-center space-x-2 w-full md:w-auto bg-black/40 p-2 rounded-3xl border border-neutral-800">
                                <input 
                                    type="text" 
                                    placeholder="ID TRANSPORTE" 
                                    className="bg-transparent px-4 py-2 text-[10px] font-black text-white uppercase outline-none md:w-40 placeholder:text-neutral-700 border-r border-neutral-800"
                                    value={tempTransportIds[app.id] || ''}
                                    onChange={(e) => setTempTransportIds({...tempTransportIds, [app.id]: e.target.value.toUpperCase()})}
                                />
                                <button 
                                    onClick={() => updateStatus(app.id, ServiceStatus.IN_TRANSIT)}
                                    disabled={!tempTransportIds[app.id]}
                                    className="flex items-center space-x-2 px-8 py-3 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-rose-600/20 border-b-4 border-rose-800 active:translate-y-1"
                                >
                                    <Truck size={16} /> <span>Despachar</span>
                                </button>
                            </div>
                        )}

                        {app.status === ServiceStatus.IN_TRANSIT && (
                            <div className="flex items-center space-x-5">
                                <div className="flex flex-col items-end">
                                    <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Transporte Activo</span>
                                    <span className="text-[12px] font-black text-white uppercase italic bg-neutral-800 px-3 py-1 rounded-xl mt-1 border border-neutral-700">{app.transportId}</span>
                                </div>
                                <button className="flex items-center space-x-2 px-6 py-4 bg-neutral-900 border border-neutral-800 text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest animate-pulse">
                                    <Navigation size={16} /> <span>Rastreando GPS</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
        {appointments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-neutral-900/40 rounded-[3rem] border-2 border-dashed border-neutral-800">
                <ShieldCheck size={48} className="text-neutral-800 mb-4" />
                <p className="text-neutral-600 font-black uppercase text-xs tracking-[0.3em] italic">No hay operaciones pendientes</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default OperationsDashboard;