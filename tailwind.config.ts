/**
 * 이 파일은 Tailwind CSS의 설정 파일입니다.
 * 설정 방법에 대한 예시는 옆에 있는 `tailwind.config.example.ts` 파일을 참고해주세요.
 * 거의 모든 css 프로퍼티를 사용하여 기본 설정 및, Tailwind CSS 전용 플러그인을 커스텀 할 수 있으며, CamelCase로 작성하시면 됩니다. 사용 가능한 프로퍼티는 Tailwind CSS 공식 문서를 참고해주세요.
 * https://tailwindcss.com/docs/
 */
import type { Config } from "tailwindcss";
import { breakpoints } from "./constants/media";
const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    screens: {
      ...breakpoints,
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#333",
            backgroundColor: "transparent",
            h1: {
              color: "lime",
            },
            a: {
              color: "#3182ce",
              "&:hover": {
                color: "#2c5282",
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
