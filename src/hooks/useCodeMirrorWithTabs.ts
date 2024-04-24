// useCodeMirrorWithTabs.ts
import ArrayCodeMirrorService from "@/services/ArrayCodeMirrorsService";

import { Language } from "@/types/code/codemirror";
import { TabEditorBlock } from "@/types/code/markdown";
import { useEffect, useRef, useState } from "react";

export default function useCodeMirrorWithTabs(
  initialDocs: TabEditorBlock[],
  language: Language
) {
  const editorsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<ArrayCodeMirrorService | null>(null);
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = initialDocs.map((doc) => doc.code);

  const tabsList = initialDocs.map((doc, index) => ({
    name: doc.name,
    index,
  }));

  useEffect(() => {
    if (editorsRef.current) {
      servicesRef.current = new ArrayCodeMirrorService(tabs, language);
      servicesRef.current.initialize(editorsRef.current);
      servicesRef.current.switchDocument(currentTab);
    }

    return () => {
      servicesRef.current?.destroy();
    };
  }, [tabs, language, currentTab]);

  const switchTab = (index: number) => {
    setCurrentTab(index);
  };

  const getContents = () => {
    return servicesRef.current?.getContent() || "";
  };

  return { editorsRef, switchTab, getContents, currentTab, tabsList };
}
