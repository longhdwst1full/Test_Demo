"use client";

import { useState } from "react";
import api, {
  Product,
  ProductsResponse,
  ProductDetailResponse,
} from "@/lib/api";

export default function ProductCard() {
  const [result, setResult] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDetail, setProductDetail] =
    useState<ProductDetailResponse | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const handleLoadProducts = async () => {
    setLoading(true);
    setResult(null);
    setProductDetail(null);

    try {
      const data = await api.getProducts();
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

  const handleProductClick = async (product: Product) => {
    setSelectedProduct(product);
    setDetailLoading(true);
    setProductDetail(null);

    try {
      const data = await api.getProduct(product.id);
      setProductDetail(data);
    } catch (error) {
      setProductDetail({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
        🛍️ Products List
      </h2>

      <button
        onClick={handleLoadProducts}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition disabled:opacity-50 mb-4"
      >
        {loading ? "Loading..." : "Load Products"}
      </button>

      {result && (
        <>
          {result.error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md text-red-700">
              <p className="font-bold">❌ Error</p>
              <p className="text-sm">{result.error}</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    result.cached
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {result.cached ? "⚡ CACHED" : "✨ NOT CACHED"}
                </span>
                <span className="text-sm text-gray-600">{result.message}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.products?.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className={`p-4 rounded-lg border-2 transition text-left ${
                      selectedProduct?.id === product.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-400 bg-gray-50"
                    }`}
                  >
                    <div className="font-bold text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.stock} in stock
                    </div>
                  </button>
                ))}
              </div>

              {selectedProduct && productDetail && (
                <div className="mt-4 p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {selectedProduct.name}
                    </h3>
                    {detailLoading ? (
                      <span className="text-sm text-gray-600">Loading...</span>
                    ) : productDetail.error ? (
                      <span className="text-red-600">Error</span>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          productDetail.cached
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {productDetail.cached ? "⚡ CACHED" : "✨ FRESH"}
                      </span>
                    )}
                  </div>

                  {!productDetail.error && (
                    <>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>Price:</strong> $
                          {productDetail.product?.price?.toFixed(2)}
                        </p>
                        <p>
                          <strong>Stock:</strong> {productDetail.product?.stock}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {productDetail.message}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
