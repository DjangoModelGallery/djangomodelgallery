import * as d3 from "d3";
import { RefObject, useEffect, useRef, useState } from "react";

interface UseZoomAndPanProps {
  containerRef: RefObject<HTMLDivElement>;
  initialZoom?: number;
}

interface UseZoomAndPanReturn {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  zoomLevel: number;
}

export const useZoomAndPan = ({
  containerRef,
  initialZoom = 1,
}: UseZoomAndPanProps): UseZoomAndPanReturn => {
  const svgRef = useRef<SVGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGElement, unknown>>(d3.zoom());
  const [zoomLevel, setZoomLevel] = useState(initialZoom);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof SVGElement) {
            const svg = d3.select(node);
            svgRef.current = node;

            const zoom = d3
              .zoom<SVGElement, unknown>()
              .scaleExtent([1, 8])
              .translateExtent([
                [0, 0],
                [node.clientWidth, node.clientHeight],
              ])
              .on("zoom", (event: d3.D3ZoomEvent<SVGElement, unknown>) => {
                setZoomLevel(event.transform.k);
                const transform = event.transform;
                svg.attr(
                  "transform",
                  `translate(${transform.x},${transform.y}) scale(${transform.k})`
                );
              });

            svg.call(zoom);
            zoomRef.current = zoom;
          }
        });
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true });
    }

    return () => observer.disconnect();
  }, [containerRef]);

  const zoomIn = () => {
    svgRef.current &&
      d3
        .select(svgRef.current)
        .transition()
        .call(zoomRef.current!.scaleBy, 1.1);
  };

  const zoomOut = () => {
    svgRef.current &&
      d3
        .select(svgRef.current)
        .transition()
        .call(zoomRef.current!.scaleBy, 0.9);
  };

  const resetZoom = () => {
    svgRef.current &&
      d3.select(svgRef.current).transition().call(zoomRef.current!.scaleTo, 1);
  };

  return { zoomIn, zoomOut, resetZoom, zoomLevel };
};
