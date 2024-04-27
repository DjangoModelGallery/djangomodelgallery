// getTags.ts

import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

export const getTags = cache(async (folderName: string = "posts") => {
  const postsDirectory = path.resolve(process.cwd(), folderName);
  const files = await fs.readdir(postsDirectory);
  const tags = new Set<string>();
  await Promise.all(
    files
      .filter((file) => path.extname(file) === ".md")
      .map(async (file) => {
        const filePath = path.resolve(postsDirectory, file);
        const content = await fs.readFile(filePath, "utf8");
        const { data } = matter(content);

        if (data.published !== false && data.tags) {
          data.tags.forEach((tag: string) => tags.add(tag));
        }
      })
  );

  return Array.from(tags);
});
