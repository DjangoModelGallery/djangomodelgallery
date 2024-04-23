"use client";
import Layout from "@/components/Layout";
import useCodeMirror from "@/hooks/useCodeMirror";
import Link from "next/link";

export default function Home() {
  const doc = `if True:
    print("let's go!")
else:
    print("finding a model.")
  `;

  const { editorRef, getContent } = useCodeMirror(doc, "python", () => {
    console.log("Command executed!");
  });

  return (
    <Layout>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center sm:p-6 md:p-12">
        <div ref={editorRef} className="w-full bg-gray-800 rounded-lg"></div>
        <article className="bg-gray-800 rounded-lg p-4">
          <h1 className="text-3xl font-bold">Hello, world!</h1>
          <p className="text-lg">Django Model Gallery</p>
        </article>
        <section className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-2xl font-bold pb-3">Explore</h2>
          <Link href={"/posts"} className="btn btn-outline btn-sm">
            모델 찾기
          </Link>
        </section>
      </main>
    </Layout>
  );
}
