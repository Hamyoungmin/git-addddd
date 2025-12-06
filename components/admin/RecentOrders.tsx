"use client";

import Link from "next/link";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  amount: number;
  status: "pending" | "paid" | "preparing" | "shipping" | "delivered" | "cancelled";
  date: string;
}

const statusMap = {
  pending: { label: "결제대기", color: "bg-yellow-100 text-yellow-700" },
  paid: { label: "결제완료", color: "bg-blue-100 text-blue-700" },
  preparing: { label: "배송준비", color: "bg-purple-100 text-purple-700" },
  shipping: { label: "배송중", color: "bg-indigo-100 text-indigo-700" },
  delivered: { label: "배송완료", color: "bg-green-100 text-green-700" },
  cancelled: { label: "취소", color: "bg-red-100 text-red-700" },
};

// 샘플 데이터
const recentOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-20241206-001",
    customer: "홍길동",
    product: "유기농 토마토 외 2건",
    amount: 35000,
    status: "shipping",
    date: "2024-12-06 14:30",
  },
  {
    id: "2",
    orderNumber: "ORD-20241206-002",
    customer: "김철수",
    product: "국산 사과 (2kg)",
    amount: 12000,
    status: "paid",
    date: "2024-12-06 13:45",
  },
  {
    id: "3",
    orderNumber: "ORD-20241206-003",
    customer: "이영희",
    product: "신선한 당근 외 1건",
    amount: 8500,
    status: "preparing",
    date: "2024-12-06 12:20",
  },
  {
    id: "4",
    orderNumber: "ORD-20241206-004",
    customer: "박민수",
    product: "유기농 상추 (200g)",
    amount: 2800,
    status: "delivered",
    date: "2024-12-06 10:15",
  },
  {
    id: "5",
    orderNumber: "ORD-20241206-005",
    customer: "최지은",
    product: "혼합 과일 바구니",
    amount: 25000,
    status: "pending",
    date: "2024-12-06 09:30",
  },
];

export function RecentOrders() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">최근 주문</h3>
        <Link
          href="/admin/orders"
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          전체보기
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                주문번호
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                주문자
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                상품
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                금액
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                상태
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {order.orderNumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {order.customer}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {order.product}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {order.amount.toLocaleString()}원
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
