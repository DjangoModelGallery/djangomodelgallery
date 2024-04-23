// useCodeMirrorWithTabs.ts
import CodeMirrorService from "@/services/CodeMirrorService";
import { Language } from "@/types/code/codemirror";
import { useEffect, useRef, useState } from "react";

export default function useCodeMirrorWithTabs(
  initialDocs: string[],
  language: Language
) {
  const editorsRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<CodeMirrorService | null>(null);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (editorsRef.current) {
      serviceRef.current = new CodeMirrorService(initialDocs, language);
      serviceRef.current.initialize(editorsRef.current);
    }

    return () => {
      serviceRef.current?.destroy();
    };
  }, [initialDocs, language]);

  const switchTab = (index: number) => {
    setCurrentTab(index);
    serviceRef.current?.switchDocument(index);
  };

  const getContents = () => {
    return serviceRef.current?.getContent() || "";
  };

  return { editorsRef, switchTab, getContents, currentTab };
}
