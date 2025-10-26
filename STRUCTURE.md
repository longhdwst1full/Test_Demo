# 📖 Updated Project Structure

## 🎯 Current Layout (After Updates)

```
Test_Demo/                       ← Root Repository
│
├── BE/                          ← BACKEND (Express + Redis)
│   ├── src/
│   │   ├── index.ts            # Express server with CORS & rate limiting
│   │   ├── seed-redis.ts       # Seed users, products, metrics
│   │   ├── cache.ts            # Redis client wrapper
│   │   └── types.d.ts          # TypeScript declarations
│   │
│   ├── dist/                    # Compiled JavaScript
│   ├── docker-compose.yml       # Redis 7 container
│   ├── Dockerfile              # Backend Docker image
│   ├── package.json            # Dependencies
│   ├── tsconfig.json
│   ├── .env                    # Environment variables
│   ├── .gitignore
│   ├── yarn.lock
│   │
│   └── 📚 Documentation
│       ├── README.md           # Backend overview
│       ├── ARCHITECTURE.md     # System design
│       ├── SETUP.md           # Setup details
│       ├── STATUS.md          # Current status
│       └── VISUAL_GUIDE.md    # Architecture diagrams
│
├── FE/                         ← FRONTEND (Next.js + React)
│   ├── app/
│   │   ├── page.tsx           # Main dashboard
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Tailwind styles
│   │   │
│   │   └── components/
│   │       ├── LoginCard.tsx      # Login component
│   │       ├── ProductCard.tsx    # Product browser
│   │       ├── RateLimitTester.tsx # Rate limit demo
│   │       └── MetricsCard.tsx     # Metrics dashboard
│   │
│   ├── public/                # Static files
│   ├── node_modules/
│   ├── package.json           # Dependencies
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs     # Tailwind config
│   ├── eslint.config.mjs
│   ├── .env.local             # NEXT_PUBLIC_API_URL
│   ├── .gitignore
│   ├── package-lock.json
│   │
│   └── README.md              # Frontend overview
│
├── 📚 Root Documentation
│   ├── GUIDE.md              # ← Complete setup guide ⭐
│   ├── QUICK_START.md        # ← Quick reference ⭐
│   ├── STRUCTURE.md          # ← This file
│   ├── ARCHITECTURE.md
│   ├── SUMMARY.md
│   └── STATUS.md
│
├── .git/                      # Git repository
├── .gitignore
└── README.md                  # Main project README
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│          FRONTEND (Next.js + React)                     │
│         http://localhost:3000 or 3001                   │
├─────────────────────────────────────────────────────────┤
│  Page: /                                                │
│  ├─ LoginCard        (POST /login)                      │
│  ├─ ProductCard      (GET /products)                    │
│  ├─ RateLimitTester  (POST /login x10)                  │
│  └─ MetricsCard      (GET /metrics auto-refresh)       │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────▼─────────┐
        │ CORS Preflight   │
        │ API Requests     │
        └────────┬─────────┘
                 │
┌────────────────▼─────────────────────────────────────┐
│        BACKEND (Express.js + TypeScript)              │
│           http://localhost:3000                        │
├──────────────────────────────────────────────────────┤
│  Routes:                                             │
│  ├─ POST /login         (rate limited)               │
│  ├─ GET /products       (cached 5min)                │
│  ├─ GET /products/:id   (cached 10min)               │
│  ├─ GET /metrics        (real-time stats)            │
│  └─ GET /               (server info)                │
│                                                      │
│  Middleware:                                         │
│  ├─ CORS (allows all origins)                        │
│  ├─ Rate Limiting (10 req/min per IP)                │
│  └─ Express JSON parser                              │
└────────────────┬─────────────────────────────────────┘
                 │
                 │ Cache Queries
                 │ Store Operations
                 │ Metrics Updates
                 │
┌────────────────▼─────────────────────────────────────┐
│         REDIS CACHE (In-Memory Store)                 │
│          127.0.0.1:6379 (Docker)                      │
├──────────────────────────────────────────────────────┤
│  Data Structure:                                     │
│  ├─ user:alice          (1h TTL)                     │
│  ├─ password:alice      (1h TTL)                     │
│  ├─ product:1-5         (10m TTL)                    │
│  ├─ products:list       (5m TTL)                     │
│  ├─ ratelimit:IP:path   (60s TTL)                    │
│  └─ metrics:*           (24h TTL)                    │
└──────────────────────────────────────────────────────┘
```

---

## 📦 Key Files

### Backend Essentials

| File | Purpose | Key Code |
|------|---------|----------|
| `BE/src/index.ts` | Express server | Rate limiter, CORS, endpoints |
| `BE/src/seed-redis.ts` | Data initialization | Seeds users, products, metrics |
| `BE/src/cache.ts` | Redis wrapper | `get()`, `set(key, val, ttl)` |
| `BE/docker-compose.yml` | Redis container | Defines Redis 7 service |
| `BE/.env` | Backend config | Redis connection details |

### Frontend Essentials

| File | Purpose | Key Code |
|------|---------|----------|
| `FE/app/page.tsx` | Main page | Composes all components |
| `FE/app/components/LoginCard.tsx` | Login form | Calls `/login` endpoint |
| `FE/app/components/ProductCard.tsx` | Products | Calls `/products` endpoints |
| `FE/app/components/MetricsCard.tsx` | Metrics display | Calls `/metrics`, auto-refresh |
| `FE/app/components/RateLimitTester.tsx` | Rate limit demo | Spam login attempts |
| `FE/.env.local` | Frontend config | `NEXT_PUBLIC_API_URL` |

---

## 🚀 Command Reference

### Backend

```bash
cd BE

# Build
yarn build

# Development (with hot reload)
yarn dev

# Production
yarn start

# Seed data
yarn seed

# Docker
docker-compose up          # Start Redis
docker-compose down        # Stop Redis
docker-compose ps          # Check status
```

### Frontend

```bash
cd FE

# Install dependencies
npm install

# Development (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Docker

```bash
# View running containers
docker ps

# View all images
docker images

# Check logs
docker logs -f container_name

# Shell into container
docker exec -it redis redis-cli

# Clear Redis
docker-compose down -v      # Remove volumes too
```

---

## 🔐 Security Notes

### Current Settings

- ✅ CORS enabled for all origins (safe for demo)
- ✅ Rate limiting: 10 req/min per IP
- ✅ Password hashing: bcryptjs (10 salt rounds)
- ⚠️ No authentication tokens (Redis only)
- ⚠️ Credentials stored in plain Redis (cache only)

### Production Recommendations

- [ ] Restrict CORS to specific frontend domain
- [ ] Add JWT authentication
- [ ] Use Redis with password authentication
- [ ] Use HTTPS/TLS
- [ ] Add input validation/sanitization
- [ ] Implement per-user rate limiting
- [ ] Add request logging
- [ ] Use environment variables for secrets

---

## 📊 Data Flow Examples

### Example 1: Login with Caching

```
1. User enters: alice / password123
2. Frontend: POST /login
3. Backend receives request
4. Rate limit check: Pass (user IP < 10 req/min)
5. Check Redis: Is "user:alice" cached?
   - YES (cached): Return cached user object
   - NO (miss): Hash password, verify, store in Redis (1h TTL)
6. Frontend receives: {cached: true/false, user: {...}}
7. Show "⚡ CACHED" or "✨ NEW" badge
8. Update metrics: login_cache_hits or login_cache_misses
```

### Example 2: Product Listing with Cache

```
1. Frontend: GET /products
2. Rate limit check: Pass (< 10 req/min)
3. Check Redis: Is "products:list" cached?
   - YES (cached < 5min): Return cached array
   - NO (expired/missing): Query all products
4. Increment metrics: products_cache_hits or _misses
5. Frontend displays products with cache badge
```

### Example 3: Rate Limiting

```
1. User clicks button 11 times in 10 seconds
2. For each request:
   - Generate key: "ratelimit:127.0.0.1:/login"
   - Get counter from Redis (default 0)
   - Request 1-10: Counter < 10 ✓ Increment, allow
   - Request 11: Counter = 10 ✗ Return 429 (Too Many Requests)
3. After 60 seconds: Counter expires, can try again
```

---

## 🧪 Testing Strategy

### Unit Testing (Recommended)

```bash
# Backend (using Jest)
yarn test

# Frontend (using Vitest)
npm test
```

### Integration Testing (Current)

```
Manual testing through browser UI:
✓ Login caching (login twice, check badge)
✓ Product caching (load twice, check badge)
✓ Rate limiting (spam requests, watch errors)
✓ Metrics (auto-refresh, watch counts)
```

### Performance Testing

```
Monitor:
✓ Cache hit rates (% from Redis)
✓ Response times (check Network tab)
✓ Rate limit accuracy (429 at right time)
✓ Memory usage (Redis MEMORY STATS)
```

---

## 📈 Monitoring & Debugging

### Via Browser DevTools

```
1. Open http://localhost:3000
2. Open Chrome DevTools (F12)
3. Network tab: Watch requests
   - Check Response headers for cache info
   - Monitor rate limit headers (X-RateLimit-Remaining)
4. Console: Check for CORS/API errors
5. Application: Check LocalStorage if any stored
```

### Via Redis CLI

```bash
redis-cli

# Connect if in Docker
docker-compose exec redis redis-cli

# Monitor commands
MONITOR

# View all keys
KEYS *

# Check specific key
GET user:alice

# Check cache TTLs
TTL user:alice

# Memory stats
MEMORY STATS

# Flush everything
FLUSHALL
```

### Via Express Logs

```
Backend logs show:
✓ Request method/path
✓ Rate limit status
✓ Cache hit/miss
✓ Processing time
✓ Response status code
```

---

## 🎓 Learning Path

### Beginner
1. Start with `QUICK_START.md` to get running
2. Test login caching manually
3. Read this `STRUCTURE.md` file

### Intermediate
4. Read `GUIDE.md` for detailed API docs
5. Understand rate limiting logic
6. Check Redis data structure

### Advanced
7. Read `ARCHITECTURE.md` for deep dive
8. Modify cache TTLs and test impact
9. Add new features (new endpoints, new cache types)

---

## 🚨 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Redis connection refused | Docker not running | Run `docker-compose up` in BE/ |
| Frontend blank page | API URL wrong | Check `FE/.env.local` |
| CORS error | Missing headers | Already configured, restart backend |
| Port 3000 busy | Another service using it | Use 3001 or kill the process |
| No data showing | Seed not run | Run `yarn seed` in BE/ |
| Metrics not updating | Interval stopped | Refresh page or check console |
| Cache not working | TTL expired | Check Redis with `redis-cli` |

---

## ✨ What's Next?

Potential improvements:

1. [ ] Add per-user rate limiting (instead of per-IP)
2. [ ] Implement JWT authentication
3. [ ] Add database persistence to Redis
4. [ ] Create API documentation (Swagger/OpenAPI)
5. [ ] Add request logging middleware
6. [ ] Implement cache invalidation strategy
7. [ ] Add database (PostgreSQL) fallback
8. [ ] Deploy to production (Docker/Kubernetes)

---

**Last Updated: October 26, 2025**

For more info, check:
- `GUIDE.md` - Comprehensive guide
- `QUICK_START.md` - Quick reference
- `BE/README.md` - Backend specific
- `FE/README.md` - Frontend specific
