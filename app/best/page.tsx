"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard";

// 베스트 상품 데이터
const bestProducts: Product[] = [
  {
    id: "b1",
    name: "프리미엄 한우 토마토 (1kg)",
    price: 12000,
    originalPrice: 15000,
    image: "/photo-1683008952375-410ae668e6b9.jpg",
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
    image: "/photo-1692071096134-4e5e0a85bef0.jpg",
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
    image: "/photo-1623815242959-fb20354f9b8d.jpg",
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
    image: "/photo-1572775146189-b792cd0b76ba.jpg",
    category: "vegetables",
    rating: 4.8,
    reviewCount: 312,
    origin: "전남 해남",
    isOrganic: true,
    unit: "300g",
  },
  {
    id: "b5",
    name: "제주 황금향 (3kg)",
    price: 38000,
    originalPrice: 45000,
    image: "/photo-1692071096134-4e5e0a85bef0.jpg",
    category: "fruits",
    rating: 4.9,
    reviewCount: 678,
    origin: "제주도",
    unit: "3kg",
  },
  {
    id: "b6",
    name: "유기농 당근 (1kg)",
    price: 6500,
    image: "/photo-1663441041574-274dc77d17bb.jpg",
    category: "vegetables",
    rating: 4.7,
    reviewCount: 389,
    origin: "제주도",
    isOrganic: true,
    unit: "1kg",
  },
  {
    id: "b7",
    name: "명품 한라봉 선물세트",
    price: 52000,
    originalPrice: 65000,
    image: "/photo-1692071096134-4e5e0a85bef0.jpg",
    category: "fruits",
    rating: 4.9,
    reviewCount: 756,
    origin: "제주도",
    unit: "5kg",
  },
  {
    id: "b8",
    name: "친환경 모듬채소 세트",
    price: 22000,
    originalPrice: 28000,
    image: "/photo-1535821471350-14a8dc72a66c.jpg",
    category: "vegetables",
    rating: 4.8,
    reviewCount: 445,
    origin: "강원도 횡성",
    isOrganic: true,
    unit: "1세트",
  },
  {
    id: "b9",
    name: "프리미엄 완숙 토마토 (2kg)",
    price: 18000,
    originalPrice: 22000,
    image: "/photo-1683008952375-410ae668e6b9.jpg",
    category: "vegetables",
    rating: 4.9,
    reviewCount: 612,
    origin: "전남 화순",
    unit: "2kg",
  },
  {
    id: "b10",
    name: "청정지역 사과 (3kg)",
    price: 25000,
    originalPrice: 32000,
    image: "/photo-1623815242959-fb20354f9b8d.jpg",
    category: "fruits",
    rating: 4.8,
    reviewCount: 534,
    origin: "경북 영주",
    unit: "3kg",
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">베스트 상품</h1>
            <p className="text-gray-600 mt-1">고객님들이 가장 많이 찾는 인기 상품입니다</p>
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

