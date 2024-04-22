import { getPost } from "@/lib/getPost";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const postDetail = await getPost(params.slug as string);
  return {
    title: postDetail?.title,
    description: `${postDetail?.frontmatter.category} | Django Model Gallery.`,
    openGraph: {
      title: postDetail?.title,
      description: `${postDetail?.frontmatter.category} | Django Model Gallery.`,
      type: "website",
    },
  };
}

export default function PostDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
