// page.tsx
"use client";
import Layout from "@/components/Layout";
import styled from "styled-components";
import tw from "twin.macro";

const Main = styled.main`
  ${tw`grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center p-12 `}
`;

export default function Home() {
  return (
    <Layout>
      <Main></Main>
    </Layout>
  );
}
