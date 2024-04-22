import VizService from "@/services/VizService";
import { Graph } from "@viz-js/viz";
import { RefObject, useEffect, useRef, useState } from "react";

/**
 * 주어진 그래프를 SVG로 렌더링하고, 이를 포함하는 컨테이너 요소에 대한 참조를 반환하는 훅입니다.
 *
 * @param initialGraph 렌더링할 그래프입니다.
 * @param options 선택적으로 Viz 렌더러에 대한 옵션을 지정할 수 있습니다.
 *
 * @returns 컨테이너 요소에 대한 참조를 반환합니다.
 *
 * @example
 *
 * import { Graph } from "@viz-js/viz";
 * import useViz from "@/hooks/useViz";
 *
 * function MyComponent() {
 *   const graph = new Graph();
 *   // ... 그래프에 노드와 엣지를 추가 ...
 *
 *   const containerRef = useViz(graph);
 *
 *   return <div ref={containerRef} />;
 * }
 */
export default function useViz(
  initialGraph: Graph,
  options?: any
): RefObject<HTMLDivElement> {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<SVGSVGElement | null>(null);
  const serviceRef = useRef<VizService | null>(null);

  useEffect(() => {
    serviceRef.current = new VizService();

    serviceRef.current
      .renderSvg(initialGraph, options)
      .then((svgElement) => {
        setSvg(svgElement);
      })
      .catch((error) => {
        console.error("그래프 렌더링에 실패했습니다:", error);
      });
  }, [initialGraph, options]);

  useEffect(() => {
    if (containerRef.current && svg) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(svg);
    }
  }, [svg]);

  return containerRef;
}
