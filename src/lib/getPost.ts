// getPost.ts
import { FrontmatterData } from "@/types/posts/frontmatters";
import { Post } from "@/types/posts/posts";

import { parseMarkdown } from "@/utils/parseMarkdown";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

export const getPost = cache(
  async (slug: string, folderName: string = "posts") => {
    const filePath = path.resolve(process.cwd(), `${folderName}/${slug}.md`);
    try {
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(fileContents);

      if (data.published === false) {
        return null;
      }

      const frontmatter = data as FrontmatterData;
      const parsedContent = await parseMarkdown(content);

      return {
        frontmatter,
        body: parsedContent.html,
        title: frontmatter.title || "No Title",
        slug,
        tableOfContents: parsedContent.tableOfContents,
        footnotes: parsedContent.footnotes,
        pythonCodeBlocks: parsedContent.pythonCodeBlocks,
        vizCodeBlocks: parsedContent.vizCodeBlocks,
        jsCodeBlocks: parsedContent.jsCodeBlocks,
        otherCodeBlocks: parsedContent.otherCodeBlocks,
      } as Post;
    } catch (error) {
      console.error(`postName: ${slug} \n에서 파싱에 실패했습니다.`, error);
      return null;
    }
  }
);
