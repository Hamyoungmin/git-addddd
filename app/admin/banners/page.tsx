"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Upload,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Banner {
  id: string;
  title: string;
  image: string;
  link: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  sortOrder: number;
}

// 샘플 배너 데이터
const sampleBanners: Banner[] = [
  {
    id: "1",
    title: "겨울 특가전",
    image: "/photo-1683008952375-410ae668e6b9.jpg",
    link: "/sale",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "2",
    title: "제주 감귤 할인",
    image: "/photo-1692071096134-4e5e0a85bef0.jpg",
    link: "/seasonal",
    startDate: "2024-12-05",
    endDate: "2024-12-20",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "3",
    title: "신규가입 혜택",
    image: "/photo-1623815242959-fb20354f9b8d.jpg",
    link: "/signup",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    isActive: false,
    sortOrder: 3,
  },
];

export default function BannersPage() {
  const [banners, setBanners] = useState(sampleBanners);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    link: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newBanners = [...banners];
    [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]];
    setBanners(newBanners.map((b, i) => ({ ...b, sortOrder: i + 1 })));
  };

  const handleMoveDown = (index: number) => {
    if (index === banners.length - 1) return;
    const newBanners = [...banners];
    [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
    setBanners(newBanners.map((b, i) => ({ ...b, sortOrder: i + 1 })));
  };

  const handleToggleActive = (id: string) => {
    setBanners(
      banners.map((b) =>
        b.id === id ? { ...b, isActive: !b.isActive } : b
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setBanners(banners.filter((b) => b.id !== id));
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      image: banner.image,
      link: banner.link,
      startDate: banner.startDate,
      endDate: banner.endDate,
      isActive: banner.isActive,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      image: "",
      link: "",
      startDate: "",
      endDate: "",
      isActive: true,
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (editingBanner) {
      setBanners(
        banners.map((b) =>
          b.id === editingBanner.id
            ? { ...b, ...formData }
            : b
        )
      );
      alert("배너가 수정되었습니다.");
    } else {
      const newBanner: Banner = {
        id: String(Date.now()),
        ...formData,
        sortOrder: banners.length + 1,
      };
      setBanners([...banners, newBanner]);
      alert("배너가 등록되었습니다.");
    }
    setShowModal(false);
  };

  const handleImageUpload = () => {
    // 실제로는 파일 업로드 로직
    const sampleImages = [
      "/photo-1683008952375-410ae668e6b9.jpg",
      "/photo-1663441041574-274dc77d17bb.jpg",
      "/photo-1623815242959-fb20354f9b8d.jpg",
    ];
    setFormData({
      ...formData,
      image: sampleImages[Math.floor(Math.random() * sampleImages.length)],
    });
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">배너 관리</h1>
          <p className="text-gray-500 mt-1">
            메인 페이지 배너를 관리합니다.
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          배너 추가
        </Button>
      </div>

      {/* 배너 목록 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-16">
                순서
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                미리보기
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                배너명
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                노출 기간
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                상태
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {banners.map((banner, index) => (
              <tr key={banner.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <span className="text-center text-sm font-medium">
                      {banner.sortOrder}
                    </span>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === banners.length - 1}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="w-32 h-16 bg-gray-100 rounded overflow-hidden">
                    {banner.image ? (
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    {banner.title}
                  </p>
                  {banner.link && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {banner.link}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {banner.startDate} ~ {banner.endDate}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleActive(banner.id)}
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                      banner.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {banner.isActive ? (
                      <>
                        <Eye className="w-3 h-3" />
                        노출중
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        숨김
                      </>
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(banner)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(banner.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          배너 이미지 권장 사이즈: 1920 x 500px (비율 3.84:1)
        </p>
      </div>

      {/* 배너 등록/수정 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingBanner ? "배너 수정" : "배너 등록"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* 배너 이미지 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  배너 이미지
                </label>
                {formData.image ? (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="배너 미리보기"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleImageUpload}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-500 transition-colors"
                  >
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm">이미지 업로드</span>
                  </button>
                )}
              </div>

              {/* 배너명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  배너명 (관리용)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="예: 겨울 특가전"
                />
              </div>

              {/* 링크 URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  링크 URL
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="예: /sale"
                />
              </div>

              {/* 노출 기간 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    시작일
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    종료일
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* 노출 여부 */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">바로 노출</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                취소
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {editingBanner ? "수정" : "등록"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
