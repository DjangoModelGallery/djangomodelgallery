import type { FrontmatterData } from "@/types/posts/frontmatters";
import { Post } from "@/types/posts/posts";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

export const getPosts = cache(async () => {
  const postsDirectory = path.resolve(process.cwd(), "./posts");
  const posts = await fs.readdir(postsDirectory);

  return Promise.all(
    posts
      .filter((file) => path.extname(file) === ".md")
      .map(async (file) => {
        const filePath = path.resolve(postsDirectory, file);
        const postContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(postContent);

        if (data.published === false) {
          return null;
        }

        const frontmatter = data as FrontmatterData;

        // slug 생성
        const slug = frontmatter.fileName.split("_")[0];

        return {
          frontmatter,
          body: content,
          slug,
          title: frontmatter.title,
        } as Post;
      })
  );
});
