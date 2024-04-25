import { Category } from "@/types/posts/posts";

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
 * 아이콘은 유효한 이미지 URL을 제공해야 합니다. (SVG 또는 PNG)
 *   icon: "/path/to/icon.svg", // 또는 "/path/to/icon.png"
 * }
 *
 */

const CATEGORIES: Category = {
  all: {
    categoryName: "all",
    title: "전체",
    description: "모든 카테고리에 대한 정보를 담은 카테고리",
    icon: `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/icons/all.svg`,
  },
  shopping: {
    categoryName: "shopping",
    title: "쇼핑",
    description: "쇼핑 관련한 정보를 담은 카테고리",
    icon: `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/icons/star.svg`,
  },

  blog: {
    categoryName: "blog",
    title: "블로그",
    description: "블로그 관련한 정보를 담은 카테고리",
    icon: `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/icons/blog.svg`,
  },

  accounts: {
    categoryName: "accounts",
    title: "계정",
    description: "계정 관련한 정보를 담은 카테고리",
    icon: `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/icons/people.png`,
  },

  logos: {
    categoryName: "logos",
    title: "로고",
    description: "로고 관련한 정보를 담은 카테고리",
    icon: "",
  },
};

const CATEGORIES_ARRAY = Object.entries(CATEGORIES).map(([key, value]) => ({
  key,
  ...value,
}));

export { CATEGORIES, CATEGORIES_ARRAY };
export type CategoryKey = keyof typeof CATEGORIES;
