// useCodeMirror.ts
import CodeMirrorService from "@/services/CodeMirrorService";
import { Language } from "@/types/code/codemirror";
import { useEffect, useRef } from "react";

export default function useCodeMirror(
  initialDoc: string,
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
        initialDoc,
        language,
        onCommand
      );
    }

    return () => {
      serviceRef.current?.destroy();
    };
  }, [initialDoc, language, onCommand]);

  const getContent = () => {
    return serviceRef.current?.getContent() || "";
  };

  return { editorRef, getContent };
}