// parseMarkdownContents.ts

import { ParsedMarkdown } from "@/types/code/markdown";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import footnote from "markdown-it-footnote";
import toc from "markdown-it-toc-done-right";

/**
 * 주어진 마크다운 문자열을 HTML로 변환하고, 변환된 HTML에서 목차와 각주를 추출하는 함수입니다.
 *
 * @param markdownContent 변환할 마크다운 문자열입니다.
 * @returns 변환된 HTML, 목차, 각주를 포함하는 객체를 반환합니다.
 *
 * @example
 *
 * import { parseMarkdownContents } from "./parseMarkdownContents";
 *
 * const markdown = `
 * # 제목
 *
 * [[toc]]
 *
 * ## 섹션 1
 *
 * 내용...[^1]
 *
 * ## 섹션 2
 *
 * 내용...[^2]
 *
 * [^1]: 각주 1
 * [^2]: 각주 2
 * `;
 *
 * const { html, tableOfContents, footnotes } = parseMarkdown(markdown);
 *
 * console.log(html); // 변환된 HTML을 출력합니다.
 * console.log(tableOfContents); // 목차를 출력합니다.
 * console.log(footnotes); // 각주를 출력합니다.
 */
export const parseMarkdownContents = (
  markdownContent: string
): Partial<ParsedMarkdown> => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })
    .use(anchor, {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: "§",
    })
    .use(toc)
    .use(footnote);

  const html = md.render(markdownContent);

  const tocRegex = /<nav class="table-of-contents">(.*?)<\/nav>/s;
  const tocMatch = html.match(tocRegex);
  const tableOfContents = tocMatch ? tocMatch[1] : "";

  const footnoteRegex = /<section class="footnotes">(.*?)<\/section>/s;
  const footnoteMatch = html.match(footnoteRegex);
  const footnotes = footnoteMatch ? footnoteMatch[1] : "";

  return {
    html,
    tableOfContents,
    footnotes,
  };
};
