// app/posts/page.tsx
import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import getPostList from "./postList.server";

export default async function PostListPage() {
  const posts = await getPostList();

  return (
    <Layout>
      <article className=" max-w-none  px-10 pt-10">
        <h1 className="">게시물 목록</h1>
        <PostList posts={posts} />
      </article>
    </Layout>
  );
}
