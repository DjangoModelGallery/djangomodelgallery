/**
 * Viz.js 라이브러리를 사용하여 Graphviz DOT 문자열을 SVG, 이미지 요소, JSON 객체로 렌더링하는 클래스입니다.
 * @class
 */
export default class VizRenderer {
  /**
   * VizRenderer 클래스의 생성자입니다.
   * @constructor
   */
  constructor() {
    if (typeof window.Viz === "undefined") {
      throw new Error(
        "Viz.js library is not loaded. Please make sure to include viz.js and full.render.js scripts in your HTML file.",
      );
    }
    this.viz = new window.Viz();
    this.lastSuccessfulSVG = null;
    this.lastSuccessfulImageElement = null;
    this.lastSuccessfulJSON = null;
  }

  /**
   * Graphviz DOT 문자열을 SVG 문자열로 렌더링합니다.
   * @param {string} dotString - Graphviz DOT 문자열
   * @param {object} options - Viz.js 렌더링 옵션
   * @returns {Promise<string>} SVG 문자열
   */
  async renderSVG(dotString, options = {}) {
    if (!dotString || typeof dotString !== "string") {
      console.error("Invalid DOT string provided.");
      return this.lastSuccessfulSVG || "";
    }

    try {
      const svgString = await this.viz.renderString(dotString, {
        format: "svg",
        ...options,
      });
      this.lastSuccessfulSVG = svgString;
      return svgString;
    } catch (error) {
      console.error("Error rendering SVG:", error);
      return this.lastSuccessfulSVG || "";
    }
  }

  /**
   * Graphviz DOT 문자열을 이미지 요소로 렌더링합니다.
   * @param {string} dotString - Graphviz DOT 문자열
   * @param {object} options - Viz.js 렌더링 옵션
   * @returns {Promise<HTMLImageElement>} 이미지 요소
   */
  async renderImageElement(dotString, options = {}) {
    if (!dotString || typeof dotString !== "string") {
      console.error("Invalid DOT string provided.");
      return this.lastSuccessfulImageElement || null;
    }

    try {
      const imageElement = await this.viz.renderImageElement(
        dotString,
        options,
      );
      this.lastSuccessfulImageElement = imageElement;
      return imageElement;
    } catch (error) {
      console.error("Error rendering image element:", error);
      return this.lastSuccessfulImageElement || null;
    }
  }

  /**
   * Graphviz DOT 문자열을 JSON 객체로 렌더링합니다.
   * @param {string} dotString - Graphviz DOT 문자열
   * @param {object} options - Viz.js 렌더링 옵션
   * @returns {Promise<object>} JSON 객체
   */
  async renderJSONObject(dotString, options = {}) {
    if (!dotString || typeof dotString !== "string") {
      console.error("Invalid DOT string provided.");
      return this.lastSuccessfulJSON || null;
    }

    try {
      const jsonObject = await this.viz.renderJSONObject(dotString, options);
      this.lastSuccessfulJSON = jsonObject;
      return jsonObject;
    } catch (error) {
      console.error("Error rendering JSON object:", error);
      return this.lastSuccessfulJSON || null;
    }
  }
}
