// PostList.server.tsx
"use server";
import { getPosts } from "@/lib/getPosts";

async function getPostList() {
  const posts = await getPosts();
  return posts;
}

export default getPostList;

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({ slug: post?.slug }));
}
