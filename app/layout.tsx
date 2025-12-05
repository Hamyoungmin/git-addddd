import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "농산물마켓 - 신선한 농산물 직거래",
  description: "농장에서 직송한 신선한 농산물을 만나보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
