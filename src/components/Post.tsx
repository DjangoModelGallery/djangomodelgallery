import { format } from "date-fns";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export function Post({
  frontmatter,
  children,
}: {
  frontmatter: any;
  children: string;
}) {
  const { title, date, category, tags } = frontmatter;

  const htmlContent = md.render(children);

  return (
    <article className="post">
      <h1 className="post-title">{title}</h1>
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
        className="post-content prose prose-lg"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
