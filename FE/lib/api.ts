import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for debugging
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(
      `[API Response] ${response.config.url} - Status: ${response.status}`
    );
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error("[API Error]", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error("[API Error] No response received", error.message);
    } else {
      console.error("[API Error]", error.message);
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  ok?: boolean;
  cached?: boolean;
  message?: string;
  user?: User;
  error?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface ProductsResponse {
  ok?: boolean;
  cached?: boolean;
  message?: string;
  products?: Product[];
  error?: string;
}

export interface ProductDetailResponse {
  ok?: boolean;
  cached?: boolean;
  message?: string;
  product?: Product;
  error?: string;
}

export interface CacheMetrics {
  hits: number;
  misses: number;
  hitRate: string;
}

export interface MetricsResponse {
  ok?: boolean;
  login?: CacheMetrics;
  products?: CacheMetrics;
  error?: string;
}

// API Functions
export const api = {
  // Login endpoint
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>("/login", data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as LoginResponse;
      }
      return {
        error:
          error instanceof Error
            ? error.message
            : "Failed to connect to server",
      };
    }
  },

  // Get all products
  getProducts: async (): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>("/products");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ProductsResponse;
      }
      return {
        error:
          error instanceof Error
            ? error.message
            : "Failed to connect to server",
      };
    }
  },

  // Get single product by ID
  getProduct: async (id: number): Promise<ProductDetailResponse> => {
    try {
      const response = await apiClient.get<ProductDetailResponse>(
        `/products/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ProductDetailResponse;
      }
      return {
        error:
          error instanceof Error
            ? error.message
            : "Failed to connect to server",
      };
    }
  },

  // Get cache metrics
  getMetrics: async (): Promise<MetricsResponse> => {
    try {
      const response = await apiClient.get<MetricsResponse>("/metrics");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as MetricsResponse;
      }
      return {
        error:
          error instanceof Error
            ? error.message
            : "Failed to connect to server",
      };
    }
  },
};

export default api;
