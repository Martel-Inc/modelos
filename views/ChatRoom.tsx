import React, { useState, useRef, useEffect } from 'react';
import { Send, Shield, Lock, MapPin, MoreVertical, Phone } from 'lucide-react';

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'system', content: 'Tu conversación está cifrada de extremo a extremo y es monitoreada por Admin para tu seguridad.', time: '12:00' },
    { id: '2', sender: 'client', content: 'Hola Valeria, ¿cómo vas? Ya estoy en la habitación.', time: '12:05' },
    { id: '3', sender: 'model', content: '¡Hola! Ya estoy en camino, el transporte de Martel me avisó que llegamos en 5 min.', time: '12:06' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { 
      id: Date.now().toString(), 
      sender: 'model', 
      content: input, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <header className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
         <div className="flex items-center space-x-3">
            <div className="relative">
                <img src="https://picsum.photos/seed/client/100/100" className="w-10 h-10 rounded-full border border-neutral-800" alt="" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-950"></div>
            </div>
            <div>
                <h3 className="font-bold text-sm">Cliente: Javier M.</h3>
                <div className="flex items-center text-[10px] text-neutral-500">
                    <Lock size={8} className="mr-1" />
                    <span>Chat Seguro Activo</span>
                </div>
            </div>
         </div>
         <div className="flex items-center space-x-3 text-neutral-500">
            <button className="p-2 hover:bg-neutral-800 rounded-full"><Phone size={18} /></button>
            <button className="p-2 hover:bg-neutral-800 rounded-full"><MapPin size={18} /></button>
            <button className="p-2 hover:bg-neutral-800 rounded-full"><MoreVertical size={18} /></button>
         </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
         {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'model' ? 'justify-end' : m.sender === 'system' ? 'justify-center' : 'justify-start'}`}>
               {m.sender === 'system' ? (
                  <div className="bg-rose-500/10 text-rose-500 text-[10px] px-4 py-2 rounded-full border border-rose-500/20 font-bold uppercase tracking-wider text-center max-w-xs">
                     <Shield size={10} className="inline mr-1" />
                     {m.content}
                  </div>
               ) : (
                  <div className={`max-w-[70%] p-4 rounded-2xl ${
                     m.sender === 'model' ? 'bg-rose-600 text-white rounded-tr-none' : 'bg-neutral-800 text-neutral-300 rounded-tl-none'
                  }`}>
                     <p className="text-sm">{m.content}</p>
                     <span className="text-[9px] opacity-60 mt-1 block text-right">{m.time}</span>
                  </div>
               )}
            </div>
         ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-neutral-950 border-t border-neutral-800">
         <div className="flex items-center space-x-3">
            <input 
                type="text" 
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="Escribe un mensaje seguro..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button 
                onClick={handleSend}
                className="bg-rose-600 hover:bg-rose-500 p-3 rounded-xl text-white transition-all"
            >
                <Send size={20} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default ChatRoom;