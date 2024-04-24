// app/posts/page.tsx
import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import { getPosts } from "@/lib/getPosts";
import { Suspense } from "react";

export default async function PostListPage() {
  const posts = await getPosts();

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <article className="max-w-none px-10 pt-10">
          <h1 className="">게시물 목록</h1>
          <PostList posts={posts} />
        </article>
      </Suspense>
    </Layout>
  );
}
