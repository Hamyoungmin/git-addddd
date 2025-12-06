"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Star,
  Image,
  Wheat,
  BarChart3,
  Settings,
  MessageSquare,
  HelpCircle,
  Bell,
  Ticket,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "대시보드",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "상품 관리",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "주문 관리",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "회원 관리",
    href: "/admin/members",
    icon: Users,
  },
  {
    title: "리뷰 관리",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    title: "배너 관리",
    href: "/admin/banners",
    icon: Image,
  },
  {
    title: "농장 관리",
    href: "/admin/farms",
    icon: Wheat,
  },
  {
    title: "통계/분석",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "문의 관리",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
  {
    title: "공지사항",
    href: "/admin/notices",
    icon: Bell,
  },
  {
    title: "FAQ 관리",
    href: "/admin/faq",
    icon: HelpCircle,
  },
  {
    title: "쿠폰 관리",
    href: "/admin/coupons",
    icon: Ticket,
  },
  {
    title: "설정",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 z-40">
      {/* 로고 영역 */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Wheat className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900">관리자</span>
        </Link>
      </div>

      {/* 메뉴 영역 */}
      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "text-green-600" : "text-gray-400"}`} />
              {item.title}
            </Link>
          );
        })}

        {/* 구분선 */}
        <div className="my-4 border-t border-gray-200" />

        {/* 쇼핑몰 바로가기 */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="w-5 h-5 text-gray-400" />
          쇼핑몰 바로가기
        </Link>
      </nav>
    </aside>
  );
}
