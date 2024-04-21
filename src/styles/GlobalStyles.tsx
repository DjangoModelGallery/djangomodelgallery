// src/styles/GlobalStyles.tsx
"use client";
import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as BaseStyles, theme } from "twin.macro";

const CustomStyles = createGlobalStyle({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
