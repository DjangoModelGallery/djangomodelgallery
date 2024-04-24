// posts/[slug]/page.tsx

import Layout from "@/components/Layout";
import PostDetail from "@/components/PostDetail";
import { getPosts } from "@/lib/getPosts";
import { Suspense } from "react";
import postDetailServer from "./postDetail.server";

export default async function DetailPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = await postDetailServer(params.slug);

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <PostDetail post={post} />
      </Suspense>
    </Layout>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({ slug: post?.slug }));
}
