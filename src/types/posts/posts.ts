import { CodeBlock } from "../code/markdown";
import { CategoryKey, FrontmatterData } from "./frontmatters";

interface Post {
  frontmatter: FrontmatterData;
  body: string;
  title: string;
  slug: string;
  tableOfContents: string;
  footnotes: string;
  pythonCodeBlocks: CodeBlock[] | [];
  vizCodeBlocks: CodeBlock[] | [];
  jsCodeBlocks: CodeBlock[] | [];
  otherCodeBlocks: CodeBlock[] | [];
}

interface CategoryItem {
  categoryName: string;
  title: string;
  description: string;
  icon: string;
}

interface Category {
  [key: string]: CategoryItem;
}

export type { Category, CategoryItem, CategoryKey, Post };
