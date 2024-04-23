export default function TableOfContents({ toc }: { toc: string }) {
  return (
    <div className="toc dropdown dropdown-hover dropdown-top w-full h-full">
      <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
        목차보기
      </div>

      <div
        tabIndex={0}
        className="toc dropdown-content z-1 shadow bg-base-100 rounded-box"
        dangerouslySetInnerHTML={{ __html: toc }}
      />
    </div>
  );
}
