import { getContributorProfile } from "../components/ContributorProfile.js";
import CodeMirrorEditor from "../service/CodeMirrorEditor.js";
import DjangoCodeBlocksEditor from "../service/DjangoCodeBlocksEditor.js";
import VizRenderer from "../service/VizRenderer.js";
import { fetchPostDetail } from "../util/fetchPostDetail.js";
import { parseMarkdown } from "../util/markdownParser.js";
import { throttle } from "../util/throttle.js";

export async function createPostDetailView(fileName) {
  try {
    const { markdownContent, postDetail } = await fetchPostDetail(fileName);
    const { htmlContent, mermaidCodeBlocks, vizCodeBlocks, djangoCodeBlocks } =
      parseMarkdown(markdownContent);
    console.log(
      "🚀 ~ createPostDetailView ~ djangoCodeBlocks:",
      djangoCodeBlocks,
    );
    const postDetailSection = createPostDetailElement(
      htmlContent,
      postDetail,
      mermaidCodeBlocks.join("\n"),
      vizCodeBlocks,
      djangoCodeBlocks,
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
  djangoCodeBlocks,
) {
  const postDetailSection = document.createElement("section");
  const contributorProfile = getContributorProfile(postDetail);

  postDetailSection.innerHTML =
    contributorProfile +
    `
 
    <section class="flex flex-col md:flex-row w-full h-lvh items-center justify-center">
      <article class="prose 2xl:prose-xl w-full md:w-1/2 h-full overflow-y-auto px-10 pt-5 bg-zinc-400">${htmlContent}</article>


      <div class="flex flex-col relative">
    
      <div class="django-container w-full">
     
    
      </div>

      <div class="viz-image-holder"></div>
      </div>
    </section>
   
   
    <section class="mermaid">
    <Textarea class="language-viz"></Textarea>
        ${mermaidCodeBlocks} <button class="absolute right-10" id="resetZoom">Reset Zoom</button>
        <button class="absolute right-10 top-10" id="downloadSVG" data-format="svg">Download SVG</button>
      </section>

  
 
  `;

  const vizRenderer = new VizRenderer();

  const svgString = await vizRenderer.renderSVG(vizCodeBlocks[0], {
    scale: 2,
  });

  const ERDBlock = postDetailSection.querySelector(".viz-image-holder");
  ERDBlock.innerHTML = svgString;

  const models = new DjangoCodeBlocksEditor(
    ".django-container",
    djangoCodeBlocks,
    true,
  );
  models.initialize();

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
          document.querySelector(".viz-image-holder").innerHTML = svgString;
        } catch (error) {
          console.error("Viz rendering error:", error);
        }
      }, 1000),
    );
  });

  return postDetailSection;
}
