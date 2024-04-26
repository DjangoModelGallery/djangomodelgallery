import { getPost } from "@/lib/getPost";
import { Metadata } from "next";
import { LOOT_CONTRIBUTE_DETAIL_METADATA } from "../../../../constants/SEO";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const postDetail = await getPost(params.slug as string, "contribute");
  return LOOT_CONTRIBUTE_DETAIL_METADATA(postDetail);
}

export default function PostDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
