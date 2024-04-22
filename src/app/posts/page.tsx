import PostList from "@/app/posts/postList.server";
import { getPosts } from "@/lib/getPosts";

export default function BlogPage() {
  return (
    <div>
      <h1>블로그 포스트 목록</h1>
      <PostList />
    </div>
  );
}
export async function generateStaticParams() {
  const posts = await getPosts();

  console.log(posts);
  return posts.map((post) => (post ? { slug: post.slug } : null));
}
