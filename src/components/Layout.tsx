/**
 * @fileoverview 이 파일은 UI 레이아웃을 정의합니다. Dark mode 전환 시 배경색을 변경합니다.
 * 신규 페이지를 만들 때, 이 레이아웃을 최상단에 import 해야 합니다.
 */

import Footer from "./Footer";
import Header from "./Header";

/**
 * @description 레이아웃 컴포넌트입니다. Header, Footer와 함께 자식 컴포넌트를 렌더링합니다.
 * Dark mode 전환 시 배경색을 변경합니다.
 * @param {React.ReactNode} children - 렌더링할 자식 컴포넌트입니다.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <section className="min-h-screen mx-auto scrollbar-hide dark:bg-black bg-white pb-12">
        {children}
      </section>
      <Footer />
    </>
  );
}
