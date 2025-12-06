"use client";

import { StatCard } from "@/components/admin/StatCard";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { PopularProducts } from "@/components/admin/PopularProducts";
import { LowStockAlert } from "@/components/admin/LowStockAlert";
import {
  Wallet,
  ShoppingCart,
  Users,
  Eye,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* 페이지 제목 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-500 mt-1">농산물마켓 운영 현황을 확인하세요.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="오늘 매출"
          value="1,234,500원"
          change={{ value: "12%", type: "increase" }}
          icon={Wallet}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatCard
          title="오늘 주문"
          value="45건"
          change={{ value: "8%", type: "increase" }}
          icon={ShoppingCart}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        <StatCard
          title="신규 회원"
          value="12명"
          change={{ value: "3%", type: "decrease" }}
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <StatCard
          title="오늘 방문자"
          value="1,523명"
          change={{ value: "15%", type: "increase" }}
          icon={Eye}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
      </div>

      {/* 메인 콘텐츠 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 최근 주문 (2칸) */}
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>

        {/* 재고 부족 알림 (1칸) */}
        <div>
          <LowStockAlert />
        </div>
      </div>

      {/* 인기 상품 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularProducts />
        
        {/* 빠른 액션 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">빠른 작업</h3>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/admin/products/new"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">상품 등록</p>
            </a>
            <a
              href="/admin/orders"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">주문 관리</p>
            </a>
            <a
              href="/admin/members"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">회원 관리</p>
            </a>
            <a
              href="/admin/analytics"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Eye className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">통계 분석</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
