import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className=" bg-black h-full scrollbar-hide">
      <body className={`${inter.className} m-0 p-0 bg-black `}>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: "%s | DMG",
    default: "DMG | All Models can be founded here.",
  },
  description: "DMG, All Models can be founded here.",
  openGraph: {
    title: "DMG",
    description: "DMG, All Models can be founded here.",
    url: "",
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
