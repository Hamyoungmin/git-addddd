"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewProductPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "vegetables",
    origin: "",
    unit: "",
    unitType: "kg",
    price: "",
    originalPrice: "",
    stock: "",
    minStock: "10",
    isOrganic: false,
    isBest: false,
    isNew: false,
    isSale: false,
    status: "active",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = () => {
    // 실제로는 파일 업로드 로직이 들어갑니다
    // 여기서는 샘플 이미지 추가
    const sampleImages = [
      "/photo-1683008952375-410ae668e6b9.jpg",
      "/photo-1663441041574-274dc77d17bb.jpg",
      "/photo-1623815242959-fb20354f9b8d.jpg",
    ];
    if (images.length < 5) {
      setImages([...images, sampleImages[images.length % 3]]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 저장 로직
    console.log("저장:", formData, images);
    alert("상품이 등록되었습니다.");
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상품 등록</h1>
          <p className="text-gray-500 mt-1">새로운 상품을 등록합니다.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이미지 업로드 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">상품 이미지</h2>
          <div className="flex flex-wrap gap-4">
            {/* 업로드 버튼 */}
            <button
              type="button"
              onClick={handleImageUpload}
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-500 transition-colors"
            >
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-xs">이미지 추가</span>
            </button>

            {/* 업로드된 이미지 */}
            {images.map((image, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={image}
                  alt={`상품 이미지 ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
                {index === 0 && (
                  <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    대표
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            최대 5장까지 업로드 가능합니다. 첫 번째 이미지가 대표 이미지로 설정됩니다.
          </p>
        </div>

        {/* 기본 정보 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 상품명 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상품명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="상품명을 입력하세요"
              />
            </div>

            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="vegetables">채소</option>
                <option value="fruits">과일</option>
                <option value="grains">곡물</option>
                <option value="herbs">허브</option>
              </select>
            </div>

            {/* 원산지 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                원산지 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="예: 경남 진주"
              />
            </div>

            {/* 용량/단위 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                용량/단위 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="예: 1"
                />
                <select
                  name="unitType"
                  value={formData.unitType}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="개">개</option>
                  <option value="박스">박스</option>
                  <option value="세트">세트</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 가격 정보 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">가격 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 판매가격 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                판매가격 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  원
                </span>
              </div>
            </div>

            {/* 정가 (할인 전) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                정가 (할인 전 가격)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  원
                </span>
              </div>
              {formData.originalPrice && formData.price && (
                <p className="text-xs text-green-600 mt-1">
                  할인율:{" "}
                  {Math.round(
                    ((Number(formData.originalPrice) - Number(formData.price)) /
                      Number(formData.originalPrice)) *
                      100
                  )}
                  %
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 재고 정보 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">재고 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 재고수량 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                재고수량 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  개
                </span>
              </div>
            </div>

            {/* 최소 재고 알림 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                재고 알림 기준
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="minStock"
                  value={formData.minStock}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pr-24 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  개 이하 시 알림
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 상품 옵션 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">상품 옵션</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isOrganic"
                checked={formData.isOrganic}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">유기농 상품</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isBest"
                checked={formData.isBest}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">베스트 상품으로 등록</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">신상품으로 등록</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isSale"
                checked={formData.isSale}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">특가 상품으로 등록</span>
            </label>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              판매 상태
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">판매중</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="soldout"
                  checked={formData.status === "soldout"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">품절</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">판매중지</span>
              </label>
            </div>
          </div>
        </div>

        {/* 상품 설명 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">상품 설명</h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={8}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="상품에 대한 상세 설명을 입력하세요..."
          />
        </div>

        {/* 버튼 */}
        <div className="flex items-center justify-end gap-4">
          <Link href="/admin/products">
            <Button variant="outline" type="button">
              취소
            </Button>
          </Link>
          <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
            상품 등록
          </Button>
        </div>
      </form>
    </div>
  );
}
