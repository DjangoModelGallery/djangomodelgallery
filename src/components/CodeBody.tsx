"use client";
import useViz from "@/hooks/useViz";
import { Post } from "@/types/posts/posts";

export default function CodeBody(postContent: Post) {
  const containerRef = useViz(postContent.vizCodeBlocks[0].code);

  return (
    <div className="sticky top-0">
      <div className="h-[50vh] overflow-scroll w-full" ref={containerRef}></div>

      <div
        className="code-body"
        dangerouslySetInnerHTML={{ __html: postContent.vizCodeBlocks[0].code }}
      />
    </div>
  );
}
