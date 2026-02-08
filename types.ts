
export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATIONS = 'OPERATIONS',
  MODEL = 'MODEL',
  CLIENT = 'CLIENT'
}

export enum ServiceStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  VALIDATING_PAYMENT = 'VALIDATING_PAYMENT',
  READY_FOR_TRANSPORT = 'READY_FOR_TRANSPORT',
  IN_TRANSIT = 'IN_TRANSIT',
  ARRIVED = 'ARRIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  balance?: number;
  rating?: number;
}

export interface Model extends User {
  age: number;
  city: string;
  state: string;
  description: string;
  photos: string[];
  socialStories: string[];
  status: 'available' | 'busy' | 'offline';
  adminStatus: 'active' | 'suspended' | 'punished';
  commissionRate: number;
  earnings: {
    day: number;
    week: number;
    month: number;
  };
  services: ServiceType[];
  location?: {
    lat: number;
    lng: number;
  };
}

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'standard' | 'sexual' | 'live-chat' | 'extra';
  durationMinutes: number;
}

export interface Appointment {
  id: string;
  clientId: string;
  modelId: string;
  serviceId: string;
  status: ServiceStatus;
  scheduledTime: string;
  location: string;
  paymentProofUrl?: string;
  transportId?: string;
  totalPrice: number;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}