interface CodeBlock {
  language: string;
  code: string;
}

interface TabEditorBlock {
  name: string;
  code: string;
}

interface ParsedMarkdown {
  html: string;
  tableOfContents: string;
  footnotes: string;
  pythonCodeBlocks: CodeBlock[];
  vizCodeBlocks: CodeBlock[];
  jsCodeBlocks: CodeBlock[];
  otherCodeBlocks: CodeBlock[];
}

export type { CodeBlock, ParsedMarkdown, TabEditorBlock };
