// PostList.server.tsx
import { getPosts } from "@/lib/getPosts";
import { Post } from "@/types/posts/posts";
import Link from "next/link";

async function PostList() {
  const posts = await getPosts();

  return (
    <ul className="grid grid-cols-3 gap-4">
      {posts?.map(
        (post: Post | null) =>
          post && (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          )
      )}
    </ul>
  );
}

export default PostList;
