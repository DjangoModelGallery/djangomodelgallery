// Header.tsx
"use client";
import useTailwindBreakpoint from "@/hooks/useTailwindBreakpoint";
import { useToggle } from "@/hooks/useToggle";
import { formatQuery } from "@/utils/formatQuery";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES_ARRAY } from "../../constants/categories";
import { NAVBAR_TITLE, NAVBAR_TITLE_SHORT } from "../../constants/navigation";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const [isopen, toggle] = useToggle(false);
  const { width, breakpoints } = useTailwindBreakpoint();
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
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {CATEGORIES_ARRAY.map((category) => (
              <li key={category.categoryName}>
                <Link
                  href={
                    category.categoryName !== "all"
                      ? `/posts/?category=${formatQuery(category.categoryName)}`
                      : "/posts"
                  }
                >
                  <Image
                    src={category?.icon || "/assets/icons/blog.svg"}
                    alt={category.title}
                    width={22}
                    height={22}
                  />
                  {category.title}
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
      <div className="navbar-end">
        <label
          className={`input input-bordered flex items-center gap-2 transition-all duration-500 ease-in-out ${
            isopen && width > breakpoints.xs
              ? "transform translate-x-0"
              : "transform translate-x-full transition-opacity opacity-0 -z-10"
          }`}
        >
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button className="btn btn-ghost btn-circle" onClick={() => toggle()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
