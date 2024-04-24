// posts/[slug]/postDetail.server.tsx
import { getPost } from "@/lib/getPost";
import { notFound } from "next/navigation";

export default async function postDetailServer(slug: string) {
  const post = await getPost(slug);

  if (!post) return notFound();

  return post;
}
