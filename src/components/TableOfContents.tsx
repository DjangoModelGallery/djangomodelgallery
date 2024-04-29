"use client";
import useTailwindBreakpoint from "@/hooks/useTailwindBreakpoint";
import { scrollToBottom, scrollToTop } from "@/utils/scrolls";
import Link from "next/link";

export default function TableOfContents({ toc }: { toc: string }) {
  const { width, breakpoints } = useTailwindBreakpoint();

  return (
    <aside
      className={`px-2 bg-lime-800 py-0.5 flex gap-x-1 rounded-xl ${
        width < breakpoints.md && "hidden"
      }`}
    >
      <div className="toc dropdown dropdown-hover dropdown-top ">
        <div role="button" className="btn btn-sm">
          목차보기
        </div>
        <div
          className="toc dropdown-content z-1 shadow bg-base-100 rounded-box w-72 max-w-md pr-4"
          dangerouslySetInnerHTML={{ __html: toc }}
        />
      </div>

      <div className="toc dropdown dropdown-hover dropdown-top">
        <div role="button" className="btn btn-sm">
          이동
        </div>
        <div className="toc dropdown-content z-1 shadow bg-base-100 rounded-box w-64 max-w-md pr-4 flex justify-center">
          <Link href={"/"} className="btn btn-sm">
            홈
          </Link>
          <Link href={"/posts"} className="btn btn-sm">
            모델
          </Link>
          <Link href={"/contribute"} className="btn btn-sm">
            기여
          </Link>
          <Link href={"/license"} className="btn btn-sm">
            라이센스
          </Link>
        </div>
      </div>

      <button className="btn btn-sm" onClick={scrollToTop}>
        top
      </button>
      <button className="btn btn-sm" onClick={scrollToBottom}>
        bottom
      </button>
    </aside>
  );
}
