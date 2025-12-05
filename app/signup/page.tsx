"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllAgreement = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleAgreementChange = (key: keyof typeof agreements) => {
    if (key === "all") {
      handleAllAgreement();
      return;
    }
    const newAgreements = { ...agreements, [key]: !agreements[key] };
    newAgreements.all = newAgreements.terms && newAgreements.privacy && newAgreements.marketing;
    setAgreements(newAgreements);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    // TODO: 실제 회원가입 로직 구현
    alert("회원가입 기능은 준비 중입니다.");
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

      {/* 회원가입 폼 */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
              <p className="text-gray-500 mt-2">신선한 농산물과 함께하세요</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  이름
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {/* 전화번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  전화번호
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
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
                    name="password"
                    placeholder="8자 이상 입력하세요"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12"
                    required
                    minLength={8}
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

              {/* 비밀번호 확인 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* 약관 동의 */}
              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <div
                    onClick={() => handleAgreementChange("all")}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      agreements.all
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 hover:border-green-500"
                    }`}
                  >
                    {agreements.all && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="font-medium text-gray-900">전체 동의</span>
                </label>

                <div className="space-y-2 pl-2">
                  {[
                    { key: "terms" as const, label: "[필수] 이용약관 동의", required: true },
                    { key: "privacy" as const, label: "[필수] 개인정보 수집/이용 동의", required: true },
                    { key: "marketing" as const, label: "[선택] 마케팅 정보 수신 동의", required: false },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                      <div
                        onClick={() => handleAgreementChange(item.key)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          agreements[item.key]
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 hover:border-green-500"
                        }`}
                      >
                        {agreements[item.key] && <Check className="h-2.5 w-2.5 text-white" />}
                      </div>
                      <span className="text-sm text-gray-600">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 가입 버튼 */}
              <Button
                type="submit"
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white text-base font-medium mt-6"
              >
                가입하기
              </Button>
            </form>

            {/* 로그인 링크 */}
            <p className="mt-6 text-center text-sm text-gray-600">
              이미 회원이신가요?{" "}
              <Link href="/login" className="text-green-600 font-medium hover:text-green-700">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

