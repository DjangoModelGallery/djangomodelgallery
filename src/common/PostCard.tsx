import { Post } from "@/types/posts/posts";
import { parseDateString } from "@/utils/parseTime";

export default function PostCard(post: Post) {
  return (
    <li className="border rounded dark:border-white border-black border-spacing-4 dark:bg-gray-800 bg-gray-100 p-4 hover:bg-neutral-500 dark:hover:bg-neutral-600 transition duration-200 ease-in-out aspect-video">
      <div className="grid grid-cols-1 gap-2 h-full">
        <h2 className="font-bold text-xl mb-2 truncate">{post.title}</h2>
        <div className="grid grid-cols-2 gap-2">
          <p className="truncate">
            태그: {post.frontmatter.tags && post.frontmatter.tags}
          </p>
          <p className="truncate">
            기여자:
            {post.frontmatter.contributor.name}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <p className="text-graylv3 text-sm font-normal truncate">
            작성일: {parseDateString(post.frontmatter?.date)}
          </p>
        </div>
      </div>
    </li>
  );
}
