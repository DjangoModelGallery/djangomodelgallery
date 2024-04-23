"use client";
import useCodeMirror from "@/hooks/useCodeMirror";
import useCodeMirrorWithTabs from "@/hooks/useCodeMirrorWithTabs";
import { useToggle } from "@/hooks/useToggle";
import useViz from "@/hooks/useViz";
import { useZoomAndPan } from "@/hooks/useZoomAndPan";
import { Post } from "@/types/posts/posts";
import { useMemo, useState } from "react";

export default function CodeBody(postContent: Post) {
  const TAB_DATA = useMemo(() => {
    return postContent.pythonCodeBlocks.map((block) => block.code);
  }, [postContent.pythonCodeBlocks]);
  const [data, setData] = useState<string>(postContent.vizCodeBlocks[0].code);
  const [open, setOpen] = useToggle(false);

  const { containerRef } = useViz(postContent.vizCodeBlocks[0].code);
  const { editorsRef, switchTab, getContents, currentTab } =
    useCodeMirrorWithTabs(TAB_DATA, "python");

  const { zoomIn, zoomOut, resetZoom, zoomLevel } = useZoomAndPan({
    containerRef,
  });

  const { editorRef, getContent } = useCodeMirror(data, "dot", () => {
    console.log("Command executed!");
  });

  return (
    <div className="sticky top-0">
      <button onClick={zoomIn} className="btn btn-sm btn-outline ">
        Zoom In
      </button>
      <button onClick={zoomOut} className="btn btn-sm btn-outline ">
        Zoom Out
      </button>
      <button onClick={resetZoom} className="btn btn-sm btn-outline ">
        Reset Zoom
      </button>
      <p className="">Current Zoom Level: {zoomLevel.toFixed(2)}</p>
      <div className="relative z-50">
        <button
          onClick={() => setOpen()}
          className="top-0 absolute btn btn-sm right-5 z-50"
        >
          {open ? "hide" : "Show"}Code
        </button>
        <p
          className="z-50 text-white fixed bottom-0 right-0"
          onClick={() => switchTab(1)}
        >
          {currentTab}
        </p>
        <div
          className="h-[50vh] overflow-scroll w-full"
          ref={containerRef}
        ></div>

        <div
          className="h-[50vh]  overflow-scroll w-full z-50"
          ref={editorsRef}
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
