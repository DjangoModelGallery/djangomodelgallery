// useParseMarkdown.ts

import { ParsedMarkdown } from "@/types/code/markdown";
import { parseMarkdown } from "@/utils/parseMarkdown";
import { useEffect, useState } from "react";

export const useParseMarkdown = (markdownContent: string) => {
  const [parsedMarkdown, setParsedMarkdown] = useState<ParsedMarkdown | null>(
    null
  );

  useEffect(() => {
    const parse = async () => {
      const result = await parseMarkdown(markdownContent);
      setParsedMarkdown(result);
    };

    parse();
  }, [markdownContent]);

  return parsedMarkdown;
};
