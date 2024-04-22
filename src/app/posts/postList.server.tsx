// PostList.server.tsx
import { getPosts } from "@/lib/getPosts";
import { Post } from "@/types/posts/posts";
import Link from "next/link";

async function PostList() {
  const posts = await getPosts();
  console.log(posts);
  return (
    <ul>
      {posts?.map(
        (post: Post | null) =>
          post && (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              {post.title}
            </Link>
          )
      )}
    </ul>
  );
}

export default PostList;
