// useCodeMirrorWithTabs.ts
import CodeMirrorService from "@/services/CodeMirrorService";
import { Language } from "@/types/code/codemirror";
import { TabEditorBlock } from "@/types/code/markdown";
import { useEffect, useRef, useState } from "react";

export default function useCodeMirrorWithTabs(
  initialDocs: TabEditorBlock[],
  language: Language
) {
  const editorsRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<CodeMirrorService | null>(null);
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = initialDocs.map((doc) => doc.code);

  const tabsList = initialDocs.map((doc, index) => ({
    name: doc.name,
    index,
  }));

  useEffect(() => {
    if (editorsRef.current) {
      serviceRef.current = new CodeMirrorService(tabs, language);
      serviceRef.current.initialize(editorsRef.current);
      serviceRef.current.switchDocument(currentTab);
    }

    return () => {
      serviceRef.current?.destroy();
    };
  }, [tabs, language, currentTab]);

  const switchTab = (index: number) => {
    setCurrentTab(index);
  };

  const getContents = () => {
    return serviceRef.current?.getContent() || "";
  };

  return { editorsRef, switchTab, getContents, currentTab, tabsList };
}
