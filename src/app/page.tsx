"use client";
import Layout from "@/components/Layout";

import useCodeMirror from "@/hooks/useCodeMirror";
import { useRef } from "react";

export default function Home() {
  const editorRef = useRef<HTMLDivElement>(null);
  const doc = `if True:
    print("let's go!")
else:
    print("oh no.")
`;

  useCodeMirror(editorRef, doc, "python");

  return (
    <Layout>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center p-12">
        <div ref={editorRef} className="w-full bg-gray-800 rounded-lg"></div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h1 className="text-3xl font-bold">Hello, world!</h1>
          <p className="text-lg">Django Model Gallery</p>
        </div>
      </main>
    </Layout>
  );
}
