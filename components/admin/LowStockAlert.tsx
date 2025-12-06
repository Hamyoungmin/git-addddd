"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface LowStockProduct {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
}

// 샘플 데이터
const lowStockProducts: LowStockProduct[] = [
  {
    id: "1",
    name: "유기농 토마토 (1kg)",
    currentStock: 5,
    minStock: 10,
  },
  {
    id: "2",
    name: "신선한 당근 (500g)",
    currentStock: 3,
    minStock: 10,
  },
  {
    id: "3",
    name: "국산 사과 (2kg)",
    currentStock: 8,
    minStock: 10,
  },
];

export function LowStockAlert() {
  if (lowStockProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        <h3 className="font-semibold text-gray-900">재고 부족 알림</h3>
        <span className="ml-auto bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded-full">
          {lowStockProducts.length}개
        </span>
      </div>
      <div className="divide-y divide-gray-200">
        {lowStockProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{product.name}</p>
              <p className="text-xs text-gray-500">
                현재 재고: <span className="text-red-600 font-medium">{product.currentStock}개</span>
                {" / "}
                최소 재고: {product.minStock}개
              </p>
            </div>
            <Link
              href={`/admin/products/${product.id}/edit`}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              수정
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
