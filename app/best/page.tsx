"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard";
import { Trophy } from "lucide-react";

// 베스트 상품 데이터
const bestProducts: Product[] = [
  {
    id: "b1",
    name: "프리미엄 한우 토마토 (1kg)",
    price: 12000,
    originalPrice: 15000,
    image: "",
    category: "vegetables",
    rating: 4.9,
    reviewCount: 523,
    origin: "경남 진주",
    isOrganic: true,
    unit: "1kg",
  },
  {
    id: "b2",
    name: "당도선별 샤인머스캣 (2kg)",
    price: 35000,
    originalPrice: 42000,
    image: "",
    category: "fruits",
    rating: 4.9,
    reviewCount: 892,
    origin: "경북 김천",
    unit: "2kg",
  },
  {
    id: "b3",
    name: "GAP인증 사과 선물세트",
    price: 45000,
    originalPrice: 55000,
    image: "",
    category: "fruits",
    rating: 4.8,
    reviewCount: 445,
    origin: "경북 안동",
    unit: "5kg",
  },
  {
    id: "b4",
    name: "무농약 시금치 (300g)",
    price: 4500,
    image: "",
    category: "vegetables",
    rating: 4.8,
    reviewCount: 312,
    origin: "전남 해남",
    isOrganic: true,
    unit: "300g",
  },
];

export default function BestPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItems.length} />

      {/* 페이지 헤더 */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-3 rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">베스트 상품</h1>
              <p className="text-gray-600 mt-1">고객님들이 가장 많이 찾는 인기 상품입니다</p>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-sm text-gray-500">총 {bestProducts.length}개의 베스트 상품</p>
        </div>
        <ProductGrid products={bestProducts} onAddToCart={handleAddToCart} />
      </main>
    </div>
  );
}

