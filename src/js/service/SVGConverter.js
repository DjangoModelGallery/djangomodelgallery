export default class SVGConverter {
  constructor(
    selector = "mermaid",
    h1Text = "Mermaid Diagram", // SVG 파일의 제목
    watermarkText = "Watermark", // 워터마크 텍스트
    watermarkImageUrl = null, // 워터마크 이미지 URL (옵션)
  ) {
    this.selector = selector;
    this.h1Text = h1Text;
    this.watermarkText = watermarkText;
    this.watermarkImageUrl = watermarkImageUrl;
  }

  downloadSVG(svgElement, fileName) {
    const cloneSvgElement = svgElement.cloneNode(true);

    // addWatermark 메서드를 호출하여 SVG 워터마크를 추가합니다.
    this.addWatermark(cloneSvgElement);

    const svgData = new XMLSerializer().serializeToString(cloneSvgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(url);
  }

  addWatermark(svgElement) {
    const svgNS = svgElement.namespaceURI;
    const svgWidth =
      svgElement.viewBox?.baseVal?.width ||
      svgElement.getBoundingClientRect().width;
    const svgHeight =
      svgElement.viewBox?.baseVal?.height ||
      svgElement.getBoundingClientRect().height;

    // 텍스트 워터마크 추가
    if (this.watermarkText) {
      const textElement = document.createElementNS(svgNS, "text");
      textElement.setAttribute("x", "0"); // 좌측 끝으로 변경
      textElement.setAttribute("y", svgHeight); // 하단 끝으로 변경
      textElement.setAttribute("font-family", "Arial");
      textElement.setAttribute("font-size", "15");
      textElement.setAttribute("fill", "rgba(0, 0, 0, 0.7)");
      textElement.textContent = this.watermarkText;
      svgElement.appendChild(textElement);
    }

    // 이미지 워터마크 추가 (옵션)
    if (this.watermarkImageUrl) {
      const imageElement = document.createElementNS(svgNS, "image");
      imageElement.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "href",
        this.watermarkImageUrl,
      );
      imageElement.setAttribute("x", "0"); // 좌측 끝으로 변경
      imageElement.setAttribute("y", svgHeight - 50); // 이미지의 높이만큼 위로 올림
      imageElement.setAttribute("width", "60"); // 이미지 크기, 필요에 따라 조정
      imageElement.setAttribute("height", "50"); // 이미지 크기, 필요에 따라 조정
      svgElement.appendChild(imageElement);
    }
  }

  convertAndDownload(svgElement) {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    this.downloadSVG(
      svgElement,
      `${
        this.h1Text ? this.h1Text : "DjangoModelGallery"
      }-${formattedDate}.svg`,
    );
  }

  attachEventListeners() {
    document.querySelectorAll("button[data-format]").forEach((button) => {
      button.addEventListener("click", (e) => {
        const format = e.target.getAttribute("data-format");
        const svgElement = document.querySelector(this.selector + " svg");
        if (!svgElement) {
          console.error("SVG element not found");
          return;
        }

        this.convertAndDownload(svgElement);
      });
    });
  }
}
