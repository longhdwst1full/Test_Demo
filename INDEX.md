# 📚 Documentation Index

## 🎯 Start Here

1. **[QUICK_START.md](./QUICK_START.md)** ⚡ - 3 commands to get running
2. **[GUIDE.md](./GUIDE.md)** 📖 - Complete setup & testing guide

---

## 📋 Detailed Documentation

### Setup & Configuration
- **[STRUCTURE.md](./STRUCTURE.md)** - Project folder layout & file organization
- **[GUIDE.md](./GUIDE.md)** - Comprehensive guide with API reference

### Architecture & Design
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design & data flow
- **[VISUAL_GUIDE.md](./VISUAL_GUIDE.md)** - Diagrams & architecture overview

### Project Status
- **[STATUS.md](./STATUS.md)** - Current status & completion checklist
- **[SUMMARY.md](./SUMMARY.md)** - Executive summary
- **[README.md](./README.md)** - Main project overview

---

## 🔍 By Use Case

### "I just want to run it"
→ Read: **[QUICK_START.md](./QUICK_START.md)**

### "I want to understand how it works"
→ Read: **[GUIDE.md](./GUIDE.md)** then **[ARCHITECTURE.md](./ARCHITECTURE.md)**

### "I want to see the project structure"
→ Read: **[STRUCTURE.md](./STRUCTURE.md)**

### "I'm testing features"
→ Read: **[GUIDE.md](./GUIDE.md)** section "🧪 Testing the Application"

### "I need API documentation"
→ Read: **[GUIDE.md](./GUIDE.md)** section "🔌 Backend API Reference"

### "I'm debugging an issue"
→ Read: **[GUIDE.md](./GUIDE.md)** section "🐛 Troubleshooting"

---

## 📁 Backend Documentation (BE/)

```
BE/
├── README.md           # Backend overview
├── src/
│   ├── index.ts       # Express server (with CORS & rate limiting)
│   ├── seed-redis.ts  # Data seeding script
│   ├── cache.ts       # Redis client wrapper
│   └── types.d.ts     # TypeScript types
└── docker-compose.yml # Redis container config
```

**Key Files:**
- `BE/README.md` - Backend-specific documentation
- `BE/src/index.ts` - Main server code with comments
- `BE/src/seed-redis.ts` - See what data is seeded

---

## 🎨 Frontend Documentation (FE/)

```
FE/
├── README.md          # Frontend overview
├── app/
│   ├── page.tsx       # Main dashboard
│   ├── layout.tsx     # Root layout
│   └── components/
│       ├── LoginCard.tsx
│       ├── ProductCard.tsx
│       ├── RateLimitTester.tsx
│       └── MetricsCard.tsx
└── .env.local         # API URL configuration
```

**Key Files:**
- `FE/README.md` - Frontend-specific documentation
- `FE/app/page.tsx` - Main page layout
- `FE/app/components/*` - React components

---

## 🚀 Quick Reference

### 3-Terminal Setup
```bash
# Terminal 1: Redis
cd BE && docker-compose up

# Terminal 2: Backend
cd BE && yarn seed && yarn dev

# Terminal 3: Frontend
cd FE && npm run dev
```

### Test Users
```
alice    / password123
bob      / secret456
charlie  / test789
```

### Common Commands
```bash
# Backend
cd BE && yarn build    # Compile
cd BE && yarn dev      # Run with hot reload
cd BE && yarn seed     # Seed data

# Frontend
cd FE && npm run dev   # Run with hot reload
cd FE && npm run build # Build for production
```

---

## 🔍 Documentation Map

```
Documentation Index (You are here)
│
├─ QUICK_START.md (3 commands)
│
├─ GUIDE.md (Complete guide)
│  ├─ Setup instructions
│  ├─ Testing procedures
│  ├─ API reference
│  ├─ Troubleshooting
│  └─ Learning points
│
├─ STRUCTURE.md (Project layout)
│  ├─ File organization
│  ├─ Architecture diagram
│  ├─ Key files
│  └─ Command reference
│
├─ ARCHITECTURE.md (System design)
│  ├─ Data flow
│  ├─ Cache strategy
│  ├─ Rate limiting
│  └─ Deployment
│
├─ VISUAL_GUIDE.md (Diagrams)
│  ├─ Before/after comparison
│  ├─ Communication flow
│  ├─ Component structure
│  └─ Data flow examples
│
├─ STATUS.md (Progress tracking)
│  ├─ Completion status
│  ├─ What's ready
│  ├─ What's next
│  └─ Checklist
│
├─ SUMMARY.md (Executive summary)
│  ├─ High-level overview
│  ├─ Tech stack
│  ├─ Key features
│  └─ Next steps
│
└─ README.md (Project main page)
   ├─ Description
   ├─ Features
   ├─ Getting started
   └─ Links to other docs
```

---

## 📊 Documentation Levels

### Level 1️⃣ - Getting Started (5 min)
- QUICK_START.md
- Just copy-paste the 3 terminal commands

### Level 2️⃣ - Using the Application (15 min)
- GUIDE.md → "Testing the Application" section
- Test each feature manually
- Watch console for feedback

### Level 3️⃣ - Understanding the System (30 min)
- STRUCTURE.md → File organization
- ARCHITECTURE.md → How things connect
- GUIDE.md → API reference section

### Level 4️⃣ - Deep Dive (1+ hour)
- Read all documentation
- Study the source code in BE/ and FE/
- Modify and experiment

---

## 🎯 Feature Documentation

### Login Caching
- What: User credentials cached in Redis
- Where: GUIDE.md → "Test Login Caching"
- Details: ARCHITECTURE.md → "Cache Strategy"

### Product Caching
- What: Product list cached for 5 min, individual for 10 min
- Where: GUIDE.md → "Test Product Caching"
- Details: STRUCTURE.md → "Data Flow Examples"

### Rate Limiting
- What: 10 requests/min per IP, 5 login attempts/min per user
- Where: GUIDE.md → "Test Rate Limiting"
- Details: ARCHITECTURE.md → "Rate Limiting"

### Metrics Tracking
- What: Real-time cache hit/miss statistics
- Where: GUIDE.md → "Watch Metrics Live"
- Details: STRUCTURE.md → "Monitoring & Debugging"

---

## 🛠️ Technical Stack

**Backend:**
- Node.js + Express + TypeScript
- Redis (Docker container)
- bcryptjs for password hashing

**Frontend:**
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS for styling

**Deployment:**
- Docker Compose for local development
- Can be deployed to production

---

## ✨ Key Features

✅ Login with automatic caching
✅ Product browser with cache detection  
✅ Rate limiting per IP and per user
✅ Real-time metrics dashboard
✅ CORS enabled for frontend
✅ Separate BE/FE architecture
✅ Complete with test users and demo data

---

## 📞 Support

Having issues? Check:
1. **QUICK_START.md** if not running
2. **GUIDE.md** section "🐛 Troubleshooting"
3. **STRUCTURE.md** section "🚨 Common Issues & Solutions"
4. Look at console logs (browser and terminal)
5. Check Redis connection: `docker ps`

---

## 🔄 Next Steps

1. Run the application (QUICK_START.md)
2. Test each feature (GUIDE.md)
3. Understand the architecture (ARCHITECTURE.md)
4. Explore the code (BE/src/ and FE/app/)
5. Experiment and modify!

---

**Last Updated: October 26, 2025**

👉 **Start here: [QUICK_START.md](./QUICK_START.md)**
