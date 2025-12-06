"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: "active" | "soldout" | "inactive";
  isOrganic: boolean;
  image: string;
  createdAt: string;
}

const categoryMap: Record<string, string> = {
  vegetables: "채소",
  fruits: "과일",
  grains: "곡물",
  herbs: "허브",
};

const statusMap = {
  active: { label: "판매중", color: "bg-green-100 text-green-700" },
  soldout: { label: "품절", color: "bg-red-100 text-red-700" },
  inactive: { label: "판매중지", color: "bg-gray-100 text-gray-700" },
};

// 샘플 상품 데이터
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "유기농 토마토 (1kg)",
    category: "vegetables",
    price: 8500,
    originalPrice: 10000,
    stock: 150,
    status: "active",
    isOrganic: true,
    image: "/photo-1683008952375-410ae668e6b9.jpg",
    createdAt: "2024-12-01",
  },
  {
    id: "2",
    name: "신선한 당근 (500g)",
    category: "vegetables",
    price: 3500,
    stock: 5,
    status: "active",
    isOrganic: false,
    image: "/photo-1663441041574-274dc77d17bb.jpg",
    createdAt: "2024-12-02",
  },
  {
    id: "3",
    name: "국산 사과 (2kg)",
    category: "fruits",
    price: 12000,
    originalPrice: 15000,
    stock: 80,
    status: "active",
    isOrganic: false,
    image: "/photo-1623815242959-fb20354f9b8d.jpg",
    createdAt: "2024-12-03",
  },
  {
    id: "4",
    name: "유기농 상추 (200g)",
    category: "vegetables",
    price: 2800,
    stock: 0,
    status: "soldout",
    isOrganic: true,
    image: "/photo-1572775146189-b792cd0b76ba.jpg",
    createdAt: "2024-12-04",
  },
  {
    id: "5",
    name: "혼합 과일 바구니",
    category: "fruits",
    price: 25000,
    originalPrice: 30000,
    stock: 30,
    status: "active",
    isOrganic: false,
    image: "/photo-1692071096134-4e5e0a85bef0.jpg",
    createdAt: "2024-12-05",
  },
  {
    id: "6",
    name: "농장 직송 채소 세트",
    category: "vegetables",
    price: 18000,
    stock: 45,
    status: "inactive",
    isOrganic: true,
    image: "/photo-1535821471350-14a8dc72a66c.jpg",
    createdAt: "2024-12-06",
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // 필터링
  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 전체 선택
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  // 개별 선택
  const handleSelect = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상품 관리</h1>
          <p className="text-gray-500 mt-1">
            총 {filteredProducts.length}개의 상품
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            상품 등록
          </Button>
        </Link>
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 검색 */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="상품명 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* 카테고리 필터 */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">전체 카테고리</option>
            <option value="vegetables">채소</option>
            <option value="fruits">과일</option>
            <option value="grains">곡물</option>
            <option value="herbs">허브</option>
          </select>

          {/* 상태 필터 */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">전체 상태</option>
            <option value="active">판매중</option>
            <option value="soldout">품절</option>
            <option value="inactive">판매중지</option>
          </select>
        </div>

        {/* 선택된 항목 액션 */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {selectedProducts.length}개 선택됨
            </span>
            <Button variant="outline" size="sm">
              선택 삭제
            </Button>
            <Button variant="outline" size="sm">
              상태 변경
            </Button>
          </div>
        )}
      </div>

      {/* 상품 테이블 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  상품
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  카테고리
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  가격
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  재고
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  상태
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  등록일
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelect(product.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                            No Image
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.name}
                        </p>
                        {product.isOrganic && (
                          <span className="text-xs text-green-600">유기농</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {categoryMap[product.category]}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.price.toLocaleString()}원
                      </p>
                      {product.originalPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()}원
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-medium ${
                        product.stock <= 10
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {product.stock}개
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        statusMap[product.status].color
                      }`}
                    >
                      {statusMap[product.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {product.createdAt}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            전체 {filteredProducts.length}개 중 1-{filteredProducts.length}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              이전
            </Button>
            <Button variant="outline" size="sm" className="bg-green-50 text-green-700 border-green-200">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              다음
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
