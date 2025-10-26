// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 10000,

  endpoints: {
    login: "/login",
    products: "/products",
    productDetail: (id: number) => `/products/${id}`,
    metrics: "/metrics",
  },

  // Cache TTLs (for reference)
  cacheTTL: {
    login: 3600, // 1 hour
    productList: 300, // 5 minutes
    productDetail: 600, // 10 minutes
    metrics: 86400, // 24 hours
  },

  // Rate limits (for reference)
  rateLimits: {
    general: { max: 10, window: 60 }, // 10 requests per minute
    login: { max: 5, window: 60 }, // 5 login attempts per minute
  },
};

export default API_CONFIG;
