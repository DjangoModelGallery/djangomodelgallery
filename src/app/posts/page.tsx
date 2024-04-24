// app/posts/page.tsx
"use server";
import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import { Suspense } from "react";
import getPostList from "./postList.server";

export default async function PostListPage() {
  const posts = await getPostList();

  return (
    <Layout>
      <article className=" max-w-none  px-10 pt-10">
        <h1 className="">게시물 목록</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <PostList posts={posts} />
        </Suspense>
      </article>
    </Layout>
  );
}
