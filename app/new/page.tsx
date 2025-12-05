"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard";
import { Sparkles } from "lucide-react";

// 신상품 데이터
const newProducts: Product[] = [
  {
    id: "n1",
    name: "제주 흑돼지 감귤 (3kg)",
    price: 28000,
    image: "",
    category: "fruits",
    rating: 4.7,
    reviewCount: 45,
    origin: "제주도",
    unit: "3kg",
  },
  {
    id: "n2",
    name: "친환경 새싹채소 모음",
    price: 8900,
    image: "",
    category: "vegetables",
    rating: 4.6,
    reviewCount: 23,
    origin: "경기 이천",
    isOrganic: true,
    unit: "200g",
  },
  {
    id: "n3",
    name: "햇 고구마 (5kg)",
    price: 22000,
    originalPrice: 28000,
    image: "",
    category: "vegetables",
    rating: 4.8,
    reviewCount: 67,
    origin: "전남 해남",
    unit: "5kg",
  },
  {
    id: "n4",
    name: "유기농 블루베리 (500g)",
    price: 18000,
    image: "",
    category: "fruits",
    rating: 4.9,
    reviewCount: 12,
    origin: "전북 정읍",
    isOrganic: true,
    unit: "500g",
  },
];

export default function NewPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItems.length} />

      {/* 페이지 헤더 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500 p-3 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">신상품</h1>
              <p className="text-gray-600 mt-1">이번 주 새로 입고된 신선한 농산물입니다</p>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-sm text-gray-500">총 {newProducts.length}개의 신상품</p>
        </div>
        <ProductGrid products={newProducts} onAddToCart={handleAddToCart} />
      </main>
    </div>
  );
}

