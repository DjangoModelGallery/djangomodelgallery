// app/about/page.tsx
import Layout from "@/components/Layout";
import PostBody from "@/components/PostBody";
import PostList from "@/components/PostList";
import { getPost } from "@/lib/getPost";
import { getPosts } from "@/lib/getPosts";
import { Suspense } from "react";

export default async function AboutPage() {
  const post = await getPost("index", "contribute");
  const posts = await getPosts("contribute");

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <article className="max-w-none px-10 pt-10">
          {posts && <PostList posts={posts} path="contribute" />}
        </article>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <article className="max-w-none px-10 pt-10">
          {post && <PostBody {...post} />}
        </article>
      </Suspense>
    </Layout>
  );
}
