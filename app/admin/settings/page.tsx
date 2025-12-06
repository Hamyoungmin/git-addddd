"use client";

import { useState } from "react";
import {
  Store,
  Truck,
  CreditCard,
  Bell,
  Users,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type TabType = "basic" | "shipping" | "payment" | "notification" | "admin";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("basic");

  // 기본 설정
  const [basicSettings, setBasicSettings] = useState({
    storeName: "농산물마켓",
    phone: "02-1234-5678",
    email: "info@farm-market.com",
    businessNumber: "123-45-67890",
    operatingHours: "09:00 ~ 18:00",
    address: "서울시 강남구 테헤란로 123",
  });

  // 배송 설정
  const [shippingSettings, setShippingSettings] = useState({
    baseShippingFee: 3000,
    freeShippingMin: 30000,
    islandExtraFee: 3000,
    defaultCourier: "cj",
  });

  // 결제 설정
  const [paymentSettings, setPaymentSettings] = useState({
    creditCard: true,
    bankTransfer: true,
    virtualAccount: true,
    kakaoPay: true,
    naverPay: true,
    tossPay: false,
  });

  // 알림 설정
  const [notificationSettings, setNotificationSettings] = useState({
    orderEmail: true,
    orderSms: true,
    orderKakao: false,
    stockAlert: true,
    stockAlertMin: 10,
    reviewAlert: true,
    inquiryAlert: true,
  });

  const handleSave = () => {
    alert("설정이 저장되었습니다.");
  };

  const tabs = [
    { key: "basic" as TabType, label: "기본 설정", icon: Store },
    { key: "shipping" as TabType, label: "배송 설정", icon: Truck },
    { key: "payment" as TabType, label: "결제 설정", icon: CreditCard },
    { key: "notification" as TabType, label: "알림 설정", icon: Bell },
    { key: "admin" as TabType, label: "관리자 계정", icon: Users },
  ];

  // 관리자 목록 (샘플)
  const adminUsers = [
    {
      id: "1",
      name: "관리자",
      email: "admin@farm-market.com",
      role: "최고관리자",
      lastLogin: "2024-12-06 14:30",
    },
    {
      id: "2",
      name: "담당자A",
      email: "staff1@farm-market.com",
      role: "상품관리",
      lastLogin: "2024-12-06 10:15",
    },
    {
      id: "3",
      name: "담당자B",
      email: "staff2@farm-market.com",
      role: "주문관리",
      lastLogin: "2024-12-05 18:20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        <p className="text-gray-500 mt-1">쇼핑몰 운영 설정을 관리합니다.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 사이드 탭 */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.key
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 설정 콘텐츠 */}
        <div className="flex-1">
          {/* 기본 설정 */}
          {activeTab === "basic" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                기본 설정
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      쇼핑몰명
                    </label>
                    <input
                      type="text"
                      value={basicSettings.storeName}
                      onChange={(e) =>
                        setBasicSettings({
                          ...basicSettings,
                          storeName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      대표 연락처
                    </label>
                    <input
                      type="text"
                      value={basicSettings.phone}
                      onChange={(e) =>
                        setBasicSettings({
                          ...basicSettings,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      대표 이메일
                    </label>
                    <input
                      type="email"
                      value={basicSettings.email}
                      onChange={(e) =>
                        setBasicSettings({
                          ...basicSettings,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      사업자등록번호
                    </label>
                    <input
                      type="text"
                      value={basicSettings.businessNumber}
                      onChange={(e) =>
                        setBasicSettings({
                          ...basicSettings,
                          businessNumber: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      운영 시간
                    </label>
                    <input
                      type="text"
                      value={basicSettings.operatingHours}
                      onChange={(e) =>
                        setBasicSettings({
                          ...basicSettings,
                          operatingHours: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      주소
                    </label>
                    <input
                      type="text"
                      value={basicSettings.address}
                      onChange={(e) =>
                        setBasicSettings({
                          ...basicSettings,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 배송 설정 */}
          {activeTab === "shipping" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                배송 설정
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      기본 배송비
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={shippingSettings.baseShippingFee}
                        onChange={(e) =>
                          setShippingSettings({
                            ...shippingSettings,
                            baseShippingFee: Number(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        원
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      무료배송 기준 금액
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={shippingSettings.freeShippingMin}
                        onChange={(e) =>
                          setShippingSettings({
                            ...shippingSettings,
                            freeShippingMin: Number(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 pr-16 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        원 이상
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      도서산간 추가배송비
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={shippingSettings.islandExtraFee}
                        onChange={(e) =>
                          setShippingSettings({
                            ...shippingSettings,
                            islandExtraFee: Number(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        원
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      기본 택배사
                    </label>
                    <select
                      value={shippingSettings.defaultCourier}
                      onChange={(e) =>
                        setShippingSettings({
                          ...shippingSettings,
                          defaultCourier: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="cj">CJ대한통운</option>
                      <option value="lotte">롯데택배</option>
                      <option value="hanjin">한진택배</option>
                      <option value="logen">로젠택배</option>
                      <option value="post">우체국택배</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 결제 설정 */}
          {activeTab === "payment" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                결제 설정
              </h2>
              <div className="space-y-6">
                <p className="text-sm text-gray-500">
                  사용할 결제 수단을 선택하세요.
                </p>
                <div className="space-y-4">
                  {[
                    { key: "creditCard", label: "신용카드" },
                    { key: "bankTransfer", label: "계좌이체" },
                    { key: "virtualAccount", label: "가상계좌" },
                    { key: "kakaoPay", label: "카카오페이" },
                    { key: "naverPay", label: "네이버페이" },
                    { key: "tossPay", label: "토스페이" },
                  ].map((method) => (
                    <label
                      key={method.key}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <span className="font-medium text-gray-900">
                        {method.label}
                      </span>
                      <input
                        type="checkbox"
                        checked={
                          paymentSettings[
                            method.key as keyof typeof paymentSettings
                          ]
                        }
                        onChange={(e) =>
                          setPaymentSettings({
                            ...paymentSettings,
                            [method.key]: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </label>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 알림 설정 */}
          {activeTab === "notification" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                알림 설정
              </h2>
              <div className="space-y-6">
                {/* 주문 알림 */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">주문 알림</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={notificationSettings.orderEmail}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            orderEmail: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">이메일 알림</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={notificationSettings.orderSms}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            orderSms: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">SMS 알림</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={notificationSettings.orderKakao}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            orderKakao: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">
                        카카오 알림톡
                      </span>
                    </label>
                  </div>
                </div>

                {/* 재고 알림 */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">재고 알림</h3>
                  <label className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.stockAlert}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          stockAlert: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">
                      재고 부족 알림 사용
                    </span>
                  </label>
                  {notificationSettings.stockAlert && (
                    <div className="ml-7">
                      <label className="block text-sm text-gray-600 mb-2">
                        알림 기준 재고
                      </label>
                      <div className="relative w-32">
                        <input
                          type="number"
                          value={notificationSettings.stockAlertMin}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              stockAlertMin: Number(e.target.value),
                            })
                          }
                          className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                          개
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 기타 알림 */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">기타 알림</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={notificationSettings.reviewAlert}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            reviewAlert: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">
                        리뷰 등록 알림
                      </span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={notificationSettings.inquiryAlert}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            inquiryAlert: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">
                        문의 등록 알림
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 관리자 계정 */}
          {activeTab === "admin" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  관리자 계정
                </h2>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  관리자 추가
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        이름
                      </th>
                      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        이메일
                      </th>
                      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        권한
                      </th>
                      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        최근 접속
                      </th>
                      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {adminUsers.map((admin) => (
                      <tr key={admin.id}>
                        <td className="py-3 text-sm font-medium text-gray-900">
                          {admin.name}
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          {admin.email}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              admin.role === "최고관리자"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {admin.role}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-500">
                          {admin.lastLogin}
                        </td>
                        <td className="py-3">
                          {admin.role !== "최고관리자" && (
                            <Button variant="ghost" size="sm">
                              수정
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 권한 설명 */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">권한 종류</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">최고관리자:</span> 모든 권한
                  </p>
                  <p>
                    <span className="font-medium">상품관리:</span> 상품
                    등록/수정/삭제
                  </p>
                  <p>
                    <span className="font-medium">주문관리:</span> 주문
                    조회/상태변경
                  </p>
                  <p>
                    <span className="font-medium">회원관리:</span> 회원
                    조회/등급변경
                  </p>
                  <p>
                    <span className="font-medium">컨텐츠관리:</span>{" "}
                    배너/공지사항/FAQ
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
