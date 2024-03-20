import { fetchPosts } from "./fetchPost.js";

export async function fetchPostDetail(fileName) {
  const response = await fetch(
    `${window.location.origin}/src/posts/${fileName}`
  );
  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패했습니다.");
  }
  const markdownContent = await response.text();

  const posts = await fetchPosts();
  const postDetail = posts.filter((post) => post.fileName === fileName);

  return { markdownContent, postDetail: postDetail[0] };
}
