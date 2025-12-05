"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const categories = [
  { id: "all", name: "전체", emoji: "🌾" },
  { id: "vegetables", name: "채소", emoji: "🥬" },
  { id: "fruits", name: "과일", emoji: "🍎" },
  { id: "grains", name: "곡물", emoji: "🌾" },
  { id: "herbs", name: "허브", emoji: "🌿" },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchChange?: (query: string) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  onSearchChange,
}: CategoryFilterProps) {
  return (
    <div className="bg-white py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          {/* 카테고리 버튼들 */}
          <div className="flex items-center space-x-2 overflow-x-auto flex-shrink-0">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap mr-2">
              카테고리:
            </span>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category.id)}
                className={`whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <span className="mr-1">{category.emoji}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* 검색바 (오른쪽 끝) */}
          <div className="hidden sm:flex items-center flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="상품 검색..."
                className="pl-10 w-48 lg:w-64 bg-gray-50"
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 모바일 검색바 */}
        <div className="sm:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="신선한 농산물을 검색해보세요..."
              className="pl-10 bg-gray-50 w-full"
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
