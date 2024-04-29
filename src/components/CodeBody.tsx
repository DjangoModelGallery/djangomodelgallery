/**
 * @fileoverview CodeBody 컴포넌트입니다. 현재는 갤러리 포스트에만 사용되고 있으며, CodeMirror를 사용하여 코드를 렌더링하고, Viz.js를 사용하여 ERD 시각화 svg를 렌더링합니다.
 */

"use client";
import useCodeMirror from "@/hooks/useCodeMirror";
import useCodeMirrorWithTabs from "@/hooks/useCodeMirrorWithTabs";
import { useToggle } from "@/hooks/useToggle";
import useViz from "@/hooks/useViz";
import { useZoomAndPan } from "@/hooks/useZoomAndPan";
import { TabEditorBlock } from "@/types/code/markdown";
import { Post } from "@/types/posts/posts";
import { useEffect, useMemo, useState } from "react";

/**
 * @description CodeBody 컴포넌트입니다. 현재는 갤러리 포스트에만 사용되고 있으며, CodeMirror를 사용하여 코드를 렌더링하고, Viz.js를 사용하여 ERD 시각화 svg를 렌더링합니다.
 * @param {Post} postContent - 포스트의 내용입니다. frontmatter에는 제목, 날짜, 카테고리, 태그 등이 포함되어 있습니다. 더 자세한 내용은, type이 정의된 types/posts/frontmatters.ts를 봐주세요.
 */
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
  const [modalOpen, setModalOpen] = useToggle(false);

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
  const {
    zoomIn,
    zoomOut,
    resetZoom,
    resetPan,
    zoomLevel,
    downloadPNG,
    downloadSVG,
  } = useZoomAndPan({
    containerRef,
  });

  const fileName =
    postContent.frontmatter.title.replace(/ /g, "_") + "by_DjangoModelGallery";

  useEffect(() => {
    if (containerRef.current) {
      if (modalOpen) {
        const modalContainer = document.querySelector(".modal-container");
        if (modalContainer) {
          const clonedContainer = containerRef.current.cloneNode(
            true
          ) as HTMLElement;
          clonedContainer.classList.remove("h-[41vh]");
          clonedContainer.classList.add("h-full");
          clonedContainer.classList.add("scrollbar-hide");
          clonedContainer.classList.add("bg-transparent");
          modalContainer.appendChild(clonedContainer);
        }
      } else {
        const modalContainer = document.querySelector(".modal-container");
        if (modalContainer) {
          modalContainer.innerHTML = "";
        }
      }
    }
  }, [modalOpen, containerRef]);

  return (
    <div className="sticky top-0 bg-slate-700 border-l-4 border-neutral-500">
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
      <button
        onClick={() => downloadPNG(fileName)}
        className="btn btn-sm btn-outline "
      >
        Download PNG
      </button>

      <button
        onClick={() => downloadSVG(fileName)}
        className="btn btn-sm btn-outline "
      >
        Download SVG
      </button>
      <p className="">Current Zoom Level: {zoomLevel.toFixed(2)}</p>
      <p className="">
        [alt] + scroll 로 zoom 레벨 조정, 드래그로 panning 조정
      </p>
      <div className="relative z-50 flex flex-col justify-between">
        <aside className="top-0 absolute right-5 z-50 flex justify-end gap-x-1">
          <button onClick={() => setOpen()} className="btn btn-sm">
            {open ? "hide" : "Show"} raw code
          </button>
          <button onClick={setModalOpen} className="btn btn-sm">
            {modalOpen ? "hide" : "Show"} Modal
          </button>

          {modalOpen && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-60 z-40"
                onClick={setModalOpen}
              ></div>
              <div className="modal-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-50 scrollbar-hide overflow-scroll bg-zinc-600 flex  justify-center items-center">
                <div
                  onClick={setModalOpen}
                  className="absolute top-5 right-5 btn btn-sm"
                >
                  close
                </div>
              </div>
            </>
          )}
        </aside>

        <div className="absolute top-1/2 left-5 z-50"></div>
        <p className="z-50 text-white fixed bottom-0 right-0"></p>
        <div
          className="h-[41vh] overflow-scroll w-full bg-white "
          ref={containerRef}
        ></div>

        <div className="w-full ">
          <div className="relative mb-2 bg-slate-500 pl-[1.93rem] overflow-x-scroll scrollbar-hide">
            {tabsList.map((tab, index) => (
              <button
                key={index}
                onClick={() => switchTab(index)}
                className={`px-3 py-1 rounded-tr-xl rounded-tl-xl ${
                  currentTab === index
                    ? "bg-gray-700 text-white"
                    : "bg-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="h-[calc(50vh-40px)] overflow-scroll" ref={editorsRef}>
            {/* 에디터 영역 */}
          </div>
        </div>

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
