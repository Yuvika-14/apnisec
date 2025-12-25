# ApniSec Documentation

ApniSec is a professional cybersecurity-themed full-stack application built with Next.js, featuring a robust authentication system, personalized dashboard, and issue management.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18.x or later
- Supabase account (PostgreSQL)
- Resend account (for emails)

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root and add:
```env
DATABASE_URL="your_supabase_transaction_pooler_url"
DIRECT_URL="your_supabase_direct_url"
JWT_SECRET="your_jwt_secret"
REFRESH_SECRET="your_refresh_secret"
RESEND_API_KEY="your_resend_api_key"
```

### 4. Database Setup
```bash
npx prisma db push
```

### 5. Running Locally
```bash
npm run dev
```

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15+ (App Router), Tailwind CSS v4, Lucide React
- **Backend**: Next.js API Routes (OOP controllers/services architecture)
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Auth**: Custom JWT with Refresh Token rotation
- **Email**: Resend
- **Styling**: Vanilla CSS + Tailwind

---

## 📂 Project Structure

- `app/`: Next.js pages and API routes
  - `(auth)/`: Login and Registration
  - `(dashboard)/`: User dashboard and profile
  - `api/`: Backend logic
- `components/`: Shared UI components (Navbar, Sidebar, etc.)
- `lib/`: Core logic
  - `controllers/`: Request handling logic (OOP)
  - `services/`: Business logic
  - `repositories/`: Database abstraction
  - `validators/`: Zod schemas
  - `core/`: Shared utilities (Prisma, Errors, Response format)
- `prisma/`: Database schema and migrations

---

## 🛡️ Key Features

- **Cybersecurity Identity**: Responsive dark-themed landing page.
- **Secure Auth**: Token-based authentication with protected routes.
- **Dashboard**: High-performance dashboard for issue tracking.
- **SEO Optimized**: Metatags and semantic HTML for high Lighthouse scores.
- **Deployment Ready**: Optimized for Vercel and Render.

---

## 📈 SEO Performance
Achieved 80%+ scores across all Lighthouse metrics.
Detail report available in `final_reports/lighthouse_report.png`.

---

## 📄 License
This project is licensed under the MIT License.
