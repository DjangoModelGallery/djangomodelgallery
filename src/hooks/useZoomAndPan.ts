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
  resetPan: () => void;
  downloadPNG: (filename?: string) => void;
  downloadSVG: (filename?: string) => void;
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
              .filter((event) => (event.type === "wheel" ? event.altKey : true))
              .scaleExtent([0.5, 8])
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
      d3.select(svgRef.current).transition().call(zoomRef.current.scaleBy, 1.1);
  };

  const zoomOut = () => {
    svgRef.current &&
      d3.select(svgRef.current).transition().call(zoomRef.current.scaleBy, 0.9);
  };

  const resetZoom = () => {
    svgRef.current &&
      d3.select(svgRef.current).transition().call(zoomRef.current.scaleTo, 1);
  };

  const resetPan = () => {
    if (svgRef.current) {
      const currentZoom = zoomRef.current.transform;
      const updatedTransform = d3.zoomIdentity.scale(zoomLevel);
      d3.select(svgRef.current)
        .transition()
        .call(zoomRef.current.transform, updatedTransform);
    }
  };

  const downloadPNG = (filename = "image") => {
    if (svgRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const svg = new XMLSerializer().serializeToString(svgRef.current);
      const img = new Image();
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      img.src = url;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const a = document.createElement("a");
            a.download = `${filename}.png`;
            a.href = URL.createObjectURL(blob);
            a.click();
            URL.revokeObjectURL(a.href);
          }
        }, "image/png");
        URL.revokeObjectURL(url);
      };
    }
  };

  const downloadSVG = (filename = "image") => {
    if (svgRef.current) {
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svgRef.current);
      const a = document.createElement("a");
      a.download = `${filename}.svg`;
      a.href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
      a.click();
    }
  };

  return {
    zoomIn,
    zoomOut,
    resetZoom,
    resetPan,
    downloadPNG,
    downloadSVG,
    zoomLevel,
  };
};
