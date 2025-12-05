"use client";

import { Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  origin: string;
  isOrganic?: boolean;
  unit: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
      {/* 이미지 영역 */}
      <div className="relative overflow-hidden">
        {/* 흰색 플레이스홀더 이미지 */}
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-300 text-sm">이미지</span>
        </div>
        
        {/* 배지들 */}
        {product.isOrganic && (
          <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
            유기농
          </Badge>
        )}
        {discountPercent > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
            {discountPercent}% 할인
          </Badge>
        )}
      </div>

      {/* 상품 정보 */}
      <div className="p-4">
        {/* 상품명 */}
        <h3 className="font-medium text-gray-900 mb-1 text-sm">{product.name}</h3>
        
        {/* 원산지/용량 */}
        <p className="text-xs text-gray-500 mb-2">
          {product.origin} • {product.unit}
        </p>

        {/* 별점 */}
        <div className="flex items-center mb-2">
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-600 ml-1">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* 가격 및 담기 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-base text-gray-900">
              {product.price.toLocaleString()}원
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.originalPrice.toLocaleString()}원
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            className="bg-green-500 hover:bg-green-600 text-white text-xs px-3"
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1" />
            담기
          </Button>
        </div>
      </div>
    </div>
  );
}

