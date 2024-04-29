/**
 * @fileoverview 이 파일은 PostBody 컴포넌트를 정의합니다. CodeBody와 합쳐서 갤러리 포스트를 만드는 컴포넌트입니다.
 * Contribute, About 등의 페이지는 이 PostBody만을 사용하여 렌더링합니다. 즉, 모든 Markdown 파일은 이 컴포넌트를 통해 렌더링됩니다.
 */
"use client";
import Tag from "@/common/Tag";
import TableOfContents from "@/components/TableOfContents";
import { Post } from "@/types/posts/posts";
import { format } from "date-fns";
import { usePathname } from "next/navigation";

/**
 * @description PostBody 컴포넌트입니다. CodeBody와 합쳐서 갤러리 포스트를 만드는 컴포넌트입니다.
 * Contribute, About 등의 페이지는 이 PostBody만을 사용하여 렌더링합니다. 모든 Markdown 파일은 이 컴포넌트를 통해 렌더링됩니다.
 * @param {Post} postContent - 포스트의 내용입니다. frontmatter에는 제목, 날짜, 카테고리, 태그 등이 포함되어 있습니다. 더 자세한 내용은, type이 정의된 types/posts/frontmatters.ts를 봐주세요.
 */
export default function PostBody(postContent: Post) {
  const { title, date, category, tags } = postContent.frontmatter;

  const pathname = usePathname();

  return (
    <article className="post overflow-x-scroll">
      <div className="fixed bottom-5 left-5">
        <TableOfContents toc={postContent.tableOfContents} />
      </div>

      <div className="post-meta">
        <time dateTime={new Date(date).toISOString()}>
          {format(new Date(date), "yyyy년 M월 d일")}
        </time>
        <span className="post-meta-separator">•</span>
        <span>{category}</span>
      </div>
      <div className="post-tags inline-flex gap-1 pb-8 flex-wrap">
        {tags && tags.length ? (
          tags.map((tag: string) => <Tag key={tag} tagName={tag} />)
        ) : (
          <p>태그가 없습니다.</p>
        )}
      </div>
      <div
        className="post-content prose"
        dangerouslySetInnerHTML={{ __html: postContent?.body }}
      />
    </article>
  );
}
