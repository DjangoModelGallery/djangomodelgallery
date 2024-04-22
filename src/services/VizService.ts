// VizService.ts
import { Graph, instance } from "@viz-js/viz";

export default class VizService {
  private viz: any;

  constructor() {
    instance().then((viz) => {
      this.viz = viz;
    });
  }

  renderSvg(graph: Graph, options?: any): Promise<SVGSVGElement> {
    return new Promise((resolve, reject) => {
      try {
        const svgElement = this.viz.renderSVGElement(graph, options);
        resolve(svgElement);
      } catch (error) {
        reject(error);
      }
    });
  }
}
