"use client";
import useTailwindBreakpoint from "@/hooks/useTailwindBreakpoint";
import { useToggle } from "@/hooks/useToggle";
import { useHistoryStore } from "@/store/useHistoryStore";
import { Post } from "@/types/posts/posts";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import CodeBody from "./CodeBody";
import PostBody from "./PostBody";

export default function PostDetail({ post }: { post: Post }) {
  const { width, breakpoints } = useTailwindBreakpoint();
  const pathname = usePathname();
  const [open, setOpen] = useToggle(false);

  const { setHistory } = useHistoryStore();

  useEffect(() => {
    setHistory(pathname);
  }, [pathname, setHistory]);

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <section className="w-full grid grid-cols-1 md:grid-cols-2">
        <article className="prose col-span-1 overflow-auto mx-auto w-full">
          <PostBody {...post} />
        </article>

        {width > breakpoints.md ? (
          <article className="col-span-1">
            <CodeBody {...post} />
          </article>
        ) : (
          <>
            <button
              className="btn btn-sm btn-outline fixed right-5 bottom-5"
              onClick={() => setOpen()}
            >
              모바일 erd
            </button>
            {open && (
              <div className="fixed top-0">
                <CodeBody {...post} />
              </div>
            )}
          </>
        )}
      </section>
    </Suspense>
  );
}
