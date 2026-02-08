import React, { useState } from 'react';
import { Shield, Star, DollarSign, Settings, Power, MapPin, Activity } from 'lucide-react';

const ModelProfile: React.FC = () => {
  const [status, setStatus] = useState<'available' | 'busy'>('available');

  const toggleStatus = () => {
    setStatus(status === 'available' ? 'busy' : 'available');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header className="flex flex-col md:flex-row items-center justify-between border-b border-neutral-800 pb-10 gap-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-3xl object-cover bg-neutral-800 border-2 border-neutral-700 shadow-2xl overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=ModelElena" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-rose-500 mb-1">
                <Activity size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Perfil Verificado</span>
            </div>
            <h1 className="text-4xl font-black font-outfit uppercase tracking-tighter italic">PANEL <span className="text-rose-500">MODELO</span></h1>
            <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Elena - ID: M-209</p>
          </div>
        </div>
        <button className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 text-white hover:bg-neutral-800 transition-all">
            <Settings size={20} />
        </button>
      </header>

      {/* DISPONIBILIDAD APP */}
      <div className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ${status === 'available' ? 'bg-green-500/5 border-green-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
        <div className="flex items-center space-x-6">
            <div className={`p-5 rounded-2xl transition-all duration-500 ${status === 'available' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-rose-600 text-white shadow-lg shadow-rose-600/20 animate-pulse'}`}>
                <Power size={28} />
            </div>
            <div>
                <h3 className="text-xl font-black font-outfit uppercase italic tracking-tighter text-white">
                    MI ESTADO: {status === 'available' ? <span className="text-green-500">DISPONIBLE</span> : <span className="text-rose-500">EN SERVICIO / OCUPADA</span>}
                </h3>
                <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mt-1">
                    {status === 'available' ? 'Activa para recibir nuevas reservas de clientes.' : 'Tu perfil está oculto del catálogo público temporalmente.'}
                </p>
            </div>
        </div>
        <button 
            onClick={toggleStatus}
            className={`w-full md:w-auto px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all border-b-4 active:translate-y-1 shadow-xl ${status === 'available' ? 'bg-neutral-800 text-white hover:bg-neutral-700 border-neutral-900' : 'bg-rose-600 text-white hover:bg-rose-500 border-rose-800'}`}
        >
            {status === 'available' ? 'PONERME OCUPADA' : 'PONERME DISPONIBLE'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900/40 p-8 rounded-[2.5rem] border border-neutral-800 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Información de Cuenta</span>
                  <div className="flex items-center text-rose-500 font-black"><Star size={14} className="mr-1 fill-current" /> 4.9</div>
              </div>
              <div className="flex items-center justify-between">
                  <div className="space-y-1">
                      <p className="text-[9px] font-black text-neutral-500 uppercase tracking-tighter">Comisión Base</p>
                      <p className="text-2xl font-black text-white italic">20% <span className="text-[10px] text-neutral-600">VIP</span></p>
                  </div>
                  <div className="bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                      <p className="text-[8px] font-black text-green-500 uppercase tracking-widest text-center">Estatus</p>
                      <p className="text-[10px] font-black text-white text-center uppercase">Activa</p>
                  </div>
              </div>
          </div>

          <div className="bg-neutral-900/40 p-8 rounded-[2.5rem] border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Ingresos Recientes</span>
                  <DollarSign size={16} className="text-rose-500" />
              </div>
              <div>
                  <h4 className="text-4xl font-black font-outfit italic tracking-tighter text-white">$4,800 <span className="text-[10px] text-neutral-500 font-normal not-italic uppercase tracking-widest">MXN / HOY</span></h4>
                  <button className="text-[9px] font-black uppercase text-rose-500 hover:text-rose-400 mt-2 tracking-widest flex items-center">
                    Ver historial completo <Settings size={10} className="ml-1" />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ModelProfile;