// app/about/layout.tsx
import { Metadata } from "next";
import { LOOT_ABOUT_METADATA } from "../../../constants/SEO";

export async function generateMetadata(): Promise<Metadata> {
  return LOOT_ABOUT_METADATA;
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
