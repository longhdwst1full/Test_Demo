# 🎨 Frontend Testing Guide

## 📦 Components Overview

All React components are ready for testing the Backend Redis cache demo.

### 1. **LoginCard.tsx** 🔐
Tests user authentication caching.

**How it works:**
- Pre-filled with alice/password123
- First login → "✨ NEW" badge (password hashed & cached)
- Second login → "⚡ CACHED" badge (retrieved from Redis 1h TTL)

**Test:**
```
1. Click Login with alice/password123 → "✨ NEW"
2. Click Login again → "⚡ CACHED"
3. Try bob/secret456 → "✨ NEW" (different user)
```

---

### 2. **ProductCard.tsx** 🛍️
Tests product caching with list and detail views.

**How it works:**
- Click "Load Products" → fetches from Backend
- First click → "✨ NOT CACHED" (5 min TTL)
- Second click (within 5 min) → "⚡ CACHED"
- Click product to see details (10 min TTL)

**Test:**
```
1. Click "Load Products" → "✨ NOT CACHED"
2. Click again immediately → "⚡ CACHED"
3. Click a product → See detail with cache status
4. Click same product → "⚡ CACHED" detail
5. Wait 5+ min → Product list cache expires
```

---

### 3. **MetricsCard.tsx** 📊
Real-time cache statistics dashboard.

**Displays:**
- Login cache: hits, misses, hit rate %
- Product cache: hits, misses, hit rate %
- Auto-refreshes every 5 seconds
- Progress bars showing hit rate

**Understanding:**
- Hit Rate = Hits / (Hits + Misses) * 100%
- 50% = 1 hit, 1 miss
- 100% = All from cache
- 0% = All fresh (no cache)

---

## 🚀 Quick Start

```bash
# In FE folder
cd FE
npm run dev
```

Then open: **http://localhost:3000**

---

## 🧪 Complete Testing Flow (10 minutes)

### Phase 1: Test Login Caching (2 min)

1. **First Login**
   - Username: alice
   - Password: password123
   - Click Login
   - ✅ See "✨ NEW" badge
   - ✅ Metrics: login_cache_misses = 1

2. **Second Login**
   - Same credentials
   - Click Login again
   - ✅ See "⚡ CACHED" badge
   - ✅ Much faster!
   - ✅ Metrics: login_cache_hits = 1

3. **Different User**
   - Username: bob
   - Password: secret456
   - Click Login
   - ✅ See "✨ NEW" badge (new user)

---

### Phase 2: Test Product Caching (3 min)

1. **First Load**
   - Click "Load Products"
   - ✅ See "✨ NOT CACHED" badge
   - ✅ Metrics: products_cache_misses increments

2. **Second Load** (within 5 min)
   - Click "Load Products" again
   - ✅ See "⚡ CACHED" badge
   - ✅ Much faster!
   - ✅ Metrics: products_cache_hits increments

3. **Product Detail**
   - Click on a product (e.g., Laptop)
   - ✅ Detail view opens
   - ✅ See cache status badge
   - ✅ Metrics: products_cache_hits increments

4. **Same Product Detail**
   - Click Laptop again
   - ✅ See "⚡ CACHED" (10 min TTL)
   - ✅ Different cache from list!

---

### Phase 3: Monitor Metrics (Continuous)

Watch MetricsCard auto-refresh every 5 seconds:

**Expected Pattern:**
```
Start:
  Login: 0 hits, 0 misses, N/A rate
  Products: 0 hits, 0 misses, N/A rate

After first login:
  Login: 0 hits, 1 miss, 0% rate
  
After second login:
  Login: 1 hit, 1 miss, 50% rate
  
After first product load:
  Products: 0 hits, 1 miss, 0% rate
  
After second product load:
  Products: 1 hit, 1 miss, 50% rate
```

---

## 🎯 Key Observations

### Login Cache Behavior

| Action | Badge | Reason |
|--------|-------|--------|
| 1st login | ✨ NEW | Password hashed, stored in Redis |
| 2nd login | ⚡ CACHED | Retrieved from cache (1h TTL) |
| Different user | ✨ NEW | Different cache key |
| Wrong password | N/A | Error (increments misses) |

### Product Cache Behavior

| Action | Badge | Reason |
|--------|-------|--------|
| 1st load list | ✨ NOT CACHED | List cached with 5 min TTL |
| 2nd load list | ⚡ CACHED | Retrieved from cache |
| Load detail | ⚡ CACHED or ✨ | Detail has 10 min TTL |
| After 5+ min | ✨ NOT CACHED | List cache expired |

### Cache Hit Rate

| Stage | Login Rate | Product Rate | Meaning |
|-------|-----------|--------------|---------|
| Start | N/A | N/A | No data yet |
| 1st use | 0% | 0% | All fresh queries |
| 2nd use | 50% | 50% | Half from cache |
| 3rd+ use | 66%+ | 66%+ | Most from cache |

---

## 🐛 Troubleshooting

### Backend Not Responding
```
Symptom: Loading spinner never stops
Solution:
1. Check Backend running: npm run dev (in BE/)
2. Verify port 3000 is accessible
3. Check .env.local has correct NEXT_PUBLIC_API_URL
4. Restart both Frontend and Backend
```

### Cache Badge Not Showing
```
Symptom: No "✨" or "⚡" badge
Solution:
1. Check backend returning {cached: boolean}
2. Verify API response format
3. Check browser DevTools Console for errors
4. Inspect Network tab for response
```

### Metrics Stuck at N/A
```
Symptom: Hit rate shows N/A
Solution:
1. This is normal initially
2. Wait for auto-refresh (5 sec)
3. Click "Refresh Metrics" button
4. Do another action to generate stats
```

### Wrong URL Port
```
Symptom: "Cannot reach backend on localhost:3000"
Solution:
1. If backend on different port, update .env.local
2. Example: NEXT_PUBLIC_API_URL=http://localhost:5000
3. Restart npm run dev
4. Hard refresh browser (Ctrl+Shift+R)
```

---

## 📊 Sample Test Results

### Expected Output After 10 Minutes Testing

```
LOGIN METRICS:
├─ Cache Hits: 4
├─ Cache Misses: 3
└─ Hit Rate: 57.1%

PRODUCT METRICS:
├─ Cache Hits: 5
├─ Cache Misses: 2
└─ Hit Rate: 71.4%

Performance:
├─ 1st request ~100ms (database)
├─ 2nd request ~10ms (cache)
└─ Speed improvement: 10x faster
```

---

## ✅ Testing Checklist

- [ ] Frontend starts at http://localhost:3000
- [ ] LoginCard displays with form
- [ ] ProductCard displays with button
- [ ] MetricsCard displays with auto-refresh
- [ ] Can login successfully
- [ ] Login shows "✨ NEW" first time
- [ ] Login shows "⚡ CACHED" second time
- [ ] Can load products
- [ ] Products show "✨ NOT CACHED" first time
- [ ] Products show "⚡ CACHED" within 5 minutes
- [ ] Can click products for details
- [ ] Product details show cache status
- [ ] Metrics auto-refresh every 5 seconds
- [ ] Metrics display hit/miss counts
- [ ] Metrics display hit rate percentages
- [ ] Cache expires properly after TTL
- [ ] Error handling works (wrong password)
- [ ] Loading states display correctly
- [ ] No console errors or warnings
- [ ] All components are responsive (mobile/desktop)

---

## 🎓 Learning Outcomes

By completing this testing:

1. ✅ Understand how frontend communicates with backend
2. ✅ See caching in action (badge changes)
3. ✅ Learn cache hit rate calculations
4. ✅ Understand TTL (time-to-live) expiration
5. ✅ See performance difference (cached vs fresh)
6. ✅ Monitor cache statistics in real-time
7. ✅ Understand different cache keys (user vs product)

---

**Version:** 1.0.0  
**Last Updated:** October 26, 2025  
**Status:** ✅ Ready to Test

🚀 **Start Testing:** `npm run dev` in FE/ folder
