import type { FrontmatterData } from "@/types/posts/frontmatters";
import { Post } from "@/types/posts/posts";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

/**
 * 주어진 폴더 이름을 사용하여 Markdown 파일(post)들을 불러오는 라이브러리입니다.
 *
 * @param {string} [folderName="posts"] - post가 위치한 폴더 이름, 기본 값은 posts입니다.
 * @returns {Promise<Post[]>} 파싱된 Post 객체들의 배열을 반환합니다. 만약 published가 false인 post는 제외됩니다.
 * @throws {Error} 파일 읽기 또는 파싱 중 에러 발생 시 파일 slug와 함께 에러를 반환합니다. 여기서 slug는 파일 이름에서 확장자(.md)를 제외한 부분입니다.
 */
export const getPosts = cache(async (folderName: string = "posts") => {
  const postsDirectory = path.resolve(process.cwd(), folderName);
  const files = await fs.readdir(postsDirectory);
  const posts = await Promise.all(
    files
      .filter((file) => path.extname(file) === ".md")
      .map(async (file) => {
        const filePath = path.resolve(postsDirectory, file);
        const content = await fs.readFile(filePath, "utf8");
        const { data, content: body } = matter(content);

        if (data.published === false) {
          return null;
        }

        const slug = file.replace(/\.md$/, "");
        return {
          frontmatter: data as FrontmatterData,
          body,
          slug,
          title: data.title,
        } as Post;
      })
  );

  return posts.filter((post) => post !== null);
});
