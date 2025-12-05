"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard";
import { Leaf } from "lucide-react";

// 제철 농산물 데이터 (겨울 시즌 기준)
const seasonalProducts: Product[] = [
  {
    id: "se1",
    name: "성주 꿀참외 (2kg)",
    price: 15000,
    image: "",
    category: "fruits",
    rating: 4.8,
    reviewCount: 267,
    origin: "경북 성주",
    unit: "2kg",
  },
  {
    id: "se2",
    name: "해남 겨울배추 (1포기)",
    price: 4500,
    image: "",
    category: "vegetables",
    rating: 4.7,
    reviewCount: 189,
    origin: "전남 해남",
    isOrganic: true,
    unit: "1포기",
  },
  {
    id: "se3",
    name: "제주 한라봉 (3kg)",
    price: 32000,
    originalPrice: 38000,
    image: "",
    category: "fruits",
    rating: 4.9,
    reviewCount: 534,
    origin: "제주도",
    unit: "3kg",
  },
  {
    id: "se4",
    name: "무안 양파 (5kg)",
    price: 11000,
    image: "",
    category: "vegetables",
    rating: 4.6,
    reviewCount: 145,
    origin: "전남 무안",
    unit: "5kg",
  },
  {
    id: "se5",
    name: "영암 무화과 (1kg)",
    price: 22000,
    image: "",
    category: "fruits",
    rating: 4.8,
    reviewCount: 78,
    origin: "전남 영암",
    unit: "1kg",
  },
  {
    id: "se6",
    name: "고창 복분자 (500ml)",
    price: 18000,
    image: "",
    category: "fruits",
    rating: 4.7,
    reviewCount: 92,
    origin: "전북 고창",
    isOrganic: true,
    unit: "500ml",
  },
];

export default function SeasonalPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
  };

  // 현재 월에 따른 계절 텍스트
  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return "봄";
    if (month >= 6 && month <= 8) return "여름";
    if (month >= 9 && month <= 11) return "가을";
    return "겨울";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItems.length} />

      {/* 페이지 헤더 */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-3 rounded-full">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">제철 농산물</h1>
              <p className="text-gray-600 mt-1">
                {getCurrentSeason()}에 가장 맛있는 제철 농산물을 만나보세요
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 계절 태그 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2">
            <span className="bg-pink-100 text-pink-700 px-4 py-1.5 rounded-full text-sm font-medium">🌸 봄</span>
            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium">☀️ 여름</span>
            <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium">🍂 가을</span>
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">❄️ 겨울</span>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-sm text-gray-500">총 {seasonalProducts.length}개의 제철 상품</p>
        </div>
        <ProductGrid products={seasonalProducts} onAddToCart={handleAddToCart} />
      </main>
    </div>
  );
}

