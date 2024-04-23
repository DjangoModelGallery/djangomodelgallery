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
      <section className="w-full">
        <article className="prose w-full md:w-1/2 ">
          <PostBody {...post} />
        </article>
        <article className="w-full md:w-1/2">코드블록</article>
      </section>
    </Layout>
  );
}
