import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

/**
 * Markdown 문자열에서 프론트매터를 추출하고, HTML로 파싱된 본문과 함께 반환합니다.
 * 프론트매터는 YAML 형식으로 마크다운 최상단에 위치해 있으며, '---'로 구분됩니다.
 *
 * @param {string} markdownContent 마크다운 형식의 문자열.
 * @return {object} HTML 문자열, mermaid 코드 블록 배열, ERD 코드 블록 배열, Django 코드 블록 배열, 프론트매터 데이터를 포함한 객체.
 */
export function parseMarkdown(markdownContent) {
  const frontMatterRegex = /^---\s*\n([\s\S]+?)\n---/;
  let frontMatter = {};
  let contentWithoutFrontMatter = markdownContent;

  const frontMatterMatch = markdownContent.match(frontMatterRegex);
  if (frontMatterMatch) {
    const frontMatterString = frontMatterMatch[1];
    contentWithoutFrontMatter = markdownContent
      .replace(frontMatterMatch[0], "")
      .trim();

    frontMatterString.split("\n").forEach((line) => {
      const [key, value] = line.split(":").map((part) => part.trim());
      frontMatter[key] = value;
    });
  }

  const codeBlocks = {
    mermaid: [],
    viz: [],
    django: [],
  };

  marked.use({
    renderer: {
      code(code, infostring) {
        if (infostring === "mermaid") {
          codeBlocks.mermaid.push(code);
          return '<div class="mermaid-placeholder"></div>';
        }
        if (infostring === "viz") {
          codeBlocks.viz.push(code);
          return '<div class="viz-placeholder"></div>';
        }
        if (infostring.startsWith("python")) {
          const lines = code.split("\n");
          const djangoCodeName = lines[0].trim().replace(/^#\s*/, "");
          const djangoCode = lines.slice(1).join("\n");
          codeBlocks.django.push({ name: djangoCodeName, code: djangoCode });
        }
        return `<pre><code class="${infostring}">${code}</code></pre>`;
      },
    },
  });

  const htmlContent = marked.parse(contentWithoutFrontMatter);
  return {
    htmlContent,
    mermaidCodeBlocks: codeBlocks.mermaid,
    vizCodeBlocks: codeBlocks.viz,
    djangoCodeBlocks: codeBlocks.django,
    frontMatter,
  };
}
