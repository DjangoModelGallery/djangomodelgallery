// posts/[slug]/page.tsx

import Layout from "@/components/Layout";
import PostDetail from "@/components/PostDetail";
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
