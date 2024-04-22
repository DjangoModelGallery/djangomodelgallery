// PostList.server.tsx
"use server";
import { getPosts } from "@/lib/getPosts";

async function getPostList() {
  const posts = await getPosts();
  return posts;
}

export default getPostList;
