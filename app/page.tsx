"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { FigmaBanner } from "@/components/FigmaBanner";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard";

// 샘플 상품 데이터
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "유기농 토마토 (1kg)",
    price: 8500,
    originalPrice: 10000,
    image: "",
    category: "vegetables",
    rating: 4.8,
    reviewCount: 156,
    origin: "경남 진주",
    isOrganic: true,
    unit: "1kg",
  },
  {
    id: "2",
    name: "신선한 당근 (500g)",
    price: 3500,
    image: "",
    category: "vegetables",
    rating: 4.5,
    reviewCount: 89,
    origin: "제주도",
    unit: "500g",
  },
  {
    id: "3",
    name: "국산 사과 (2kg)",
    price: 12000,
    originalPrice: 15000,
    image: "",
    category: "fruits",
    rating: 4.9,
    reviewCount: 234,
    origin: "경북 안동",
    unit: "2kg",
  },
  {
    id: "4",
    name: "유기농 상추 (200g)",
    price: 2800,
    image: "",
    category: "vegetables",
    rating: 4.6,
    reviewCount: 67,
    origin: "충남 청주",
    isOrganic: true,
    unit: "200g",
  },
  {
    id: "5",
    name: "혼합 과일 바구니",
    price: 25000,
    originalPrice: 30000,
    image: "",
    category: "fruits",
    rating: 4.7,
    reviewCount: 123,
    origin: "전국 각지",
    unit: "1바구니",
  },
  {
    id: "6",
    name: "농장 직송 채소 세트",
    price: 18000,
    image: "",
    category: "vegetables",
    rating: 4.8,
    reviewCount: 201,
    origin: "강원도 횡성",
    isOrganic: true,
    unit: "1세트",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // 필터링된 상품 목록
  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts;

    // 카테고리 필터
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // 검색 필터
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.origin.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // 장바구니에 상품 추가
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
  };

  // 카테고리별 제목
  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case "vegetables":
        return "신선한 채소";
      case "fruits":
        return "달콤한 과일";
      case "grains":
        return "건강한 곡물";
      case "herbs":
        return "향긋한 허브";
      default:
        return "전체 상품";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <Header cartItemCount={cartItems.length} />

      {/* Figma Make 배너 */}
      <FigmaBanner />

      {/* 카테고리 필터 + 검색 */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 섹션 제목 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getCategoryTitle()}
          </h2>
          <p className="text-gray-600">
            농장에서 직송한 신선한 농산물을 만나보세요
          </p>
        </div>

        {/* 상품 그리드 */}
        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
      </main>
    </div>
  );
}
