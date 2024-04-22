// posts/[slug]/page.tsx
import Layout from "@/components/Layout";
import { Post } from "@/components/Post";
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
        <h1>{post?.title}</h1>
        <Post frontmatter={post?.frontmatter}>{post?.body}</Post>
      </article>
    </Layout>
  );
}
