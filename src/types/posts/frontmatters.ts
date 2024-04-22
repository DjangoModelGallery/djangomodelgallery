import { CategoryKey } from "../../../constants/categories";

interface Contributor {
  name: string;
  social: {
    github: string;
    twitter?: string;
    insta?: string;
  };
}

interface FrontmatterData {
  id: string;
  title: string;
  date: string;
  category: CategoryKey;
  modelCount: number;
  tags: string[];
  fileName: string;
  contributor: Contributor;
}

export type { CategoryKey, Contributor, FrontmatterData };
