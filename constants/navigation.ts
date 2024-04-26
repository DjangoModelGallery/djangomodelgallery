import { CATEGORIES } from "./categories";

const categoryTitles = Object.keys(CATEGORIES);

// 제목을 NAVBAR_ITEMS 배열에 추가
const NAVBAR_ITEMS = [
  {
    name: "Home",
    title: "홈",
    description: "홈페이지로 이동하는 링크",
    icon: `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/icons/home.svg`,
  },
  {
    name: "About",
    title: "소개",
    description: "프로젝트에 대한 정보를 담은 페이지로 이동하는 링크",
    icon: `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/icons/about.svg`,
  },
  {
    name: "Contribute",
    title: "기여",
    description: "프로젝트에 대한 기여 가이드를 담은 페이지로 이동하는 링크",
    icon: `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/icons/about.svg`,
  },
  //   {
  //     name: "Contact",
  //     title: "연락처",
  //     description: "연락처 정보를 담은 페이지로 이동하는 링크",
  //     icon: `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/icons/contact.svg",
  //   },
];
const NAVBAR_TITLE = "Django Model Gallery";
const NAVBAR_TITLE_SHORT = "DMG";

const FOOTER_TITLE =
  "Copyright © 2024\nAll right reserved by Django Model Gallery";

export { FOOTER_TITLE, NAVBAR_ITEMS, NAVBAR_TITLE, NAVBAR_TITLE_SHORT };
