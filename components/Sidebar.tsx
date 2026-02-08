
import React from 'react';
// Correctly import Link and useLocation from react-router-dom
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Image as ImageIcon, 
  LogOut, 
  Truck, 
  User as UserIcon,
  Star,
  Globe,
  DollarSign,
  ShieldCheck,
  Share2,
  List,
  UserCheck,
  MessageSquare,
  FileText,
  AlertTriangle,
  PieChart,
  Video,
  Cloud
} from 'lucide-react';
import { User, UserRole } from '../types';

const Sidebar: React.FC<{ 
  user: User; 
  language: 'es' | 'en'; 
  setLanguage: React.Dispatch<React.SetStateAction<'es' | 'en'>> 
}> = ({ user, language, setLanguage }) => {
  const location = useLocation();
  const menu = {
    [UserRole.ADMIN]: [
      { p: '/admin', i: LayoutDashboard, l: 'Dashboard' }, 
      { p: '/admin/applications', i: UserCheck, l: 'Solicitudes' },
      { p: '/admin/operations', i: Truck, l: 'Operaciones' },
      { p: '/admin/users', i: UserIcon, l: 'Modelos y Tarifas' },
      { p: '/admin/clients', i: Users, l: 'Clientes' },
      { p: '/admin/gallery', i: Cloud, l: 'Nube de Fotos' },
      { p: '/admin/finances', i: PieChart, l: 'Finanzas' },
      { p: '/admin/complaints', i: AlertTriangle, l: 'Quejas' },
      { p: '/admin/content', i: Video, l: 'Contenido' },
      { p: '/admin/messages', i: MessageSquare, l: 'Mensajes' },
      { p: '/admin/services', i: List, l: 'Servicios Globales' },
    ],
    [UserRole.OPERATIONS]: [
      { p: '/operations', i: LayoutDashboard, l: 'Citas' }, 
      { p: '/operations/transport', i: Truck, l: 'Transporte' },
      { p: '/operations/validation', i: UserCheck, l: 'Validaciones' }
    ],
    [UserRole.MODEL]: [
      { p: '/model', i: UserIcon, l: 'Mi Perfil' }, 
      { p: '/model/earnings', i: Star, l: 'Ganancias' }
    ],
    [UserRole.CLIENT]: [
      { p: '/catalog', i: ImageIcon, l: 'Catálogo' }
    ]
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-neutral-900 border-r border-neutral-800 z-[1000] hidden md:flex flex-col shadow-2xl">
      <div className="p-8">
        <div className="flex flex-col items-center text-center space-y-2 mb-8 relative z-[1010]">
          <h1 className="text-2xl font-black font-outfit text-white italic tracking-tighter uppercase leading-none">
            <span className="text-rose-500 block text-3xl">MARTEL</span> 
            AGENCY
          </h1>
          <div className="h-1 w-12 bg-rose-600 rounded-full mt-2"></div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="px-4 py-2 text-[9px] font-black text-neutral-600 uppercase tracking-[0.3em]">Gestión</p>
        {(menu[user.role] || []).map((item) => (
          <Link key={item.p} to={item.p} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${location.pathname === item.p ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
            <item.i size={20} />
            <span className="font-black uppercase text-[10px] tracking-widest italic">{item.l}</span>
          </Link>
        ))}

        <div className="pt-8 space-y-2">
            <p className="px-4 py-2 text-[9px] font-black text-neutral-600 uppercase tracking-[0.3em]">Público</p>
            <Link to="/catalog" className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${location.pathname === '/catalog' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                <Globe size={20} className="text-rose-500" />
                <span className="font-black uppercase text-[10px] tracking-widest italic">Ver Catálogo</span>
            </Link>
        </div>
      </nav>

      <div className="p-6 border-t border-neutral-800 space-y-6">
        <div className="flex items-center space-x-4 px-2">
          <div className="relative">
            <img src={user.avatar || 'https://placehold.co/40'} className="w-12 h-12 rounded-2xl object-cover border-2 border-neutral-700" alt="" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black uppercase truncate text-white">{user.name}</p>
            <p className="text-[8px] text-rose-500 font-black uppercase tracking-widest italic">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;