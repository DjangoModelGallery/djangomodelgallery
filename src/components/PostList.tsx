// app/posts/PostList.client.tsx
"use client";
import { Post } from "@/types/posts/posts";
import { ErrorFallback } from "@/utils/errorFallback";
import { formatQuery } from "@/utils/formatQuery";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { CATEGORIES_ARRAY } from "../../constants/categories";

import FakeCard from "@/common/FakeCard";
import dynamic from "next/dynamic";
import SearchForm from "./SearchForm";

const PostCard = dynamic(() => import("@/common/PostCard"), {
  ssr: false,
  loading: () => <FakeCard />,
});

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
      <ul className="grid grid-cols-3 gap-4 pt-3">
        {filteredPosts?.map(
          (post: Post | null) =>
            post && (
              <li
                key={post.slug}
                className="border rounded dark:border-white border-black border-spacing-4 dark:bg-gray-800 bg-gray-100 p-4 hover:bg-neutral-500 dark:hover:bg-neutral-600 transition duration-200 ease-in-out"
              >
                <Link href={`/${path}/${post.slug}`}>
                  <PostCard {...post} />
                </Link>
              </li>
            )
        )}

        {filteredPosts.length === 0 && <li>게시물이 없습니다.</li>}
      </ul>
    </ErrorBoundary>
  );
}

export default PostList;
