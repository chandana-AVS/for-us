# 🏆 StarterOps — Universal Enterprise ERP Hackathon Starter Kit

**StarterOps** is a production-grade, highly adaptable Next.js 15 enterprise platform template synthesized from the **1st Place Winner (Asset-Ops)** and **Runners Up (Playdoo)** of the Odoo Hackathon 2025.

> **Goal**: Morph this scaffold into ANY problem statement (Asset Ops, Sports Booking, Warehouse Management, Healthcare, Fleet Logistics, etc.) in **≤ 2 hours**.

---

## 🛠️ Winning Tech Stack

| Layer | Technology | Why It Wins |
|-------|------------|-------------|
| **Framework** | Next.js 15 (App Router, React 19, TypeScript) | Rapid monorepo dev velocity, server actions, SSR |
| **UI & Styling** | Tailwind CSS v4 + Radix UI + Glassmorphism Dark Mode | Premium, state-of-the-art dark theme judges love |
| **Database & ORM** | PostgreSQL 16 + Prisma ORM | Type-safe schema with mandatory audit columns & `hashId` |
| **Auth & RBAC** | `better-auth` + Granular Role Hierarchy | Role-scoped API guards (`ADMIN`, `MANAGER`, `USER`) |
| **Observability** | OpenTelemetry + Grafana + Prometheus + Loki + Tempo | Enterprise production monitoring stack out-of-the-box |
| **DevOps** | Multi-stage Docker + Docker Compose + Nginx | Instant deployment ready for production demo |

---

## 📁 10 Functional Modules Built-In

1. **Role-Scoped KPI Wall** (`/dashboard`): Dynamic metrics, Recharts charts, recent activity timeline & live judge role switcher.
2. **Asset Directory** (`/assets`): Core CRUD ledger with search, category filtering, condition badges, and asset creation modal.
3. **Allocations & Custody** (`/allocations`): Active custody tracking for employees and departments with overdue detection.
4. **Resource Scheduler** (`/bookings`): Time-slot reservation engine with conflict-free booking scheduler.
5. **Maintenance Operations** (`/maintenance`): SLA state machine lifecycle (`PENDING` → `APPROVED` → `IN_PROGRESS` → `RESOLVED`).
6. **Physical Audits & Scans** (`/audits`): Audit cycles ledger, item verification, and discrepancy reports.
7. **Departments & Org Matrix** (`/departments`): Hierarchical department structure and manager assignment.
8. **Executive Reports** (`/reports`): Interactive Recharts visualization (Category split, maintenance load) with PDF export.
9. **Immutable Activity Logs** (`/activity-log`): System-wide audit trail recording user actions and security events.
10. **System Settings** (`/settings`): Profile parameters, 2FA security toggles, and notification preferences.

---

## 🔄 2-Hour Problem Statement Adaptation Guide

To adapt this starter kit for **ANY new problem statement**:

1. **Prisma Models**: Rename `Asset` / `Allocation` to your core entities (e.g. `Product` / `Order`, `Court` / `Booking`, `Patient` / `Appointment`).
2. **Lifecycle Enums**: Adjust `AssetStatus` or `MaintenanceStatus` values to match your domain flow.
3. **Navigation**: Modify sidebar item names in `components/layout/Sidebar.tsx`.
4. **KPI Cards**: Update metric cards in `app/(dashboard)/dashboard/page.tsx`.
5. **Run Seed**: Execute `npm run db:seed` to populate domain mock data.

---

## ⚡ Quickstart Commands

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Setup environment variables
cp .env.example .env

# 3. Generate Prisma client & sync database
npx prisma generate
npx prisma db push
npm run db:seed

# 4. Start development server
npm run dev
```

Visit `http://localhost:3000` to interact with the platform.

---

## 🐳 Docker & Observability Stack

```bash
# Run production multi-container stack with Grafana & Prometheus:
docker compose -f docker-compose.prod.yml up -d --build
```

- **App Server**: `http://localhost:3000`
- **Grafana Dashboards**: `http://localhost:3001`
- **Prometheus Metrics**: `http://localhost:9090`
- **Metrics Endpoint**: `http://localhost:3000/api/metrics`
