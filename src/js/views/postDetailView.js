import { getContributorProfile } from "../components/ContributorProfile.js";
import CodeMirrorEditor from "../service/CodeMirrorEditor.js";
import MermaidLoader from "../service/MermaidLoader.js";
import SVGConverter from "../service/SVGConverter.js";
import SVGHandler from "../service/SVGHandler.js";
import { fetchPostDetail } from "../util/fetchPostDetail.js";
import { isValidMermaidCode } from "../util/isValidCodes.js";
import { parseMarkdown } from "../util/markdownParser.js";
import { throttle } from "../util/throttle.js";

export async function createPostDetailView(fileName) {
  try {
    const { markdownContent, postDetail } = await fetchPostDetail(fileName);
    const { htmlContent, mermaidCodeBlocks } = parseMarkdown(markdownContent);

    const postDetailSection = createPostDetailElement(
      htmlContent,
      postDetail,
      mermaidCodeBlocks.join("\n"), // 여러 개의 mermaid 코드 블록을 하나의 문자열로 결합
    );

    postDetailSection.mermaidCodeBlocks = mermaidCodeBlocks;
    return postDetailSection;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

function createPostDetailElement(htmlContent, postDetail, mermaidCodeBlocks) {
  const postDetailSection = document.createElement("section");

  const contributorProfile = getContributorProfile(postDetail);

  postDetailSection.innerHTML =
    contributorProfile +
    `
    <section class="flex relative ">
        <article class="prose w-full min-w-1/2 px-6 pt-10">${htmlContent}</article>
        <Textarea class="language-mermaid"></Textarea>
        <div class="mermaid w-full flex justify-center ">
        {mermaidCodeBlocks}

      
        </div>
        <button class="absolute right-10 " id="resetZoom">Reset Zoom</button>
        <button class="absolute right-10 top-10" id="downloadSVG" data-format="svg">Download SVG</button>
   </section>
    `;

  const editor = new CodeMirrorEditor(".language-mermaid", mermaidCodeBlocks);

  editor.initialize().then(() => {
    editor.editor.on(
      "change",
      throttle(() => {
        const currentValue = editor.getValue();
        const { isValid, errorMessage } = isValidMermaidCode(currentValue);
        if (isValid) {
          loader.mermaidCode = currentValue;
          try {
            loader.loadAndRenderMermaid();
          } catch (error) {}
        } else {
          // Mermaid 코드가 유효하지 않으면 사용자에게 오류 메시지를 표시합니다.
          // console.error("Mermaid code error:", errorMessage);
          // 사용자에게 오류 메시지를 표시하는 로직을 여기에 추가할 수 있습니다.
        }
      }, 1000),
    );
  });

  const loader = new MermaidLoader(".mermaid", mermaidCodeBlocks);
  loader
    .loadAndRenderMermaid()
    .then(() => {
      const svgHandler = new SVGHandler(".mermaid", mermaidCodeBlocks);
      svgHandler.initializeZoomAndPan();

      const svgConverter = new SVGConverter(
        ".mermaid",
        postDetail.title,
        "DjangoModelGallery",
      );
      svgConverter.attachEventListeners();
    })
    .catch((error) => {
      console.error("Failed to load or render Mermaid SVG:", error);
    });

  return postDetailSection;
}
