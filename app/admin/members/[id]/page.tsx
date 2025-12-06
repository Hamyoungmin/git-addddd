"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  Star,
  Wallet,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const gradeMap = {
  normal: { label: "일반", color: "bg-gray-100 text-gray-700" },
  silver: { label: "실버", color: "bg-slate-100 text-slate-700" },
  gold: { label: "골드", color: "bg-yellow-100 text-yellow-700" },
  vip: { label: "VIP", color: "bg-purple-100 text-purple-700" },
};

const statusMap = {
  pending: { label: "결제대기", color: "bg-yellow-100 text-yellow-700" },
  paid: { label: "결제완료", color: "bg-blue-100 text-blue-700" },
  preparing: { label: "배송준비", color: "bg-purple-100 text-purple-700" },
  shipping: { label: "배송중", color: "bg-indigo-100 text-indigo-700" },
  delivered: { label: "배송완료", color: "bg-green-100 text-green-700" },
  cancelled: { label: "취소", color: "bg-red-100 text-red-700" },
};

// 샘플 회원 상세 데이터
const memberDetail = {
  id: "1",
  name: "홍길동",
  email: "hong@email.com",
  phone: "010-1234-5678",
  grade: "vip" as const,
  totalPurchase: 520000,
  points: 15200,
  orderCount: 23,
  reviewCount: 12,
  createdAt: "2024-01-15",
  lastLoginAt: "2024-12-06 14:30",
  addresses: [
    {
      id: "1",
      name: "홍길동",
      phone: "010-1234-5678",
      address: "서울시 강남구 테헤란로 123 ABC빌딩 501호",
      zipCode: "06234",
      isDefault: true,
    },
    {
      id: "2",
      name: "홍길동",
      phone: "010-1234-5678",
      address: "경기도 성남시 분당구 판교로 456",
      zipCode: "13487",
      isDefault: false,
    },
  ],
  orders: [
    {
      id: "1",
      orderNumber: "ORD-20241206-001",
      products: "유기농 토마토 외 2건",
      amount: 35000,
      status: "shipping" as const,
      date: "2024-12-06",
    },
    {
      id: "2",
      orderNumber: "ORD-20241201-015",
      products: "국산 사과 (2kg)",
      amount: 12000,
      status: "delivered" as const,
      date: "2024-12-01",
    },
    {
      id: "3",
      orderNumber: "ORD-20241125-008",
      products: "혼합 과일 바구니",
      amount: 25000,
      status: "delivered" as const,
      date: "2024-11-25",
    },
  ],
  reviews: [
    {
      id: "1",
      productName: "유기농 토마토 (1kg)",
      rating: 5,
      content: "정말 신선하고 맛있어요! 다음에도 또 주문할게요.",
      date: "2024-12-02",
    },
    {
      id: "2",
      productName: "국산 사과 (2kg)",
      rating: 4,
      content: "사과가 아삭하고 달아요. 배송도 빨랐습니다.",
      date: "2024-11-26",
    },
  ],
  pointHistory: [
    { id: "1", type: "earn", amount: 350, description: "주문 적립", date: "2024-12-06" },
    { id: "2", type: "use", amount: -1000, description: "포인트 사용", date: "2024-12-01" },
    { id: "3", type: "earn", amount: 250, description: "주문 적립", date: "2024-11-25" },
  ],
};

export default function MemberDetailPage() {
  const [member] = useState(memberDetail);
  const [activeTab, setActiveTab] = useState<"orders" | "reviews" | "points">("orders");

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center gap-4">
        <Link href="/admin/members">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">회원 상세</h1>
          <p className="text-gray-500 mt-1">{member.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 좌측: 회원 프로필 */}
        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">
                  {member.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{member.name}</h2>
                <span
                  className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                    gradeMap[member.grade].color
                  }`}
                >
                  {gradeMap[member.grade].label}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{member.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{member.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">가입일: {member.createdAt}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                최근 접속: {member.lastLoginAt}
              </p>
            </div>
          </div>

          {/* 통계 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">활동 현황</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {member.orderCount}
                </p>
                <p className="text-xs text-gray-500">총 주문</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {member.reviewCount}
                </p>
                <p className="text-xs text-gray-500">작성 리뷰</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg col-span-2">
                <Wallet className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {member.totalPurchase.toLocaleString()}원
                </p>
                <p className="text-xs text-gray-500">총 구매금액</p>
              </div>
            </div>
          </div>

          {/* 적립금 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">보유 적립금</h3>
              <Button variant="outline" size="sm">
                적립금 지급
              </Button>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {member.points.toLocaleString()}P
            </p>
          </div>

          {/* 배송지 목록 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">배송지 목록</h3>
            <div className="space-y-3">
              {member.addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-3 bg-gray-50 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {address.name}
                    </span>
                    {address.isDefault && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        기본
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 ml-6">{address.phone}</p>
                  <p className="text-gray-600 ml-6">
                    ({address.zipCode}) {address.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 우측: 탭 콘텐츠 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 탭 */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "orders"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  주문 이력 ({member.orders.length})
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "reviews"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  리뷰 이력 ({member.reviews.length})
                </button>
                <button
                  onClick={() => setActiveTab("points")}
                  className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "points"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  적립금 이력
                </button>
              </div>
            </div>

            {/* 주문 이력 */}
            {activeTab === "orders" && (
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          주문번호
                        </th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          상품
                        </th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          금액
                        </th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          상태
                        </th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          주문일
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {member.orders.map((order) => (
                        <tr key={order.id}>
                          <td className="py-3">
                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="text-sm text-green-600 hover:underline"
                            >
                              {order.orderNumber}
                            </Link>
                          </td>
                          <td className="py-3 text-sm text-gray-600">
                            {order.products}
                          </td>
                          <td className="py-3 text-sm font-medium text-gray-900">
                            {order.amount.toLocaleString()}원
                          </td>
                          <td className="py-3">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                statusMap[order.status].color
                              }`}
                            >
                              {statusMap[order.status].label}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-gray-500">
                            {order.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 리뷰 이력 */}
            {activeTab === "reviews" && (
              <div className="p-6 space-y-4">
                {member.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">
                        {review.productName}
                      </p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{review.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 적립금 이력 */}
            {activeTab === "points" && (
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          날짜
                        </th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          내용
                        </th>
                        <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          금액
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {member.pointHistory.map((history) => (
                        <tr key={history.id}>
                          <td className="py-3 text-sm text-gray-500">
                            {history.date}
                          </td>
                          <td className="py-3 text-sm text-gray-600">
                            {history.description}
                          </td>
                          <td
                            className={`py-3 text-sm font-medium text-right ${
                              history.type === "earn"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {history.type === "earn" ? "+" : ""}
                            {history.amount.toLocaleString()}P
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
