"use client";

import { Bell, Search, User, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // 샘플 알림 데이터
  const notifications = [
    { id: 1, message: "새로운 주문이 들어왔습니다.", time: "방금 전" },
    { id: 2, message: "재고 부족 상품이 있습니다.", time: "5분 전" },
    { id: 3, message: "새로운 리뷰가 등록되었습니다.", time: "10분 전" },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* 좌측: 모바일 메뉴 버튼 + 검색 */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* 검색바 */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="검색..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 우측: 알림 + 프로필 */}
        <div className="flex items-center gap-2">
          {/* 알림 */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            {/* 알림 드롭다운 */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">알림</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    >
                      <p className="text-sm text-gray-700">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                    모든 알림 보기
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 프로필 */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
            >
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-green-600" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                관리자
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </Button>

            {/* 프로필 드롭다운 */}
            {showProfile && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium text-gray-900">관리자</p>
                  <p className="text-xs text-gray-500">admin@farm-market.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                    내 정보
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                    설정
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
