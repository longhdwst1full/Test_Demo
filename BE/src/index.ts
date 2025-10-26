import express from "express";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import * as cache from "./cache";

const PORT = parseInt(process.env.PORT || "3000", 10);

const app = express();
app.use(express.json());

// CORS middleware for frontend communication
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, "../public")));

// Simple rate limiter using Redis
const rateLimit = async (
  key: string,
  maxRequests: number = 5,
  windowSeconds: number = 60
) => {
  const count = await cache.get(key);
  const currentCount = count ? parseInt(count, 10) : 0;

  if (currentCount >= maxRequests) {
    return { allowed: false, remaining: 0, retryAfter: windowSeconds };
  }

  const newCount = currentCount + 1;
  if (currentCount === 0) {
    await cache.set(key, "1", windowSeconds);
  } else {
    await cache.set(key, String(newCount), windowSeconds);
  }

  return { allowed: true, remaining: maxRequests - newCount, retryAfter: 0 };
};

// Middleware for rate limiting per IP
const rateLimitMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const ip = req.ip || "unknown";
  const endpoint = req.path;
  const limiterKey = `ratelimit:${ip}:${endpoint}`;

  const result = await rateLimit(limiterKey, 10, 60);

  res.set("X-RateLimit-Limit", "10");
  res.set("X-RateLimit-Remaining", String(result.remaining));

  if (!result.allowed) {
    return res.status(429).json({
      error: "Too many requests",
      retryAfter: result.retryAfter,
    });
  }

  next();
};

app.use(rateLimitMiddleware);

// Routes
app.get("/", (_req, res) =>
  res.json({
    ok: true,
    message: "Redis Login + Product Cache Demo",
    endpoints: ["/", "/login", "/products", "/metrics"],
  })
);

// Login endpoint with rate limiting (5 attempts per minute)
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body as {
      username?: string;
      password?: string;
    };
    if (!username || !password)
      return res.status(400).json({ error: "username and password required" });

    // Per-user login rate limit: 5 attempts per minute
    const loginLimiterKey = `login:${username}`;
    const loginLimit = await rateLimit(loginLimiterKey, 5, 60);

    if (!loginLimit.allowed) {
      return res.status(429).json({
        error: "Too many login attempts",
        retryAfter: loginLimit.retryAfter,
      });
    }

    const userKey = `user:${username}`;
    const passwordKey = `password:${username}`;

    // Check cache for user
    const cached = await cache.get(userKey);

    let cacheHit = false;
    if (cached) {
      cacheHit = true;
      const user = JSON.parse(cached);
      // Verify password
      const storedHashedPassword = await cache.get(passwordKey);
      if (!storedHashedPassword) {
        return res.status(401).json({ error: "invalid credentials" });
      }
      const match = bcryptjs.compareSync(password, storedHashedPassword);
      if (!match) return res.status(401).json({ error: "invalid credentials" });

      // Update metrics
      await cache.set(
        `metrics:login_cache_hits`,
        String(
          parseInt((await cache.get("metrics:login_cache_hits")) || "0", 10) + 1
        ),
        86400
      );

      return res.json({
        ok: true,
        cached: true,
        user,
        message: "From Redis cache",
      });
    }

    // Not in cache, check password storage
    const storedHashedPassword = await cache.get(passwordKey);
    if (!storedHashedPassword) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const match = bcryptjs.compareSync(password, storedHashedPassword);
    if (!match) return res.status(401).json({ error: "invalid credentials" });

    // Parse user data if it exists
    let user: any;
    try {
      const userData = await cache.get(userKey);
      user = userData ? JSON.parse(userData) : { username };
    } catch {
      user = { username };
    }

    // Cache the user (will be retrieved on next login)
    await cache.set(userKey, JSON.stringify(user), 3600); // 1 hour TTL

    // Update metrics
    await cache.set(
      `metrics:login_cache_misses`,
      String(
        parseInt((await cache.get("metrics:login_cache_misses")) || "0", 10) + 1
      ),
      86400
    );

    return res.json({
      ok: true,
      cached: false,
      user,
      message: "Cached for future requests",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
});

// Get products with caching
app.get("/products", async (req, res) => {
  try {
    const productsKey = "products:list";

    // Check cache first
    const cachedProducts = await cache.get(productsKey);
    if (cachedProducts) {
      // Update metrics
      await cache.set(
        `metrics:products_cache_hits`,
        String(
          parseInt(
            (await cache.get("metrics:products_cache_hits")) || "0",
            10
          ) + 1
        ),
        86400
      );

      return res.json({
        ok: true,
        cached: true,
        products: JSON.parse(cachedProducts),
        message: "From Redis cache",
      });
    }

    // Simulate DB query (expensive operation)
    console.log("Fetching products from 'database'...");
    const products = [
      { id: 1, name: "Laptop", price: 999.99, stock: 10 },
      { id: 2, name: "Mouse", price: 29.99, stock: 50 },
      { id: 3, name: "Keyboard", price: 79.99, stock: 25 },
      { id: 4, name: "Monitor", price: 299.99, stock: 8 },
      { id: 5, name: "Headphones", price: 149.99, stock: 30 },
    ];

    // Cache for 5 minutes
    await cache.set(productsKey, JSON.stringify(products), 300);

    // Update metrics
    await cache.set(
      `metrics:products_cache_misses`,
      String(
        parseInt(
          (await cache.get("metrics:products_cache_misses")) || "0",
          10
        ) + 1
      ),
      86400
    );

    res.json({
      ok: true,
      cached: false,
      products,
      message: "Fetched from database and cached for 5 minutes",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
});

// Get product by ID with individual caching
app.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productKey = `product:${productId}`;

    // Check cache first
    const cachedProduct = await cache.get(productKey);
    if (cachedProduct) {
      return res.json({
        ok: true,
        cached: true,
        product: JSON.parse(cachedProduct),
        message: "From Redis cache",
      });
    }

    // Mock products database
    const allProducts: Record<string, any> = {
      "1": { id: 1, name: "Laptop", price: 999.99, stock: 10 },
      "2": { id: 2, name: "Mouse", price: 29.99, stock: 50 },
      "3": { id: 3, name: "Keyboard", price: 79.99, stock: 25 },
      "4": { id: 4, name: "Monitor", price: 299.99, stock: 8 },
      "5": { id: 5, name: "Headphones", price: 149.99, stock: 30 },
    };

    const product = allProducts[productId];
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Cache for 10 minutes
    await cache.set(productKey, JSON.stringify(product), 600);

    res.json({
      ok: true,
      cached: false,
      product,
      message: "Fetched from database and cached for 10 minutes",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
});

// Get cache metrics
app.get("/metrics", async (req, res) => {
  try {
    const loginCacheHits = parseInt(
      (await cache.get("metrics:login_cache_hits")) || "0",
      10
    );
    const loginCacheMisses = parseInt(
      (await cache.get("metrics:login_cache_misses")) || "0",
      10
    );
    const productsCacheHits = parseInt(
      (await cache.get("metrics:products_cache_hits")) || "0",
      10
    );
    const productsCacheMisses = parseInt(
      (await cache.get("metrics:products_cache_misses")) || "0",
      10
    );

    const loginTotal = loginCacheHits + loginCacheMisses;
    const productsTotal = productsCacheHits + productsCacheMisses;

    res.json({
      ok: true,
      login: {
        hits: loginCacheHits,
        misses: loginCacheMisses,
        total: loginTotal,
        hitRate:
          loginTotal > 0
            ? ((loginCacheHits / loginTotal) * 100).toFixed(2) + "%"
            : "N/A",
      },
      products: {
        hits: productsCacheHits,
        misses: productsCacheMisses,
        total: productsTotal,
        hitRate:
          productsTotal > 0
            ? ((productsCacheHits / productsTotal) * 100).toFixed(2) + "%"
            : "N/A",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n🚀 Server listening on http://0.0.0.0:${PORT}`);
  console.log(`📍 Open http://localhost:${PORT} in your browser`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET  / - Server info`);
  console.log(`  POST /login - User login with rate limiting`);
  console.log(`  GET  /products - Get all products (cached)`);
  console.log(`  GET  /products/:id - Get product by ID (cached)`);
  console.log(`  GET  /metrics - Cache hit/miss statistics\n`);
});
