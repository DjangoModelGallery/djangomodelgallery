export function extractH1(htmlContent) {
  const parser = new DOMParser();
  const htmlDocument = parser.parseFromString(htmlContent, "text/html");
  const h1Element = htmlDocument.querySelector("h1");
  return h1Element ? h1Element.textContent : null;
}
