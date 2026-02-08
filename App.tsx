import React, { useState } from 'react';
// Correct imports from react-router-dom for routing and navigation
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole } from './types';
import Catalog from './views/Catalog';
import AdminDashboard from './views/AdminDashboard';
import ModelProfile from './views/ModelProfile';
import OperationsDashboard from './views/OperationsDashboard';
import RegistrationFlow from './views/RegistrationFlow';
import Sidebar from './components/Sidebar';
import ChatRoom from './views/ChatRoom';
import Login from './views/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-black/10 text-white flex relative">
        {user && <Sidebar user={user} language={language} setLanguage={setLanguage} />}
        
        <main className={`flex-1 overflow-auto ${user ? 'ml-0 md:ml-64 p-4 md:p-8' : ''}`}>
          <Routes>
            <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/catalog" />} />
            <Route path="/register-model" element={<RegistrationFlow />} />
            
            {/* Redirigir siempre al catálogo por defecto */}
            <Route path="/" element={<Navigate to="/catalog" />} />

            <Route path="/admin/*" element={
              user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/login" />
            } />

            <Route path="/model/*" element={
              user?.role === UserRole.MODEL ? <ModelProfile /> : <Navigate to="/login" />
            } />

            <Route path="/operations/*" element={
              (user?.role === UserRole.OPERATIONS || user?.role === UserRole.ADMIN) ? <OperationsDashboard /> : <Navigate to="/login" />
            } />

            <Route path="/catalog" element={<Catalog user={user} onLoginSuccess={handleLogin} />} />
            <Route path="/chat/:partnerId" element={user ? <ChatRoom /> : <Navigate to="/login" />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;