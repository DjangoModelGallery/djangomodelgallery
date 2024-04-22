import { Post } from "@/components/Post";
import { getPost } from "@/lib/getPost";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const post = await getPost(params.slug);

//   if (!post) {
//     return {};
//   }

//   // 메타데이터 설정
//   return {
//     title: post.title,
//     description: post.title,
//     openGraph: {
//       images: [
//         {
//           url: post.title ?? "",
//           width: 800,
//           height: 600,
//           alt: post.title,
//         },
//       ],
//     },
//   };
// }

export default async function DetailPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return (
    <article className="prose">
      <h1>{post?.title}</h1>
      <Post frontmatter={post?.frontmatter}>{post?.body}</Post>
    </article>
  );
}
