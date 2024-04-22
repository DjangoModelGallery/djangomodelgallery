import { FrontmatterData } from "./frontmatters";

interface Post {
  frontmatter: FrontmatterData;
  body: string;
  title: string;
  slug: string;
}

export type { Post };
