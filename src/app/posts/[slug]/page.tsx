import Layout from "@/components/Layout";
import { Post } from "@/components/Post";
import { getPost } from "@/lib/getPost";
import { notFound } from "next/navigation";

export default async function DetailPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return (
    <Layout>
      <article className="prose">
        <h1>{post?.title}</h1>
        <Post frontmatter={post?.frontmatter}>{post?.body}</Post>
      </article>
    </Layout>
  );
}
