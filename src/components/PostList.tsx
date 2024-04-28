// app/posts/PostList.tsx
"use client";
import { Post } from "@/types/posts/posts";
import { ErrorFallback } from "@/utils/errorFallback";
import { formatQuery } from "@/utils/formatQuery";
import { compareDesc } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import FakeCard from "@/common/FakeCard";
import SNSLink from "@/common/SNSLink";
import dynamic from "next/dynamic";
import { useMemo } from "react";
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

  const tagQuery = searchParams.get("tag");
  const wordQuery = searchParams.get("query");

  const tags = tagQuery
    ? tagQuery.split(",").map((t) => formatQuery(t.trim()))
    : [];

  const query = wordQuery ? wordQuery : "";

  const filteredPosts =
    tags.length > 0 || query
      ? posts.filter(
          (post: Post | null) =>
            post &&
            (tags.length === 0 ||
              (post.frontmatter.tags &&
                post.frontmatter.tags.some((tag) =>
                  tags.includes(formatQuery(tag))
                ))) &&
            (!query ||
              (/[a-zA-Z]/.test(post.frontmatter.title)
                ? post.frontmatter.title.toLowerCase().replace(/\s/g, "")
                : post.frontmatter.title.replace(/\s/g, "")
              ).includes(query))
        )
      : posts;

  const sortedPosts = useMemo(() => {
    return filteredPosts.sort((a, b) => {
      if (!a || !b) return 0;
      return compareDesc(
        new Date(a.frontmatter.date),
        new Date(b.frontmatter.date)
      );
    });
  }, [filteredPosts]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SearchForm
        tagOptions={postTags?.map((tag) => ({ value: tag, label: tag })) ?? []}
      />
      <ul className="grid grid-cols-3 gap-4 pt-3">
        {sortedPosts?.map(
          (post: Post | null) =>
            post && (
              <div className="relative" key={post.slug}>
                <Link href={`/${path}/${post.slug}`}>
                  <PostCard {...post} />
                </Link>
                <aside className="absolute top-2 right-2">
                  {post.frontmatter.contributor.social.twitter && (
                    <SNSLink
                      link={post.frontmatter.contributor.social.twitter}
                      iconType={"Twitter"}
                    />
                  )}
                  {post.frontmatter.contributor.social.github && (
                    <SNSLink
                      link={post.frontmatter.contributor.social.github}
                      iconType={"Github"}
                    />
                  )}
                  {post.frontmatter.contributor.social.linkedin && (
                    <SNSLink
                      link={post.frontmatter.contributor.social.linkedin}
                      iconType={"Linkedin"}
                    />
                  )}
                </aside>
              </div>
            )
        )}

        {filteredPosts.length === 0 && <li>게시물이 없습니다.</li>}
      </ul>
    </ErrorBoundary>
  );
}

export default PostList;
