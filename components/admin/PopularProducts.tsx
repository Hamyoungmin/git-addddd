"use client";

import Link from "next/link";

interface PopularProduct {
  id: string;
  rank: number;
  name: string;
  image: string;
  sales: number;
  revenue: number;
}

// 샘플 데이터
const popularProducts: PopularProduct[] = [
  {
    id: "1",
    rank: 1,
    name: "유기농 토마토 (1kg)",
    image: "/photo-1683008952375-410ae668e6b9.jpg",
    sales: 156,
    revenue: 1326000,
  },
  {
    id: "2",
    rank: 2,
    name: "국산 사과 (2kg)",
    image: "/photo-1623815242959-fb20354f9b8d.jpg",
    sales: 134,
    revenue: 1608000,
  },
  {
    id: "3",
    rank: 3,
    name: "신선한 당근 (500g)",
    image: "/photo-1663441041574-274dc77d17bb.jpg",
    sales: 98,
    revenue: 343000,
  },
  {
    id: "4",
    rank: 4,
    name: "유기농 상추 (200g)",
    image: "/photo-1572775146189-b792cd0b76ba.jpg",
    sales: 87,
    revenue: 243600,
  },
  {
    id: "5",
    rank: 5,
    name: "혼합 과일 바구니",
    image: "/photo-1692071096134-4e5e0a85bef0.jpg",
    sales: 65,
    revenue: 1625000,
  },
];

export function PopularProducts() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">인기 상품 TOP 5</h3>
        <Link
          href="/admin/products"
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          전체보기
        </Link>
      </div>
      <div className="divide-y divide-gray-200">
        {popularProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 flex items-center gap-4 hover:bg-gray-50"
          >
            {/* 순위 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                product.rank <= 3
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {product.rank}
            </div>

            {/* 이미지 */}
            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                  No Image
                </div>
              )}
            </div>

            {/* 상품 정보 */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">
                판매량: {product.sales}개
              </p>
            </div>

            {/* 매출액 */}
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {product.revenue.toLocaleString()}원
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
