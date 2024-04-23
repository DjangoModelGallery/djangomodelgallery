import TableOfContents from "@/components/TableOfContents";
import { Post } from "@/types/posts/posts";
import { format } from "date-fns";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export default function PostBody(postContent: Post) {
  const { title, date, category, tags } = postContent.frontmatter;

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
      <div className="post-tags">
        {tags.map((tag: string) => (
          <span key={tag} className="post-tag">
            #{tag}
          </span>
        ))}
      </div>
      <div
        className="post-content prose"
        dangerouslySetInnerHTML={{ __html: postContent?.body }}
      />
    </article>
  );
}
