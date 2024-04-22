import { Breakpoint, Breakpoints } from "@/types/ui/media";
import { useCallback, useLayoutEffect, useState } from "react";
import { breakpoints as defaultBreakpoints } from "../../constants/media";

/**
 * `useTailwindBreakpoint`는 Tailwind CSS의 브레이크포인트에 따라 현재 화면 너비를 반환하는 훅입니다.
 * 이 훅은 브라우저의 `resize` 이벤트를 감지하여 화면 너비가 변경될 때마다 브레이크포인트를 업데이트합니다.
 *
 * 반환값은 현재 화면 너비에 해당하는 브레이크포인트의 이름입니다.
 * 화면 너비가 어떤 브레이크포인트에도 해당하지 않는 경우, 반환값은 `null`입니다.
 *
 * 이 훅은 반응형 디자인을 구현하는 데 사용할 수 있습니다.
 */
export default function useTailwindBreakpoint(
  breakpoints: Breakpoints = defaultBreakpoints
) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

  const matchMedia = useCallback(
    () => ({
      xs: window.matchMedia(`(min-width: ${breakpoints.xs})`),
      sm: window.matchMedia(`(min-width: ${breakpoints.sm})`),
      md: window.matchMedia(`(min-width: ${breakpoints.md})`),
      lg: window.matchMedia(`(min-width: ${breakpoints.lg})`),
      xl: window.matchMedia(`(min-width: ${breakpoints.xl})`),
      "2xl": window.matchMedia(`(min-width: ${breakpoints["2xl"]})`),
    }),
    [breakpoints]
  );

  const handleResize = useCallback(() => {
    const queries = matchMedia();
    if (queries["2xl"].matches) {
      setBreakpoint("2xl");
    } else if (queries.xl.matches) {
      setBreakpoint("xl");
    } else if (queries.lg.matches) {
      setBreakpoint("lg");
    } else if (queries.md.matches) {
      setBreakpoint("md");
    } else if (queries.sm.matches) {
      setBreakpoint("sm");
    } else {
      setBreakpoint(null);
    }
  }, [matchMedia]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const queries = matchMedia();
      const listeners = Object.entries(queries).map(([key, query]) => {
        const listener = () => handleResize();
        query.addListener(listener);
        return [key, listener] as const;
      });

      handleResize();

      return () => {
        listeners.forEach(([key, listener]) => {
          queries[key as Breakpoint].removeListener(listener);
        });
      };
    }
  }, [handleResize, matchMedia]);

  return breakpoint;
}
