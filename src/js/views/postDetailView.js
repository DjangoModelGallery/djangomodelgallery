import { getContributorProfile } from "../components/ContributorProfile.js";
import CodeMirrorEditor from "../service/CodeMirrorEditor.js";
import VizRenderer from "../service/VizRenderer.js";
import { fetchPostDetail } from "../util/fetchPostDetail.js";
import { parseMarkdown } from "../util/markdownParser.js";
import { throttle } from "../util/throttle.js";

export async function createPostDetailView(fileName) {
  try {
    const { markdownContent, postDetail } = await fetchPostDetail(fileName);
    const { htmlContent, mermaidCodeBlocks, vizCodeBlocks } =
      parseMarkdown(markdownContent);

    const postDetailSection = createPostDetailElement(
      htmlContent,
      postDetail,
      mermaidCodeBlocks.join("\n"),
      vizCodeBlocks,
    );
    postDetailSection.mermaidCodeBlocks = mermaidCodeBlocks;

    return postDetailSection;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function createPostDetailElement(
  htmlContent,
  postDetail,
  mermaidCodeBlocks,
  vizCodeBlocks,
) {
  const postDetailSection = document.createElement("section");
  const contributorProfile = getContributorProfile(postDetail);

  postDetailSection.innerHTML =
    contributorProfile +
    `
 
    <section class="flex relative w-full">
      <article class="prose prose-2xl mx-auto w-full px-6 pt-10">${htmlContent}</article>
      <div class="viz-placeholder"></div>
    
      
    </section>
    <Textarea class="language-viz"></Textarea>
    <section class="mermaid">

        ${mermaidCodeBlocks} <button class="absolute right-10" id="resetZoom">Reset Zoom</button>
        <button class="absolute right-10 top-10" id="downloadSVG" data-format="svg">Download SVG</button>
      </section>
 
  `;

  const vizRenderer = new VizRenderer();

  const svgString = await vizRenderer.renderSVG(vizCodeBlocks[0], {
    scale: 2,
  });

  const ERDBlock = postDetailSection.querySelector(".viz-placeholder");
  ERDBlock.innerHTML = svgString;

  const editor = new CodeMirrorEditor(".language-viz", vizCodeBlocks[0]);
  editor.initialize().then(() => {
    editor.editor.on(
      "change",
      throttle(async () => {
        const currentValue = editor.getValue();

        // Viz DOT 구문 유효성 검사 로직을 여기에 추가
        try {
          // TODO: png 다운로드 기능 추가
          const svgString = await vizRenderer.renderSVG(currentValue, {
            scale: 2,
          });
          document.querySelector(".viz-placeholder").innerHTML = svgString;
        } catch (error) {
          console.error("Viz rendering error:", error);
        }
      }, 1000),
    );
  });

  return postDetailSection;
}
