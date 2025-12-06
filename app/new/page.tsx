"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard";

// 신상품 데이터
const newProducts: Product[] = [
  {
    id: "n1",
    name: "제주 황금향 (3kg)",
    price: 28000,
    image: "/photo-1692071096134-4e5e0a85bef0.jpg",
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
    image: "/photo-1572775146189-b792cd0b76ba.jpg",
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
    image: "/photo-1535821471350-14a8dc72a66c.jpg",
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
    image: "/photo-1692071096134-4e5e0a85bef0.jpg",
    category: "fruits",
    rating: 4.9,
    reviewCount: 12,
    origin: "전북 정읍",
    isOrganic: true,
    unit: "500g",
  },
  {
    id: "n5",
    name: "프리미엄 대추 토마토 (1kg)",
    price: 15000,
    image: "/photo-1683008952375-410ae668e6b9.jpg",
    category: "vegetables",
    rating: 4.8,
    reviewCount: 34,
    origin: "전남 화순",
    unit: "1kg",
  },
  {
    id: "n6",
    name: "무농약 당근즙 세트",
    price: 32000,
    image: "/photo-1663441041574-274dc77d17bb.jpg",
    category: "vegetables",
    rating: 4.7,
    reviewCount: 28,
    origin: "제주도",
    isOrganic: true,
    unit: "30포",
  },
  {
    id: "n7",
    name: "GAP인증 부사 사과 (2kg)",
    price: 19000,
    originalPrice: 24000,
    image: "/photo-1623815242959-fb20354f9b8d.jpg",
    category: "fruits",
    rating: 4.9,
    reviewCount: 56,
    origin: "경북 청송",
    unit: "2kg",
  },
  {
    id: "n8",
    name: "유기농 로메인 상추 (300g)",
    price: 4500,
    image: "/photo-1572775146189-b792cd0b76ba.jpg",
    category: "vegetables",
    rating: 4.6,
    reviewCount: 19,
    origin: "충남 논산",
    isOrganic: true,
    unit: "300g",
  },
  {
    id: "n9",
    name: "제철 과일 모둠 박스",
    price: 35000,
    originalPrice: 42000,
    image: "/photo-1692071096134-4e5e0a85bef0.jpg",
    category: "fruits",
    rating: 4.8,
    reviewCount: 41,
    origin: "전국 각지",
    unit: "1박스",
  },
  {
    id: "n10",
    name: "산지직송 미니 토마토 (500g)",
    price: 9800,
    image: "/photo-1683008952375-410ae668e6b9.jpg",
    category: "vegetables",
    rating: 4.7,
    reviewCount: 38,
    origin: "강원도 춘천",
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">신상품</h1>
            <p className="text-gray-600 mt-1">이번 주 새로 입고된 신선한 농산물입니다</p>
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

