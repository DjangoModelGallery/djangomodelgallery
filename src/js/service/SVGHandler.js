export default class SVGHandler {
  constructor(selector, mermaidCode) {
    this.selector = selector;
    this.mermaidCode = mermaidCode;
  }

  loadD3Library() {
    return new Promise((resolve, reject) => {
      if (!window.d3) {
        console.log("Loading D3.js library...");
        const script = document.createElement("script");
        script.src = "https://d3js.org/d3.v7.min.js";
        script.onload = () => {
          console.log("D3.js library loaded.");
          resolve();
        };
        script.onerror = (e) => {
          console.error("Failed to load D3.js library:", e);
          reject(e);
        };
        document.body.appendChild(script);
      } else {
        console.log("D3.js library is already loaded.");
        resolve();
      }
    });
  }

  async initializeZoomAndPan() {
    try {
      await this.loadD3Library();
      console.log("Initializing zoom and pan features...");
      const svgElement = d3.select(this.selector + " svg");

      if (!svgElement.node()) {
        console.warn(
          "SVG element not found with the selector: " +
            this.selector +
            " svg. Skipping zoom and pan initialization.",
        );
        return;
      }

      console.log("SVG element selected:", svgElement.node());

      const container = d3.select(this.selector);
      container.style("overflow", "visible");

      const zoom = d3
        .zoom()
        .scaleExtent([1, 10])
        .on("zoom", (event) => {
          svgElement.attr("transform", event.transform);
        });

      svgElement.call(zoom);

      svgElement.on("wheel", (event) => {
        event.preventDefault();
      });

      d3.select("#resetZoom").on("click", () => {
        svgElement.call(zoom.transform, d3.zoomIdentity);
      });

      console.log("Zoom and pan features are applied.");
    } catch (error) {
      console.error(
        "An error occurred while initializing zoom and pan features:",
        error,
      );
    }
  }
}
