"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 로그인 로직 구현
    alert("로그인 기능은 준비 중입니다.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 간단한 헤더 */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-green-600 font-bold text-xl flex items-center gap-1">
            <span>🌱</span>
            <span>농산물마켓</span>
          </Link>
        </div>
      </header>

      {/* 로그인 폼 */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
              <p className="text-gray-500 mt-2">농산물마켓에 오신 것을 환영합니다</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {/* 비밀번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* 옵션 */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-green-500 focus:ring-green-500" />
                  <span className="text-gray-600">로그인 상태 유지</span>
                </label>
                <Link href="/forgot-password" className="text-green-600 hover:text-green-700">
                  비밀번호 찾기
                </Link>
              </div>

              {/* 로그인 버튼 */}
              <Button
                type="submit"
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white text-base font-medium"
              >
                로그인
              </Button>
            </form>

            {/* 소셜 로그인 */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">또는</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center h-12 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xl">🟡</span>
                </button>
                <button className="flex items-center justify-center h-12 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xl">🟢</span>
                </button>
                <button className="flex items-center justify-center h-12 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xl">🔵</span>
                </button>
              </div>
            </div>

            {/* 회원가입 링크 */}
            <p className="mt-8 text-center text-sm text-gray-600">
              아직 회원이 아니신가요?{" "}
              <Link href="/signup" className="text-green-600 font-medium hover:text-green-700">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

