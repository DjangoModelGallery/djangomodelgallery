// app/posts/layout.tsx
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Posts",
    description: "DMG, All Models can be founded here.",
    openGraph: {
      title: "Posts",
      description: "DMG, All Models can be founded here.",
      url: "https://example.com/posts",
      siteName: "DMG",
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: "",
          width: 800,
          height: 600,
          alt: "DMG",
        },
      ],
    },
    icons: {
      shortcut: "",
    },
  };
}

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
