// Link.tsx
import { ReactNode } from "react";
import tw, { styled } from "twin.macro";

interface LinkProps {
  callback: () => void;
  children: ReactNode;
}

const StyledButton = styled.button`
  ${tw`no-underline text-left text-black dark:text-white px-4 py-2`}
`;

const Link = ({ callback, children }: LinkProps) => {
  return <StyledButton onClick={callback}>{children}</StyledButton>;
};

export default Link;
