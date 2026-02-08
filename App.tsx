
import React, { useState } from 'react';
// Correctly import from react-router-dom for version 6
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole } from './types';
import Catalog from './views/Catalog';
import AdminDashboard from './views/AdminDashboard';
import ModelProfile from './views/ModelProfile';
import OperationsDashboard from './views/OperationsDashboard';
import RegistrationFlow from './views/RegistrationFlow';
import Sidebar from './components/Sidebar';
import ChatRoom from './views/ChatRoom';

const App: React.FC = () => {
  // Usuario administrador por defecto para omitir el login y dar acceso total
  // Se identifica como Eleazar según lo solicitado anteriormente
  const defaultUser: User = {
    id: 'admin_eleazar',
    name: 'Eleazar (Admin)',
    email: 'admin@martel.com',
    role: UserRole.ADMIN,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Eleazar`
  };
  
  const [user] = useState<User | null>(defaultUser);
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  // El administrador tiene acceso a todas las rutas protegidas
  const ProtectedRoute = ({ children, allowedRoles }: { children?: React.ReactNode, allowedRoles: UserRole[] }) => {
    if (!user) return <Navigate to="/catalog" />;
    if (user.role === UserRole.ADMIN || allowedRoles.includes(user.role)) return <>{children}</>;
    return <Navigate to="/catalog" />;
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-black/10 text-white flex relative">
        {user && <Sidebar user={user} language={language} setLanguage={setLanguage} />}
        
        <main className={`flex-1 overflow-auto p-4 md:p-8 ${user ? 'ml-0 md:ml-64' : ''}`}>
          <Routes>
            {/* La aplicación ahora inicia directamente en el Catálogo */}
            <Route path="/catalog" element={<Catalog user={user} />} />
            
            <Route path="/register-model" element={<RegistrationFlow />} />
            
            <Route path="/" element={<Navigate to="/catalog" />} />

            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/model/*" element={
              <ProtectedRoute allowedRoles={[UserRole.MODEL]}>
                <ModelProfile />
              </ProtectedRoute>
            } />

            <Route path="/operations/*" element={
              <ProtectedRoute allowedRoles={[UserRole.OPERATIONS]}>
                <OperationsDashboard />
              </ProtectedRoute>
            } />

            <Route path="/chat/:partnerId" element={
                <ProtectedRoute allowedRoles={[UserRole.MODEL, UserRole.CLIENT, UserRole.ADMIN]}>
                    <ChatRoom />
                </ProtectedRoute>
            } />
            
            {/* Redirección global al catálogo para cualquier ruta no encontrada */}
            <Route path="*" element={<Navigate to="/catalog" />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;