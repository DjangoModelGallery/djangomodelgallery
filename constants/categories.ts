import BlogIcon from "../assets/icons/blog.svg";

/**
 * CATEGORIES는 다양한 카테고리에 대한 정보를 담고 있는 상수 객체입니다.
 * 각 카테고리는 설명과 아이콘을 가지고 있습니다.
 *
 * @example
 *
 * 새로운 카테고리를 추가하려면 다음과 같이 할 수 있습니다:
 * education: {
 *   description: "교육 관련한 정보를 담은 카테고리",
 *
 * 아이콘은 유효한 SVG를 제공해야 합니다.
 *   icon: `...`, // SVG icon을 import하거나 code를 여기에 넣으세요.
 * }
 *
 */

interface Category {
  [key: string]: {
    title: string;
    description: string;
    icon: string;
  };
}

const CATEGORIES: Category = {
  shopping: {
    title: "쇼핑",
    description: "쇼핑 관련한 정보를 담은 카테고리",
    icon: BlogIcon,
  },

  blog: {
    title: "블로그",
    description: "블로그 관련한 정보를 담은 카테고리",
    icon: BlogIcon,
  },

  accounts: {
    title: "계정",
    description: "계정 관련한 정보를 담은 카테고리",
    icon: BlogIcon,
  },

  logos: {
    title: "로고",
    description: "로고 관련한 정보를 담은 카테고리",
    icon: BlogIcon,
  },
};

const CATEGORIES_ARRAY = Object.entries(CATEGORIES).map(([key, value]) => ({
  key,
  ...value,
}));

export { CATEGORIES, CATEGORIES_ARRAY };
export type CategoryKey = keyof typeof CATEGORIES;
