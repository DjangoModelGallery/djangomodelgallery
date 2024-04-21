// Link.tsx
import Link from "next/link";
import { ReactNode } from "react";
import tw, { styled } from "twin.macro";

interface LinkProps {
  href: string;
  children: ReactNode;
}

const StyledLink = styled.li`
  ${tw`no-underline text-white `}
`;

const CustomLink = ({ href, children }: LinkProps) => {
  return (
    <StyledLink>
      <Link href={href}>{children}</Link>
    </StyledLink>
  );
};

export default CustomLink;
