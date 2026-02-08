
import React, { useState } from 'react';
import { Truck, MapPin, CheckCircle, Clock, FileText, XCircle, Search, ShieldCheck, AlertCircle } from 'lucide-react';
import { ServiceStatus } from '../types';

const MOCK_SERVICES = [
  { id: 'app-001', client: 'Usuario Nuevo 1', model: 'Modelo 1', status: ServiceStatus.VALIDATING_PAYMENT, time: '14:30', location: 'Hotel Hyatt, Cancún', proofUrl: 'https://picsum.photos/seed/proof1/400/600', isNew: true },
  { id: 'app-002', client: 'Usuario Nuevo 2', model: 'Modelo 4', status: ServiceStatus.VALIDATING_PAYMENT, time: '16:00', location: 'Residencial Aqua', proofUrl: 'https://picsum.photos/seed/proof2/400/600', isNew: true },
  { id: 'app-003', client: 'Cliente VIP', model: 'Modelo 7', status: ServiceStatus.READY_FOR_TRANSPORT, time: 'AHORA', location: 'Zona Hotelera' },
];

const OperationsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending');
  const [services, setServices] = useState(MOCK_SERVICES);
  const [validatingService, setValidatingService] = useState<any | null>(null);

  const handleValidatePayment = (service: any) => {
    const updatedServices = services.map(s => 
        s.id === service.id ? { ...s, status: ServiceStatus.READY_FOR_TRANSPORT } : s
    );
    setServices(updatedServices);
    setValidatingService(null);
  };

  const handleDispatch = (id: string) => {
    const updatedServices = services.map(s => 
        s.id === id ? { ...s, status: ServiceStatus.IN_TRANSIT } : s
    );
    setServices(updatedServices);
    alert("Transporte despachado y validado.");
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/80 p-6 rounded-3xl border border-neutral-800">
        <div>
          <h2 className="text-3xl font-black font-outfit uppercase tracking-tighter italic">Operaciones: <span className="text-rose-500">Validación</span></h2>
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mt-1">Control de Pagos y Transporte</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-neutral-950 p-2 rounded-2xl border border-neutral-800">
          <button onClick={() => setActiveTab('pending')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'pending' ? 'bg-rose-600 text-white shadow-lg' : 'text-neutral-500'}`}>PENDIENTES</button>
          <button onClick={() => setActiveTab('active')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'active' ? 'bg-rose-600 text-white shadow-lg' : 'text-neutral-500'}`}>EN RUTA</button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {services.filter(s => activeTab === 'pending' ? s.status !== ServiceStatus.IN_TRANSIT : s.status === ServiceStatus.IN_TRANSIT).map((service) => (
          <div key={service.id} className="bg-neutral-900 border border-neutral-800 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-rose-500/30 transition-all">
            <div className="flex items-center space-x-6 w-full md:w-auto">
              <div className={`p-4 rounded-2xl ${service.isNew ? 'bg-rose-500/10 text-rose-500 animate-pulse' : 'bg-neutral-800 text-neutral-400'}`}>
                <FileText size={24} />
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest italic">{service.id}</span>
                  {service.isNew && <span className="bg-rose-600 text-[8px] font-black px-2 py-0.5 rounded-full text-white uppercase tracking-tighter italic">Usuario Nuevo</span>}
                </div>
                <h4 className="text-2xl font-black font-outfit text-white uppercase italic tracking-tighter">{service.client} <span className="text-neutral-600 font-normal">w/</span> {service.model}</h4>
                <div className="flex items-center space-x-4 mt-2 text-neutral-500 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center"><Clock size={12} className="mr-1 text-rose-500" />{service.time}</div>
                  <div className="flex items-center"><MapPin size={12} className="mr-1 text-rose-500" />{service.location}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
              {service.status === ServiceStatus.VALIDATING_PAYMENT ? (
                <button onClick={() => setValidatingService(service)} className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-rose-600/20 transition-all border-b-4 border-rose-800">VALIDAR PAGO</button>
              ) : service.status === ServiceStatus.READY_FOR_TRANSPORT ? (
                <button onClick={() => handleDispatch(service.id)} className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-green-600/20 transition-all border-b-4 border-green-800">VALIDAR TRANSPORTE</button>
              ) : (
                <div className="px-6 py-4 bg-neutral-950 rounded-2xl border border-neutral-800 text-[9px] font-black text-green-500 uppercase tracking-widest flex items-center">
                    <Truck size={14} className="mr-2" /> EN CAMINO
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {validatingService && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
           <div className="bg-neutral-900 border-2 border-rose-500/40 p-10 rounded-[4rem] max-w-xl w-full space-y-8 shadow-2xl">
              <div className="text-center">
                 <ShieldCheck size={64} className="text-rose-500 mx-auto mb-4" />
                 <h2 className="text-4xl font-black font-outfit text-white uppercase italic tracking-tighter">Validar Comprobante</h2>
                 <p className="text-neutral-500 font-black uppercase tracking-widest text-[10px] mt-2 italic">{validatingService.client}</p>
              </div>
              <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-neutral-800">
                 <img src={validatingService.proofUrl} className="w-full h-full object-cover" alt="Comprobante" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setValidatingService(null)} className="py-5 bg-neutral-800 rounded-2xl font-black uppercase text-[10px] text-neutral-400">CANCELAR</button>
                 <button onClick={() => handleValidatePayment(validatingService)} className="py-5 bg-rose-600 rounded-2xl font-black uppercase text-[10px] text-white shadow-xl shadow-rose-600/20">APROBAR PAGO</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default OperationsDashboard;