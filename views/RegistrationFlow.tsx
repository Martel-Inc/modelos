
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, CheckCircle, Shield, AlertCircle, ArrowRight, ArrowLeft, Trash2, Plus, CheckSquare, Square } from 'lucide-react';
import { PHOTO_CATEGORIES, SERVICE_TYPES } from '../constants';

const RegistrationFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    address: '', // Dirección/Ubicación
    phone: '',
    age: '',
    // Datos Físicos
    skinTone: '', // Tez
    bodyType: '', // Complexión
    height: '', // Estatura
    sexualPref: '', // Preferencia Sexual
    description: '', // 3-5 renglones
    services: [] as string[], // Servicios seleccionados
    photos: Array(10).fill(null),
    consent: false // Checkbox legal
  });
  
  const navigate = useNavigate();

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const newPhotos = [...formData.photos];
      newPhotos[index] = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, photos: newPhotos });
    }
  };

  const toggleService = (serviceId: string) => {
    const current = formData.services;
    if (current.includes(serviceId)) {
      setFormData({ ...formData, services: current.filter(id => id !== serviceId) });
    } else {
      setFormData({ ...formData, services: [...current, serviceId] });
    }
  };

  const nextStep = () => {
    if (step === 1) {
       if (!formData.name || !formData.address || !formData.phone || !formData.age || !formData.skinTone || !formData.bodyType || !formData.height || !formData.sexualPref) {
           alert("Por favor completa todos los datos personales y físicos obligatorios.");
           return;
       }
    }
    if (step === 2) {
        if (!formData.description || formData.services.length === 0) {
            alert("Debes escribir una descripción y seleccionar al menos un servicio.");
            return;
        }
    }
    if (step === 3) {
      // Validar 5 fotos obligatorias
      const mandatoryPhotos = formData.photos.slice(0, 5);
      const allMandatoryUploaded = mandatoryPhotos.every(p => p !== null && p !== '');
      
      if (!allMandatoryUploaded) {
        alert("ALERTA: Debes subir obligatoriamente las primeras 5 fotos (Rostro, Vestido, Traje de Baño, Espaldas, Perfil) para continuar.");
        return;
      }
      
      if (!formData.consent) {
          alert("Debes autorizar el uso de tu información y contenido a Martel Agency para procesar tu solicitud.");
          return;
      }

      // Finalizar
      alert("Solicitud Enviada a Admin para Revisión.");
      navigate('/');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen py-12 px-4 bg-transparent">
      <div className="relative max-w-5xl mx-auto z-10">
        <div className="bg-neutral-950/90 border-2 border-neutral-800 rounded-[3rem] p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black font-outfit text-white uppercase italic tracking-tighter">
              SOLICITUD <span className="text-rose-500">MARTEL</span>
            </h2>
            <div className="flex items-center justify-center space-x-2 mt-4">
                <div className={`h-2 w-12 rounded-full ${step >= 1 ? 'bg-rose-500' : 'bg-neutral-800'}`}></div>
                <div className={`h-2 w-12 rounded-full ${step >= 2 ? 'bg-rose-500' : 'bg-neutral-800'}`}></div>
                <div className={`h-2 w-12 rounded-full ${step >= 3 ? 'bg-rose-500' : 'bg-neutral-800'}`}></div>
            </div>
            <p className="text-neutral-500 text-[10px] mt-2 uppercase tracking-[0.3em] font-bold">Paso {step} de 3</p>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <h3 className="text-xl font-black text-white uppercase italic border-b border-neutral-800 pb-4">Datos Personales y Físicos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Columna 1 */}
                <div className="space-y-5">
                  <div>
                    <label className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-1">Nombre Completo / Artístico</label>
                    <input className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-rose-500 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-1">Dirección / Ubicación</label>
                    <input className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-rose-500 transition-all" placeholder="Ciudad y Colonia" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-1">Teléfono / Celular</label>
                    <input className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-rose-500 transition-all" type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-1">Edad</label>
                    <input className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-rose-500 transition-all" type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                  </div>
                </div>

                {/* Columna 2: Físicos */}
                <div className="space-y-5">
                   <div>
                    <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Tez (Color de Piel)</label>
                    <input className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-rose-500 transition-all" placeholder="Ej. Blanca, Morena clara..." value={formData.skinTone} onChange={e => setFormData({...formData, skinTone: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Complexión</label>
                    <input className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-rose-500 transition-all" placeholder="Ej. Delgada, Curvy, Atlética..." value={formData.bodyType} onChange={e => setFormData({...formData, bodyType: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Estatura (cm)</label>
                    <input className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-rose-500 transition-all" type="number" placeholder="Ej. 165" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Preferencia Sexual</label>
                    <select className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-rose-500 transition-all" value={formData.sexualPref} onChange={e => setFormData({...formData, sexualPref: e.target.value})}>
                        <option value="">Seleccionar...</option>
                        <option value="Heterosexual">Heterosexual</option>
                        <option value="Bisexual">Bisexual</option>
                        <option value="Lesbiana">Lesbiana</option>
                        <option value="Pansexual">Pansexual</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <h3 className="text-xl font-black text-white uppercase italic border-b border-neutral-800 pb-4">Perfil y Servicios</h3>

                <div className="space-y-4">
                    <label className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-1">Descripción Personal (3 a 5 renglones)</label>
                    <textarea 
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-white font-medium outline-none focus:border-rose-500 transition-all min-h-[120px]" 
                        placeholder="Descríbete brevemente: personalidad, gustos, qué ofreces en el servicio..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                </div>

                <div className="space-y-4">
                    <label className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-1">Servicios que deseas brindar</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {SERVICE_TYPES.map(service => (
                            <div 
                                key={service.id} 
                                onClick={() => toggleService(service.id)}
                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${formData.services.includes(service.id) ? 'bg-rose-600 border-rose-600' : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'}`}
                            >
                                <span className={`text-xs font-black uppercase ${formData.services.includes(service.id) ? 'text-white' : 'text-neutral-400'}`}>{service.name}</span>
                                {formData.services.includes(service.id) ? <CheckSquare size={18} className="text-white"/> : <Square size={18} className="text-neutral-600"/>}
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
               <h3 className="text-xl font-black text-white uppercase italic border-b border-neutral-800 pb-4">Evidencia Fotográfica y Legal</h3>
               <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Sube tus fotos siguiendo estrictamente las categorías.</p>

               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                   {PHOTO_CATEGORIES.map((cat, index) => (
                       <div key={cat.id} className="space-y-2">
                           <div className={`aspect-[3/4] rounded-2xl border-2 border-dashed overflow-hidden relative group ${formData.photos[index] ? 'border-rose-500 border-solid' : 'border-neutral-700 bg-neutral-900'}`}>
                               {formData.photos[index] ? (
                                   <img src={formData.photos[index]} className="w-full h-full object-cover" alt="" />
                               ) : (
                                   <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                                       <Camera className="text-neutral-600 mb-2" size={20} />
                                       <span className="text-[8px] font-black text-neutral-500 uppercase">{cat.required ? 'REQUERIDO' : 'OPCIONAL'}</span>
                                   </div>
                               )}
                               <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(index, e)} accept="image/*" />
                           </div>
                           <p className={`text-[9px] font-black uppercase text-center leading-tight ${cat.required ? 'text-rose-500' : 'text-neutral-500'}`}>{cat.label}</p>
                       </div>
                   ))}
               </div>

               <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 mt-8">
                   <label className="flex items-start space-x-4 cursor-pointer">
                       <div className={`mt-1 min-w-[20px] h-5 rounded border-2 flex items-center justify-center transition-all ${formData.consent ? 'bg-rose-600 border-rose-600' : 'border-neutral-600'}`}>
                           {formData.consent && <CheckCircle size={14} className="text-white" />}
                       </div>
                       <input type="checkbox" className="hidden" checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} />
                       <div className="space-y-1">
                           <p className="text-xs font-black text-white uppercase">Autorización de Uso de Imagen y Datos</p>
                           <p className="text-[10px] text-neutral-500 leading-relaxed font-medium">
                               Autorizo a MARTEL MODEL AGENCY el uso, almacenamiento y gestión de la información y contenido fotográfico proporcionado en este formulario para fines de evaluación, creación de perfil en catálogo y promoción en redes oficiales, según lo crea conveniente la administración.
                           </p>
                       </div>
                   </label>
               </div>
            </div>
          )}

          <div className="flex justify-between pt-8 border-t border-neutral-800 mt-8">
            {step > 1 ? (
                <button onClick={prevStep} className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs flex items-center space-x-2 transition-all">
                    <ArrowLeft size={16} /><span>Atrás</span>
                </button>
            ) : <div></div>}
            
            <button onClick={nextStep} className="bg-rose-600 hover:bg-rose-500 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs flex items-center space-x-2 shadow-xl shadow-rose-600/20 transition-all active:scale-95">
                <span>{step === 3 ? 'Enviar Solicitud' : 'Siguiente'}</span>
                <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegistrationFlow;