import React from 'react';
import { ServiceType } from './types';

export const SERVICE_TYPES: ServiceType[] = [
  { id: '1', name: 'Acompañante VIP', description: 'Servicio de compañía para eventos sociales.', price: 2000, category: 'standard', durationMinutes: 60 },
  { id: '2', name: 'Servicio Íntimo', description: 'Servicio sexual premium.', price: 3500, category: 'sexual', durationMinutes: 60 },
  { id: '3', name: 'Live Chat 15min', description: 'Video llamada privada rápida.', price: 500, category: 'live-chat', durationMinutes: 15 },
  { id: '4', name: 'Live Chat 30min', description: 'Video llamada privada extendida.', price: 900, category: 'live-chat', durationMinutes: 30 },
  { id: '5', name: 'Traslado Extra', description: 'Cambio de locación durante el servicio.', price: 300, category: 'extra', durationMinutes: 0 },
];

export const PHOTO_CATEGORIES = [
  { id: 'face', label: 'Rostro (Obligatoria)', required: true, description: 'Primer plano nítido sin filtros.' },
  { id: 'dress', label: 'Cuerpo Completo Vestido (Obligatoria)', required: true, description: 'Outfit elegante de noche.' },
  { id: 'swimsuit', label: 'Traje de Baño (Obligatoria)', required: true, description: 'Bikini completo de frente.' },
  { id: 'back', label: 'Espaldas Volteando (Obligatoria)', required: true, description: 'De espaldas volteando al frente.' },
  { id: 'profile_swim', label: 'Perfil en Traje de Baño (Obligatoria)', required: true, description: 'Ángulo lateral completo.' },
  { id: 'opt_1', label: 'Opcional 1', required: false, description: 'Libre elección.' },
  { id: 'opt_2', label: 'Opcional 2', required: false, description: 'Libre elección.' },
  { id: 'opt_3', label: 'Opcional 3', required: false, description: 'Libre elección.' },
  { id: 'opt_4', label: 'Opcional 4', required: false, description: 'Libre elección.' },
  { id: 'opt_5', label: 'Opcional 5', required: false, description: 'Libre elección.' },
];

export const MODEL_REGISTRATION_TEMPLATES = PHOTO_CATEGORIES;

export const APP_NAME = "MARTEL MODEL AGENCY";
export const TAGLINE = "GOOD GIRLS TO GOOD TIMES";

export const POLICIES = `
POLÍTICAS DE SERVICIO Y DESLINDE DE RESPONSABILIDAD:
1. La empresa MARTEL MODEL AGENCY actúa como intermediaria de gestión. No se hace responsable por eventualidades externas, accidentes o conflictos en el sitio de encuentro.
2. PAGOS: El servicio debe cubrirse al 100% antes de que la modelo descienda del vehículo.
3. CANCELACIONES: Deben validarse los motivos. La devolución se procesa en un plazo de 15 días hábiles y prioritariamente como saldo a favor en la cuenta del cliente.
4. ACCESO: Si el cliente no garantiza el acceso de la modelo al sitio convenido (Hoteles/Residencias), el servicio se cobrará como ejecutado sin derecho a devolución.
5. SEGURIDAD: Monitoreo GPS activo durante todo el servicio.
6. MARKETING: Martel Agency gestiona la promoción en redes oficiales de la marca. No se permite la promoción individual fuera del ecosistema Martel durante la vigencia del contrato.
`;