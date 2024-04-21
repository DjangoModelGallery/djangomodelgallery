import Link from "@/common/Link";
import LinkButton from "@/common/LinkButton";
import { useToggle } from "@/hooks/useToggle";
import tw from "twin.macro";

const FooterSection = tw.footer`drawer fixed bottom-0 left-0 footer items-center p-1.5 w-full bg-lime-600 text-white`;
const FooterAside = tw.aside`items-center grid-flow-col`;

const MenuIcon = tw.svg`inline-block w-6 h-6 stroke-current text-lime-200`;
const MenuButton = tw.label`cursor-pointer`;
const FooterText = tw.p``;
const FooterNav = tw.nav`grid-flow-col gap-4 list-none md:place-self-center md:justify-self-end pr-6`;
const FooterLink = tw.a``;
const FooterIcon = tw.svg`fill-current w-6 h-6`;

export default function Footer() {
  const [isOpen, setIsOpen] = useToggle(false);

  return (
    <FooterSection>
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <FooterAside>
        <FooterText>
          Copyright © 2024 - Django Model Gallery, All right reserved.......
        </FooterText>
      </FooterAside>
      <FooterNav>
        <Link href="/">home </Link>
        <Link href="/login">Login</Link>

        <LinkButton callback={() => setIsOpen()}>Logout</LinkButton>
        <FooterLink>
          <FooterIcon
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </FooterIcon>
        </FooterLink>
        <FooterLink>
          <FooterIcon
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </FooterIcon>
        </FooterLink>

        <MenuButton htmlFor="my-drawer-3" aria-label="open sidebar">
          <MenuIcon>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </MenuIcon>
        </MenuButton>
        <FooterLink>
          <FooterIcon
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </FooterIcon>
        </FooterLink>
      </FooterNav>
    </FooterSection>
  );
}
