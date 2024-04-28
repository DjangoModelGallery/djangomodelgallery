import { Post } from "@/types/posts/posts";
import { parseDateString } from "@/utils/parseTime";

export default function PostCard(post: Post) {
  return (
    <>
      <h2 className="font-bold text-2xl mb-3">{post.title}</h2>
      <p>태그: {post.frontmatter.tags && post.frontmatter.tags}</p>
      <p className="inline-block">
        기여자:
        {post.frontmatter.contributor.name}
      </p>
      <p>{post.frontmatter.contributor.social.github}</p>
      <p className="text-graylv3 text-sm inline-block font-normal">
        작성일: {parseDateString(post.frontmatter?.date)}
      </p>
      <p className="inline-block bg-activation text-primary md:text-sm font-medium mb-3 px-3 py-1.5 rounded-lg transition duration-200 ease-in-out hover:bg-blue-400 hover:text-white">
        {post.frontmatter.category}
      </p>
    </>
  );
}
