import { CodeBlock, ParsedMarkdown } from "@/types/code/markdown";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import footnote from "markdown-it-footnote";
import toc from "markdown-it-toc-done-right";
import { cache } from "react";

export const parseMarkdown = cache(
  async (markdownContent: string): Promise<ParsedMarkdown> => {
    const codeBlocks: CodeBlock[] = [];
    const vizCodeBlocks: CodeBlock[] = [];

    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (code, language) => {
        if (language === "viz") {
          vizCodeBlocks.push({ language, code });
          return "";
        } else {
          codeBlocks.push({ language: language || "", code });
          return "";
        }
      },
    })
      .use(anchor, {
        permalinkBefore: true,
        permalinkClass: "header-anchor",
        permalinkSymbol: "§",
      })
      .use(toc, { containerClass: "table-of-contents", listType: "ol" })
      .use(footnote);

    const html = md.render(markdownContent);

    // 렌더링된 HTML에서 viz 코드 블록 제거
    const htmlWithoutViz = html.replace(
      /<pre><code class="language-viz">[\s\S]*?<\/code><\/pre>/g,
      ""
    );

    const pythonCodeBlocks: CodeBlock[] = [];
    const jsCodeBlocks: CodeBlock[] = [];
    const otherCodeBlocks: CodeBlock[] = [];

    // 렌더링된 HTML에서 목차 추출
    const tocRegex = /<nav class="table-of-contents">(.*?)<\/nav>/s;
    const tocMatch = htmlWithoutViz.match(tocRegex);
    const tableOfContents = tocMatch ? tocMatch[1] : "";

    // 렌더링된 HTML에서 각주 추출
    const footnotesRegex =
      /<div class="footnotes">\s*<ol>(.*?)<\/ol>\s*<\/div>/s;
    const footnotesMatch = htmlWithoutViz.match(footnotesRegex);
    const footnotes = footnotesMatch ? footnotesMatch[1] : "";

    codeBlocks.forEach((block) => {
      if (
        block.language === "python" &&
        block.code.includes("#") &&
        block.code.includes(">") &&
        block.code.includes(".py")
      ) {
        pythonCodeBlocks.push(block);
      } else if (block.language === "js") {
        jsCodeBlocks.push(block);
      } else {
        otherCodeBlocks.push(block);
      }
    });

    return {
      html: htmlWithoutViz,
      tableOfContents,
      footnotes,
      pythonCodeBlocks,
      vizCodeBlocks,
      jsCodeBlocks,
      otherCodeBlocks,
    };
  }
);
