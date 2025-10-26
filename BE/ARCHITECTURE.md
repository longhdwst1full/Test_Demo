# Redis Cache Demo - Separated Architecture

Dự án đã được tách thành 2 phần riêng biệt:

## 📁 Backend (Test_Demo)
- **Stack**: Node.js + Express + TypeScript + Redis
- **Port**: 3000
- **Features**:
  - User login với Redis caching
  - Product browsing với caching (5min TTL)
  - Rate limiting (10 req/min per IP, 5 login attempts/min per user)
  - Metrics tracking (cache hits/misses)

### Running Backend
```bash
cd Test_Demo
yarn install
yarn dev              # Development with hot reload
yarn seed            # Seed Redis với users và products
docker-compose up    # Start Redis
```

### Backend Endpoints
- `GET /` - Server info
- `POST /login` - User login (accepts `{username, password}`)
- `GET /products` - Get all products (cached)
- `GET /products/:id` - Get product by ID (cached)
- `GET /metrics` - Cache statistics

---

## 🎨 Frontend (test-demo-fe)
- **Stack**: Next.js 16 + TypeScript + Tailwind CSS
- **Port**: 3000 (devault dev port, sẽ chạy 3001 nếu 3000 busy)
- **Features**:
  - Modern React UI components
  - Real-time cache detection
  - Product browser
  - Rate limiting tester
  - Live metrics dashboard

### Running Frontend
```bash
cd test-demo-fe
npm install
npm run dev           # Development with hot reload (http://localhost:3000)
```

---

## 🚀 Quick Start Guide

### Terminal 1 - Backend Redis
```bash
cd Test_Demo
docker-compose up
```

### Terminal 2 - Backend Server
```bash
cd Test_Demo
yarn install
yarn seed            # Seed data
yarn dev             # Runs on http://localhost:3000
```

### Terminal 3 - Frontend
```bash
cd test-demo-fe
npm install
npm run dev          # Runs on http://localhost:3001 (or 3000 if 3000 is free)
```

Open browser: **http://localhost:3001** (or whatever port shows in terminal)

---

## 🧪 Testing Features

1. **Login Caching**: 
   - Login as `alice` (password: `password123`) → See "CACHED" badge on second login
   
2. **Product Caching**:
   - Load products twice → See cache detection

3. **Rate Limiting**:
   - Click "Spam 10x" → Watch rate limiter kick in after 5 attempts

4. **Metrics Dashboard**:
   - Auto-refreshes every 5 seconds
   - Shows cache hit rates and statistics

---

## 📋 Test Users

| Username | Password |
|----------|----------|
| alice | password123 |
| bob | secret456 |
| charlie | test789 |

---

## 🏗️ Architecture

```
Test_Demo (Backend)
├── src/
│   ├── index.ts          # Express server with all endpoints
│   ├── seed-redis.ts     # Redis data seeding
│   ├── cache.ts          # Redis client helper
│   └── types.d.ts        # TypeScript types
├── docker-compose.yml    # Redis container
└── package.json

test-demo-fe (Frontend)
├── app/
│   ├── page.tsx          # Main dashboard page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   └── components/       # React components
│       ├── LoginCard.tsx
│       ├── ProductCard.tsx
│       ├── RateLimitTester.tsx
│       └── MetricsCard.tsx
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔗 Environment Setup

Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Backend (.env):
```
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
PORT=3000
```

---

## ⚙️ Build & Deploy

### Backend
```bash
yarn build        # Compile TypeScript
yarn start        # Production server
```

### Frontend
```bash
npm run build     # Build Next.js
npm start         # Production server
```

---

**Giờ đây bạn có kiến trúc sạch sẽ với Backend và Frontend tách biệt hoàn toàn! 🎉**
