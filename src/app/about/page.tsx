// app/about/page.tsx
import Layout from "@/components/Layout";
import PostBody from "@/components/PostBody";
import { getPost } from "@/lib/getPost";
import { Suspense } from "react";

export default async function AboutPage() {
  const post = await getPost("about", "about");

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <article className="max-w-none px-10 pt-10">
          {post && <PostBody {...post} />}
        </article>
      </Suspense>
    </Layout>
  );
}
