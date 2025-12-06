"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard";

// 특가/할인 상품 데이터
const saleProducts: Product[] = [
  {
    id: "s1",
    name: "못난이 사과 (3kg)",
    price: 9900,
    originalPrice: 18000,
    image: "",
    category: "fruits",
    rating: 4.5,
    reviewCount: 234,
    origin: "경북 영주",
    unit: "3kg",
  },
  {
    id: "s2",
    name: "B급 파프리카 (1kg)",
    price: 5500,
    originalPrice: 9000,
    image: "",
    category: "vegetables",
    rating: 4.4,
    reviewCount: 189,
    origin: "전남 화순",
    unit: "1kg",
  },
  {
    id: "s3",
    name: "당일수확 딸기 (500g)",
    price: 12000,
    originalPrice: 18000,
    image: "",
    category: "fruits",
    rating: 4.7,
    reviewCount: 456,
    origin: "충남 논산",
    unit: "500g",
  },
  {
    id: "s4",
    name: "산지직송 양배추 (2통)",
    price: 6900,
    originalPrice: 12000,
    image: "",
    category: "vegetables",
    rating: 4.6,
    reviewCount: 123,
    origin: "강원 평창",
    isOrganic: true,
    unit: "2통",
  },
  {
    id: "s5",
    name: "제철 배 선물세트",
    price: 32000,
    originalPrice: 45000,
    image: "",
    category: "fruits",
    rating: 4.8,
    reviewCount: 89,
    origin: "전남 나주",
    unit: "7.5kg",
  },
];

export default function SalePage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItems.length} />

      {/* 페이지 헤더 */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">특가/할인</h1>
            <p className="text-gray-600 mt-1">지금 가장 저렴하게 만나는 신선한 농산물!</p>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">총 {saleProducts.length}개의 할인 상품</p>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
            최대 45% 할인
          </span>
        </div>
        <ProductGrid products={saleProducts} onAddToCart={handleAddToCart} />
      </main>
    </div>
  );
}

