import { CategoryKey, FrontmatterData } from "./frontmatters";

interface Post {
  frontmatter: FrontmatterData;
  body: string;
  title: string;
  slug: string;
}

interface CategoryItem {
  title: string;
  description: string;
  icon: string;
  key: string;
}

interface Category {
  [key: string]: CategoryItem;
}

export type { Category, CategoryItem, CategoryKey, Post };
