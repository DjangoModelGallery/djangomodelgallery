// app/posts/PostList.client.tsx
"use client";
import { Post } from "@/types/posts/posts";
import { ErrorFallback } from "@/utils/errorFallback";
import { formatQuery } from "@/utils/formatQuery";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { CATEGORIES_ARRAY } from "../../constants/categories";
import SearchForm from "./SearchForm";

function PostList({
  posts,
  postTags,
  path = "posts",
}: {
  posts: (Post | null)[];
  postTags?: string[];
  path?: string;
}) {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const tagQuery = searchParams.get("tag");

  const categories = categoryQuery
    ? categoryQuery.split(",").map((c) => formatQuery(c.trim()))
    : [];

  const tags = tagQuery
    ? tagQuery.split(",").map((t) => formatQuery(t.trim()))
    : [];

  const filteredPosts =
    categories.length > 0 || tags.length > 0
      ? posts.filter(
          (post: Post | null) =>
            post &&
            (categories.length === 0 ||
              (post.frontmatter.category &&
                categories.includes(
                  formatQuery(post.frontmatter.category.toString())
                ))) &&
            (tags.length === 0 ||
              (post.frontmatter.tags &&
                post.frontmatter.tags.some((tag) =>
                  tags.includes(formatQuery(tag))
                )))
        )
      : posts;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SearchForm
        sortOptions={[
          { value: "desc", label: "오름차순" },
          { value: "asc", label: "내림차순" },
        ]}
        categoryOptions={
          CATEGORIES_ARRAY.map((category) => ({
            value: category.categoryName,
            label: category.title,
          })) ?? []
        }
        tagOptions={postTags?.map((tag) => ({ value: tag, label: tag })) ?? []}
      />
      <ul className="grid grid-cols-3 gap-4">
        {filteredPosts?.map(
          (post: Post | null) =>
            post && (
              <li key={post.slug}>
                <Link href={`/${path}/${post.slug}`}>{post.title}</Link>
              </li>
            )
        )}

        {filteredPosts.length === 0 && <li>게시물이 없습니다.</li>}
      </ul>
    </ErrorBoundary>
  );
}

export default PostList;
