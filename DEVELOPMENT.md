# Handwerker Portal - Entwicklungsnotizen

## Setup-Status

✅ Projektstruktur erstellt
✅ Next.js 14 mit App Router konfiguriert
✅ TypeScript konfiguriert
✅ Tailwind CSS eingerichtet
✅ Prisma Schema erstellt
✅ Shadcn/ui Komponenten hinzugefügt
✅ API Routes implementiert
✅ Dashboard-Layout erstellt
✅ Authentication Setup (Clerk)
✅ Docker-Konfiguration
✅ CI/CD Workflows (GitHub Actions)
✅ Testing Setup (Jest, Playwright)

## Noch zu implementieren

- [ ] Service Worker für PWA
- [ ] Push-Benachrichtigungen
- [ ] Erweiterte PDF-Generierung mit Branding
- [ ] File Upload (UploadThing Integration)
- [ ] E-Mail-Versand (Resend Integration)
- [ ] Webhooks für Clerk und Stripe
- [ ] Subdomain-Routing für Multi-Tenant
- [ ] Erweiterte KI-Features
- [ ] Material-Verwaltung UI
- [ ] Projekt-/Auftragsmanagement
- [ ] Zeiterfassung
- [ ] Reporting & Analytics

## API Keys benötigt

Für die vollständige Funktionalität werden folgende API Keys benötigt:

1. **Clerk** (Authentication)
   - Registrierung: https://clerk.dev
   - Keys in `.env.local` eintragen

2. **Google Gemini API** (KI-Features)
   - Registrierung: https://makersuite.google.com/app/apikey
   - Kostenlos verfügbar
   - Key in `.env.local` eintragen

3. **PostgreSQL** (Datenbank)
   - Lokal via Docker: `docker-compose -f docker/docker-compose.dev.yml up -d`
   - Oder Cloud-Provider (Neon, Supabase, Railway, etc.)

4. **Optional:**
   - UploadThing (File Uploads)
   - Resend (E-Mail)

## Entwicklungs-Workflow

1. API Keys in `.env.local` eintragen
2. Datenbank starten: `docker-compose -f docker/docker-compose.dev.yml up -d`
3. Prisma migrieren: `npx prisma migrate dev`
4. Seed-Daten: `npx prisma db seed`
5. Dev-Server: `npm run dev`

## Nächste Schritte

1. API Keys konfigurieren
2. Clerk Authentication testen
3. Erste Tenant-Daten anlegen
4. KI-Angebotsgenerierung testen
5. PDF-Generierung implementieren
6. PWA Features aktivieren
