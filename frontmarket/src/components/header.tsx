"use client";

import { styled } from "styled-components";
import { Saira_Stencil_One } from "next/font/google";
import { PrimaryInputWSearchIcon } from "./primary-input";
import { CartControl } from "./cart-control";
import { useFilter } from "@/hooks/useFilter";
import Link from "next/link";

const sairaStencil = Saira_Stencil_One({
  weight: ["400"],
  subsets: ["latin"],
});

interface HeaderProps {}

const TagHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  @media (min-width: ${(props) => props.theme.dsk}) {
    padding: 20px 160px;
  }
`;

const Logo = styled.a`
  color: var(--logo-color);
  font-weight: 400;
  font-size: 24px;
  line-height: 150%;
  text-decoration: none;
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.tabletBreakpoint}) {
    font-size: 24px;
  }

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    font-size: 40px;
  }
`;

export function Header(props: HeaderProps) {
  const { setSearch, search } = useFilter();
  return (
    <TagHeader>
      <Logo className={sairaStencil.className} href="/">
        FrontMarket
      </Logo>

      <div>
        <PrimaryInputWSearchIcon
          value={search}
          handleChange={setSearch}
          placeholder="Looking for something specific?"
        />
        <CartControl />
      </div>
    </TagHeader>
  );
}
