"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Award,
  X,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Farm {
  id: string;
  name: string;
  ownerName: string;
  location: string;
  phone: string;
  email: string;
  specialties: string[];
  certifications: string[];
  description: string;
  image: string;
}

// 샘플 농장 데이터
const sampleFarms: Farm[] = [
  {
    id: "1",
    name: "해남 청정농장",
    ownerName: "김농부",
    location: "전남 해남군",
    phone: "061-xxx-xxxx",
    email: "haenam@farm.com",
    specialties: ["배추", "무", "시금치"],
    certifications: ["친환경인증", "GAP인증"],
    description: "30년 전통의 해남 청정농장입니다. 서해안 해풍을 맞으며 자란 채소들은 아삭하고 달콤합니다.",
    image: "/photo-1572775146189-b792cd0b76ba.jpg",
  },
  {
    id: "2",
    name: "안동 사과마을",
    ownerName: "이과수",
    location: "경북 안동시",
    phone: "054-xxx-xxxx",
    email: "andong@farm.com",
    specialties: ["사과", "배"],
    certifications: ["GAP인증", "저탄소인증"],
    description: "일교차가 큰 안동 지역의 특성을 살려 당도 높은 사과를 재배합니다.",
    image: "/photo-1623815242959-fb20354f9b8d.jpg",
  },
  {
    id: "3",
    name: "제주 감귤농원",
    ownerName: "박귤농",
    location: "제주특별자치도",
    phone: "064-xxx-xxxx",
    email: "jeju@farm.com",
    specialties: ["감귤", "한라봉", "천혜향"],
    certifications: ["친환경인증", "유기농인증"],
    description: "제주의 따뜻한 햇살과 화산토양에서 자란 최고의 감귤류를 생산합니다.",
    image: "/photo-1692071096134-4e5e0a85bef0.jpg",
  },
  {
    id: "4",
    name: "횡성 유기농단지",
    ownerName: "최유기",
    location: "강원 횡성군",
    phone: "033-xxx-xxxx",
    email: "hoengseong@farm.com",
    specialties: ["토마토", "파프리카", "당근"],
    certifications: ["유기농인증", "HACCP"],
    description: "청정 강원도의 깨끗한 물과 공기로 유기농 채소를 재배합니다.",
    image: "/photo-1683008952375-410ae668e6b9.jpg",
  },
];

const certificationOptions = [
  "친환경인증",
  "GAP인증",
  "유기농인증",
  "저탄소인증",
  "HACCP",
  "무농약인증",
];

export default function FarmsPage() {
  const [farms, setFarms] = useState(sampleFarms);
  const [showModal, setShowModal] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    location: "",
    phone: "",
    email: "",
    specialties: [] as string[],
    certifications: [] as string[],
    description: "",
    image: "",
  });
  const [specialtyInput, setSpecialtyInput] = useState("");

  const handleEdit = (farm: Farm) => {
    setEditingFarm(farm);
    setFormData({
      name: farm.name,
      ownerName: farm.ownerName,
      location: farm.location,
      phone: farm.phone,
      email: farm.email,
      specialties: farm.specialties,
      certifications: farm.certifications,
      description: farm.description,
      image: farm.image,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingFarm(null);
    setFormData({
      name: "",
      ownerName: "",
      location: "",
      phone: "",
      email: "",
      specialties: [],
      certifications: [],
      description: "",
      image: "",
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setFarms(farms.filter((f) => f.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingFarm) {
      setFarms(
        farms.map((f) =>
          f.id === editingFarm.id ? { ...f, ...formData } : f
        )
      );
      alert("농장 정보가 수정되었습니다.");
    } else {
      const newFarm: Farm = {
        id: String(Date.now()),
        ...formData,
      };
      setFarms([...farms, newFarm]);
      alert("농장이 등록되었습니다.");
    }
    setShowModal(false);
  };

  const handleAddSpecialty = () => {
    if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialtyInput.trim()],
      });
      setSpecialtyInput("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((s) => s !== specialty),
    });
  };

  const handleToggleCertification = (cert: string) => {
    if (formData.certifications.includes(cert)) {
      setFormData({
        ...formData,
        certifications: formData.certifications.filter((c) => c !== cert),
      });
    } else {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, cert],
      });
    }
  };

  const handleImageUpload = () => {
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
          <h1 className="text-2xl font-bold text-gray-900">농장 관리</h1>
          <p className="text-gray-500 mt-1">
            총 {farms.length}개의 제휴 농장
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          농장 등록
        </Button>
      </div>

      {/* 농장 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {farms.map((farm) => (
          <div
            key={farm.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            {/* 농장 이미지 */}
            <div className="h-40 bg-gray-100">
              {farm.image ? (
                <img
                  src={farm.image}
                  alt={farm.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  No Image
                </div>
              )}
            </div>

            {/* 농장 정보 */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{farm.name}</h3>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(farm)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(farm.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {farm.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {farm.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {farm.email}
                </div>
              </div>

              {/* 주요 작물 */}
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">주요 작물</p>
                <div className="flex flex-wrap gap-1">
                  {farm.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* 인증 */}
              <div className="mt-3">
                <div className="flex flex-wrap gap-1">
                  {farm.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded"
                    >
                      <Award className="w-3 h-3" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 농장 등록/수정 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-lg w-full max-w-lg mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingFarm ? "농장 수정" : "농장 등록"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {/* 농장 이미지 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  농장 이미지
                </label>
                {formData.image ? (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="농장 미리보기"
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
                    type="button"
                    onClick={handleImageUpload}
                    className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-500 transition-colors"
                  >
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-sm">이미지 업로드</span>
                  </button>
                )}
              </div>

              {/* 농장명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  농장명
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* 대표자명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  대표자명
                </label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* 위치 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  위치
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="예: 전남 해남군"
                />
              </div>

              {/* 연락처 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연락처
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* 주요 작물 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  주요 작물
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSpecialty())}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="작물명 입력 후 추가"
                  />
                  <Button
                    type="button"
                    onClick={handleAddSpecialty}
                    variant="outline"
                  >
                    추가
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-sm rounded"
                    >
                      {specialty}
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecialty(specialty)}
                        className="hover:text-green-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 인증 정보 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  인증 정보
                </label>
                <div className="flex flex-wrap gap-2">
                  {certificationOptions.map((cert) => (
                    <button
                      key={cert}
                      type="button"
                      onClick={() => handleToggleCertification(cert)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        formData.certifications.includes(cert)
                          ? "bg-blue-100 text-blue-700 border-blue-300"
                          : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      {cert}
                    </button>
                  ))}
                </div>
              </div>

              {/* 소개글 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  농장 소개
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
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
                {editingFarm ? "수정" : "등록"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
