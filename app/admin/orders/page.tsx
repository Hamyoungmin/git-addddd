"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Eye,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  shippingFee: number;
  paymentMethod: string;
  status: "pending" | "paid" | "preparing" | "shipping" | "delivered" | "cancelled" | "refunded";
  trackingNumber?: string;
  createdAt: string;
}

const statusMap = {
  pending: { label: "결제대기", color: "bg-yellow-100 text-yellow-700" },
  paid: { label: "결제완료", color: "bg-blue-100 text-blue-700" },
  preparing: { label: "배송준비", color: "bg-purple-100 text-purple-700" },
  shipping: { label: "배송중", color: "bg-indigo-100 text-indigo-700" },
  delivered: { label: "배송완료", color: "bg-green-100 text-green-700" },
  cancelled: { label: "취소", color: "bg-red-100 text-red-700" },
  refunded: { label: "환불", color: "bg-gray-100 text-gray-700" },
};

// 샘플 주문 데이터
const sampleOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-20241206-001",
    customer: {
      name: "홍길동",
      phone: "010-1234-5678",
      email: "hong@email.com",
    },
    products: [
      { name: "유기농 토마토 (1kg)", quantity: 2, price: 8500 },
      { name: "국산 사과 (2kg)", quantity: 1, price: 12000 },
    ],
    totalAmount: 32000,
    shippingFee: 3000,
    paymentMethod: "카드결제",
    status: "shipping",
    trackingNumber: "1234567890",
    createdAt: "2024-12-06 14:30",
  },
  {
    id: "2",
    orderNumber: "ORD-20241206-002",
    customer: {
      name: "김철수",
      phone: "010-2345-6789",
      email: "kim@email.com",
    },
    products: [{ name: "국산 사과 (2kg)", quantity: 1, price: 12000 }],
    totalAmount: 15000,
    shippingFee: 3000,
    paymentMethod: "계좌이체",
    status: "paid",
    createdAt: "2024-12-06 13:45",
  },
  {
    id: "3",
    orderNumber: "ORD-20241206-003",
    customer: {
      name: "이영희",
      phone: "010-3456-7890",
      email: "lee@email.com",
    },
    products: [
      { name: "신선한 당근 (500g)", quantity: 2, price: 3500 },
    ],
    totalAmount: 10000,
    shippingFee: 3000,
    paymentMethod: "카카오페이",
    status: "preparing",
    createdAt: "2024-12-06 12:20",
  },
  {
    id: "4",
    orderNumber: "ORD-20241206-004",
    customer: {
      name: "박민수",
      phone: "010-4567-8901",
      email: "park@email.com",
    },
    products: [{ name: "유기농 상추 (200g)", quantity: 1, price: 2800 }],
    totalAmount: 5800,
    shippingFee: 3000,
    paymentMethod: "카드결제",
    status: "delivered",
    trackingNumber: "9876543210",
    createdAt: "2024-12-06 10:15",
  },
  {
    id: "5",
    orderNumber: "ORD-20241206-005",
    customer: {
      name: "최지은",
      phone: "010-5678-9012",
      email: "choi@email.com",
    },
    products: [{ name: "혼합 과일 바구니", quantity: 1, price: 25000 }],
    totalAmount: 28000,
    shippingFee: 3000,
    paymentMethod: "네이버페이",
    status: "pending",
    createdAt: "2024-12-06 09:30",
  },
  {
    id: "6",
    orderNumber: "ORD-20241205-010",
    customer: {
      name: "정수민",
      phone: "010-6789-0123",
      email: "jung@email.com",
    },
    products: [{ name: "농장 직송 채소 세트", quantity: 1, price: 18000 }],
    totalAmount: 21000,
    shippingFee: 3000,
    paymentMethod: "카드결제",
    status: "cancelled",
    createdAt: "2024-12-05 16:45",
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // 필터링
  const filteredOrders = sampleOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.includes(searchQuery) ||
      order.customer.phone.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 상태별 개수
  const statusCounts = {
    all: sampleOrders.length,
    pending: sampleOrders.filter((o) => o.status === "pending").length,
    paid: sampleOrders.filter((o) => o.status === "paid").length,
    preparing: sampleOrders.filter((o) => o.status === "preparing").length,
    shipping: sampleOrders.filter((o) => o.status === "shipping").length,
    delivered: sampleOrders.filter((o) => o.status === "delivered").length,
    cancelled: sampleOrders.filter((o) => o.status === "cancelled" || o.status === "refunded").length,
  };

  // 전체 선택
  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  // 개별 선택
  const handleSelect = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((o) => o !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
          <p className="text-gray-500 mt-1">
            총 {filteredOrders.length}개의 주문
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          엑셀 다운로드
        </Button>
      </div>

      {/* 상태별 탭 */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "전체" },
          { key: "pending", label: "결제대기" },
          { key: "paid", label: "결제완료" },
          { key: "preparing", label: "배송준비" },
          { key: "shipping", label: "배송중" },
          { key: "delivered", label: "배송완료" },
          { key: "cancelled", label: "취소/환불" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              statusFilter === tab.key
                ? "bg-green-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab.label} ({statusCounts[tab.key as keyof typeof statusCounts]})
          </button>
        ))}
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
                placeholder="주문번호, 주문자명, 연락처 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* 기간 선택 */}
          <div className="flex gap-2">
            <input
              type="date"
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="flex items-center text-gray-400">~</span>
            <input
              type="date"
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* 선택된 항목 액션 */}
        {selectedOrders.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {selectedOrders.length}개 선택됨
            </span>
            <Button variant="outline" size="sm">
              상태 일괄 변경
            </Button>
            <Button variant="outline" size="sm">
              송장번호 일괄 입력
            </Button>
          </div>
        )}
      </div>

      {/* 주문 테이블 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedOrders.length === filteredOrders.length &&
                      filteredOrders.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  주문번호
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  주문일시
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  주문자
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  상품
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  결제금액
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  결제수단
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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelect(order.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.createdAt}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">
                      {order.customer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.customer.phone}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900">
                      {order.products[0].name}
                      {order.products.length > 1 && (
                        <span className="text-gray-500">
                          {" "}
                          외 {order.products.length - 1}건
                        </span>
                      )}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {order.totalAmount.toLocaleString()}원
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.paymentMethod}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        statusMap[order.status].color
                      }`}
                    >
                      {statusMap[order.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${order.id}`}>
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
            전체 {filteredOrders.length}개 중 1-{filteredOrders.length}
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
