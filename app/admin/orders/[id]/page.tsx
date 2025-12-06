"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Truck,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const statusMap = {
  pending: { label: "결제대기", color: "bg-yellow-100 text-yellow-700" },
  paid: { label: "결제완료", color: "bg-blue-100 text-blue-700" },
  preparing: { label: "배송준비", color: "bg-purple-100 text-purple-700" },
  shipping: { label: "배송중", color: "bg-indigo-100 text-indigo-700" },
  delivered: { label: "배송완료", color: "bg-green-100 text-green-700" },
  cancelled: { label: "취소", color: "bg-red-100 text-red-700" },
  refunded: { label: "환불", color: "bg-gray-100 text-gray-700" },
};

// 샘플 주문 상세 데이터
const orderDetail = {
  id: "1",
  orderNumber: "ORD-20241206-001",
  status: "preparing" as const,
  createdAt: "2024-12-06 14:30",
  customer: {
    name: "홍길동",
    phone: "010-1234-5678",
    email: "hong@email.com",
  },
  shipping: {
    name: "홍길동",
    phone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123 ABC빌딩 501호",
    zipCode: "06234",
    memo: "부재시 경비실에 맡겨주세요",
  },
  products: [
    {
      id: "1",
      name: "유기농 토마토 (1kg)",
      image: "/photo-1683008952375-410ae668e6b9.jpg",
      quantity: 2,
      price: 8500,
    },
    {
      id: "2",
      name: "국산 사과 (2kg)",
      image: "/photo-1623815242959-fb20354f9b8d.jpg",
      quantity: 1,
      price: 12000,
    },
  ],
  payment: {
    method: "카드결제",
    productAmount: 29000,
    shippingFee: 3000,
    discount: 0,
    totalAmount: 32000,
  },
  delivery: {
    courier: "",
    trackingNumber: "",
  },
  adminMemo: "",
};

export default function OrderDetailPage() {
  const [order, setOrder] = useState(orderDetail);
  const [newStatus, setNewStatus] = useState(order.status);
  const [courier, setCourier] = useState(order.delivery.courier);
  const [trackingNumber, setTrackingNumber] = useState(order.delivery.trackingNumber);
  const [adminMemo, setAdminMemo] = useState(order.adminMemo);

  const handleStatusChange = () => {
    setOrder({ ...order, status: newStatus });
    alert("주문 상태가 변경되었습니다.");
  };

  const handleTrackingSubmit = () => {
    setOrder({
      ...order,
      delivery: { courier, trackingNumber },
    });
    alert("송장번호가 등록되었습니다.");
  };

  const handleMemoSave = () => {
    setOrder({ ...order, adminMemo });
    alert("메모가 저장되었습니다.");
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center gap-4">
        <Link href="/admin/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              주문 상세
            </h1>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                statusMap[order.status].color
              }`}
            >
              {statusMap[order.status].label}
            </span>
          </div>
          <p className="text-gray-500 mt-1">{order.orderNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 좌측: 주문 정보 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 주문 상태 변경 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">주문 상태</h2>
            <div className="flex items-center gap-4">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as typeof order.status)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="pending">결제대기</option>
                <option value="paid">결제완료</option>
                <option value="preparing">배송준비</option>
                <option value="shipping">배송중</option>
                <option value="delivered">배송완료</option>
                <option value="cancelled">취소</option>
                <option value="refunded">환불</option>
              </select>
              <Button
                onClick={handleStatusChange}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                상태 변경
              </Button>
            </div>

            {/* 상태 흐름도 */}
            <div className="mt-6 flex items-center justify-between text-xs">
              {["pending", "paid", "preparing", "shipping", "delivered"].map(
                (status, index) => (
                  <div key={status} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        ["pending", "paid", "preparing", "shipping", "delivered"].indexOf(order.status) >= index
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < 4 && (
                      <div
                        className={`w-12 h-1 ${
                          ["pending", "paid", "preparing", "shipping", "delivered"].indexOf(order.status) > index
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                )
              )}
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>결제대기</span>
              <span>결제완료</span>
              <span>배송준비</span>
              <span>배송중</span>
              <span>배송완료</span>
            </div>
          </div>

          {/* 주문 상품 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-400" />
              주문 상품
            </h2>
            <div className="space-y-4">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.price.toLocaleString()}원 x {product.quantity}개
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {(product.price * product.quantity).toLocaleString()}원
                  </p>
                </div>
              ))}
            </div>

            {/* 결제 금액 */}
            <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">상품금액</span>
                <span>{order.payment.productAmount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">배송비</span>
                <span>{order.payment.shippingFee.toLocaleString()}원</span>
              </div>
              {order.payment.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">할인금액</span>
                  <span className="text-red-500">
                    -{order.payment.discount.toLocaleString()}원
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>총 결제금액</span>
                <span className="text-green-600">
                  {order.payment.totalAmount.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          {/* 배송 정보 입력 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-gray-400" />
              배송 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  택배사
                </label>
                <select
                  value={courier}
                  onChange={(e) => setCourier(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">택배사 선택</option>
                  <option value="cj">CJ대한통운</option>
                  <option value="lotte">롯데택배</option>
                  <option value="hanjin">한진택배</option>
                  <option value="logen">로젠택배</option>
                  <option value="post">우체국택배</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  송장번호
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="송장번호 입력"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={handleTrackingSubmit}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                송장번호 등록
              </Button>
            </div>
          </div>
        </div>

        {/* 우측: 고객 정보 */}
        <div className="space-y-6">
          {/* 주문 정보 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">주문 정보</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">주문번호</span>
                <span className="font-medium">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">주문일시</span>
                <span>{order.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">결제수단</span>
                <span>{order.payment.method}</span>
              </div>
            </div>
          </div>

          {/* 주문자 정보 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">주문자 정보</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {order.customer.name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium text-gray-900">
                  {order.customer.name}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{order.customer.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{order.customer.email}</span>
              </div>
            </div>
          </div>

          {/* 배송지 정보 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">배송지 정보</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    {order.shipping.name}
                  </p>
                  <p className="text-gray-600">{order.shipping.phone}</p>
                  <p className="text-gray-600 mt-1">
                    ({order.shipping.zipCode}) {order.shipping.address}
                  </p>
                </div>
              </div>
              {order.shipping.memo && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">배송 메모</p>
                  <p className="text-gray-700">{order.shipping.memo}</p>
                </div>
              )}
            </div>
          </div>

          {/* 관리자 메모 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">관리자 메모</h2>
            <textarea
              value={adminMemo}
              onChange={(e) => setAdminMemo(e.target.value)}
              rows={4}
              placeholder="관리자 메모를 입력하세요..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button
              onClick={handleMemoSave}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              메모 저장
            </Button>
          </div>

          {/* 주문 취소/환불 버튼 */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
              주문 취소
            </Button>
            <Button variant="outline" className="flex-1 text-orange-600 border-orange-200 hover:bg-orange-50">
              환불 처리
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
