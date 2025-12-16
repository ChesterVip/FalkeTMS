# FalkeTMS - System Zarządzania Transportem z Modułem AI

> Zintegrowana platforma TMS (Transport Management System) wspierająca wielowymiarową ocenę kosztów w przedsiębiorstwie logistycznym FG Falke Sp. z o.o.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646cff)](https://vitejs.dev/)

## 📋 O Projekcie

FalkeTMS to kompleksowy system zarządzania transportem międzynarodowym, opracowany jako część pracy magisterskiej **"Wielowymiarowa Ocena Kosztów w Przedsiębiorstwie Logistycznym z Wykorzystaniem Systemów Informatycznych"** (Uniwersytet WSB Merito, kierunek: Zarządzanie Finansami i Rachunkowość, 2024).

System został zaprojektowany dla mikroprzedsiębiorstwa FG Falke Sp. z o.o., specjalizującego się w międzynarodowym transporcie drogowym (cross-trade: relacje Niemcy-Szwajcaria), operującego flotą 3 pojazdów.

### 🎯 Główne Cele Systemu

1. **Automatyzacja cyklu życia zlecenia transportowego:**
   - Ekstrakcja danych z e-maili zamówieniowych
   - Monitorowanie realizacji w czasie rzeczywistym
   - Weryfikacja dokumentów przewozowych (OCR)
   - Automatyczne wystawianie faktur

2. **Wielowymiarowa analiza kosztów:**
   - Podział na koszty zmienne i stałe
   - Analiza rentowności per zlecenie/kierowca/klient/trasa
   - Symulacje "what-if" dla optymalizacji decyzji

3. **Integracja systemów zewnętrznych:**
   - wFirma (faktury i księgowość)
   - DBK Telematics (GPS, spalanie, tachograf)
   - Impargo TMS (planowanie tras)
   - WhatsApp Business API (komunikacja z kierowcami)

---

## 🏗️ Architektura Systemu

### Frontend (React + TypeScript + Vite)
- **Framework:** React 18.3 z TypeScript 5.5
- **Build Tool:** Vite 6.4 (szybkie dev server + HMR)
- **Wizualizacje:** Recharts (wykresy finansowe, trendy)
- **UI/UX:** Tailwind CSS + Lucide Icons
- **Routing:** React Router (single-page application)

### Backend (planowany: NestJS + PostgreSQL)
- **REST API:** NestJS z TypeScript
- **Baza danych:** PostgreSQL + TypeORM
- **Kolejki zadań:** Bull + Redis (przetwarzanie AI/OCR)
- **WebSocket:** Real-time powiadomienia

### Moduły AI (integracje)
- **OpenAI GPT-4:** Ekstrakcja strukturalnych danych z e-maili
- **OCR:** Odczyt tekstu z dokumentów (CMR, faktury, paragony)
- **NLP:** Analiza i walidacja treści dokumentów

### Integracje Zewnętrzne
- **wFirma API:** Automatyczne fakturowanie
- **DBK Fleet Management:** Dane telematyczne (GPS, spalanie)
- **Impargo TMS:** Kalkulacja tras i opłat drogowych
- **WhatsApp Business API:** Komunikacja z kierowcami
- **SMSAPI:** Powiadomienia fallback

---

## 🚀 Funkcjonalności

### 1. Dashboard (Pulpit)
- KPI w czasie rzeczywistym (przychody, koszty, zyski)
- Alerty operacyjne (niskie marże, opóźnienia)
- Mapa floty z aktualnymi pozycjami GPS
- Wykres trendów finansowych

### 2. Zarządzanie Zleceniami
- Lista zleceń z filtrowaniem (status, data, klient)
- Szczegóły zlecenia (trasa, ładunek, dokumenty)
- Analiza kosztów per zlecenie (koszty zmienne vs stałe)
- Historia statusów i komunikacji

### 3. Raporty Finansowe
- Rachunkowość zarządcza (Marża Pokrycia I, EBIT, ROS%)
- Analiza wrażliwości kosztów ("what-if" dla paliwa)
- Dynamiczne trendy (dzień/tydzień/miesiąc/rok)
- Wykres kaskadowy (waterfall) przepływu finansowego
- Struktura kosztów (pie chart)

### 4. Rozliczenia Kierowców
- Pakiet Mobilności (diety zagraniczne, dodatki)
- Rozliczenia miesięczne (brutto/netto)
- Dni robocze i średnia dzienna wypłata
- Szczegółowy breakdown wynagrodzenia

### 5. Flota i GPS
- Mapa interaktywna z trasami
- Monitoring pojazdów w czasie rzeczywistym
- Historia przejazdu
- Dane telematyczne (spalanie, przebieg)

### 6. Praca Magisterska & Architektura
- Pełna dokumentacja systemu
- Teoria kosztów logistycznych (Rozdział 1)
- Charakterystyka przedsiębiorstwa (Rozdział 2)
- Projekt systemu AI (Rozdział 3)
- Symulacje rentowności (Rozdział 4.2)
- Ocena efektywności wdrożenia (Rozdział 4.3)

---

## 📊 Wyniki Wdrożenia (Rozdział 4.3)

### Oszczędności Finansowe
- **Miesięcznie:** 8,000 PLN
- **Rocznie:** 96,000 PLN
- **ROI:** < 6 miesięcy

### Efektywność Operacyjna
- ⏱️ **Czas fakturowania:** redukcja o 60-70%
- 👥 **Uniknięte zatrudnienie:** 1 etat administracyjny (~6,000 PLN/mies.)
- 📄 **Outsourcing:** redukcja kosztów o ~1,500 PLN/mies.

### Korzyści Jakościowe
- ✅ Automatyczna walidacja dokumentów (OCR + AI)
- ✅ Real-time kontrola marży per zlecenie
- ✅ Redukcja błędów w rozliczeniach
- ✅ Szybszy dostęp do danych o rentowności (z dni do minut)

---

## 🛠️ Technologie

### Frontend
- **React 18.3** - framework UI
- **TypeScript 5.5** - typowanie statyczne
- **Vite 6.4** - build tool + dev server
- **Tailwind CSS 3.4** - utility-first CSS
- **Recharts 2.15** - wykresy interaktywne
- **Lucide React 0.468** - ikony SVG

### Backend (planowany)
- **NestJS 10** - framework Node.js
- **PostgreSQL 16** - baza danych relacyjna
- **TypeORM 0.3** - ORM dla TypeScript
- **Bull 4** - kolejki zadań (Redis)
- **Passport JWT** - autentykacja

### API & Integracje
- **OpenAI API** - GPT-4 dla NLP
- **Tesseract.js** - OCR (fallback)
- **wFirma REST API** - faktury
- **DBK API** - telematyka
- **WhatsApp Business API** - komunikacja

---

## 📦 Instalacja i Uruchomienie

### Wymagania
- **Node.js:** 18.x lub nowszy
- **npm:** 9.x lub nowszy

### Instalacja

```bash
# Klonowanie repozytorium
git clone https://github.com/ChesterVip/FalkeTMS.git
cd FalkeTMS

# Instalacja zależności
npm install
```

### Konfiguracja

Utwórz plik `.env.local` w katalogu głównym:

```env
# API Keys (opcjonalne dla wersji demo)
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_WFIRMA_API_KEY=your_wfirma_api_key
VITE_DBK_API_KEY=your_dbk_api_key

# Environment
VITE_API_URL=http://localhost:3000/api
```

### Uruchomienie

```bash
# Development server
npm run dev

# Build produkcyjny
npm run build

# Preview buildu
npm run preview
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

---

## 📂 Struktura Projektu

```
FalkeTMS/
├── components/              # Komponenty React
│   ├── Architecture.tsx     # Dokumentacja architektury systemu
│   ├── Dashboard.tsx        # Pulpit główny z KPI
│   ├── OrderList.tsx        # Lista zleceń transportowych
│   ├── OrderDetails.tsx     # Szczegóły pojedynczego zlecenia
│   ├── FinancialReports.tsx # Raporty finansowe i analiza marż
│   ├── FleetMap.tsx         # Mapa floty z GPS
│   ├── DriverSettlements.tsx # Rozliczenia kierowców
│   ├── MailIntegration.tsx  # Integracja e-mail
│   └── Layout.tsx           # Layout główny aplikacji
├── constants.ts             # Dane demo (15 zleceń Q1 2023)
├── types.ts                 # Typy TypeScript
├── App.tsx                  # Główny komponent aplikacji
├── index.tsx                # Entry point
├── vite.config.ts           # Konfiguracja Vite
├── tsconfig.json            # Konfiguracja TypeScript
└── package.json             # Zależności projektu
```

---

## 📈 Dane Demo

Aplikacja zawiera **rzeczywiste dane operacyjne** z I kwartału 2023:

### 15 Zleceń Transportowych
- **Styczeń 2023:** 5 zleceń (przychód 120,694 PLN)
- **Luty 2023:** 5 zleceń (przychód 103,440 PLN)
- **Marzec 2023:** 5 zleceń (przychód 90,998 PLN)

### Rozliczenia Kierowcy (Serhii Yarovyi)
- **Dni robocze:** 68 dni (20 + 23 + 25)
- **Wynagrodzenie brutto:** 32,025 PLN (~7,447 EUR)
- **Wynagrodzenie netto:** 25,200 PLN (~5,861 EUR)
- **Średnia miesięczna netto:** 8,400 PLN (~1,953 EUR)

### Relacje Transportowe
1. **Polska → Szwajcaria** (~2200 km, marża ~21%)
2. **Polska → Belgia** (~1500 km, marża ~15.7%)
3. **Polska → Niemcy** (~800 km, marża ~5-6%)

---

## 🧪 Symulacje "What-If" (Rozdział 4.2)

### Scenariusz 1: Wydłużenie trasy o 10%
- **Relacja:** Polska → Belgia (1500 km → 1650 km)
- **Marża bazowa:** 15.7%
- **Marża po zmianie:** ~7%
- **Spadek:** -8.7 punktów procentowych
- **Wniosek:** Niemal dwukrotny spadek rentowności

### Scenariusz 2: Wzrost cen paliwa o 20%
- **Polska → Szwajcaria:** 21% → ~12% (spadek -9 pp)
- **Polska → Belgia:** 15.7% → ~9% (spadek -6.7 pp)
- **Wniosek:** Paliwo stanowi ~40% kosztów całkowitych

---

## 🔗 Linki

- **🌐 Produkcja:** [https://falke-tms.vercel.app/](https://falke-tms.vercel.app/)
- **📦 GitHub:** [https://github.com/ChesterVip/FalkeTMS](https://github.com/ChesterVip/FalkeTMS)
- **📚 Dokumentacja API:** (w przygotowaniu)

---

## 👨‍💻 Autor

**Mariusz Sokołowski**  
Student kierunku: Zarządzanie Finansami i Rachunkowość  
Uniwersytet WSB Merito  
Promotor: dr Karolina Rybicka

---

## 📄 Licencja

Ten projekt jest częścią pracy magisterskiej i jest udostępniony na licencji MIT do celów edukacyjnych i demonstracyjnych.

```
MIT License

Copyright (c) 2024 Mariusz Sokołowski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Podziękowania

Specjalne podziękowania dla:
- **FG Falke Sp. z o.o.** - za udostępnienie danych operacyjnych do badań
- **dr Karolina Rybicka** - za merytoryczne wsparcie i promotorstwo pracy magisterskiej
- **Uniwersytet WSB Merito** - za możliwość realizacji projektu badawczego

---

## 📞 Kontakt

W sprawach związanych z projektem:
- **Email:** [kontakt przez profil GitHub](https://github.com/ChesterVip)
- **LinkedIn:** (opcjonalnie)
- **Przedsiębiorstwo:** FG Falke Sp. z o.o.

---

**Wersja:** 1.0.0  
**Data ostatniej aktualizacji:** Grudzień 2024  
**Status:** Aktywny rozwój (praca magisterska)
