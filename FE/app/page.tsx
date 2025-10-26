import LoginCard from "./components/LoginCard";
import ProductCard from "./components/ProductCard";
import MetricsCard from "./components/MetricsCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚀 Redis Cache Demo
          </h1>
          <p className="text-xl text-gray-600">
            Test Login Caching & Product Caching with Backend
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-amber-500">
          <h2 className="text-lg font-bold text-amber-700 mb-3">
            📖 How to Test:
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <strong>Login Cache:</strong> Login as alice/password123 twice and
              notice the &quot;CACHED&quot; badge on second attempt
            </li>
            <li>
              <strong>Product Cache:</strong> Click &quot;Load Products&quot;
              multiple times within 5 minutes to see caching in action
            </li>
            <li>
              <strong>Individual Product:</strong> Click on a product to see the
              10-minute cache TTL
            </li>
            <li>
              <strong>Test Users:</strong> alice/password123, bob/secret456,
              charlie/test789
            </li>
          </ul>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LoginCard />
          <ProductCard />
        </div>

        {/* Metrics */}
        <div className="mt-8">
          <MetricsCard />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>
            Backend running on:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              http://localhost:3000
            </code>
          </p>
          <p className="mt-2">
            Check the browser console for network requests and responses
          </p>
        </div>
      </div>
    </div>
  );
}
