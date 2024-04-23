// getPost.ts

import type { FrontmatterData } from "@/types/posts/frontmatters";
import { Post } from "@/types/posts/posts";
import { parseMarkdown } from "@/utils/parseMarkdown";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

export const getPost = cache(async (slug: string) => {
  const postsDirectory = path.resolve(process.cwd(), "./posts");
  const posts = await fs.readdir(postsDirectory);

  const post = await Promise.all(
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
        const postSlug = frontmatter.fileName.split("_")[0];

        if (postSlug === slug) {
          const parsedContent = parseMarkdown(content);

          return {
            frontmatter,
            body: (await parsedContent).html,
            title: frontmatter.title || "No Title",
            slug: postSlug,
            tableOfContents: (await parsedContent).tableOfContents,
            footnotes: (await parsedContent).footnotes,
            pythonCodeBlocks: (await parsedContent).pythonCodeBlocks,
            vizCodeBlocks: (await parsedContent).vizCodeBlocks,
            jsCodeBlocks: (await parsedContent).jsCodeBlocks,
            otherCodeBlocks: (await parsedContent).otherCodeBlocks,
          } as Post;
        }

        return null;
      })
  );

  return post.find((p) => p !== null) || null;
});
