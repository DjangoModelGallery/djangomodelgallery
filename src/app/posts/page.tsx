// app/posts/page.tsx
import getPostList from "@/app/posts/postList.server";
import Layout from "@/components/Layout";
import PostList from "./postList.client";

export default async function PostListPage() {
  const posts = await getPostList();

  return (
    <Layout>
      <h1>게시물 목록</h1>
      <PostList posts={posts} />
    </Layout>
  );
}
