

import { Order, OrderStatus, Driver, Vehicle, Email } from './types';

export const MOCK_DRIVERS: Driver[] = [
  { id: 'D1', name: 'Jan Kowalski', phone: '+48 600 100 200', status: 'ON_ROUTE', currentLocation: 'A9 (Niemcy)', ecoScore: 8.5 },
  { id: 'D2', name: 'Serhii Yarovyi', phone: '+48 600 300 400', status: 'AVAILABLE', currentLocation: 'Baza (Włoszyn)', ecoScore: 9.2 },
  { id: 'D3', name: 'Tomasz Nowak', phone: '+48 600 500 600', status: 'REST', currentLocation: 'Parking A2 (Poznań)', ecoScore: 7.8 },
];

export const MOCK_VEHICLES: Vehicle[] = [
  { id: 'V1', plateNumber: 'KBR 12345', model: 'DAF XF 480', mileage: 120500, status: 'ACTIVE', lastServiceDate: '2024-01-15' },
  { id: 'V2', plateNumber: 'KBR 54321', model: 'IVECO S-WAY', mileage: 45000, status: 'ACTIVE', lastServiceDate: '2024-03-10' },
  { id: 'V3', plateNumber: 'KBR 98765', model: 'DAF XF 480', mileage: 155000, status: 'SERVICE', lastServiceDate: '2024-05-20' },
];

export const MOCK_EMAILS: Email[] = [
    {
        id: 'E1',
        mailbox: 'order@fgfalke.eu',
        subject: 'Zlecenie transportowe DE-CH 24.05',
        from: 'logistics@gmbh.de',
        date: '2024-05-23T08:15:00',
        snippet: 'Dzień dobry, przesyłam zlecenie na trasie Berlin - Zurich...',
        fullBody: `Dzień dobry,
Zlecam transport:
Załadunek: 24.05.2024, 08:00, Berlin (DE)
Rozładunek: 25.05.2024, 14:00, Zurich (CH)
Towar: Części maszyn, 22 tony, 33 palety.
Stawka: 1800 EUR.
Proszę o potwierdzenie.
Pozdrawiam, Hans Muller (Logistics GmbH)`,
        isRead: false,
        type: 'ORDER_REQUEST',
        status: 'PENDING'
    },
    {
        id: 'E2',
        mailbox: 'faktury@fgfalke.eu',
        subject: 'Faktura za paliwo maj 2024',
        from: 'faktury@shell.com',
        date: '2024-05-20T10:00:00',
        snippet: 'W załączeniu przesyłamy fakturę zbiorczą za paliwo...',
        fullBody: 'Szanowni Państwo, w załączniku faktura FV/2024/05/123. Kwota do zapłaty: 12500 PLN.',
        isRead: true,
        type: 'INVOICE_COST',
        status: 'PROCESSED',
        attachments: ['FV_2024_05_123.pdf']
    },
    {
        id: 'E3',
        mailbox: 'order@fgfalke.eu',
        subject: 'Oferta ładunku Hamburg - Basel',
        from: 'sped@bauhaus.de',
        date: '2024-05-24T14:20:00',
        snippet: 'Mamy do zabrania 24t materiałów budowlanych...',
        fullBody: 'Trasa: Hamburg -> Basel. Data: 28.05. Stawka: 1950 EUR. Wymagana naczepa standard.',
        isRead: false,
        type: 'ORDER_REQUEST',
        status: 'PENDING'
    }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2024-001',
    clientName: 'Logistics GmbH',
    route: { from: 'Berlin, DE', to: 'Zurich, CH', distanceKm: 850, eta: '2024-05-25 14:00' },
    cargo: { description: 'Części maszyn (Machine Parts)', weightKg: 22000, pallets: 33 },
    dates: { pickup: '2024-05-24', delivery: '2024-05-25' },
    financials: {
      freightPrice: 1800,
      currency: 'EUR',
      costs: { 
          // Variable
          fuel: 480, 
          adBlue: 20,
          tolls: 250, 
          driverDiems: 120, // 2 dni * 60 EUR
          maintenance: 40, // ~0.05 EUR/km

          // Fixed (Allocated for 2 days)
          driverBaseSalary: 100, 
          leasing: 80, 
          insurance: 20,
          overhead: 30,
          currency: 'EUR'
      }
    },
    status: OrderStatus.IN_TRANSIT,
    driverId: 'D1',
    vehicleId: 'V1',
    aiAnalysis: {
      emailSource: MOCK_EMAILS[0].fullBody,
      confidence: 0.98,
      extractedData: JSON.stringify({ from: 'Berlin', to: 'Zurich', price: 1800, cargo: 'Parts' }, null, 2)
    },
    chatHistory: [
      { sender: 'BOT', message: 'Nowe zlecenie: Berlin -> Zurich. Załadunek 24.05 08:00. Potwierdź przyjęcie.', timestamp: '2024-05-23T09:00:00' },
      { sender: 'DRIVER', message: 'Potwierdzam. Będę na czas.', timestamp: '2024-05-23T09:05:00' },
      { sender: 'SYSTEM', message: 'Status zmieniony na PLANNED', timestamp: '2024-05-23T09:05:00' },
      { sender: 'BOT', message: 'Czy załadunek zakończony?', timestamp: '2024-05-24T09:30:00' },
      { sender: 'DRIVER', message: 'Tak, ruszam. Melduję 22t.', timestamp: '2024-05-24T09:45:00' },
    ],
    history: [
      { status: OrderStatus.NEW, timestamp: '2024-05-23T08:30:00', description: 'Otrzymano email z zamówieniem', user: 'System AI' },
      { status: OrderStatus.VERIFIED, timestamp: '2024-05-23T08:45:00', description: 'Potwierdzenie danych zlecenia', user: 'Jan Spedytor' },
      { status: OrderStatus.PLANNED, timestamp: '2024-05-23T09:05:00', description: 'Przypisano pojazd V1 i kierowcę D1', user: 'Jan Spedytor' },
      { status: OrderStatus.IN_TRANSIT, timestamp: '2024-05-24T09:45:00', description: 'Potwierdzono wyjazd z załadunku', user: 'Kierowca (WhatsApp)' },
    ]
  },
  {
    id: 'ORD-2024-002',
    clientName: 'Swiss Trade AG',
    route: { from: 'Monachium, DE', to: 'Bern, CH', distanceKm: 420, eta: '2024-05-26 10:00' },
    cargo: { description: 'Rolki papieru', weightKg: 18000, pallets: 20 },
    dates: { pickup: '2024-05-26', delivery: '2024-05-26' },
    financials: {
      freightPrice: 1200,
      currency: 'EUR',
      costs: { 
          fuel: 220, 
          adBlue: 10,
          tolls: 150, 
          driverDiems: 60, // 1 dzien
          maintenance: 20,
          driverBaseSalary: 50, 
          leasing: 40, 
          insurance: 10,
          overhead: 15,
          currency: 'EUR'
      }
    },
    status: OrderStatus.PLANNED,
    driverId: 'D2',
    vehicleId: 'V2',
    history: [
      { status: OrderStatus.NEW, timestamp: '2024-05-24T10:00:00', description: 'Zamówienie z giełdy Trans.eu', user: 'Jan Spedytor' },
      { status: OrderStatus.PLANNED, timestamp: '2024-05-24T11:20:00', description: 'Optymalizacja trasy Impargo', user: 'System' },
    ]
  },
  {
    id: 'ORD-2024-003',
    clientName: 'AutoParts PL',
    route: { from: 'Wrocław, PL', to: 'Drezno, DE', distanceKm: 280, eta: '2024-05-22 16:00' },
    cargo: { description: 'Opony samochodowe', weightKg: 10000, pallets: 33 },
    dates: { pickup: '2024-05-22', delivery: '2024-05-22' },
    financials: {
      freightPrice: 650,
      currency: 'EUR',
      costs: { 
          fuel: 140, 
          adBlue: 5,
          tolls: 80, 
          driverDiems: 60, 
          maintenance: 15,
          driverBaseSalary: 50, 
          leasing: 40, 
          insurance: 10,
          overhead: 15,
          currency: 'EUR'
      }
    },
    status: OrderStatus.COMPLETED,
    driverId: 'D3',
    vehicleId: 'V1',
    chatHistory: [
        { sender: 'BOT', message: 'Dostarczono? Prześlij CMR.', timestamp: '2024-05-22T17:00:00' },
        { sender: 'DRIVER', message: 'Tak, oto skan.', timestamp: '2024-05-22T17:15:00', attachmentUrl: 'https://picsum.photos/400/600' },
        { sender: 'SYSTEM', message: 'AI OCR: CMR zweryfikowany poprawnie. Status COMPLETED.', timestamp: '2024-05-22T17:16:00' }
    ],
    history: [
       { status: OrderStatus.NEW, timestamp: '2024-05-20T08:00:00', description: 'Zamówienie stałe', user: 'System' },
       { status: OrderStatus.PLANNED, timestamp: '2024-05-20T09:00:00', description: 'Planowanie', user: 'Jan Spedytor' },
       { status: OrderStatus.IN_TRANSIT, timestamp: '2024-05-22T08:00:00', description: 'Wyjazd', user: 'Kierowca' },
       { status: OrderStatus.DELIVERED, timestamp: '2024-05-22T16:00:00', description: 'Dostawa potwierdzona GPS', user: 'DBK Telematics' },
       { status: OrderStatus.DOCS_RECEIVED, timestamp: '2024-05-22T17:15:00', description: 'Otrzymano skan CMR (WhatsApp)', user: 'System AI' },
       { status: OrderStatus.COMPLETED, timestamp: '2024-05-22T17:30:00', description: 'Faktura wysłana do WFirma', user: 'System' },
    ]
  },
  {
      id: 'ORD-2024-004',
      clientName: 'IKEA Distribution',
      route: { from: 'Warszawa, PL', to: 'Berlin, DE', distanceKm: 580, eta: '2024-05-21 12:00' },
      cargo: { description: 'Meble', weightKg: 12000, pallets: 28 },
      dates: { pickup: '2024-05-20', delivery: '2024-05-21' },
      financials: {
        freightPrice: 900,
        currency: 'EUR',
        costs: {
            fuel: 300,
            adBlue: 15,
            tolls: 120,
            driverDiems: 60,
            maintenance: 25,
            driverBaseSalary: 50,
            leasing: 40,
            insurance: 10,
            overhead: 15,
            currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      history: [
          { status: OrderStatus.NEW, timestamp: '2024-05-19T09:00:00', description: 'Import z Trans.eu', user: 'Jan Spedytor' },
          { status: OrderStatus.COMPLETED, timestamp: '2024-05-21T14:00:00', description: 'Faktura wystawiona', user: 'System' }
      ]
  },
  {
      id: 'ORD-2024-005',
      clientName: 'Nestle CH',
      route: { from: 'Zurich, CH', to: 'Frankfurt, DE', distanceKm: 400, eta: '2024-05-26 18:00' },
      cargo: { description: 'Czekolada', weightKg: 15000, pallets: 33 },
      dates: { pickup: '2024-05-26', delivery: '2024-05-27' },
      financials: {
        freightPrice: 1100,
        currency: 'EUR',
        costs: { 
            fuel: 210, 
            adBlue: 10,
            tolls: 100, 
            driverDiems: 60,
            maintenance: 20,
            driverBaseSalary: 50, 
            leasing: 40, 
            insurance: 10,
            overhead: 15,
            currency: 'EUR'
        }
      },
      status: OrderStatus.PLANNED,
      driverId: 'D1',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.NEW, timestamp: '2024-05-24T12:00:00', description: 'Ładunek powrotny', user: 'Jan Spedytor' },
          { status: OrderStatus.PLANNED, timestamp: '2024-05-24T12:15:00', description: 'Przypisano do D1 po rozładunku w Zurichu', user: 'System' }
      ]
  }
];
