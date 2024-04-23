// app/posts/PostList.client.tsx
"use client";
import { Post } from "@/types/posts/posts";
import { ErrorFallback } from "@/utils/errorFallback";
import { formatQuery } from "@/utils/formatQuery";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

function PostList({ posts }: { posts: (Post | null)[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const filteredPosts = category
    ? posts.filter(
        (post: Post | null) =>
          post &&
          post.frontmatter.category &&
          formatQuery(post.frontmatter.category.toString()) === category
      )
    : posts;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ul className="grid grid-cols-3 gap-4">
        {filteredPosts?.map(
          (post: Post | null) =>
            post && (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </li>
            )
        )}

        {filteredPosts.length === 0 && <li>게시물이 없습니다.</li>}
      </ul>
    </ErrorBoundary>
  );
}

export default PostList;
