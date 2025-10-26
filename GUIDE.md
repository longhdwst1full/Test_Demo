# 📚 Redis Cache Demo - Hướng Dẫn Chi Tiết

## 📋 Cấu Trúc Dự Án

```
Test_Demo/
├── BE/                     ← Backend (Node.js + Express + Redis)
│   ├── src/
│   │   ├── index.ts        (Express server + CORS + Rate Limiting)
│   │   ├── seed-redis.ts   (Seed users, products, metrics)
│   │   ├── cache.ts        (Redis client wrapper)
│   │   └── types.d.ts      (TypeScript types)
│   ├── dist/               (Compiled JavaScript)
│   ├── docker-compose.yml  (Redis container)
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── FE/                     ← Frontend (Next.js 16 + React + TypeScript)
    ├── app/
    │   ├── page.tsx        (Main dashboard)
    │   ├── layout.tsx      (Root layout)
    │   ├── globals.css     (Tailwind styles)
    │   └── components/     (React components)
    │       ├── LoginCard.tsx
    │       ├── ProductCard.tsx
    │       ├── RateLimitTester.tsx
    │       └── MetricsCard.tsx
    ├── public/
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    └── .env.local
```

---

## 🚀 Quick Start (3 Terminal Setup)

### Terminal 1: Start Redis Container

```bash
cd BE
docker-compose up
```

**Output:**
```
redis-7  | # Ready to accept connections
```

### Terminal 2: Start Backend Server

```bash
cd BE
yarn install          # If first time
yarn seed            # Seed data to Redis
yarn dev             # Start development server
```

**Output:**
```
🌱 Seeding Redis with users and products...

📝 Seeding Users:
  ✓ alice / password123
  ✓ bob / secret456
  ✓ charlie / test789

🛍️ Seeding Products:
  ✓ Product 1: Laptop - $999.99
  ✓ Product 2: Mouse - $29.99
  ✓ Product 3: Keyboard - $79.99
  ✓ Product 4: Monitor - $299.99
  ✓ Product 5: Headphones - $149.99
  ✓ Products list cached

📊 Initializing Metrics:
  ✓ Metrics initialized

✅ Seed completed successfully!

🚀 Server listening on http://0.0.0.0:3000
```

### Terminal 3: Start Frontend Development Server

```bash
cd FE
npm install           # If first time
npm run dev          # Start development server
```

**Output:**
```
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

> **Note:** If port 3000 is busy, Next.js will use 3001

---

## 🧪 Testing the Application

### 1️⃣ Test Login Caching

#### First Login (Cache Miss)
```
1. Open http://localhost:3000 (or 3001 if backend is on 3000)
2. Enter: username = "alice", password = "password123"
3. Click "Login"

Response:
✅ LOGIN SUCCESS ✨ NEW
Username: alice
Message: User authenticated (from database)
Cached: false
```

#### Second Login (Cache Hit)
```
4. Click "Login" again with same credentials
5. Response shows:

✅ LOGIN SUCCESS ⚡ CACHED
Username: alice
Message: User found in Redis cache!
Cached: true
```

**Why different?**
- 1st login: Password hashed, checked against seed data, stored in Redis (1 hour TTL)
- 2nd login: Retrieved directly from Redis cache (fast!)

---

### 2️⃣ Test Product Caching

#### First Load (Cache Miss)
```
1. Click "Load All Products" button
2. Response shows:

🛍️ PRODUCTS ✨ NOT CACHED
Message: Products loaded from database
Products:
  - Laptop ($999.99)
  - Mouse ($29.99)
  - Keyboard ($79.99)
  - Monitor ($299.99)
  - Headphones ($149.99)
```

#### Second Load (Cache Hit - within 5 minutes)
```
3. Click "Load All Products" again
4. Response shows:

🛍️ PRODUCTS ⚡ CACHED
Message: Products loaded from cache
Products: [same list]
```

**Cache TTL:**
- Products list: 5 minutes
- Individual product: 10 minutes

---

### 3️⃣ Test Rate Limiting

#### Normal Requests (Allowed)
```
1. Click any button multiple times
2. Requests 1-10 succeed (10 requests per minute per IP)
```

#### Rate Limit Triggered
```
3. Click any button more than 10 times in 60 seconds
4. After 10 requests, you see:

⚠️ TOO MANY REQUESTS
Error: Rate limit exceeded (429)
Retry after: 60 seconds
```

#### Login-Specific Rate Limit
```
- Username-specific limit: 5 attempts per minute
- Try logging in with wrong password 5+ times
- Get rate limited on login endpoint specifically
```

**Rate Limits:**
- Global: 10 requests/minute per IP per endpoint
- Login: 5 attempts/minute per username
- Window: 60 seconds

---

### 4️⃣ Watch Metrics Live

```
📊 CACHE METRICS (auto-refreshes every 5 seconds)

🔐 Login Cache:
  Hits: 5
  Misses: 2
  Hit Rate: 71.4%

🛍️ Products Cache:
  Hits: 8
  Misses: 1
  Hit Rate: 88.9%
```

**Metrics Tracked:**
- `metrics:login_cache_hits` - User logins from cache
- `metrics:login_cache_misses` - User logins with authentication
- `metrics:products_cache_hits` - Product requests from cache
- `metrics:products_cache_misses` - Product requests from DB

---

## 🔌 Backend API Reference

### 1. Login Endpoint

**Request:**
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "password123"
  }'
```

**Response (Cache Hit):**
```json
{
  "cached": true,
  "message": "User found in Redis cache!",
  "user": {
    "username": "alice"
  }
}
```

**Response (Cache Miss):**
```json
{
  "cached": false,
  "message": "User authenticated",
  "user": {
    "username": "alice"
  }
}
```

**Error Response:**
```json
{
  "error": "Invalid credentials"
}
```

---

### 2. Products List Endpoint

**Request:**
```bash
curl http://localhost:3000/products
```

**Response (Cached):**
```json
{
  "cached": true,
  "message": "Products loaded from cache (300s TTL)",
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99,
      "stock": 10
    },
    ...
  ]
}
```

---

### 3. Product Detail Endpoint

**Request:**
```bash
curl http://localhost:3000/products/1
```

**Response:**
```json
{
  "cached": false,
  "message": "Product loaded from database",
  "product": {
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "stock": 10
  }
}
```

---

### 4. Metrics Endpoint

**Request:**
```bash
curl http://localhost:3000/metrics
```

**Response:**
```json
{
  "login": {
    "hits": 5,
    "misses": 2,
    "hitRate": "71.4%"
  },
  "products": {
    "hits": 8,
    "misses": 1,
    "hitRate": "88.9%"
  }
}
```

---

## 🔐 Test Users

Use these credentials to test the login:

| Username | Password | Notes |
|----------|----------|-------|
| alice | password123 | Demo user 1 |
| bob | secret456 | Demo user 2 |
| charlie | test789 | Demo user 3 |

**Password hashing:**
- All passwords are hashed with bcryptjs (10 salt rounds)
- Stored in Redis: `password:username`
- User info stored in: `user:username`

---

## 🌐 Frontend Features

### Component Overview

#### 1. **LoginCard**
- Username/password input
- Login button
- Shows cache detection badge
- Displays user info on success
- Shows error messages

#### 2. **ProductCard**
- "Load All Products" button
- Shows product list with cache badge
- Click product to view details
- Shows cache hit/miss status

#### 3. **RateLimitTester**
- "Spam 1x", "Spam 5x", "Spam 10x" buttons
- Tests rate limiting by rapid login attempts
- Shows which attempts get blocked (429)
- Displays rate limit responses

#### 4. **MetricsCard**
- Auto-refreshing metrics dashboard
- Shows cache hits and misses
- Displays hit rate percentage
- Progress bars for visual representation

---

## 🛠️ Environment Configuration

### Backend (.env)
```
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
PORT=3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

> **Note:** `NEXT_PUBLIC_` prefix makes variable accessible in browser

---

## 📊 Redis Data Structure

### Keys Used:

```
user:{username}                    → User info (JSON)
password:{username}                → Hashed password
product:{id}                       → Product info (JSON)
products:list                      → All products (JSON array)
ratelimit:{ip}:{endpoint}         → Request counter
metrics:login_cache_hits           → Counter
metrics:login_cache_misses         → Counter
metrics:products_cache_hits        → Counter
metrics:products_cache_misses      → Counter
```

### Example Redis Commands:

```bash
# Connect to Redis
redis-cli

# View user
GET user:alice

# View product list
GET products:list

# Check rate limit counter
GET ratelimit:127.0.0.1:/login

# View all keys
KEYS *

# Check metrics
GET metrics:login_cache_hits

# Clear everything
FLUSHALL
```

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│           Browser (Next.js Frontend)                    │
│  http://localhost:3000 or 3001                          │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Components:                                    │   │
│  │  - LoginCard                                    │   │
│  │  - ProductCard                                  │   │
│  │  - RateLimitTester                              │   │
│  │  - MetricsCard                                  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────┬─────────────────────────────────────┘
                  │
        CORS Preflight (OPTIONS)
        API Requests (GET, POST)
                  │
┌─────────────────▼─────────────────────────────────────┐
│         Express Backend (Node.js)                      │
│       http://localhost:3000                            │
│                                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │  Endpoints:                                  │    │
│  │  - POST /login (with rate limiting)          │    │
│  │  - GET /products (with cache)                │    │
│  │  - GET /products/:id (with cache)            │    │
│  │  - GET /metrics                              │    │
│  └──────────────────────────────────────────────┘    │
│                      │                                │
│                      ▼                                │
│  ┌──────────────────────────────────────────────┐    │
│  │      Redis Cache                             │    │
│  │  (127.0.0.1:6379)                           │    │
│  │                                              │    │
│  │  Keys:                                       │    │
│  │  - user:*                                    │    │
│  │  - password:*                                │    │
│  │  - product:*                                 │    │
│  │  - ratelimit:*                               │    │
│  │  - metrics:*                                 │    │
│  └──────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────┘
```

---

## 📈 Demo Scenario

### Complete Flow

1. **Start Services**
   ```bash
   Terminal 1: docker-compose up (in BE/)
   Terminal 2: yarn seed && yarn dev (in BE/)
   Terminal 3: npm run dev (in FE/)
   ```

2. **Test Login Caching**
   ```
   - Login as alice
   - See "✨ NEW" badge first time
   - Login again → See "⚡ CACHED" badge
   - Metrics update: login_cache_hits +1
   ```

3. **Test Product Caching**
   ```
   - Load products → "✨ NOT CACHED"
   - Load again → "⚡ CACHED"
   - Metrics update: products_cache_hits +1
   ```

4. **Test Rate Limiting**
   ```
   - Click "Spam 10x"
   - First 10 requests succeed
   - Requests 11+ get 429 (Too Many Requests)
   - Wait 60 seconds, try again
   ```

5. **Watch Metrics**
   ```
   - Dashboard updates every 5 seconds
   - See hit rates improve as cache warms up
   - Notice different TTLs in action
   ```

---

## 🐛 Troubleshooting

### Backend won't start?

**Error: `connect ECONNREFUSED 127.0.0.1:6379`**
```
Solution: Make sure Redis is running
Terminal 1: docker-compose up
Check: docker ps
```

### Frontend CORS error?

**Error: `Access to XMLHttpRequest blocked by CORS policy`**
```
✓ Backend CORS already enabled in index.ts
✓ Check NEXT_PUBLIC_API_URL in .env.local
✓ Make sure backend is running on :3000
```

### Port conflicts?

**Error: `Port 3000 is already in use`**
```
Solution 1: Kill the process using port 3000
Solution 2: Use different port for one service
Solution 3: Backend on 3000, Frontend on 3001
```

### Redis data not persisted?

**Issue: Data lost after docker-compose restart**
```
Current: Ephemeral (data lost)
To fix: Add volumes to docker-compose.yml
  volumes:
    - redis_data:/data
volumes:
  redis_data:
```

---

## 📚 Additional Resources

### Useful Commands

```bash
# Backend
cd BE
yarn build          # Compile TypeScript
yarn start          # Run production
yarn dev            # Run development
yarn seed           # Seed data

# Frontend
cd FE
npm run build       # Build Next.js
npm start           # Run production
npm run dev         # Run development

# Redis CLI
redis-cli
> PING             # Test connection
> KEYS *           # List all keys
> GET key_name     # Get value
> FLUSHALL         # Clear all data
```

### Stack Details

**Backend:**
- Node.js 18+
- Express 4.18
- TypeScript 5.6
- Redis 4.6
- bcryptjs 2.4 (password hashing)

**Frontend:**
- Next.js 16
- React 19
- TypeScript 5.x
- Tailwind CSS 3
- Node.js 18+

---

## ✅ Verification Checklist

Before considering the setup complete:

- [ ] Redis container running (`docker ps` shows redis)
- [ ] Backend server started on port 3000
- [ ] Data seeded successfully (see console output)
- [ ] Frontend accessible on port 3000/3001
- [ ] Can login with alice/password123
- [ ] See "⚡ CACHED" on second login
- [ ] Products load and cache correctly
- [ ] Rate limiting triggers after 10 requests
- [ ] Metrics dashboard updates
- [ ] No CORS errors in browser console

---

## 🎓 Learning Points

This demo teaches you:

1. **Caching Strategy**: How to cache frequently accessed data
2. **Rate Limiting**: Protecting APIs from abuse
3. **Redis Operations**: Getting, setting, TTL management
4. **Frontend-Backend Integration**: CORS, API communication
5. **Metrics Tracking**: Monitoring cache effectiveness
6. **TypeScript**: Type safety in both BE and FE
7. **Next.js**: Modern React framework with SSR/SSG
8. **Express.js**: Building REST APIs

---

**Happy Testing! 🚀**

Questions? Check the:
- `BE/ARCHITECTURE.md` - System architecture details
- `BE/README.md` - Backend-specific documentation
- `FE/README.md` - Frontend-specific documentation
