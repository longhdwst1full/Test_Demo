"use client";

import { useState, useEffect } from "react";
import api, { MetricsResponse } from "@/lib/api";

export default function MetricsCard() {
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const data = await api.getMetrics();
      setMetrics(data);
    } catch (error) {
      setMetrics({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch metrics every 5 seconds
  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
      <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
        📊 Cache Metrics
      </h2>

      <button
        onClick={fetchMetrics}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition disabled:opacity-50 mb-4"
      >
        {loading ? "Refreshing..." : "Refresh Metrics"}
      </button>

      {metrics?.error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md text-red-700">
          <p className="font-bold">❌ Error</p>
          <p className="text-sm">{metrics.error}</p>
        </div>
      ) : metrics ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Login Metrics */}
          <div className="bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <h3 className="text-lg font-bold text-purple-700 mb-3">
              🔐 Login Cache
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Hits:</span>
                  <span className="font-bold text-green-600">
                    {metrics.login?.hits || 0}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Misses:</span>
                  <span className="font-bold text-red-600">
                    {metrics.login?.misses || 0}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">Hit Rate:</span>
                  <span className="font-bold text-purple-600">
                    {metrics.login?.hitRate || "N/A"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-linear-to-r from-green-400 to-purple-600 h-3 rounded-full transition-all"
                    style={{
                      width:
                        metrics.login?.hitRate &&
                        metrics.login.hitRate !== "N/A"
                          ? metrics.login.hitRate
                          : "0%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Metrics */}
          <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold text-blue-700 mb-3">
              🛍️ Product Cache
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Hits:</span>
                  <span className="font-bold text-green-600">
                    {metrics.products?.hits || 0}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Misses:</span>
                  <span className="font-bold text-red-600">
                    {metrics.products?.misses || 0}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">Hit Rate:</span>
                  <span className="font-bold text-blue-600">
                    {metrics.products?.hitRate || "N/A"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-linear-to-r from-green-400 to-blue-600 h-3 rounded-full transition-all"
                    style={{
                      width:
                        metrics.products?.hitRate &&
                        metrics.products.hitRate !== "N/A"
                          ? metrics.products.hitRate
                          : "0%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-4 text-xs text-gray-500 text-center">
        Auto-updates every 5 seconds
      </div>
    </div>
  );
}
