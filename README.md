# Handwerker Portal

KI-gestützte Progressive Web App für Handwerker zur digitalen Angebotserstellung, Kundenverwaltung und Abrechnung.

## 🚀 Features

- **KI-gestützte Angebotserstellung** - Nutzt Google Gemini API für intelligente Angebotsgenerierung
- **Multi-Tenant-Architektur** - Jeder Handwerkerbetrieb erhält seine eigene isolierte Umgebung
- **White-Label-Fähigkeiten** - Individuelles Branding mit eigenem Logo und Farben
- **Progressive Web App** - Funktioniert offline, installierbar auf allen Geräten
- **Kundenverwaltung** - Zentrale Verwaltung aller Kundendaten
- **Angebots- und Rechnungsmanagement** - Digitale Erstellung und Verwaltung
- **PDF-Generierung** - Professionelle PDF-Dokumente für Angebote und Rechnungen
- **Responsive Design** - Optimiert für Desktop, Tablet und Mobile

## 🛠 Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn/ui
- **Backend:** Next.js API Routes, Prisma ORM, PostgreSQL
- **KI-Integration:** Google Gemini API
- **Authentication:** Clerk.dev
- **PWA:** next-pwa, Service Worker
- **PDF-Generierung:** @react-pdf/renderer
- **Testing:** Jest, React Testing Library, Playwright

## 📋 Prerequisites

- Node.js 20.x or higher
- PostgreSQL 16.x
- Docker (optional, für lokale Entwicklung)

## 🚦 Getting Started

### 1. Repository klonen

```bash
git clone https://github.com/Leopixel1/hanwerker-portal.git
cd hanwerker-portal
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Umgebungsvariablen konfigurieren

```bash
cp .env.example .env.local
```

Bearbeiten Sie `.env.local` und fügen Sie Ihre API-Keys ein:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/handwerker_portal"
GEMINI_API_KEY="your-google-gemini-api-key"
CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
```

### 4. Datenbank starten (mit Docker)

```bash
docker-compose -f docker/docker-compose.dev.yml up -d
```

Oder verwenden Sie eine bestehende PostgreSQL-Instanz und passen Sie die `DATABASE_URL` entsprechend an.

### 5. Datenbank migrieren

```bash
npx prisma migrate dev --name init
```

### 6. Seed-Daten einfügen (optional)

```bash
npx prisma db seed
```

### 7. Entwicklungsserver starten

```bash
npm run dev
```

Die Anwendung ist jetzt unter [http://localhost:3000](http://localhost:3000) verfügbar.

## 📁 Projektstruktur

```
handwerker-portal/
├── app/                      # Next.js 14 App Router
│   ├── (auth)/              # Authentication routes
│   ├── (dashboard)/         # Dashboard routes (protected)
│   ├── api/                 # API routes
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Shadcn/ui components
│   ├── dashboard/           # Dashboard components
│   ├── forms/               # Form components
│   ├── ai/                  # AI components
│   └── pdf/                 # PDF components
├── lib/                     # Utilities & libraries
│   ├── db.ts                # Prisma client
│   ├── ai.ts                # AI integration
│   ├── auth.ts              # Auth helpers
│   ├── utils.ts             # Utility functions
│   └── validation/          # Zod schemas
├── prisma/                  # Database
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data
├── types/                   # TypeScript types
├── hooks/                   # Custom React hooks
├── config/                  # Configuration files
├── docker/                  # Docker configurations
├── tests/                   # Test files
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   └── e2e/                 # E2E tests
└── public/                  # Static assets
```

## 🧪 Testing

```bash
# Unit & Integration Tests
npm test

# E2E Tests
npm run test:e2e

# Test Coverage
npm test -- --coverage
```

## 🔨 Build & Deploy

### Production Build

```bash
npm run build
npm start
```

### Docker Build

```bash
docker-compose -f docker/docker-compose.prod.yml up -d
```

## 📚 API Dokumentation

### Angebote

- `GET /api/offers` - Alle Angebote abrufen
- `POST /api/offers` - Neues Angebot erstellen
- `GET /api/offers/:id` - Einzelnes Angebot abrufen
- `PUT /api/offers/:id` - Angebot aktualisieren
- `DELETE /api/offers/:id` - Angebot löschen

### Kunden

- `GET /api/customers` - Alle Kunden abrufen
- `POST /api/customers` - Neuen Kunden erstellen
- `GET /api/customers/:id` - Einzelnen Kunden abrufen
- `PUT /api/customers/:id` - Kunde aktualisieren
- `DELETE /api/customers/:id` - Kunde löschen

### Rechnungen

- `GET /api/invoices` - Alle Rechnungen abrufen
- `POST /api/invoices` - Neue Rechnung erstellen
- `GET /api/invoices/:id` - Einzelne Rechnung abrufen
- `PUT /api/invoices/:id` - Rechnung aktualisieren
- `DELETE /api/invoices/:id` - Rechnung löschen

### KI

- `POST /api/ai/generate-offer` - KI-gestütztes Angebot generieren

## 🔐 Umgebungsvariablen

| Variable | Beschreibung | Erforderlich |
|----------|--------------|--------------|
| `DATABASE_URL` | PostgreSQL Verbindungs-URL | Ja |
| `GEMINI_API_KEY` | Google Gemini API Key | Ja |
| `CLERK_PUBLISHABLE_KEY` | Clerk Public Key | Ja |
| `CLERK_SECRET_KEY` | Clerk Secret Key | Ja |
| `UPLOADTHING_SECRET` | UploadThing Secret | Nein |
| `UPLOADTHING_APP_ID` | UploadThing App ID | Nein |
| `RESEND_API_KEY` | Resend API Key (für E-Mails) | Nein |

## 🌐 Multi-Tenant Setup

Das Portal unterstützt Multi-Tenancy. Jeder Handwerkerbetrieb erhält:

- Eigene Subdomain (z.B. `mustermann.handwerker-portal.de`)
- Isolierte Datenbank (über `tenantId`)
- Individuelles Branding (Logo, Farben)
- Eigene Kundenliste und Materialdatenbank

## 🎨 Branding

Administratoren können folgende Branding-Elemente anpassen:

- Logo
- Primär- und Sekundärfarben
- Firmendaten für Dokumente
- E-Mail-Templates

## 📱 PWA Features

- Offline-Funktionalität durch Service Worker
- Installierbar auf Home Screen
- Push-Benachrichtigungen
- Kamera-Zugriff für Fotos
- Optimiert für Mobile-First

## 🤝 Contributing

Contributions sind willkommen! Bitte erstellen Sie einen Pull Request mit einer ausführlichen Beschreibung Ihrer Änderungen.

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## 🆘 Support

Bei Fragen oder Problemen öffnen Sie bitte ein Issue auf GitHub.

## 🗺 Roadmap

- [ ] Voice-to-Text für Angebotserstellung
- [ ] Zahlungsintegration (Stripe/PayPal)
- [ ] Terminkalender
- [ ] Material-Bestandsverwaltung
- [ ] Projektverfolgung
- [ ] Mobile Apps (iOS/Android)
- [ ] E-Mail-Benachrichtigungen
- [ ] Rechnungserinnerungen
- [ ] Analytics Dashboard
- [ ] Multi-Language Support

## 👥 Team

Entwickelt mit ❤️ von Leopixel1