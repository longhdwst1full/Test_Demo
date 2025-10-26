# 🚀 Redis Cache Demo - Tách Frontend & Backend

Giờ đây dự án của bạn đã được tách thành 2 project hoàn toàn riêng biệt:

## 📦 Cấu trúc Dự án

```
WORK-Persional/
├── Test_Demo/              ← Backend (Node.js + Express + Redis)
│   ├── src/
│   ├── docker-compose.yml
│   └── package.json
│
└── test-demo-fe/           ← Frontend (Next.js 16 + TypeScript)
    ├── app/
    ├── package.json
    └── .env.local
```

---

## 🎯 Backend (Test_Demo)

### Tính Năng
✅ Express.js server với TypeScript
✅ Redis caching cho user login (1 giờ TTL)
✅ Product caching (5-10 phút TTL)
✅ Rate limiting thông minh (10 req/min per IP, 5 login attempts/min per user)
✅ Metrics tracking (cache hit/miss stats)
✅ CORS enabled cho frontend

### API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/` | Server info |
| POST | `/login` | Đăng nhập (JSON: `{username, password}`) |
| GET | `/products` | Danh sách sản phẩm (cached) |
| GET | `/products/:id` | Chi tiết sản phẩm (cached) |
| GET | `/metrics` | Cache statistics |

### Quick Start Backend

```powershell
# Terminal 1: Khởi động Redis
cd 'D:\BACKUP\Documents\WORK-Persional\Test_Demo'
docker-compose up

# Terminal 2: Khởi động Backend Server
cd 'D:\BACKUP\Documents\WORK-Persional\Test_Demo'
yarn install
yarn seed              # Tạo dữ liệu demo trong Redis
yarn dev              # Chạy development server (http://localhost:3000)
```

---

## 🎨 Frontend (test-demo-fe)

### Tính Năng
✅ Next.js 16 Modern React UI
✅ TypeScript + Tailwind CSS
✅ Login form với cache detection
✅ Product browser
✅ Rate limit tester (Spam feature)
✅ Live metrics dashboard (auto-refresh 5s)
✅ Responsive design

### Quick Start Frontend

```powershell
cd 'D:\BACKUP\Documents\WORK-Persional\test-demo-fe'
npm install
npm run dev            # http://localhost:3000 hoặc 3001
```

---

## 🧪 Testing Hướng Dẫn

### 1️⃣ Test Login Caching
```
✓ Đăng nhập lần 1 → "✨ NEW" (lấy từ Redis, hash password)
✓ Đăng nhập lần 2 → "⚡ CACHED" (lấy trực tiếp từ Redis cache)
✓ Cache TTL: 1 giờ
```

### 2️⃣ Test Product Caching
```
✓ "Load All Products" lần 1 → "✨ NOT CACHED"
✓ "Load All Products" lần 2 (trong 5 phút) → "⚡ CACHED"
✓ Chi tiết sản phẩm: TTL 10 phút (dài hơn vì chuyên biệt)
```

### 3️⃣ Test Rate Limiting
```
✓ Nhấn "Spam 10x" button
✓ Sau 5 lần thử → ⚠️ "Rate Limited!" (HTTP 429)
✓ Phải chờ 60 giây để retry
```

### 4️⃣ Watch Metrics Live
```
✓ Metrics dashboard auto-refresh mỗi 5 giây
✓ Theo dõi cache hit rate (%)
✓ Theo dõi từng request
```

### Test Users

```
| Username | Password |
|----------|----------|
| alice    | password123 |
| bob      | secret456   |
| charlie  | test789     |
```

---

## 🔧 Cấu Hình Environment

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

---

## 📊 Architecture Flow

```
Frontend (Next.js)          Backend (Express)          Redis
    ↓                            ↓                       ↓
1. POST /login ─────────→ Check Redis cache
                          ├─ Hit: Return cached user
                          └─ Miss: Hash password, store in cache
                                      ↑
                                   Store in Redis

2. GET /products ─────────→ Check product:list cache
                          ├─ Hit: Return cached list
                          └─ Miss: Query products, cache 5min
                                      ↑
                                   Store in Redis

3. Rate Limit Check ────────→ ratelimit:IP:endpoint counter
                          ├─ Allowed: Increment counter (60s TTL)
                          └─ Blocked: Return 429 Too Many Requests
                                      ↑
                                   Counter in Redis

4. GET /metrics ────────────→ Aggregate cache stats
                          ├─ login:hits, login:misses
                          ├─ products:hits, products:misses
                          └─ Calculate hit rates
                                      ↑
                                   Fetch from Redis
```

---

## 🚀 Production Build & Deploy

### Backend
```bash
# Build
yarn build

# Start
yarn start
# Listens on http://0.0.0.0:3000
```

### Frontend
```bash
# Build
npm run build

# Start
npm start
# Listens on http://localhost:3000 (port 3)
```

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check Redis running
docker-compose ps

# Restart Redis
docker-compose restart
```

### Frontend CORS error?
```
✓ Backend CORS middleware enabled
✓ Make sure NEXT_PUBLIC_API_URL points to correct backend
✓ Backend must be running on http://localhost:3000
```

### Redis connection error?
```bash
# Test Redis connection
redis-cli ping
# Should return: PONG
```

---

## 📝 Next Steps

1. ✅ Backend tách riêng - **DONE**
2. ✅ Frontend tách riêng (Next.js) - **IN PROGRESS**
3. 📋 Need to: Create React components trong `test-demo-fe/app/components/`
   - `LoginCard.tsx`
   - `ProductCard.tsx`
   - `RateLimitTester.tsx`
   - `MetricsCard.tsx`
4. 📋 Need to: Update `test-demo-fe/app/page.tsx` main dashboard

**Liên hệ xem chi tiết trong ARCHITECTURE.md**

---

**Happy Testing! 🎉**
