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
  title: string;
  date: string;
  category: CategoryKey;
  modelCount: number;
  tags?: string[] | [];
  contributor: Contributor;
  published?: boolean;
}

export type { CategoryKey, Contributor, FrontmatterData };
