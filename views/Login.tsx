import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole, User } from '../types';
import { Lock, Mail, ArrowRight, UserPlus, Fingerprint } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulación de autenticación (sin botones demo, solo flujo de formulario)
    setTimeout(() => {
        setIsLoading(false);
        alert("Integración de backend requerida para el inicio de sesión real.");
    }, 1000);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-neutral-900/40 backdrop-blur-2xl border-2 border-neutral-800 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-600/20 blur-[100px] rounded-full"></div>

        <div className="relative z-10 space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 bg-rose-600/10 rounded-2xl border border-rose-500/20 text-rose-500 mb-2">
                <Fingerprint size={40} />
            </div>
            <h2 className="text-5xl font-black font-outfit text-white italic tracking-tighter uppercase leading-none">
              BIENVENIDO A <span className="text-rose-500 block">MARTEL</span>
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Credenciales</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                <input 
                  type="email" 
                  className="w-full bg-black/40 border-2 border-neutral-800 rounded-2xl py-5 pl-14 pr-6 text-white font-bold outline-none focus:border-rose-500 transition-all placeholder:text-neutral-700" 
                  placeholder="Email o Usuario"
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
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-rose-600 hover:bg-rose-500 py-6 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-xl shadow-rose-600/20 transition-all flex items-center justify-center space-x-3 border-b-4 border-rose-800 active:translate-y-1 disabled:opacity-50"
            >
              <span>{isLoading ? 'VERIFICANDO...' : 'INICIAR SESIÓN'}</span>
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="space-y-4">
            <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-neutral-200 transition-colors">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                <span>Continuar con Google</span>
            </button>
          </div>

          <div className="text-center pt-6 border-t border-neutral-800">
            <Link to="/register-model" className="inline-flex items-center space-x-2 text-rose-500 hover:text-rose-400 transition-all">
                <UserPlus size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest italic">¿No tienes cuenta? Regístrate aquí</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;