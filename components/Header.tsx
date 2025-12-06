"use client";

import { ShoppingCart, User, Menu, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

// 농산물 쇼핑몰에 맞는 네비게이션 메뉴
const navItems = [
  { name: "홈", href: "/" },
  { name: "베스트", href: "/best" },
  { name: "신상품", href: "/new" },
  { name: "특가/할인", href: "/sale" },
  { name: "제철농산물", href: "/seasonal" },
  { name: "농장소개", href: "/farm" },
];

interface HeaderProps {
  cartItemCount?: number;
}

export function Header({ cartItemCount = 0 }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/" className="text-green-600 font-bold text-xl flex items-center gap-1">
              <span>🌱</span>
              <span>농산물마켓</span>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 우측 메뉴 */}
          <div className="flex items-center space-x-1">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <LogIn className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">로그인</span>
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="ghost" size="sm" className="text-gray-600 hidden sm:flex">
                <User className="h-4 w-4" />
                <span className="ml-1">회원가입</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="relative text-gray-600">
              <ShoppingCart className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">장바구니</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
            {/* 모바일 메뉴 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* 모바일 네비게이션 */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-green-100 text-green-700"
                        : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <hr className="my-2 border-gray-100" />
              <Link
                href="/login"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                회원가입
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
