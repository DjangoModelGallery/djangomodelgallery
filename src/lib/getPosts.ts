import type { FrontmatterData } from "@/types/posts/frontmatters";
import { Post } from "@/types/posts/posts";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

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
