// notice/[id]/notice.server.tsx

import PostDetail from "./page";

export default async function NoticeDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <PostDetail params={{ slug }} />;
}
