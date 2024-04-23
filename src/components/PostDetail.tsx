"use client";
import useTailwindBreakpoint from "@/hooks/useTailwindBreakpoint";
import { useToggle } from "@/hooks/useToggle";
import { Post } from "@/types/posts/posts";
import CodeBody from "./CodeBody";
import PostBody from "./PostBody";

export default function PostDetail({ post }: { post: Post }) {
  const { width, breakpoints } = useTailwindBreakpoint();
  const [open, setOpen] = useToggle(false);

  return (
    <>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <article className="prose col-span-1 overflow-auto mx-auto">
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
    </>
  );
}
