// posts/[slug]/page.tsx
import CodeBody from "@/components/CodeBody";
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
      <section className="w-full flex flex-col md:flex-row">
        <article className="prose w-full ">
          <PostBody {...post} />
        </article>
        <article className="w-full ">
          <CodeBody {...post} />
        </article>
      </section>
    </Layout>
  );
}
