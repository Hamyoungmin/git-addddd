export function FigmaBanner() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4">
          {/* Figma Make 배지 */}
          <div className="inline-flex">
            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-lg font-semibold text-base">
              Figma Make
            </span>
          </div>
          {/* 설명 텍스트 */}
          <p className="text-gray-900 text-2xl sm:text-3xl font-medium leading-relaxed">
            기존 피그마 디자인 파일 라이브러리 혹은 커뮤니티에서 디자인 에셋을 가져올 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

