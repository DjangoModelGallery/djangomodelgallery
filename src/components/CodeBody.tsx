"use client";
import useCodeMirror from "@/hooks/useCodeMirror";
import { useToggle } from "@/hooks/useToggle";
import useViz from "@/hooks/useViz";
import { useZoomAndPan } from "@/hooks/useZoomAndPan";
import { Post } from "@/types/posts/posts";
import { useState } from "react";

export default function CodeBody(postContent: Post) {
  const [data, setData] = useState<string>(postContent.vizCodeBlocks[0].code);
  const [open, setOpen] = useToggle(false);
  const { containerRef } = useViz(postContent.vizCodeBlocks[0].code);
  const { zoomIn, zoomOut, resetZoom, zoomLevel } = useZoomAndPan({
    containerRef,
  });

  const { editorRef, getContent } = useCodeMirror(data, "python", () => {
    console.log("Command executed!");
  });

  return (
    <div className="sticky top-0">
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
      <button onClick={resetZoom}>Reset Zoom</button>
      <p>Current Zoom Level: {zoomLevel.toFixed(2)}</p>
      <div className="relative">
        <button
          onClick={() => setOpen()}
          className="top-0 absolute btn btn-sm right-5 z-50"
        >
          {open ? "hide" : "Show"}Code
        </button>
        <div
          className="h-[50vh] overflow-scroll w-full"
          ref={containerRef}
        ></div>
        {open && (
          <div
            ref={editorRef}
            className="w-full h-[50vh] absolute top-0 bg-gray-800 rounded-lg overflow-scroll "
          ></div>
        )}
      </div>
    </div>
  );
}
