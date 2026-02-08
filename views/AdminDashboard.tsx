import React from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShieldAlert, 
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Ingresos Mes', value: '$452,300', icon: DollarSign, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { label: 'Modelos Activas', value: '42', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Citas Hoy', value: '18', icon: Calendar, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Incidencias', value: '0', icon: ShieldAlert, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-5xl font-black font-outfit uppercase tracking-tighter italic">Panel de <span className="text-rose-500">Control Central</span></h2>
        <p className="text-neutral-500 text-sm font-bold uppercase tracking-[0.3em] mt-2">Visión General de la Agencia</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-neutral-900 p-8 rounded-[2.5rem] border border-neutral-800 shadow-xl relative overflow-hidden group">
            <div className={`${s.bg} ${s.color} p-4 rounded-2xl w-fit mb-6`}><s.icon size={24} /></div>
            <p className="text-[10px] text-neutral-500 uppercase font-black tracking-widest mb-1">{s.label}</p>
            <h3 className="text-4xl font-black font-outfit text-white tracking-tighter italic">{s.value}</h3>
            <ArrowUpRight className="absolute top-8 right-8 text-neutral-800 group-hover:text-rose-500 transition-all" size={24} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-[3rem] space-y-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-black font-outfit uppercase tracking-tighter italic">Solicitudes <span className="text-rose-500">Nuevas</span></h4>
            <button className="text-[10px] font-black uppercase text-neutral-500 hover:text-rose-500 transition-all">Ver Todas</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-neutral-950 rounded-2xl border border-neutral-800">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neutral-800 rounded-xl overflow-hidden"><img src={`https://picsum.photos/seed/req${i}/100/100`} alt="" /></div>
                  <div>
                    <p className="text-sm font-black uppercase italic">Candidata #{i}04</p>
                    <p className="text-[9px] text-neutral-500 uppercase font-bold">Enviada hace 2 horas</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-rose-600/10 text-rose-500 rounded-lg text-[9px] font-black uppercase tracking-widest">Revisar</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-[3rem] space-y-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-black font-outfit uppercase tracking-tighter italic text-rose-500">Alertas <span className="text-white">Operativas</span></h4>
          </div>
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 text-neutral-700">
             <CheckCircle2 size={48} />
             <p className="font-black uppercase text-[10px] tracking-widest italic">Todo el ecosistema Martel está operando sin contratiempos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;