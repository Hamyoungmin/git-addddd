"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Eye,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: "normal" | "silver" | "gold" | "vip";
  totalPurchase: number;
  points: number;
  orderCount: number;
  createdAt: string;
  lastLoginAt: string;
}

const gradeMap = {
  normal: { label: "일반", color: "bg-gray-100 text-gray-700" },
  silver: { label: "실버", color: "bg-slate-100 text-slate-700" },
  gold: { label: "골드", color: "bg-yellow-100 text-yellow-700" },
  vip: { label: "VIP", color: "bg-purple-100 text-purple-700" },
};

// 샘플 회원 데이터
const sampleMembers: Member[] = [
  {
    id: "1",
    name: "홍길동",
    email: "hong@email.com",
    phone: "010-1234-5678",
    grade: "vip",
    totalPurchase: 520000,
    points: 15200,
    orderCount: 23,
    createdAt: "2024-01-15",
    lastLoginAt: "2024-12-06 14:30",
  },
  {
    id: "2",
    name: "김철수",
    email: "kim@email.com",
    phone: "010-2345-6789",
    grade: "gold",
    totalPurchase: 350000,
    points: 8500,
    orderCount: 15,
    createdAt: "2024-03-20",
    lastLoginAt: "2024-12-06 10:15",
  },
  {
    id: "3",
    name: "이영희",
    email: "lee@email.com",
    phone: "010-3456-7890",
    grade: "silver",
    totalPurchase: 150000,
    points: 3200,
    orderCount: 8,
    createdAt: "2024-05-10",
    lastLoginAt: "2024-12-05 18:45",
  },
  {
    id: "4",
    name: "박민수",
    email: "park@email.com",
    phone: "010-4567-8901",
    grade: "normal",
    totalPurchase: 45000,
    points: 850,
    orderCount: 3,
    createdAt: "2024-08-25",
    lastLoginAt: "2024-12-04 09:20",
  },
  {
    id: "5",
    name: "최지은",
    email: "choi@email.com",
    phone: "010-5678-9012",
    grade: "normal",
    totalPurchase: 28000,
    points: 500,
    orderCount: 2,
    createdAt: "2024-10-12",
    lastLoginAt: "2024-12-06 16:00",
  },
  {
    id: "6",
    name: "정수민",
    email: "jung@email.com",
    phone: "010-6789-0123",
    grade: "silver",
    totalPurchase: 120000,
    points: 2800,
    orderCount: 6,
    createdAt: "2024-06-30",
    lastLoginAt: "2024-12-03 11:30",
  },
];

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  // 필터링
  const filteredMembers = sampleMembers.filter((member) => {
    const matchesSearch =
      member.name.includes(searchQuery) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);
    const matchesGrade =
      gradeFilter === "all" || member.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  // 정렬
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    switch (sortBy) {
      case "totalPurchase":
        return b.totalPurchase - a.totalPurchase;
      case "orderCount":
        return b.orderCount - a.orderCount;
      case "createdAt":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">회원 관리</h1>
          <p className="text-gray-500 mt-1">
            총 {sortedMembers.length}명의 회원
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          엑셀 다운로드
        </Button>
      </div>

      {/* 회원 등급 현황 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">전체 회원</p>
          <p className="text-2xl font-bold text-gray-900">{sampleMembers.length}명</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">VIP</p>
          <p className="text-2xl font-bold text-purple-600">
            {sampleMembers.filter((m) => m.grade === "vip").length}명
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">골드</p>
          <p className="text-2xl font-bold text-yellow-600">
            {sampleMembers.filter((m) => m.grade === "gold").length}명
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">실버</p>
          <p className="text-2xl font-bold text-slate-600">
            {sampleMembers.filter((m) => m.grade === "silver").length}명
          </p>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 검색 */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="이름, 이메일, 연락처 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* 등급 필터 */}
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">전체 등급</option>
            <option value="vip">VIP</option>
            <option value="gold">골드</option>
            <option value="silver">실버</option>
            <option value="normal">일반</option>
          </select>

          {/* 정렬 */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="createdAt">가입일순</option>
            <option value="totalPurchase">구매금액순</option>
            <option value="orderCount">주문횟수순</option>
          </select>
        </div>
      </div>

      {/* 회원 테이블 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  회원
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  연락처
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  등급
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  총 구매금액
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  주문횟수
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  적립금
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  가입일
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-medium">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {member.phone}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        gradeMap[member.grade].color
                      }`}
                    >
                      {gradeMap[member.grade].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {member.totalPurchase.toLocaleString()}원
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {member.orderCount}회
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600 font-medium">
                    {member.points.toLocaleString()}P
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {member.createdAt}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/members/${member.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            전체 {sortedMembers.length}명 중 1-{sortedMembers.length}
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

      {/* 등급 기준 안내 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">회원 등급 기준</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 text-left font-medium text-gray-500">등급</th>
                <th className="py-2 text-left font-medium text-gray-500">조건</th>
                <th className="py-2 text-left font-medium text-gray-500">혜택</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    일반
                  </span>
                </td>
                <td className="py-3 text-gray-600">기본</td>
                <td className="py-3 text-gray-600">기본 적립 1%</td>
              </tr>
              <tr>
                <td className="py-3">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                    실버
                  </span>
                </td>
                <td className="py-3 text-gray-600">누적 구매 10만원 이상</td>
                <td className="py-3 text-gray-600">적립 2%, 무료배송 쿠폰 월 1장</td>
              </tr>
              <tr>
                <td className="py-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    골드
                  </span>
                </td>
                <td className="py-3 text-gray-600">누적 구매 30만원 이상</td>
                <td className="py-3 text-gray-600">적립 3%, 무료배송, 5% 할인쿠폰</td>
              </tr>
              <tr>
                <td className="py-3">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    VIP
                  </span>
                </td>
                <td className="py-3 text-gray-600">누적 구매 50만원 이상</td>
                <td className="py-3 text-gray-600">적립 5%, 무료배송, 10% 할인</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
