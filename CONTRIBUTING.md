# Contributing to Handwerker Portal

Vielen Dank für Ihr Interesse, zum Handwerker Portal beizutragen! 🎉

## 🚀 Quick Start

1. Fork das Repository
2. Clone dein Fork:
   ```bash
   git clone https://github.com/your-username/hanwerker-portal.git
   cd hanwerker-portal
   ```
3. Installiere Dependencies:
   ```bash
   npm install
   ```
4. Erstelle einen Feature Branch:
   ```bash
   git checkout -b feature/deine-feature-beschreibung
   ```

## 📝 Development Workflow

### Voraussetzungen

- Node.js 20.x oder höher
- PostgreSQL 16.x (oder Docker)
- Git

### Setup

1. **Umgebungsvariablen einrichten:**
   ```bash
   cp .env.example .env.local
   ```
   Füge deine API-Keys hinzu (siehe DEVELOPMENT.md)

2. **Datenbank starten:**
   ```bash
   docker-compose -f docker/docker-compose.dev.yml up -d
   ```

3. **Datenbank migrieren:**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Development Server starten:**
   ```bash
   npm run dev
   ```

## 🏗️ Projektstruktur

```
hanwerker-portal/
├── app/              # Next.js App Router
├── components/       # React Komponenten
├── lib/              # Utility Funktionen
├── prisma/           # Datenbank Schema
├── types/            # TypeScript Types
├── tests/            # Tests
└── public/           # Statische Assets
```

## 🎨 Code Style

Wir verwenden ESLint und Prettier für konsistenten Code Style:

```bash
# Linting
npm run lint

# Auto-fix
npm run lint -- --fix
```

### Code Conventions

- Verwende TypeScript für alle neuen Dateien
- Folge dem Next.js App Router Pattern
- Komponenten in PascalCase (z.B. `CustomerForm.tsx`)
- Utilities in camelCase (z.B. `formatCurrency`)
- Konstanten in UPPER_SNAKE_CASE

## 🧪 Testing

### Unit Tests

```bash
npm test
```

### E2E Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm test -- --coverage
```

### Testing Guidelines

- Schreibe Tests für neue Features
- Behalte eine Test Coverage von mindestens 70%
- Nutze React Testing Library für Komponenten-Tests
- Nutze Playwright für E2E Tests

## 📦 Pull Requests

### Bevor du einen PR erstellst:

1. ✅ Stelle sicher, dass alle Tests bestehen
2. ✅ Führe Linting durch
3. ✅ Aktualisiere die Dokumentation, falls nötig
4. ✅ Füge Tests für neue Features hinzu
5. ✅ Schreibe aussagekräftige Commit Messages

### PR Template

```markdown
## Beschreibung
[Beschreibe was dein PR macht]

## Art der Änderung
- [ ] Bug Fix
- [ ] Neues Feature
- [ ] Breaking Change
- [ ] Dokumentation

## Checklist
- [ ] Tests hinzugefügt/aktualisiert
- [ ] Dokumentation aktualisiert
- [ ] Lint-Checks bestanden
- [ ] Alle Tests bestehen

## Screenshots (falls UI-Änderungen)
[Screenshots hier einfügen]
```

## 🐛 Bug Reports

Beim Erstellen eines Bug Reports, bitte:

1. Verwende ein aussagekräftiges Issue Title
2. Beschreibe die erwartete vs. tatsächliche Verhaltensweise
3. Füge Schritte zur Reproduktion hinzu
4. Teile Screenshots/Logs, falls relevant
5. Gib deine Umgebung an (OS, Browser, Node Version)

## 💡 Feature Requests

Feature Requests sind willkommen! Bitte:

1. Prüfe, ob das Feature bereits vorgeschlagen wurde
2. Beschreibe den Use Case klar
3. Erkläre, warum das Feature wertvoll wäre
4. Erwäge, einen PR selbst beizusteuern!

## 📚 Ressourcen

- [Next.js Dokumentation](https://nextjs.org/docs)
- [Prisma Dokumentation](https://www.prisma.io/docs)
- [Tailwind CSS Dokumentation](https://tailwindcss.com/docs)
- [Clerk Dokumentation](https://clerk.com/docs)

## 🤝 Code of Conduct

- Sei respektvoll und konstruktiv
- Akzeptiere konstruktive Kritik
- Fokussiere auf das Beste für die Community
- Zeige Empathie gegenüber anderen

## 📄 Lizenz

Durch das Beitragen stimmst du zu, dass deine Beiträge unter der MIT Lizenz lizenziert werden.

## 🙋 Fragen?

Hast du Fragen? Öffne ein Issue oder starte eine Discussion!

Vielen Dank für deinen Beitrag! 🙏
