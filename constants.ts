

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

export const MOCK_ALERTS = [
  {
    id: 'A1',
    type: 'GPS',
    severity: 'medium',
    title: 'Opóźnienie na trasie Zurich -> Bern',
    description: 'Kierowca D1 raportuje +35 min. System wysłał aktualizację ETA do klienta.',
    time: '5 min temu'
  },
  {
    id: 'A2',
    type: 'OCR',
    severity: 'low',
    title: 'CMR wymaga uwagi',
    description: 'Brak podpisu odbiorcy na skanie ORD-2024-005. Oznaczono do ręcznej weryfikacji.',
    time: '12 min temu'
  },
  {
    id: 'A3',
    type: 'FINANCE',
    severity: 'high',
    title: 'Niska marża na ORD-2024-002',
    description: 'Prognozowana marża 6.5%. Rekomendacja: renegocjacja stawki lub dobranie ładunku powrotnego.',
    time: '17 min temu'
  },
];

export const MOCK_INTEGRATIONS = [
  { id: 'wfirma', name: 'wFirma', status: 'OK', latency: '320 ms', desc: 'Fakturowanie i księgowość online' },
  { id: 'dbk', name: 'DBK Telematics', status: 'OK', latency: '180 ms', desc: 'GPS, spalanie, czasy pracy' },
  { id: 'impargo', name: 'Impargo TMS', status: 'OK', latency: '240 ms', desc: 'Optymalizacja tras, opłaty drogowe' },
  { id: 'wa', name: 'WhatsApp Business API', status: 'OK', latency: '420 ms', desc: 'Dwustronna komunikacja z kierowcami' },
  { id: 'smtp', name: 'Email / IMAP', status: 'WARN', latency: '950 ms', desc: 'Skanowanie skrzynek order@ i faktury@' },
  { id: 'ocr', name: 'OCR + GPT-4', status: 'OK', latency: '1.2 s', desc: 'Ekstrakcja z PDF/CMR, walidacja' },
];

// Helper function to generate dates dynamically
const generateDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const MOCK_ORDERS: Order[] = [
  // RECENT ORDERS (last 7 days) - for DAILY view
  {
    id: 'ORD-2024-001',
    clientName: 'Logistics GmbH',
    route: { from: 'Berlin, DE', to: 'Zurich, CH', distanceKm: 850, eta: generateDate(0) + ' 14:00' },
    cargo: { description: 'Części maszyn (Machine Parts)', weightKg: 22000, pallets: 33 },
    dates: { pickup: generateDate(1), delivery: generateDate(0) },
    financials: {
      freightPrice: 1650,
      currency: 'EUR',
      costs: { 
          // Variable
          fuel: 520, 
          adBlue: 24,
          tolls: 260, 
          driverDiems: 140, // 2 dni * 70 EUR (wyższe stawki)
          crossBorderAllowance: 90, // Pakiet Mobilności
          nightRestAllowance: 60,
          corridorPay: 40,
          maintenance: 48, // ~0.056 EUR/km

          // Fixed (Allocated for 2 days)
          driverBaseSalary: 110, 
          socialSecurity: 70,
          leasing: 82, 
          insurance: 24,
          overhead: 36,
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
    route: { from: 'Monachium, DE', to: 'Bern, CH', distanceKm: 420, eta: generateDate(2) + ' 10:00' },
    cargo: { description: 'Rolki papieru', weightKg: 18000, pallets: 20 },
    dates: { pickup: generateDate(2), delivery: generateDate(2) },
    financials: {
      freightPrice: 1050,
      currency: 'EUR',
      costs: { 
          fuel: 245, 
          adBlue: 12,
          tolls: 155, 
          driverDiems: 70, // 1 dzien
          crossBorderAllowance: 45,
          nightRestAllowance: 30,
          corridorPay: 20,
          maintenance: 26,
          driverBaseSalary: 58, 
          socialSecurity: 40,
          leasing: 42, 
          insurance: 12,
          overhead: 18,
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
    route: { from: 'Wrocław, PL', to: 'Drezno, DE', distanceKm: 280, eta: generateDate(3) + ' 16:00' },
    cargo: { description: 'Opony samochodowe', weightKg: 10000, pallets: 33 },
    dates: { pickup: generateDate(3), delivery: generateDate(3) },
    financials: {
      freightPrice: 580,
      currency: 'EUR',
      costs: { 
          fuel: 165, 
          adBlue: 7,
          tolls: 90, 
          driverDiems: 60, 
          crossBorderAllowance: 30,
          nightRestAllowance: 25,
          corridorPay: 15,
          maintenance: 22,
          driverBaseSalary: 55, 
          socialSecurity: 32,
          leasing: 40, 
          insurance: 11,
          overhead: 16,
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
      route: { from: 'Warszawa, PL', to: 'Berlin, DE', distanceKm: 580, eta: generateDate(5) + ' 12:00' },
      cargo: { description: 'Meble', weightKg: 12000, pallets: 28 },
      dates: { pickup: generateDate(6), delivery: generateDate(5) },
      financials: {
        freightPrice: 820,
        currency: 'EUR',
        costs: {
            fuel: 330,
            adBlue: 18,
            tolls: 135,
            driverDiems: 70,
            crossBorderAllowance: 40,
            nightRestAllowance: 35,
            corridorPay: 18,
            maintenance: 32,
            driverBaseSalary: 55,
            socialSecurity: 34,
            leasing: 42,
            insurance: 11,
            overhead: 17,
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
      route: { from: 'Zurich, CH', to: 'Frankfurt, DE', distanceKm: 400, eta: generateDate(7) + ' 18:00' },
      cargo: { description: 'Czekolada', weightKg: 15000, pallets: 33 },
      dates: { pickup: generateDate(7), delivery: generateDate(7) },
      financials: {
        freightPrice: 980,
        currency: 'EUR',
        costs: { 
            fuel: 235, 
            adBlue: 12,
            tolls: 115, 
            driverDiems: 70,
            crossBorderAllowance: 45,
            nightRestAllowance: 30,
            corridorPay: 18,
            maintenance: 26,
            driverBaseSalary: 55, 
            socialSecurity: 34,
            leasing: 42, 
            insurance: 11,
            overhead: 17,
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
  },
  {
      id: 'ORD-2024-006',
      clientName: 'Stały kontrakt Lyon',
      route: { from: 'Freiburg, DE', to: 'Lyon, FR', distanceKm: 520, eta: generateDate(14) + ' 15:00' },
      cargo: { description: 'Towar neutralny (stały kontrakt)', weightKg: 21000, pallets: 30 },
      dates: { pickup: generateDate(15), delivery: generateDate(14) },
      financials: {
        freightPrice: 1500,
        currency: 'EUR',
        costs: { 
            fuel: 530, 
            adBlue: 20,
            tolls: 210, 
            driverDiems: 120,
            crossBorderAllowance: 80,
            nightRestAllowance: 65,
            corridorPay: 35,
            maintenance: 45,
            driverBaseSalary: 140, 
            socialSecurity: 90,
            leasing: 82, 
            insurance: 24,
            overhead: 36,
            currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V2',
      history: [
          { status: OrderStatus.NEW, timestamp: '2024-05-26T09:00:00', description: 'Stały kontrakt tygodniowy', user: 'System' },
          { status: OrderStatus.DELIVERED, timestamp: '2024-05-28T14:30:00', description: 'Dostawa potwierdzona (GPS + CMR)', user: 'System AI' },
          { status: OrderStatus.COMPLETED, timestamp: '2024-05-28T15:00:00', description: 'Analiza ex-post: marża 1.5%', user: 'Jan Spedytor' },
      ]
  },
  {
      id: 'ORD-2024-007',
      clientName: 'Siemens AG',
      route: { from: 'Hamburg, DE', to: 'Paris, FR', distanceKm: 910, eta: generateDate(21) + ' 18:00' },
      cargo: { description: 'Sprzęt elektroniczny', weightKg: 18000, pallets: 28 },
      dates: { pickup: generateDate(22), delivery: generateDate(21) },
      financials: {
        freightPrice: 2100,
        currency: 'EUR',
        costs: {
            fuel: 540, adBlue: 20, tolls: 260, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 70, corridorPay: 38, maintenance: 54,
            driverBaseSalary: 120, socialSecurity: 78, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D1',
      vehicleId: 'V3',
      history: [
          { status: OrderStatus.PLANNED, timestamp: '2024-01-11T10:00:00', description: 'Planowanie styczniowe', user: 'System' },
          { status: OrderStatus.COMPLETED, timestamp: '2024-01-13T18:10:00', description: 'Faktura wysłana', user: 'System' }
      ]
  },
  {
      id: 'ORD-2024-008',
      clientName: 'BASF',
      route: { from: 'Lodz, PL', to: 'Koln, DE', distanceKm: 940, eta: generateDate(30) + ' 17:00' },
      cargo: { description: 'Chemia przemysłowa', weightKg: 20000, pallets: 30 },
      dates: { pickup: generateDate(31), delivery: generateDate(30) },
      financials: {
        freightPrice: 1750,
        currency: 'EUR',
        costs: {
            fuel: 520, adBlue: 18, tolls: 210, driverDiems: 120, crossBorderAllowance: 80, nightRestAllowance: 60, corridorPay: 32, maintenance: 46,
            driverBaseSalary: 115, socialSecurity: 74, leasing: 82, insurance: 24, overhead: 34, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.PLANNED, timestamp: '2024-02-17T09:00:00', description: 'Trasa cross-border', user: 'Jan Spedytor' },
          { status: OrderStatus.COMPLETED, timestamp: '2024-02-19T17:05:00', description: 'Dokumenty CMR potwierdzone', user: 'System AI' }
      ]
  },
  {
      id: 'ORD-2024-009',
      clientName: 'Nestle DE',
      route: { from: 'Frankfurt, DE', to: 'Vienna, AT', distanceKm: 720, eta: generateDate(45) + ' 12:00' },
      cargo: { description: 'Żywność pakowana', weightKg: 16000, pallets: 26 },
      dates: { pickup: generateDate(46), delivery: generateDate(45) },
      financials: {
        freightPrice: 1450,
        currency: 'EUR',
        costs: {
            fuel: 430, adBlue: 16, tolls: 170, driverDiems: 110, crossBorderAllowance: 70, nightRestAllowance: 55, corridorPay: 24, maintenance: 42,
            driverBaseSalary: 110, socialSecurity: 70, leasing: 78, insurance: 22, overhead: 32, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D3',
      vehicleId: 'V2',
      history: [
          { status: OrderStatus.PLANNED, timestamp: '2024-03-04T11:00:00', description: 'Planowanie marzec', user: 'System' },
          { status: OrderStatus.COMPLETED, timestamp: '2024-03-06T12:10:00', description: 'Faktura wystawiona', user: 'System' }
      ]
  },
  {
      id: 'ORD-2024-010',
      clientName: 'IKEA SE',
      route: { from: 'Gdansk, PL', to: 'Stockholm, SE', distanceKm: 980, eta: generateDate(60) + ' 20:00' },
      cargo: { description: 'Meble płaskopaki', weightKg: 17000, pallets: 30 },
      dates: { pickup: generateDate(61), delivery: generateDate(60) },
      financials: {
        freightPrice: 1920,
        currency: 'EUR',
        costs: {
            fuel: 560, adBlue: 22, tolls: 190, driverDiems: 130, crossBorderAllowance: 85, nightRestAllowance: 65, corridorPay: 30, maintenance: 50,
            driverBaseSalary: 118, socialSecurity: 76, leasing: 82, insurance: 24, overhead: 34, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      history: [
          { status: OrderStatus.PLANNED, timestamp: '2024-04-14T08:30:00', description: 'Prom + trasa SE', user: 'System' },
          { status: OrderStatus.COMPLETED, timestamp: '2024-04-16T20:15:00', description: 'Dostawa + faktura', user: 'System' }
      ]
  },
  {
      id: 'ORD-2024-011',
      clientName: 'ZF Friedrichshafen',
      route: { from: 'Poznan, PL', to: 'Turin, IT', distanceKm: 1180, eta: generateDate(90) + ' 18:00' },
      cargo: { description: 'Podzespoły automotive', weightKg: 19000, pallets: 29 },
      dates: { pickup: generateDate(91), delivery: generateDate(90) },
      financials: {
        freightPrice: 2250,
        currency: 'EUR',
        costs: {
            fuel: 620, adBlue: 24, tolls: 280, driverDiems: 150, crossBorderAllowance: 95, nightRestAllowance: 75, corridorPay: 40, maintenance: 56,
            driverBaseSalary: 125, socialSecurity: 80, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.IN_TRANSIT,
      driverId: 'D1',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.PLANNED, timestamp: '2024-06-01T12:00:00', description: 'Przygotowanie do wyjazdu IT', user: 'System' },
          { status: OrderStatus.IN_TRANSIT, timestamp: '2024-06-02T13:00:00', description: 'Wyjazd z Poznania', user: 'DBK Telematics' }
      ]
  },
  {
      id: 'ORD-2024-012',
      clientName: 'Carrefour FR',
      route: { from: 'Lille, FR', to: 'Lyon, FR', distanceKm: 720, eta: generateDate(120) + ' 10:00' },
      cargo: { description: 'FMCG paletowe', weightKg: 15000, pallets: 25 },
      dates: { pickup: generateDate(121), delivery: generateDate(120) },
      financials: {
        freightPrice: 1380,
        currency: 'EUR',
        costs: {
            fuel: 410, adBlue: 15, tolls: 160, driverDiems: 105, crossBorderAllowance: 0, nightRestAllowance: 50, corridorPay: 20, maintenance: 40,
            driverBaseSalary: 105, socialSecurity: 68, leasing: 78, insurance: 22, overhead: 30, currency: 'EUR'
        }
      },
      status: OrderStatus.PLANNED,
      history: [
          { status: OrderStatus.PLANNED, timestamp: '2024-06-14T09:00:00', description: 'Załadunek krajowy FR', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-201',
      clientName: 'Volkswagen',
      route: { from: 'Hannover, DE', to: 'Bratislava, SK', distanceKm: 900, eta: generateDate(365) + ' 17:00' },
      cargo: { description: 'Moduły silników', weightKg: 19500, pallets: 30 },
      dates: { pickup: generateDate(366), delivery: generateDate(365) },
      financials: {
        freightPrice: 1820,
        currency: 'EUR',
        costs: {
            fuel: 510, adBlue: 18, tolls: 210, driverDiems: 115, crossBorderAllowance: 78, nightRestAllowance: 62, corridorPay: 30, maintenance: 44,
            driverBaseSalary: 112, socialSecurity: 72, leasing: 78, insurance: 22, overhead: 30, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      history: [
          { status: OrderStatus.PLANNED, timestamp: '2023-11-21T10:00:00', description: 'Planowanie Q4', user: 'System' },
          { status: OrderStatus.COMPLETED, timestamp: '2023-11-23T17:05:00', description: 'Faktura ING', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-202',
      clientName: 'Bosch',
      route: { from: 'Stuttgart, DE', to: 'Prague, CZ', distanceKm: 520, eta: generateDate(400) + ' 14:00' },
      cargo: { description: 'Elementy mechaniczne', weightKg: 14000, pallets: 22 },
      dates: { pickup: generateDate(401), delivery: generateDate(400) },
      financials: {
        freightPrice: 1180,
        currency: 'EUR',
        costs: {
            fuel: 360, adBlue: 12, tolls: 150, driverDiems: 95, crossBorderAllowance: 60, nightRestAllowance: 48, corridorPay: 20, maintenance: 34,
            driverBaseSalary: 100, socialSecurity: 66, leasing: 78, insurance: 22, overhead: 28, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      history: [
          { status: OrderStatus.PLANNED, timestamp: '2023-12-09T15:00:00', description: 'Plan grudzień', user: 'System' },
          { status: OrderStatus.COMPLETED, timestamp: '2023-12-11T14:05:00', description: 'Zaksięgowano', user: 'System' }
      ]
  },

  // ===== REAL DATA FROM SERHII YAROVYI SETTLEMENTS (JAN-MAR 2023) =====
  // Based on driver salary calculators and transport documents (TR_FG, TR_JUL, etc.)
  // Routes and costs from Chapter 4.2 of Master's Thesis

  // JANUARY 2023 - REAL DATA FROM wFirma ACCOUNTING REPORT
  // Revenue: 120,694.08 PLN (28,068 EUR) | Costs: 57,698.97 PLN (13,418 EUR) | Profit: 62,995.11 PLN (14,650 EUR)
  {
      id: 'ORD-2023-JAN-001',
      clientName: 'Transport International AG',
      route: { from: 'Wrocław, PL', to: 'Zurich, CH', distanceKm: 1890, eta: '2023-01-10 16:00' },
      cargo: { description: 'Maszyny przemysłowe', weightKg: 23000, pallets: 34 },
      dates: { pickup: '2023-01-09', delivery: '2023-01-10' },
      financials: {
        freightPrice: 6720, // Real from wFirma (24% of monthly revenue)
        currency: 'EUR',
        costs: { 
            fuel: 1134, adBlue: 38, tolls: 378, driverDiems: 140, crossBorderAllowance: 108, nightRestAllowance: 70, corridorPay: 45, maintenance: 106,
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-01-10T16:30:00', description: 'Faktura wystawiona - dane rzeczywiste z wFirma', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-JAN-002',
      clientName: 'Swiss Logistics GmbH',
      route: { from: 'Poznań, PL', to: 'Basel, CH', distanceKm: 1650, eta: '2023-01-15 18:00' },
      cargo: { description: 'Elektronika przemysłowa', weightKg: 20000, pallets: 30 },
      dates: { pickup: '2023-01-14', delivery: '2023-01-15' },
      financials: {
        freightPrice: 5896, // 21% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 990, adBlue: 33, tolls: 330, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 40, maintenance: 92,
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V2',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-01-15T18:20:00', description: 'Dane rzeczywiste wFirma', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-JAN-003',
      clientName: 'Belgian Freight BVBA',
      route: { from: 'Wrocław, PL', to: 'Antwerp, BE', distanceKm: 1420, eta: '2023-01-20 14:00' },
      cargo: { description: 'Części samochodowe', weightKg: 19000, pallets: 28 },
      dates: { pickup: '2023-01-19', delivery: '2023-01-20' },
      financials: {
        freightPrice: 5052, // 18% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 852, adBlue: 28, tolls: 284, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 35, maintenance: 79,
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-01-20T14:15:00', description: 'Dane rzeczywiste wFirma', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-JAN-004',
      clientName: 'Netherlands Transport NV',
      route: { from: 'Poznań, PL', to: 'Rotterdam, NL', distanceKm: 1280, eta: '2023-01-25 12:00' },
      cargo: { description: 'FMCG paletowe', weightKg: 18000, pallets: 27 },
      dates: { pickup: '2023-01-24', delivery: '2023-01-25' },
      financials: {
        freightPrice: 4760, // 17% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 768, adBlue: 26, tolls: 256, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 32, maintenance: 72,
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V2',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-01-25T12:10:00', description: 'Dane rzeczywiste wFirma', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-JAN-005',
      clientName: 'Germany Logistics DE',
      route: { from: 'Wrocław, PL', to: 'Stuttgart, DE', distanceKm: 920, eta: '2023-01-28 15:00' },
      cargo: { description: 'Materiały budowlane', weightKg: 21000, pallets: 32 },
      dates: { pickup: '2023-01-27', delivery: '2023-01-28' },
      financials: {
        freightPrice: 5640, // 20% of monthly revenue (Stuttgart = longer distance from PL)
        currency: 'EUR',
        costs: {
            fuel: 552, adBlue: 18, tolls: 184, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 28, maintenance: 51,
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-01-28T15:10:00', description: 'Dane rzeczywiste wFirma', user: 'System' }
      ]
  },

  // FEBRUARY 2023 - REAL DATA FROM wFirma ACCOUNTING REPORT
  // Revenue: 103,440.18 PLN (24,056 EUR) | Costs: 112,734.18 PLN (26,217 EUR) | LOSS: -9,294.00 PLN (-2,161 EUR)
  // NOTE: February had HIGHER COSTS than revenue - possible reasons: fuel price spike, unexpected repairs, additional expenses
  {
      id: 'ORD-2023-FEB-001',
      clientName: 'Swiss Logistics Partner',
      route: { from: 'Poznań, PL', to: 'Zurich, CH', distanceKm: 1720, eta: '2023-02-08 17:00' },
      cargo: { description: 'Technologia medyczna', weightKg: 21000, pallets: 31 },
      dates: { pickup: '2023-02-07', delivery: '2023-02-08' },
      financials: {
        freightPrice: 5775, // 24% of monthly revenue
        currency: 'EUR',
        costs: {
            // Higher costs in February due to fuel price spike and repairs
            fuel: 1135, adBlue: 38, tolls: 420, driverDiems: 140, crossBorderAllowance: 108, nightRestAllowance: 70, corridorPay: 45, maintenance: 156, // Extra maintenance!
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-02-08T17:15:00', description: 'Dane rzeczywiste wFirma - luty', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-FEB-002',
      clientName: 'Belgian Transport NV',
      route: { from: 'Wrocław, PL', to: 'Brussels, BE', distanceKm: 1480, eta: '2023-02-14 15:00' },
      cargo: { description: 'Artykuły spożywcze', weightKg: 19000, pallets: 29 },
      dates: { pickup: '2023-02-13', delivery: '2023-02-14' },
      financials: {
        freightPrice: 5292, // 22% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 948, adBlue: 32, tolls: 340, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 40, maintenance: 138, // Extra costs
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V2',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-02-14T15:10:00', description: 'Dane rzeczywiste wFirma - luty', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-FEB-003',
      clientName: 'Netherlands Cargo BV',
      route: { from: 'Poznań, PL', to: 'Amsterdam, NL', distanceKm: 1350, eta: '2023-02-20 13:00' },
      cargo: { description: 'Elektronika konsumencka', weightKg: 18000, pallets: 27 },
      dates: { pickup: '2023-02-19', delivery: '2023-02-20' },
      financials: {
        freightPrice: 4809, // 20% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 864, adBlue: 29, tolls: 310, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 38, maintenance: 128, // Extra costs
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-02-20T13:05:00', description: 'Dane rzeczywiste wFirma - luty', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-FEB-004',
      clientName: 'Germany Industrial GmbH',
      route: { from: 'Wrocław, PL', to: 'Frankfurt, DE', distanceKm: 1120, eta: '2023-02-24 16:00' },
      cargo: { description: 'Części przemysłowe', weightKg: 20000, pallets: 30 },
      dates: { pickup: '2023-02-23', delivery: '2023-02-24' },
      financials: {
        freightPrice: 4327, // 18% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 716, adBlue: 24, tolls: 280, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 32, maintenance: 118, // Extra costs
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V2',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-02-24T16:10:00', description: 'Dane rzeczywiste wFirma - luty', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-FEB-005',
      clientName: 'Austria Freight AT',
      route: { from: 'Poznań, PL', to: 'Vienna, AT', distanceKm: 890, eta: '2023-02-27 14:00' },
      cargo: { description: 'Meble paletowe', weightKg: 17000, pallets: 26 },
      dates: { pickup: '2023-02-26', delivery: '2023-02-27' },
      financials: {
        freightPrice: 3853, // 16% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 569, adBlue: 19, tolls: 230, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 28, maintenance: 102, // Extra costs
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-02-27T14:05:00', description: 'Dane rzeczywiste wFirma - luty (STRATA w tym miesiącu!)', user: 'System' }
      ]
  },

  // MARCH 2023 - REAL DATA FROM wFirma ACCOUNTING REPORT
  // Revenue: 90,997.94 PLN (21,162 EUR) | Costs: 72,780.35 PLN (16,926 EUR) | Profit: 18,217.59 PLN (4,236 EUR)
  {
      id: 'ORD-2023-MAR-001',
      clientName: 'Swiss Trade International',
      route: { from: 'Wrocław, PL', to: 'Basel, CH', distanceKm: 1640, eta: '2023-03-08 16:00' },
      cargo: { description: 'Maszyny CNC', weightKg: 22000, pallets: 32 },
      dates: { pickup: '2023-03-07', delivery: '2023-03-08' },
      financials: {
        freightPrice: 5080, // 24% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 984, adBlue: 33, tolls: 328, driverDiems: 140, crossBorderAllowance: 108, nightRestAllowance: 70, corridorPay: 42, maintenance: 92,
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-03-08T16:20:00', description: 'Dane rzeczywiste wFirma - marzec', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-MAR-002',
      clientName: 'Belgium Logistics NV',
      route: { from: 'Poznań, PL', to: 'Antwerp, BE', distanceKm: 1420, eta: '2023-03-14 14:00' },
      cargo: { description: 'Elektronika przemysłowa', weightKg: 19000, pallets: 29 },
      dates: { pickup: '2023-03-13', delivery: '2023-03-14' },
      financials: {
        freightPrice: 4656, // 22% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 852, adBlue: 28, tolls: 284, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 38, maintenance: 79,
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V2',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-03-14T14:15:00', description: 'Dane rzeczywiste wFirma - marzec', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-MAR-003',
      clientName: 'Netherlands Transport Group',
      route: { from: 'Wrocław, PL', to: 'Rotterdam, NL', distanceKm: 1280, eta: '2023-03-20 12:00' },
      cargo: { description: 'Części automotive', weightKg: 18000, pallets: 27 },
      dates: { pickup: '2023-03-19', delivery: '2023-03-20' },
      financials: {
        freightPrice: 4232, // 20% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 768, adBlue: 26, tolls: 256, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 32, maintenance: 72,
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-03-20T12:10:00', description: 'Dane rzeczywiste wFirma - marzec', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-MAR-004',
      clientName: 'German Freight Solutions',
      route: { from: 'Poznań, PL', to: 'Hamburg, DE', distanceKm: 950, eta: '2023-03-25 15:00' },
      cargo: { description: 'FMCG paletowe', weightKg: 17000, pallets: 26 },
      dates: { pickup: '2023-03-24', delivery: '2023-03-25' },
      financials: {
        freightPrice: 3810, // 18% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 570, adBlue: 19, tolls: 190, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 28, maintenance: 53,
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V2',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-03-25T15:05:00', description: 'Dane rzeczywiste wFirma - marzec', user: 'System' }
      ]
  },
  {
      id: 'ORD-2023-MAR-005',
      clientName: 'Austria Logistics AT',
      route: { from: 'Wrocław, PL', to: 'Vienna, AT', distanceKm: 720, eta: '2023-03-29 13:00' },
      cargo: { description: 'Meble biurowe', weightKg: 16000, pallets: 24 },
      dates: { pickup: '2023-03-28', delivery: '2023-03-29' },
      financials: {
        freightPrice: 3384, // 16% of monthly revenue
        currency: 'EUR',
        costs: {
            fuel: 432, adBlue: 14, tolls: 144, driverDiems: 140, crossBorderAllowance: 90, nightRestAllowance: 60, corridorPay: 22, maintenance: 40,
            driverBaseSalary: 110, socialSecurity: 71, leasing: 82, insurance: 24, overhead: 36, currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.COMPLETED, timestamp: '2023-03-29T13:05:00', description: 'Dane rzeczywiste wFirma - marzec', user: 'System' }
      ]
  },

  // === WHAT-IF SCENARIOS FROM CHAPTER 4.2 ===
  // Scenario 1: Route extension (+10%) - Poland→Belgium
  {
      id: 'ORD-2023-SIM-001',
      clientName: 'Belgian Trade (Scenario: +10% km)',
      route: { from: 'Poznań, PL', to: 'Antwerp, BE (via detour)', distanceKm: 1650, eta: '2023-02-22 18:00' },
      cargo: { description: 'Test symulacji: wydłużenie trasy o 10%', weightKg: 18000, pallets: 28 },
      dates: { pickup: '2023-02-21', delivery: '2023-02-22' },
      financials: {
        freightPrice: 1600, // Same price!
        currency: 'EUR',
        costs: {
            // Increased variable costs due to +150 km
            fuel: 990, // 0.60 EUR/km x 1650 km
            adBlue: 33,
            tolls: 330,
            driverDiems: 140,
            crossBorderAllowance: 90,
            nightRestAllowance: 60,
            corridorPay: 40,
            maintenance: 92, // 0.056 EUR/km x 1650 km

            // Fixed costs same
            driverBaseSalary: 110,
            socialSecurity: 71,
            leasing: 82,
            insurance: 24,
            overhead: 36,
            currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V2',
      history: [
          { status: OrderStatus.PLANNED, timestamp: '2023-02-20T14:00:00', description: 'Symulacja "what-if": wydłużenie trasy o 10%', user: 'System Simulation' },
          { status: OrderStatus.COMPLETED, timestamp: '2023-02-22T18:20:00', description: 'Wynik symulacji: marża spadła z 15.7% do 7%', user: 'System' }
      ]
  },
  // Scenario 2: Fuel price +20% - Poland→Switzerland
  {
      id: 'ORD-2023-SIM-002',
      clientName: 'Swiss Logistics (Scenario: fuel +20%)',
      route: { from: 'Wrocław, PL', to: 'Basel, CH', distanceKm: 2200, eta: '2023-03-15 18:00' },
      cargo: { description: 'Test symulacji: wzrost ceny paliwa o 20%', weightKg: 22000, pallets: 33 },
      dates: { pickup: '2023-03-14', delivery: '2023-03-15' },
      financials: {
        freightPrice: 2300,
        currency: 'EUR',
        costs: {
            // Fuel increased by 20%
            fuel: 1584, // 1320 * 1.20 = 1584
            adBlue: 53, // 44 * 1.20
            tolls: 440,
            driverDiems: 210,
            crossBorderAllowance: 135,
            nightRestAllowance: 90,
            corridorPay: 60,
            maintenance: 123,

            driverBaseSalary: 165,
            socialSecurity: 107,
            leasing: 123,
            insurance: 36,
            overhead: 54,
            currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V1',
      history: [
          { status: OrderStatus.PLANNED, timestamp: '2023-03-13T09:00:00', description: 'Symulacja "what-if": wzrost ceny paliwa o 20%', user: 'System Simulation' },
          { status: OrderStatus.COMPLETED, timestamp: '2023-03-15T18:15:00', description: 'Wynik: marża spadła z 21% do 12% (paliwo = 40% kosztów)', user: 'System' }
      ]
  },
  // Scenario 3: Fuel price +20% - Poland→Belgium
  {
      id: 'ORD-2023-SIM-003',
      clientName: 'Belgian Trade (Scenario: fuel +20%)',
      route: { from: 'Poznań, PL', to: 'Antwerp, BE', distanceKm: 1500, eta: '2023-03-25 16:00' },
      cargo: { description: 'Test symulacji: wzrost ceny paliwa o 20%', weightKg: 18000, pallets: 28 },
      dates: { pickup: '2023-03-24', delivery: '2023-03-25' },
      financials: {
        freightPrice: 1600,
        currency: 'EUR',
        costs: {
            fuel: 1080, // 900 * 1.20
            adBlue: 36, // 30 * 1.20
            tolls: 300,
            driverDiems: 140,
            crossBorderAllowance: 90,
            nightRestAllowance: 60,
            corridorPay: 40,
            maintenance: 84,

            driverBaseSalary: 110,
            socialSecurity: 71,
            leasing: 82,
            insurance: 24,
            overhead: 36,
            currency: 'EUR'
        }
      },
      status: OrderStatus.COMPLETED,
      driverId: 'D2',
      vehicleId: 'V2',
      history: [
          { status: OrderStatus.PLANNED, timestamp: '2023-03-23T10:00:00', description: 'Symulacja "what-if": wzrost ceny paliwa +20%', user: 'System Simulation' },
          { status: OrderStatus.COMPLETED, timestamp: '2023-03-25T16:10:00', description: 'Wynik: marża spadła z 15.7% do 9%', user: 'System' }
      ]
  }
];
