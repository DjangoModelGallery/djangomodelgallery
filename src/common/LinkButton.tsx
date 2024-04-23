// Link.tsx
import Link from "next/link";
import { ReactNode } from "react";

interface LinkProps {
  callback: () => void;
  children: ReactNode;
}

const LinkButton = ({ callback, children }: LinkProps) => {
  return (
    <Link
      href={""}
      className="no-underline text-left text-black dark:text-white px-4 py-2"
      onClick={callback}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
