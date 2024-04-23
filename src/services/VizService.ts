// VizService.ts
import { Graph, instance } from "@viz-js/viz";

export default class VizService {
  private viz: any;

  constructor() {
    instance().then((viz) => {
      this.viz = viz;
    });
  }

  async renderSvg(graph: Graph, options?: any): Promise<SVGSVGElement> {
    try {
      const viz = await instance();
      const svgElement = viz.renderSVGElement(graph, options);
      return svgElement;
    } catch (error) {
      throw error;
    }
  }
}
