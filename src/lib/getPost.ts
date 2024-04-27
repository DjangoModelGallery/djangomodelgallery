// getPost.ts
import { FrontmatterData } from "@/types/posts/frontmatters";
import { Post } from "@/types/posts/posts";

import { parseMarkdown } from "@/utils/parseMarkdown";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

/**
 * 주어진 폴더 이름과 slug를 사용하여 Markdown 파일(post)을 불러오는 함수입니다.
 * 불러온 Markdown 파일을 파싱하여 Post 객체로 변환합니다.
 * slug는 파일 이름에서 확장자(.md)를 제외한 부분입니다.
 *
 * @param {string} slug - 불러올 post의 slug
 * @param {string} [folderName="posts"] - post가 위치한 폴더 이름
 * @returns {Promise<Post | null>} 파싱된 Post 객체 또는 에러 발생 시 null
 * @throws {Error} 파일 읽기 또는 파싱 중 에러 발생 시 에러를 throw합니다.
 */
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
