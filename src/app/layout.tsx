/**
 * @fileoverview 이 파일은 전역 레이아웃을 정의합니다. HTML 태그와 폰트 설정 등이 포함되어 있습니다.
 * 레이아웃에 대한 메타데이터는 LOOT_LAYOUT_METADATA에서 수정할 수 있습니다.
 */

// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LOOT_LAYOUT_METADATA } from "../../constants/SEO";
import "./globals.css";

/**
 * @description Google의 Inter 폰트를 불러옵니다. Latin 서브셋을 사용합니다.
 */
const inter = Inter({ subsets: ["latin"] });

/**
 * @description 전역 레이아웃 컴포넌트입니다. HTML 태그와 body 태그를 포함하며, 자식 컴포넌트를 렌더링합니다.
 * @param {React.ReactNode} children - 렌더링할 자식 컴포넌트입니다.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full scrollbar-hide">
      <body className={`${inter.className} m-0 p-0`}>{children}</body>
    </html>
  );
}

/**
 * @description 레이아웃에 대한 메타데이터입니다. SEO 상수에서 가져옵니다.
 */
export const metadata: Metadata = LOOT_LAYOUT_METADATA;
