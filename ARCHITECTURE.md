# Architektur-Dokumentation - Handwerker Portal

## Übersicht

Das Handwerker Portal ist eine moderne SaaS-Anwendung, die eine Multi-Tenant-Architektur mit White-Label-Fähigkeiten implementiert. Die Anwendung ermöglicht es Handwerksbetrieben, ihre Geschäftsprozesse digital zu verwalten.

## Technologie-Stack

### Frontend
- **Next.js 14** mit App Router
- **React 18** für UI-Komponenten
- **TypeScript** für Typ-Sicherheit
- **Tailwind CSS 3.3** für Styling
- **Shadcn/ui** für UI-Komponenten

### Backend
- **Next.js API Routes** mit Edge Runtime
- **Prisma ORM** für Datenbankzugriff
- **PostgreSQL** als Datenbank

### Authentifizierung
- **Clerk.dev** für User Management und Auth

### KI-Integration
- **Google Gemini API** für intelligente Angebotsgenerierung

### PWA
- **next-pwa** für Progressive Web App Funktionalität
- **Service Worker** für Offline-Support

## Architektur-Muster

### 1. Multi-Tenant-Architektur

```
┌─────────────────────────────────────────┐
│           Shared Application            │
├─────────────────────────────────────────┤
│  Tenant 1   │  Tenant 2   │  Tenant 3  │
│  (Müller)   │  (Schmidt)  │  (Weber)   │
├─────────────┼─────────────┼─────────────┤
│  Users      │  Users      │  Users      │
│  Customers  │  Customers  │  Customers  │
│  Offers     │  Offers     │  Offers     │
│  Invoices   │  Invoices   │  Invoices   │
└─────────────┴─────────────┴─────────────┘
```

**Isolation:**
- Jeder Tenant hat eine eindeutige `tenantId`
- Alle Datenbankabfragen werden automatisch nach `tenantId` gefiltert
- Row-Level Security auf Datenbankebene

**Subdomain-Routing:**
- Jeder Tenant bekommt eine eigene Subdomain
- Beispiel: `mueller.handwerker-portal.de`
- Automatisches Tenant-Lookup basierend auf Subdomain

### 2. Datenmodell

```
┌──────────┐
│  Tenant  │
└────┬─────┘
     │ 1:N
     ├─────────┐
     │         │
┌────▼─────┐  │
│   User   │  │
└──────────┘  │
              │
     ┌────────┴────────┬───────────┬──────────┐
     │                 │           │          │
┌────▼─────┐    ┌─────▼──┐   ┌───▼────┐ ┌──▼──────┐
│ Customer │    │ Offer  │   │Invoice │ │Material │
└──────────┘    └────────┘   └────────┘ └─────────┘
```

**Hauptmodelle:**

1. **Tenant**
   - Repräsentiert einen Handwerksbetrieb
   - Enthält Branding-Informationen (Logo, Farben)
   - Einstellungen und Konfiguration

2. **User**
   - Benutzer innerhalb eines Tenants
   - Rollen: ADMIN, HANDWERKER, KUNDE
   - Verknüpfung mit Clerk für Auth

3. **Customer**
   - Kundendaten
   - Kontaktinformationen
   - Adressdaten

4. **Offer**
   - Angebotsdaten
   - Status-Workflow (DRAFT → SENT → ACCEPTED/DECLINED)
   - JSON-basierte Items für Flexibilität

5. **Invoice**
   - Rechnungsdaten
   - Status-Workflow (DRAFT → SENT → PAID)
   - Verknüpfung zu Angebot optional

6. **Material**
   - Materialdatenbank pro Tenant
   - Preisliste
   - Kategorisierung

### 3. API-Struktur

```
/api
├── /ai
│   └── /generate-offer    # POST - KI-Angebotsgenerierung
├── /offers
│   ├── /                  # GET, POST
│   └── /:id               # GET, PUT, DELETE
├── /customers
│   ├── /                  # GET, POST
│   └── /:id               # GET, PUT, DELETE
├── /invoices
│   ├── /                  # GET, POST
│   └── /:id               # GET, PUT, DELETE
└── /webhooks
    ├── /clerk             # Clerk Webhooks
    └── /stripe            # Stripe Webhooks (future)
```

### 4. Frontend-Architektur

**App Router Structure:**

```
app/
├── (auth)/                 # Auth-Gruppe (öffentlich)
│   ├── login/
│   └── register/
├── (dashboard)/            # Dashboard-Gruppe (geschützt)
│   ├── layout.tsx         # Shared Layout mit Sidebar
│   ├── page.tsx           # Dashboard Home
│   ├── /offers
│   ├── /customers
│   ├── /invoices
│   └── /settings
└── api/                   # API Routes
```

**Komponenten-Hierarchie:**

```
components/
├── ui/                    # Basis UI-Komponenten (shadcn/ui)
├── dashboard/             # Dashboard-spezifische Komponenten
├── forms/                 # Formular-Komponenten
├── ai/                    # KI-Komponenten
└── pdf/                   # PDF-Vorlagen
```

### 5. Authentifizierung & Autorisierung

**Flow:**

```
User → Clerk Login → JWT Token → Middleware → Route Handler
                                      ↓
                                 Check tenantId
                                      ↓
                                 Verify Access
```

**Middleware:**
- Prüft Authentifizierung für geschützte Routes
- Lädt User-Daten inklusive Tenant
- Setzt Context für nachfolgende Requests

**Row-Level Security:**
```typescript
// Automatisches Filtering in allen Queries
prisma.offer.findMany({
  where: { 
    tenantId: user.tenantId  // Immer gefiltert!
  }
})
```

### 6. KI-Integration

**Workflow:**

```
User Input → API Route → Google Gemini
    ↓                         ↓
Description              Structured Offer
Materials DB     →       Items + Prices
    ↓                         ↓
                    ← JSON Response
    ↓
User Review → Save to DB
```

**Prompt Engineering:**
- Context: Verfügbare Materialien
- Constraint: Deutsche Handwerkspreise
- Output: Strukturiertes JSON

### 7. PDF-Generierung

**Process:**

```
Offer Data → React Component → PDF Renderer → Blob
                 ↓
          Invoice Template
                 ↓
          Company Branding
                 ↓
          Save to Storage
```

### 8. PWA-Funktionalität

**Service Worker:**
- Cache-Strategien für verschiedene Ressourcentypen
- Offline-First für statische Assets
- Network-First für API-Calls
- Background Sync für Daten-Updates

**Features:**
- Installierbar auf allen Geräten
- Offline-Zugriff auf wichtige Daten
- Push-Benachrichtigungen (geplant)
- Kamera-Zugriff für Vor-Ort-Fotos

### 9. Deployment-Architektur

**Development:**
```
Local Dev → Docker Compose → PostgreSQL + Next.js
```

**Production:**
```
GitHub → GitHub Actions → Build & Test → Deploy
                              ↓
                    Vercel/Railway/etc.
                              ↓
                    PostgreSQL (Managed)
```

## Sicherheit

### Daten-Isolation
- Alle Queries gefiltert nach `tenantId`
- Keine Cross-Tenant-Datenleaks möglich
- Separate Sessions pro User

### Authentication
- Clerk.dev für sichere Auth
- JWT-Tokens
- Session Management
- CSRF-Protection durch SameSite Cookies

### API-Security
- Rate Limiting (geplant)
- Input Validation (Zod)
- SQL Injection Prevention (Prisma)
- XSS Protection (React)

## Performance-Optimierungen

1. **Edge Runtime** für API Routes
2. **React Server Components** wo möglich
3. **Image Optimization** durch Next.js
4. **Database Connection Pooling** (Prisma)
5. **Caching**:
   - Static Assets
   - Database Queries (Redis - geplant)
   - API Responses

## Skalierbarkeit

### Horizontal Scaling
- Stateless Next.js Apps
- Load Balancer
- Shared Database (mit Connection Pooling)

### Vertical Scaling
- Database Upgrades
- Increased Container Resources

### Future Optimizations
- Read Replicas für Database
- CDN für Static Assets
- Redis für Caching
- Queue für Background Jobs

## Monitoring & Logging

### Geplante Integration:
- **Error Tracking**: Sentry
- **Analytics**: Posthog/Plausible
- **Performance**: Vercel Analytics
- **Logging**: Structured Logging mit Winston

## Weitere Entwicklung

### Phase 1 (Aktuell)
✅ Basis-Funktionalität
✅ Multi-Tenant Setup
✅ KI-Integration
✅ Dashboard

### Phase 2 (Nächste)
- [ ] Service Worker Implementation
- [ ] Push-Benachrichtigungen
- [ ] E-Mail-Integration
- [ ] File Uploads

### Phase 3 (Geplant)
- [ ] Zahlungsintegration
- [ ] Terminkalender
- [ ] Mobile Apps
- [ ] Erweiterte Analytics

## Best Practices

1. **Immer tenantId prüfen** bei Datenbankzugriffen
2. **Input Validation** mit Zod in allen API Routes
3. **TypeScript strict mode** aktiviert
4. **Error Boundaries** für robuste UI
5. **Optimistic Updates** für bessere UX
6. **Progressive Enhancement** für PWA
7. **Accessibility** beachten (WCAG 2.1)

## Troubleshooting

### Häufige Probleme:

**Prisma Client nicht gefunden:**
```bash
npx prisma generate
```

**Port bereits belegt:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Docker-Probleme:**
```bash
docker-compose down -v
docker-compose up -d
```

## Ressourcen

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
