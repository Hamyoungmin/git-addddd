"use client";

import { Header } from "@/components/Header";
import { MapPin, Phone, Mail, Award } from "lucide-react";

// 제휴 농장 데이터
const farms = [
  {
    id: 1,
    name: "해남 청정농장",
    location: "전남 해남군",
    specialty: "배추, 무, 시금치",
    description: "30년 전통의 해남 청정농장입니다. 서해안 해풍을 맞으며 자란 채소들은 아삭하고 달콤합니다.",
    certifications: ["친환경인증", "GAP인증"],
    phone: "061-xxx-xxxx",
    email: "haenam@farm.com",
  },
  {
    id: 2,
    name: "안동 사과마을",
    location: "경북 안동시",
    specialty: "사과, 배",
    description: "일교차가 큰 안동 지역의 특성을 살려 당도 높은 사과를 재배합니다.",
    certifications: ["GAP인증", "저탄소인증"],
    phone: "054-xxx-xxxx",
    email: "andong@farm.com",
  },
  {
    id: 3,
    name: "제주 감귤농원",
    location: "제주특별자치도",
    specialty: "감귤, 한라봉, 천혜향",
    description: "제주의 따뜻한 햇살과 화산토양에서 자란 최고의 감귤류를 생산합니다.",
    certifications: ["친환경인증", "유기농인증"],
    phone: "064-xxx-xxxx",
    email: "jeju@farm.com",
  },
  {
    id: 4,
    name: "횡성 유기농단지",
    location: "강원 횡성군",
    specialty: "토마토, 파프리카, 당근",
    description: "청정 강원도의 깨끗한 물과 공기로 유기농 채소를 재배합니다.",
    certifications: ["유기농인증", "HACCP"],
    phone: "033-xxx-xxxx",
    email: "hoengseong@farm.com",
  },
];

export default function FarmPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 페이지 헤더 */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">농장 소개</h1>
          <p className="text-gray-600 mt-2">
            농산물마켓과 함께하는 믿을 수 있는 제휴 농장들입니다
          </p>
        </div>
      </div>

      {/* 농장 목록 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {farms.map((farm) => (
            <div
              key={farm.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* 농장 이미지 플레이스홀더 */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-300">농장 이미지</span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-900">{farm.name}</h2>
                  <div className="flex gap-1">
                    {farm.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs"
                      >
                        <Award className="h-3 w-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{farm.location}</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium text-gray-900">주요 작물:</span> {farm.specialty}
                </p>

                <p className="text-sm text-gray-600 mb-4">{farm.description}</p>

                <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{farm.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{farm.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

