
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole, User } from '../types';
import { Lock, Mail, Shield, ArrowRight, UserPlus, Fingerprint } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDemoLogin = (role: UserRole) => {
    setIsLoading(true);
    // Simulación de delay de autenticación
    setTimeout(() => {
      const demoUser: User = {
        id: `demo-${role.toLowerCase()}`,
        name: role === UserRole.ADMIN ? 'Eleazar (Admin)' : `Usuario ${role}`,
        email: `${role.toLowerCase()}@martel.com`,
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`
      };
      onLogin(demoUser);
      setIsLoading(false);
      
      // Redirección basada en rol
      if (role === UserRole.ADMIN) navigate('/admin');
      else if (role === UserRole.MODEL) navigate('/model');
      else if (role === UserRole.OPERATIONS) navigate('/operations');
      else navigate('/catalog');
    }, 800);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-neutral-900/40 backdrop-blur-2xl border-2 border-neutral-800 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
        
        {/* Luces de acento decorativas */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-600/20 blur-[100px] rounded-full group-hover:bg-rose-600/30 transition-all duration-700"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-600/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10 space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 bg-rose-600/10 rounded-2xl border border-rose-500/20 text-rose-500 mb-2">
                <Fingerprint size={40} />
            </div>
            <h2 className="text-5xl font-black font-outfit text-white italic tracking-tighter uppercase leading-none">
              BIENVENIDO A <span className="text-rose-500 block">MARTEL</span>
            </h2>
            <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.4em]">Acceso Restringido • Solo Personal Autorizado</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Credenciales</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                <input 
                  type="email" 
                  className="w-full bg-black/40 border-2 border-neutral-800 rounded-2xl py-5 pl-14 pr-6 text-white font-bold outline-none focus:border-rose-500 transition-all placeholder:text-neutral-700" 
                  placeholder="ID de Usuario o Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-black/40 border-2 border-neutral-800 rounded-2xl py-5 pl-14 pr-6 text-white font-bold outline-none focus:border-rose-500 transition-all placeholder:text-neutral-700" 
                  placeholder="Contraseña de Seguridad"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-rose-600 hover:bg-rose-500 py-6 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-xl shadow-rose-600/20 transition-all flex items-center justify-center space-x-3 border-b-4 border-rose-800 active:translate-y-1 disabled:opacity-50"
            >
              {isLoading ? 'VERIFICANDO...' : (
                <>
                  <span>INICIAR SESIÓN</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          <div className="pt-8 border-t border-neutral-800/50">
            <p className="text-[10px] text-neutral-600 font-black uppercase text-center tracking-widest mb-6">Modos de Prueba (Acceso Rápido)</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleDemoLogin(UserRole.ADMIN)} className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-[9px] font-black uppercase tracking-tighter text-neutral-300 transition-all border border-neutral-700">Administrador</button>
              <button onClick={() => handleDemoLogin(UserRole.OPERATIONS)} className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-[9px] font-black uppercase tracking-tighter text-neutral-300 transition-all border border-neutral-700">Operaciones</button>
              <button onClick={() => handleDemoLogin(UserRole.MODEL)} className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-[9px] font-black uppercase tracking-tighter text-neutral-300 transition-all border border-neutral-700">Modelo</button>
              <button onClick={() => handleDemoLogin(UserRole.CLIENT)} className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-[9px] font-black uppercase tracking-tighter text-neutral-300 transition-all border border-neutral-700">Cliente VIP</button>
            </div>
          </div>

          <div className="text-center">
            <Link to="/register-model" className="inline-flex items-center space-x-2 text-rose-500 hover:text-rose-400 transition-all">
                <UserPlus size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest italic">¿Quieres ser una de nuestras modelos? Regístrate aquí</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;