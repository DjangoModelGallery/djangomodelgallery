// posts/[slug]/page.tsx
import Layout from "@/components/Layout";
import PostBody from "@/components/PostBody";
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
      <article className="prose">
        <PostBody {...post} />
      </article>
    </Layout>
  );
}
