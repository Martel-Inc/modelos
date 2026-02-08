
import React, { useState } from 'react';
import { Star, Smartphone, Video, Upload, Trash2, Instagram, Facebook, ShieldAlert, CheckCircle2, Power } from 'lucide-react';
import { Model } from '../types';

const ModelProfile: React.FC = () => {
  const [status, setStatus] = useState<'available' | 'busy' | 'offline'>('available');
  const [adminStatus, setAdminStatus] = useState<Model['adminStatus']>('active');

  const handleStatusChange = (newStatus: 'available' | 'busy' | 'offline') => {
    if (newStatus === 'available' && adminStatus !== 'active') {
      alert("Tu cuenta está suspendida por administración.");
      return;
    }
    setStatus(newStatus);
  };

  return (
    <div className="space-y-12 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-neutral-900 pb-10">
        <div className="flex items-center space-x-8">
          <div className="relative">
            <img src="https://picsum.photos/seed/model_profile/200/200" className="w-40 h-40 rounded-[2.5rem] object-cover border-4 border-neutral-800 shadow-2xl" alt="Profile" />
            <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-4 border-neutral-950 ${
              status === 'available' ? 'bg-green-500 animate-pulse' : status === 'busy' ? 'bg-amber-500' : 'bg-neutral-600'
            }`}></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-5xl font-black font-outfit uppercase tracking-tighter italic">MI <span className="text-rose-500">DISPONIBILIDAD</span></h2>
            <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest italic">Gestiona tu estatus en tiempo real</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-neutral-900 p-3 rounded-[2rem] border-2 border-neutral-800 shadow-xl">
           <button onClick={() => handleStatusChange('available')} className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${status === 'available' ? 'bg-green-600 text-white shadow-lg' : 'text-neutral-500 hover:text-white'}`}>ACTIVA</button>
           <button onClick={() => handleStatusChange('busy')} className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${status === 'busy' ? 'bg-amber-500 text-white shadow-lg' : 'text-neutral-500 hover:text-white'}`}>EN CITA</button>
           <button onClick={() => handleStatusChange('offline')} className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${status === 'offline' ? 'bg-neutral-700 text-white' : 'text-neutral-500 hover:text-white'}`}>OFFLINE</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-neutral-900 p-10 rounded-[3rem] border border-neutral-800 shadow-2xl space-y-6">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center">
                <CheckCircle2 className="text-rose-500 mr-3" /> Estatus Actual
            </h3>
            <div className={`p-8 rounded-2xl border-2 ${status === 'available' ? 'bg-green-500/10 border-green-500/50' : 'bg-neutral-950 border-neutral-800'}`}>
                <p className="text-center font-black text-3xl uppercase tracking-tighter italic">
                    {status === 'available' ? 'ESTÁS RECIBIENDO CITAS' : status === 'busy' ? 'OCUPADA ACTUALMENTE' : 'DESCONECTADA'}
                </p>
            </div>
         </div>
         
         <div className="bg-neutral-900 p-10 rounded-[3rem] border border-neutral-800 shadow-2xl flex flex-col items-center justify-center text-center space-y-4">
            <ShieldAlert size={48} className="text-neutral-700" />
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Recuerda actualizar tu estatus al terminar cada servicio para seguir apareciendo en el catálogo.</p>
         </div>
      </div>
    </div>
  );
};

export default ModelProfile;