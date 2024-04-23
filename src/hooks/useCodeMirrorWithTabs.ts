// useCodeMirror.ts
// TODO: 탭으로 만들기
import CodeMirrorService from "@/services/CodeMirrorService";
import { Language } from "@/types/code/codemirror";
import { useEffect, useRef } from "react";

export default function useCodeMirrorWithTabs(
  initialDocs: string[],
  language: Language,
  onCommand: () => void
) {
  const editorRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<CodeMirrorService | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      serviceRef.current = new CodeMirrorService();
      serviceRef.current.initialize(
        editorRef.current,
        initialDocs[0],
        language,
        onCommand
      );
    }

    return () => {
      serviceRef.current?.destroy();
    };
  }, [initialDocs, language, onCommand]);

  const getContent = () => {
    return serviceRef.current?.getContent() || "";
  };

  return { editorRef, getContent };
}
