import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

export function parseMarkdown(markdownContent) {
  // 프론트매터 추출을 위한 정규식 수정: 시작과 끝을 명확히 구분
  const frontMatterRegex = /^---\s*\n([\s\S]+?)\n---/;
  let frontMatter = {};
  let contentWithoutFrontMatter = markdownContent;

  const frontMatterMatch = markdownContent.match(frontMatterRegex);
  if (frontMatterMatch) {
    const frontMatterString = frontMatterMatch[1]; // 첫 번째 캡처 그룹에 해당하는 실제 프론트매터 내용
    contentWithoutFrontMatter = markdownContent
      .replace(frontMatterMatch[0], "")
      .trim();

    frontMatterString.split("\n").forEach((line) => {
      const [key, value] = line.split(":").map((part) => part.trim());
      frontMatter[key] = value;
    });
  }

  const mermaidCodeBlocks = [];
  marked.use({
    renderer: {
      code(code, infostring) {
        if (infostring === "mermaid") {
          mermaidCodeBlocks.push(code);
          return '<div class="mermaid-placeholder"></div>';
        }
        return `<pre><code class="${infostring}">${code}</code></pre>`;
      },
    },
  });

  const htmlContent = marked.parse(contentWithoutFrontMatter);
  return {
    htmlContent,
    mermaidCodeBlocks,
    frontMatter,
  };
}
