import { NAV_ITEMS } from "../constants/navItems.js";
import { throttle } from "../util/throttle.js";

export function getHeader(navItems) {
  const navItemsHtml = navItems
    .map(
      ({ title, link }) =>
        `<li><a href="${link}" class="text-white hover:text-gray-200">${title}</a></li>`,
    )
    .join("");

  return `
    <nav class="max-w-4xl mx-auto px-4">
      <ul class="flex flex-wrap justify-center sm:justify-end space-x-4">
        <li><a href="/" class="text-white hover:text-gray-200 basis-6/12">Home</a></li>
        <button class="theme-toggle-button">다크모드</button>
        ${navItemsHtml}
      </ul>
    </nav>
  `;
}

const headerElement = document.createElement("header");
headerElement.classList.add(
  "custom-header",
  "bg-emerald-500",
  "dark:bg-emerald-800",
  "py-4",
  "sticky",
  "top-0",
  "left-0",
  "right-0",
  "transition-transform",
  "duration-300",
  "ease-in-out",
  "transform",
  "z-50",
);
headerElement.innerHTML = getHeader(NAV_ITEMS);
document.body.insertBefore(headerElement, document.body.firstElementChild);

let lastScrollTop = 0;
let isHeaderVisible = true;

window.addEventListener(
  "scroll",
  throttle(function () {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop && isHeaderVisible) {
      // 스크롤을 아래로 내릴 때
      headerElement.classList.add("-translate-y-full");
      isHeaderVisible = false;
    } else if (currentScrollTop < lastScrollTop && !isHeaderVisible) {
      // 스크롤을 위로 올릴 때
      headerElement.classList.remove("-translate-y-full");
      isHeaderVisible = true;
    }
    lastScrollTop = currentScrollTop;
  }, 200),
);
