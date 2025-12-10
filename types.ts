
export enum OrderStatus {
  NEW = 'NEW', // Newly received via Email
  VERIFIED = 'VERIFIED', // Verified by dispatcher
  PLANNED = 'PLANNED', // Driver assigned, route planned
  IN_TRANSIT = 'IN_TRANSIT', // Cargo picked up
  DELIVERED = 'DELIVERED', // Cargo delivered
  DOCS_RECEIVED = 'DOCS_RECEIVED', // CMR uploaded
  COMPLETED = 'COMPLETED', // Invoiced
}

// Managerial Accounting Cost Structure
export interface CostBreakdown {
  // Variable Costs (Koszty Zmienne - zależne od trasy)
  fuel: number;
  adBlue: number;
  tolls: number; // Opłaty drogowe
  driverDiems: number; // Diety (delegacje)
  crossBorderAllowance: number; // Dodatek transgraniczny (Pakiet Mobilności)
  nightRestAllowance: number; // Ryczalt za nocleg (kabina/hotel)
  corridorPay: number; // Dodatek korytarzowy / wyrównanie lokalne
  maintenance: number; // Eksploatacja bieżąca (opony, płyny)

  // Fixed Costs (Koszty Stałe - alokowane na dzień/zlecenie)
  driverBaseSalary: number; // Podstawa wynagrodzenia
  socialSecurity: number; // Składki ZUS/ubezp. od delegacji
  leasing: number; // Rata leasingowa
  insurance: number; // Ubezpieczenia (OC/AC/OCP)
  overhead: number; // Koszty biura, księgowość, telematyka
  
  currency: string;
}

export type TimeRange = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  status: 'AVAILABLE' | 'ON_ROUTE' | 'REST';
  currentLocation?: string;
  ecoScore: number; // From telematics
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string; // e.g., DAF XF 480
  mileage: number;
  status: 'ACTIVE' | 'SERVICE';
  lastServiceDate?: string;
}

export interface OrderHistoryEvent {
  status: OrderStatus;
  timestamp: string;
  description: string;
  user?: string; // 'System', 'Jan Spedytor', 'Driver'
}

export interface Order {
  id: string;
  clientName: string;
  route: {
    from: string;
    to: string;
    distanceKm: number;
    eta: string;
  };
  cargo: {
    description: string;
    weightKg: number;
    pallets: number;
  };
  dates: {
    pickup: string;
    delivery: string;
  };
  financials: {
    freightPrice: number; // Revenue
    currency: string;
    costs: CostBreakdown;
  };
  status: OrderStatus;
  driverId?: string;
  vehicleId?: string;
  aiAnalysis?: {
    emailSource: string;
    confidence: number;
    extractedData: string; // JSON string representation
  };
  chatHistory?: {
    sender: 'BOT' | 'DRIVER' | 'SYSTEM';
    message: string;
    timestamp: string;
    attachmentUrl?: string; // For CMR photos
  }[];
  history: OrderHistoryEvent[];
}

export interface Email {
  id: string;
  mailbox: 'order@fgfalke.eu' | 'faktury@fgfalke.eu';
  subject: string;
  from: string;
  date: string;
  snippet: string;
  fullBody: string;
  isRead: boolean;
  type: 'ORDER_REQUEST' | 'INVOICE_COST' | 'OTHER';
  status: 'PENDING' | 'PROCESSED';
  attachments?: string[];
}
