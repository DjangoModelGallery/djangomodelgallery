// app/posts/layout.tsx
import { Metadata } from "next";
import { LOOT_POSTS_METADATA } from "../../../constants/SEO";

export async function generateMetadata(): Promise<Metadata> {
  return LOOT_POSTS_METADATA;
}

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
