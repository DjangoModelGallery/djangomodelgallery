import { Breakpoint, Breakpoints } from "@/types/ui/media";
import { useCallback, useLayoutEffect, useState } from "react";
import { breakpoints as defaultBreakpoints } from "../../constants/media";

const parseBreakpoints = (
  breakpoints: Breakpoints
): { [key in Breakpoint]: number } => {
  const numericBreakpoints: { [key in Breakpoint]: number } = {} as {
    [key in Breakpoint]: number;
  };
  (Object.keys(breakpoints) as Breakpoint[]).forEach((key) => {
    numericBreakpoints[key] = parseInt(breakpoints[key].replace("px", ""), 10);
  });
  return numericBreakpoints;
};

/**
 * Tailwind CSS 브레이크포인트에 따라 현재 윈도우의 너비를 숫자로 반환하고,
 * 각 브레이크포인트에 대한 너비가 설정된 값보다 작은지 여부를 확인하는 훅입니다.
 * 이 훅은 반응형 디자인에서 조건부 렌더링을 용이하게 하기 위해 사용됩니다.
 *
 * @param {Breakpoints} breakpoints - 브레이크포인트의 최소 너비를 정의하는 객체. 기본값은 프로젝트 전역 설정입니다.
 * @returns {object} 반환 객체는 다음 두 가지 속성을 포함합니다:
 *   - width: 현재 윈도우의 너비를 나타내는 숫자.
 *   - breakpoints: 각 브레이크포인트의 너비를 숫자로 변환한 객체.
 *     이 객체의 각 키는 브레이크포인트의 이름이며, 값은 해당 브레이크포인트의 최소 너비를 나타냅니다.
 */

export default function useTailwindBreakpoint(
  breakpoints: Breakpoints = defaultBreakpoints
) {
  const numericBreakpoints = parseBreakpoints(breakpoints);
  const [width, setWidth] = useState<number>(0);

  const updateWidth = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      updateWidth();
      window.addEventListener("resize", updateWidth);

      return () => {
        window.removeEventListener("resize", updateWidth);
      };
    }
  }, [updateWidth]);

  return { width, breakpoints: numericBreakpoints };
}
