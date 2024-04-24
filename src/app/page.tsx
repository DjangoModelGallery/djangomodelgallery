"use client";
import Layout from "@/components/Layout";
import useCodeMirror from "@/hooks/useCodeMirror";
import Link from "next/link";
import { useState } from "react";
import { InitialDoc } from "../../constants/graph";

export default function Home() {
  const [data, setData] = useState<string>(InitialDoc);

  const { editorRef, getContent } = useCodeMirror(
    data,
    "python",
    () => {
      console.log("Command executed!");
    },
    (value: string) => {
      setData(value);
    },
    true
  );

  return (
    <Layout>
      <main className="w-full flex flex-col items-center sm:p-6 md:p-12 gap-y-5">
        <div ref={editorRef} className="w-full bg-gray-800 rounded-lg"></div>
        <article className="bg-gray-800 rounded-lg p-4 w-full">
          <h1 className="text-3xl font-bold">Hello, world!</h1>
          <p className="text-lg">Django Model Gallery</p>
        </article>
        <section className="bg-gray-800 rounded-lg p-4 w-full">
          <h2 className="text-2xl font-bold pb-3">Explore</h2>
          <Link href={"/posts"} className="btn btn-outline btn-sm">
            모델 찾기
          </Link>
        </section>
      </main>
    </Layout>
  );
}
