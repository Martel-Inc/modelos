
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Model, User, UserRole } from '../types';
import { 
    Star, MapPin, Search, Menu, User as UserIcon, Truck, 
    ShieldAlert, ChevronLeft, ChevronRight, Lock, UserPlus, LogIn, Calendar, ArrowRight, LayoutDashboard, Heart, X as XIcon, Info
} from 'lucide-react';
import { SERVICE_TYPES } from '../constants';

const GENERATE_MOCK_MODELS = (): Partial<Model>[] => {
  const names = ['Elena', 'Valeria', 'Camila', 'Sofia', 'Lucia', 'Isabella', 'Marta', 'Mariana', 'Jimena', 'Daniela', 'Renata', 'Ximena', 'Paula', 'Victoria', 'Andrea', 'Natalia', 'Gabriela'];
  const cities = ['Cancún', 'Playa del Carmen', 'Tulum', 'Mérida'];
  
  const descriptions = [
    "Modelo profesional con amplia experiencia en eventos de alto nivel.",
    "Elegancia y distinción en cada detalle de mi servicio premium.",
    "Una combinación perfecta de belleza, inteligencia y energía vibrante.",
    "Sofisticación, encanto natural y una presencia que cautiva."
  ];

  return names.map((name, index) => ({
    id: `m${index + 1}`,
    name: name, // Restauramos los nombres originales
    age: 19 + Math.floor(Math.random() * 7),
    city: cities[index % cities.length],
    state: 'Quintana Roo',
    description: descriptions[index % descriptions.length],
    rating: parseFloat((4.6 + Math.random() * 0.4).toFixed(1)),
    status: Math.random() > 0.3 ? 'available' : 'busy',
    avatar: `fotos modelos/${index + 1}.jpg`, // Foto 1 del folder
    photos: [
      `fotos modelos/${index + 1}.jpg`, // Foto 1 como principal
      `https://picsum.photos/seed/martel_p2_${index}/600/900`,
      `https://picsum.photos/seed/martel_p3_${index}/600/900`
    ],
    services: SERVICE_TYPES.slice(0, 3)
  }));
};

const ModelCard: React.FC<{ model: Partial<Model>, user: User | null, onSelect: (m: Partial<Model>) => void }> = ({ model, user, onSelect }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const navigate = useNavigate();

  const handleNav = (direction: 'prev' | 'next', e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (model.photos) {
      if (direction === 'next') {
        setCurrentPhoto((prev) => (prev + 1) % model.photos!.length);
      } else {
        setCurrentPhoto((prev) => (prev - 1 + model.photos!.length) % model.photos!.length);
      }
    }
  };

  return (
    <div className="group relative h-[550px] bg-neutral-900 rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-800 hover:border-rose-500/50 transition-all duration-300">
      <img 
        src={model.photos?.[currentPhoto] || model.avatar} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        alt={model.name}
        onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/martel_${model.name}/600/900`;
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-0 z-20 flex">
        <div className="w-1/3 h-full cursor-w-resize" onClick={(e) => handleNav('prev', e)}></div>
        <div className="w-1/3 h-full cursor-pointer" onClick={() => onSelect(model)}></div>
        <div className="w-1/3 h-full cursor-e-resize" onClick={(e) => handleNav('next', e)}></div>
      </div>
      <div className="absolute top-3 left-3 right-3 flex space-x-1 z-30 pointer-events-none">
        {model.photos?.map((_, idx) => (
          <div key={idx} className={`h-1 flex-1 rounded-full ${idx === currentPhoto ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 z-30 pointer-events-none">
         <div className="flex items-end justify-between mb-2">
            <div>
                <h3 className="text-3xl font-black font-outfit text-white italic tracking-tighter leading-none">{model.name} <span className="text-2xl text-rose-500 font-normal">{model.age}</span></h3>
                <div className="flex items-center text-neutral-300 text-[10px] font-black mt-1 uppercase tracking-widest">
                  <MapPin size={12} className="text-rose-500 mr-1" />{model.city}
                </div>
            </div>
            <button className="bg-rose-600 p-3 rounded-full shadow-lg shadow-rose-600/40 pointer-events-auto" onClick={(e) => { e.stopPropagation(); onSelect(model); }}><ArrowRight size={20} className="text-white" /></button>
         </div>
      </div>
    </div>
  );
};

const Catalog: React.FC<{ user: User | null }> = ({ user }) => {
  const [selectedModel, setSelectedModel] = useState<Partial<Model> | null>(null);
  const [models, setModels] = useState<Partial<Model>[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setModels(GENERATE_MOCK_MODELS());
  }, []);

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center justify-between py-6 border-b-2 border-rose-500/20 sticky top-0 backdrop-blur-3xl z-[60] -mx-4 md:-mx-8 px-4 md:px-8 bg-black/90">
        <Link to="/" className="flex items-center space-x-4">
          <h1 className="text-4xl md:text-5xl font-black font-outfit text-white italic tracking-tighter uppercase leading-none">MARTEL <span className="text-rose-500">AGENCY</span></h1>
        </Link>
        <button onClick={() => navigate('/login')} className="p-3 bg-neutral-900 rounded-2xl border-2 border-neutral-800 text-rose-500 transition-all"><UserIcon size={24} /></button>
      </header>

      <div className="pt-16 px-4 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {models.map(m => (
            <ModelCard key={m.id} model={m} user={user} onSelect={setSelectedModel} />
          ))}
        </div>
      </div>

      {selectedModel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl" onClick={() => setSelectedModel(null)}>
          <div className="relative w-full max-w-7xl bg-neutral-950 border-2 border-neutral-800 rounded-[4rem] overflow-hidden flex flex-col md:flex-row max-h-[95vh] shadow-2xl" onClick={e => e.stopPropagation()}>
             <div className="md:w-1/2 bg-black relative">
                <img 
                    src={selectedModel.photos?.[0] || selectedModel.avatar} 
                    className="w-full h-full object-cover" 
                    alt="" 
                />
             </div>
             <div className="md:w-1/2 p-14 space-y-12 overflow-y-auto custom-scrollbar bg-neutral-900/30">
                <div className="flex justify-between items-start">
                   <div>
                       <h2 className="text-8xl font-black font-outfit text-white italic tracking-tighter uppercase leading-none">{selectedModel.name}</h2>
                       <p className="text-4xl font-black text-rose-500 font-outfit mt-4 uppercase tracking-tighter">{selectedModel.age} AÑOS</p>
                   </div>
                   <button onClick={() => setSelectedModel(null)} className="p-5 bg-neutral-800 hover:bg-rose-600 rounded-full text-white transition-all text-4xl">&times;</button>
                </div>
                <p className="text-neutral-300 text-xl leading-relaxed font-medium italic border-l-4 border-rose-500 pl-8 bg-neutral-950/80 py-8 rounded-r-[3rem]">"{selectedModel.description}"</p>
                <button onClick={() => navigate('/login')} className="w-full bg-rose-600 hover:bg-rose-500 py-10 rounded-[3rem] font-black text-3xl uppercase tracking-widest text-white shadow-2xl transition-all italic flex items-center justify-center space-x-6 border-b-8 border-rose-800">
                  <Calendar size={40} /><span>RESERVAR AHORA</span>
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;