// app/notice/layout.tsx
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Notice",
    description: "Safe Eye, Detect all threats.",
    openGraph: {
      title: "Notice",
      description: "Safe Eye, Detect all treats.",
      url: "https://example.com/notice",
      siteName: "Safe Eye",
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: "",
          width: 800,
          height: 600,
          alt: "Safe Eye",
        },
      ],
    },
    icons: {
      shortcut: "",
    },
  };
}

export default function NoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
