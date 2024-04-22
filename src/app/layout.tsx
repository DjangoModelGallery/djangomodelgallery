import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LOOT_LAYOUT_METADATA } from "../../constants/SEO";
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

export const metadata: Metadata = LOOT_LAYOUT_METADATA;
