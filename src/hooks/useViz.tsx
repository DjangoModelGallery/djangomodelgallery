import VizService from "@/services/VizService";
import { Graph } from "@viz-js/viz";
import { RefObject, useEffect, useRef } from "react";

export default function useViz(
  initialGraph: string,
  options?: any
): {
  containerRef: RefObject<HTMLDivElement>;
  svgRef: RefObject<SVGSVGElement>;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const vizService = new VizService();

    const renderGraph = async () => {
      try {
        const svgElement = await vizService.renderSvg(
          initialGraph as Graph,
          options
        );

        if (containerRef.current) {
          containerRef.current.innerHTML = "";
          containerRef.current.appendChild(svgElement);
        }
      } catch (error) {
        console.error("그래프 렌더링에 실패했습니다:", error);
      }
    };

    renderGraph();
  }, [initialGraph, options]);

  return { containerRef, svgRef };
}
