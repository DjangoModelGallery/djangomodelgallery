// app/posts/page.tsx
import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import { getPosts } from "@/lib/getPosts";
import { getTags } from "@/lib/getTags";
import { Suspense } from "react";

export default async function PostListPage() {
  const posts = await getPosts();
  const tags = await getTags();

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <article className="max-w-none px-10 pt-10">
          <h1 className="">게시물 목록</h1>
          <PostList posts={posts} postTags={tags} />
        </article>
      </Suspense>
    </Layout>
  );
}
