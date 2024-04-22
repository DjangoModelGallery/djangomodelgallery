import { CATEGORIES } from "./categories";

const categoryTitles = Object.keys(CATEGORIES);

// 제목을 NAVBAR_ITEMS 배열에 추가
const NAVBAR_ITEMS = ["Home", "About", "Contact", ...categoryTitles];

const NAVBAR_TITLE = "Django Model Gallery";
const NAVBAR_TITLE_SHORT = "DMG";

export { NAVBAR_ITEMS, NAVBAR_TITLE, NAVBAR_TITLE_SHORT };
