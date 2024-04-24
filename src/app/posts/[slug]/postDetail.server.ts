// posts/[slug]/postDetail.server.tsx
import { getPost } from "@/lib/getPost";
import { getPosts } from "@/lib/getPosts";
import { notFound } from "next/navigation";

export default async function postDetailServer(slug: string) {
  const post = await getPost(slug);

  if (!post) return notFound();

  return post;
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({ slug: post?.slug }));
}
