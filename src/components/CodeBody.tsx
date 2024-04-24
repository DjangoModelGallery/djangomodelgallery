"use client";
import useCodeMirror from "@/hooks/useCodeMirror";
import useCodeMirrorWithTabs from "@/hooks/useCodeMirrorWithTabs";
import { useToggle } from "@/hooks/useToggle";
import useViz from "@/hooks/useViz";
import { useZoomAndPan } from "@/hooks/useZoomAndPan";
import { TabEditorBlock } from "@/types/code/markdown";
import { Post } from "@/types/posts/posts";
import { useMemo, useState } from "react";

export default function CodeBody(postContent: Post) {
  const [data, setData] = useState<string>(postContent.vizCodeBlocks[0]?.code);

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

  const { editorsRef, switchTab, getContents, currentTab, tabsList } =
    useCodeMirrorWithTabs(TAB_DATA, "python");
  const { editorRef, getContent } = useCodeMirror(
    data,
    "dot",
    () => {
      console.log("Command executed!");
    },
    (value) => {
      setData(value);
    },
    open
  );

  const { containerRef } = useViz(data);
  const { zoomIn, zoomOut, resetZoom, resetPan, zoomLevel } = useZoomAndPan({
    containerRef,
  });
  return (
    <div className="sticky top-0 bg-slate-700">
      <button onClick={zoomIn} className="btn btn-sm btn-outline ">
        Zoom In
      </button>
      <button onClick={zoomOut} className="btn btn-sm btn-outline ">
        Zoom Out
      </button>
      <button onClick={resetZoom} className="btn btn-sm btn-outline ">
        Reset Zoom
      </button>
      <button onClick={resetPan} className="btn btn-sm btn-outline ">
        Reset Pan
      </button>
      <p className="">Current Zoom Level: {zoomLevel.toFixed(2)}</p>
      <p className="">
        [alt] + scroll 로 zoom 레벨 조정, 드래그로 panning 조정
      </p>
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
          className="h-[50vh] overflow-scroll w-full z-50"
          ref={editorsRef}
        ></div>
        {open && (
          <div
            ref={editorRef}
            className="w-full h-[50vh] absolute top-0 rounded-lg overflow-scroll bg-stone-800"
          ></div>
        )}
      </div>
    </div>
  );
}
