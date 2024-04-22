// Header.tsx
import { NAVBAR_ITEMS, NAVBAR_TITLE } from "@/constants/navigation";
import { IsOpen } from "@/types/ui/toggle";
import { useState } from "react";
import tw, { styled } from "twin.macro";

const Navbar = styled.div`
  ${tw`navbar bg-base-100`}
`;
const NavbarSection = styled.div`
  ${tw`navbar-start`}
`;
const DropdownButton = styled.div`
  ${tw`btn btn-ghost btn-circle`}
`;
const SvgIcon = styled.svg`
  ${tw`h-5 w-5`}
`;
const Menu = styled.ul<IsOpen>(({ isopen }) => [
  tw`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52`,
  isopen ? tw`block` : tw`hidden`,
]);
const MenuItem = styled.li``;
const Input = styled.input`
  ${tw`input input-bordered hidden xl:block`}
`;

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Navbar>
      <NavbarSection>
        <div className="dropdown" onClick={toggleDropdown}>
          <DropdownButton tabIndex={0} role="button">
            <SvgIcon
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </SvgIcon>
          </DropdownButton>
          <Menu isopen={dropdownOpen} tabIndex={0}>
            {NAVBAR_ITEMS.map((item, index) => (
              <MenuItem key={index}>
                <a>{item}</a>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </NavbarSection>
      <NavbarSection>
        <h1 className=" text-xl">{NAVBAR_TITLE}</h1>
      </NavbarSection>
      <NavbarSection tw="navbar-end">
        <label className="input input-bordered flex items-center gap-2">
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
        <button className="btn btn-ghost btn-circle"></button>
        {/* More buttons as needed */}
      </NavbarSection>
    </Navbar>
  );
}
