"use client";
import useCodeMirror from "@/hooks/useCodeMirror";
import useCodeMirrorWithTabs from "@/hooks/useCodeMirrorWithTabs";
import { useToggle } from "@/hooks/useToggle";
import useViz from "@/hooks/useViz";
import { useZoomAndPan } from "@/hooks/useZoomAndPan";
import { TabEditorBlock } from "@/types/code/markdown";
import { Post } from "@/types/posts/posts";
import { useMemo } from "react";

export default function CodeBody(postContent: Post) {
  const TAB_DATA: TabEditorBlock[] = useMemo(() => {
    return postContent.pythonCodeBlocks
      .map((block) => {
        const code = block.code.trim();
        const firstLine = code.split("\n")[0];

        if (
          firstLine.startsWith("#") &&
          firstLine.includes(">") &&
          /\.\w+$/.test(firstLine)
        ) {
          const name = firstLine;
          return { name, code };
        }

        return undefined;
      })
      .filter((block): block is TabEditorBlock => block !== undefined);
  }, [postContent.pythonCodeBlocks]);

  const [open, setOpen] = useToggle(false);

  const { containerRef } = useViz(postContent.vizCodeBlocks[0]?.code);

  const { editorsRef, switchTab, getContents, currentTab, tabsList } =
    useCodeMirrorWithTabs(TAB_DATA, "python");

  const { zoomIn, zoomOut, resetZoom, zoomLevel } = useZoomAndPan({
    containerRef,
  });

  const { editorRef, getContent } = useCodeMirror(
    postContent.vizCodeBlocks[0]?.code || "",
    "dot",
    () => {
      console.log("Command executed!");
    }
  );

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
        <div className="absolute top-1/2 left-5 z-50">
          {tabsList.map((tab, index) => (
            <button
              key={index}
              onClick={() => switchTab(index)}
              className={`btn btn-sm ${
                currentTab === index ? "btn-primary" : "btn-outline"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <p className="z-50 text-white fixed bottom-0 right-0">
          {tabsList[currentTab]?.name || ""}
        </p>
        <div
          className="h-[50vh] overflow-scroll w-full bg-white"
          ref={containerRef}
        ></div>

        <div
          className="h-[50vh] bg-gray-800 overflow-scroll w-full z-50"
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
