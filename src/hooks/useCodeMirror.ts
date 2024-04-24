import StringCodeMirrorService from "@/services/StringCodeMirrorService";
import { Language } from "@/types/code/codemirror";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useCodeMirror(
  initialDoc: string,
  language: Language,
  onCommand: () => void,
  onChange: (value: string) => void,
  open: boolean,
  debounceDelay: number = 300
) {
  const editorRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<StringCodeMirrorService | null>(null);
  const [lastContent, setLastContent] = useState(initialDoc);

  useEffect(() => {
    if (open && editorRef.current && !serviceRef.current) {
      serviceRef.current = new StringCodeMirrorService(
        initialDoc,
        language,
        onCommand
      );
      serviceRef.current.initialize(editorRef.current);

      serviceRef.current.onChange((content) => {
        if (content !== undefined) {
          onChange(content);
          setLastContent(content);
        }
      });
    } else if (!open && serviceRef.current) {
      serviceRef.current.destroy();
      serviceRef.current = null;
    }
  }, [open, editorRef, serviceRef, initialDoc, language, onCommand, onChange]);

  useEffect(() => {
    if (serviceRef.current && initialDoc !== lastContent) {
      serviceRef.current.update(initialDoc);
      setLastContent(initialDoc);
    }
  }, [initialDoc, lastContent]);

  const getContent = useCallback(() => {
    return serviceRef.current?.getContent() || "";
  }, []);

  return { editorRef, getContent };
}
