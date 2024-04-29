// Header.tsx
"use client";
import HistoryStack from "@/common/HistoryStack";
import useTailwindBreakpoint from "@/hooks/useTailwindBreakpoint";
import { useToggle } from "@/hooks/useToggle";
import { useHistoryStore } from "@/store/useHistoryStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NAVBAR_ITEMS,
  NAVBAR_TITLE,
  NAVBAR_TITLE_SHORT,
} from "../../constants/navigation";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const [isopen, toggle] = useToggle(false);
  const { width, breakpoints } = useTailwindBreakpoint();
  const { history } = useHistoryStore();

  const pathname = usePathname();

  let lastVisitedModel = history[history.length - 1];
  if (lastVisitedModel === pathname) {
    lastVisitedModel = history[history.length - 2];
  }
  return (
    <header className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <summary
            tabIndex={0}
            role="button"
            className="p-1 list-none hover:bg-base-300 rounded-md"
          >
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </summary>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow  dark:bg-base-100 rounded-box w-52 bg-neutral-200 text-neutral-600 dark:text-neutral-100"
          >
            {NAVBAR_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  href={
                    item.name.toLowerCase().replace(/ /g, "-") !== "home"
                      ? `/${item.name.toLowerCase().replace(/ /g, "-")}`
                      : "/"
                  }
                >
                  <Image
                    src={
                      item?.icon ||
                      `${process.env.NEXT_PUBLIC_ASSET_BASE_PATH}/assets/icons/blog.svg`
                    }
                    alt={item.name}
                    width={22}
                    height={22}
                  />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <DarkModeToggle />
        <Link href={"/"} className="btn btn-ghost text-xl">
          {width > breakpoints.md ? NAVBAR_TITLE : NAVBAR_TITLE_SHORT}
        </Link>
      </div>
      <div className="navbar-end"></div>

      {history.length > 0 && lastVisitedModel && (
        <div className="fixed bottom-5 right-0 rounded-l-xl bg-slate-600 flex flex-col hover:bg-lime-400 text-white hover:text-neutral-800 cursor-pointer">
          <p className="self-start text-[0.5rem] pl-4 pt-0.5">
            마지막으로 본 모델:
          </p>
          <HistoryStack pathName={lastVisitedModel} />
        </div>
      )}
    </header>
  );
}
