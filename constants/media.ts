import { Breakpoints } from "@/types/ui/media";
/**
 * 프로젝트의 미디어쿼리 브레이크포인트를 정의합니다.
 * 이 객체는 `useTailwindBreakpoint` 훅에서 미디어 쿼리를 생성하는 데 사용됩니다.
 *
 * 각 키는 브레이크포인트의 이름을 나타내며, 값은 해당 브레이크포인트의 최소 너비를 나타냅니다.
 *
 * 기본값은 Tailwind CSS의 기본 브레이크포인트를 따릅니다.
 * 필요에 따라 이 값을 변경하여 프로젝트의 요구 사항에 맞게 브레이크포인트를 사용자 정의할 수 있습니다.
 */
const breakpoints: Breakpoints = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export { breakpoints };
