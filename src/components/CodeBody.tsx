"use client";
import useViz from "@/hooks/useViz";
import { useZoomAndPan } from "@/hooks/useZoomAndPan";
import { Post } from "@/types/posts/posts";

export default function CodeBody(postContent: Post) {
  const { containerRef } = useViz(postContent.vizCodeBlocks[0].code);
  const { zoomIn, zoomOut, resetZoom, zoomLevel } = useZoomAndPan({
    containerRef,
  });

  return (
    <div className="sticky top-0">
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
      <button onClick={resetZoom}>Reset Zoom</button>
      <p>Current Zoom Level: {zoomLevel.toFixed(2)}</p>
      <div className="h-[50vh] overflow-scroll w-full" ref={containerRef}></div>
      <div
        className="code-body"
        dangerouslySetInnerHTML={{ __html: postContent.vizCodeBlocks[0].code }}
      />
    </div>
  );
}
