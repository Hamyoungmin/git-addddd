"use client";

import { useState } from "react";
import {
  Search,
  Star,
  Check,
  X,
  Eye,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  productName: string;
  productImage: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  content: string;
  images: string[];
  status: "pending" | "approved" | "rejected" | "hidden";
  isBest: boolean;
  adminReply?: string;
  createdAt: string;
}

const statusMap = {
  pending: { label: "승인대기", color: "bg-yellow-100 text-yellow-700" },
  approved: { label: "승인완료", color: "bg-green-100 text-green-700" },
  rejected: { label: "거절", color: "bg-red-100 text-red-700" },
  hidden: { label: "숨김", color: "bg-gray-100 text-gray-700" },
};

// 샘플 리뷰 데이터
const sampleReviews: Review[] = [
  {
    id: "1",
    productName: "유기농 토마토 (1kg)",
    productImage: "/photo-1683008952375-410ae668e6b9.jpg",
    customerName: "홍길동",
    customerEmail: "hong@email.com",
    rating: 5,
    content: "정말 신선하고 맛있어요! 다음에도 또 주문할게요. 토마토가 빨갛고 탱탱해서 샐러드로 먹기 딱 좋았습니다.",
    images: [],
    status: "pending",
    isBest: false,
    createdAt: "2024-12-06 14:30",
  },
  {
    id: "2",
    productName: "국산 사과 (2kg)",
    productImage: "/photo-1623815242959-fb20354f9b8d.jpg",
    customerName: "김철수",
    customerEmail: "kim@email.com",
    rating: 4,
    content: "사과가 아삭하고 달아요. 배송도 빨랐습니다. 다만 한두개 정도 멍이 든 게 있었어요.",
    images: [],
    status: "approved",
    isBest: false,
    adminReply: "소중한 리뷰 감사합니다. 멍든 사과가 있어 죄송합니다. 더 꼼꼼히 검수하겠습니다.",
    createdAt: "2024-12-05 10:15",
  },
  {
    id: "3",
    productName: "신선한 당근 (500g)",
    productImage: "/photo-1663441041574-274dc77d17bb.jpg",
    customerName: "이영희",
    customerEmail: "lee@email.com",
    rating: 5,
    content: "아이들 간식으로 주스 만들어 먹었는데 너무 달고 맛있어요. 친환경이라 안심하고 먹일 수 있어서 좋아요!",
    images: [],
    status: "approved",
    isBest: true,
    createdAt: "2024-12-04 16:45",
  },
  {
    id: "4",
    productName: "유기농 상추 (200g)",
    productImage: "/photo-1572775146189-b792cd0b76ba.jpg",
    customerName: "박민수",
    customerEmail: "park@email.com",
    rating: 3,
    content: "상추는 신선했는데 양이 좀 적은 것 같아요.",
    images: [],
    status: "pending",
    isBest: false,
    createdAt: "2024-12-06 09:20",
  },
  {
    id: "5",
    productName: "혼합 과일 바구니",
    productImage: "/photo-1692071096134-4e5e0a85bef0.jpg",
    customerName: "최지은",
    customerEmail: "choi@email.com",
    rating: 5,
    content: "선물용으로 구매했는데 포장도 예쁘고 과일도 싱싱해서 받으신 분이 너무 좋아하셨어요!",
    images: [],
    status: "approved",
    isBest: true,
    createdAt: "2024-12-03 11:30",
  },
];

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState("");

  // 필터링
  const filteredReviews = sampleReviews.filter((review) => {
    const matchesSearch =
      review.productName.includes(searchQuery) ||
      review.customerName.includes(searchQuery) ||
      review.content.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" || review.status === statusFilter;
    const matchesRating =
      ratingFilter === "all" || review.rating === Number(ratingFilter);
    return matchesSearch && matchesStatus && matchesRating;
  });

  // 상태별 개수
  const statusCounts = {
    all: sampleReviews.length,
    pending: sampleReviews.filter((r) => r.status === "pending").length,
    approved: sampleReviews.filter((r) => r.status === "approved").length,
    hidden: sampleReviews.filter((r) => r.status === "hidden" || r.status === "rejected").length,
  };

  const handleApprove = (id: string) => {
    alert(`리뷰 ID ${id} 승인 처리되었습니다.`);
  };

  const handleReject = (id: string) => {
    alert(`리뷰 ID ${id} 거절 처리되었습니다.`);
  };

  const handleReply = () => {
    if (selectedReview && replyText.trim()) {
      alert(`리뷰에 답글이 등록되었습니다.`);
      setReplyText("");
      setSelectedReview(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">리뷰 관리</h1>
        <p className="text-gray-500 mt-1">
          총 {filteredReviews.length}개의 리뷰
        </p>
      </div>

      {/* 상태별 탭 */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "전체" },
          { key: "pending", label: "승인대기" },
          { key: "approved", label: "승인완료" },
          { key: "hidden", label: "숨김/거절" },
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
                placeholder="상품명, 작성자, 내용 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* 별점 필터 */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">전체 별점</option>
            <option value="5">5점</option>
            <option value="4">4점</option>
            <option value="3">3점</option>
            <option value="2">2점</option>
            <option value="1">1점</option>
          </select>
        </div>
      </div>

      {/* 리뷰 목록 */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-start gap-4">
              {/* 상품 이미지 */}
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {review.productImage ? (
                  <img
                    src={review.productImage}
                    alt={review.productName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                    No Image
                  </div>
                )}
              </div>

              {/* 리뷰 내용 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-gray-900">
                      {review.productName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.customerName}
                      </span>
                      <span className="text-sm text-gray-400">
                        {review.createdAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        statusMap[review.status].color
                      }`}
                    >
                      {statusMap[review.status].label}
                    </span>
                    {review.isBest && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                        베스트
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-3">{review.content}</p>

                {/* 관리자 답글 */}
                {review.adminReply && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      관리자 답글
                    </p>
                    <p className="text-sm text-gray-600">{review.adminReply}</p>
                  </div>
                )}

                {/* 버튼 */}
                <div className="mt-4 flex items-center gap-2">
                  {review.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(review.id)}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        승인
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(review.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-1" />
                        거절
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedReview(review)}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    답글
                  </Button>
                  {!review.isBest && review.status === "approved" && (
                    <Button size="sm" variant="outline">
                      베스트 선정
                    </Button>
                  )}
                  {review.status === "approved" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-gray-600"
                    >
                      숨김
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 답글 모달 */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              리뷰 답글 작성
            </h3>
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">
                {selectedReview.productName}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {selectedReview.content}
              </p>
            </div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={4}
              placeholder="답글을 입력하세요..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedReview(null);
                  setReplyText("");
                }}
              >
                취소
              </Button>
              <Button
                onClick={handleReply}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                답글 등록
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
