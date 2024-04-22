// app/posts/page.tsx
import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import getPostList from "./postList.server";

export default async function PostListPage() {
  const posts = await getPostList();

  return (
    <Layout>
      <article className="prose lg:prose-xl max-w-none  px-10 pt-10">
        <h1 className="">게시물 목록</h1>
        {/* 컴포넌트 내부에서 직접 데이터를 전달 */}
        <PostList posts={posts} />
      </article>
    </Layout>
  );
}
