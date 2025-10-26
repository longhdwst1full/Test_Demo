"use client";

import { useState } from "react";
import api, { LoginResponse } from "@/lib/api";

export default function LoginCard() {
  const [username, setUsername] = useState("alice");
  const [password, setPassword] = useState("password123");
  const [result, setResult] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setResult(null);

    try {
      const data = await api.login({ username, password });
      setResult(data);
    } catch (error) {
      setResult({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
      <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
        🔐 Login Test
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="alice, bob, or charlie"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      {result && (
        <div
          className={`mt-4 p-4 rounded-md border-l-4 ${
            result.error
              ? "bg-red-50 border-red-400 text-red-700"
              : "bg-green-50 border-green-400 text-green-700"
          }`}
        >
          {result.error ? (
            <>
              <p className="font-bold">❌ Login Failed</p>
              <p className="text-sm">{result.error}</p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 font-bold mb-2">
                <span>✅ Login Success</span>
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${
                    result.cached
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {result.cached ? "⚡ CACHED" : "✨ NEW"}
                </span>
              </div>
              <p className="text-sm">
                <strong>User:</strong> {result.user?.username}
              </p>
              <p className="text-sm">
                <strong>Message:</strong> {result.message}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
