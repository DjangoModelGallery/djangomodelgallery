/**
 * 이 파일은 Tailwind CSS 설정의 예시 파일입니다.
 * xl 사이즈까지 커버되어 있습니다.
 * 전체 설정은 다음의 공식 문서를 참조하세요.
 * https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
 *
 * 이 파일에서 원하는 설정을 찾은 후, 원본 `tailwind.config.js` 파일에 같은 형식으로 오버라이드하면 됩니다.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
              color: "var(--tw-prose-body)",
              maxWidth: "65ch",
              p: {},
              '[class~="lead"]': {
                color: "var(--tw-prose-lead)",
              },
              a: {
                color: "var(--tw-prose-links)",
                textDecoration: "underline",
                fontWeight: "500",
              },
              strong: {
                color: "var(--tw-prose-bold)",
                fontWeight: "600",
              },
              "a strong": {
                color: "inherit",
              },
              "blockquote strong": {
                color: "inherit",
              },
              "thead th strong": {
                color: "inherit",
              },
              ol: {
                listStyleType: "decimal",
              },
              'ol[type="A"]': {
                listStyleType: "upper-alpha",
              },
              'ol[type="a"]': {
                listStyleType: "lower-alpha",
              },
              'ol[type="A" s]': {
                listStyleType: "upper-alpha",
              },
              'ol[type="a" s]': {
                listStyleType: "lower-alpha",
              },
              'ol[type="I"]': {
                listStyleType: "upper-roman",
              },
              'ol[type="i"]': {
                listStyleType: "lower-roman",
              },
              'ol[type="I" s]': {
                listStyleType: "upper-roman",
              },
              'ol[type="i" s]': {
                listStyleType: "lower-roman",
              },
              'ol[type="1"]': {
                listStyleType: "decimal",
              },
              ul: {
                listStyleType: "disc",
              },
              "ol > li::marker": {
                fontWeight: "400",
                color: "var(--tw-prose-counters)",
              },
              "ul > li::marker": {
                color: "var(--tw-prose-bullets)",
              },
              dt: {
                color: "var(--tw-prose-headings)",
                fontWeight: "600",
              },
              hr: {
                borderColor: "var(--tw-prose-hr)",
                borderTopWidth: 1,
              },
              blockquote: {
                fontWeight: "500",
                fontStyle: "italic",
                color: "var(--tw-prose-quotes)",
                borderInlineStartWidth: "0.25rem",
                borderInlineStartColor: "var(--tw-prose-quote-borders)",
                quotes: '"\\201C""\\201D""\\2018""\\2019"',
              },
              "blockquote p:first-of-type::before": {
                content: "open-quote",
              },
              "blockquote p:last-of-type::after": {
                content: "close-quote",
              },
              h1: {
                color: "var(--tw-prose-headings)",
                fontWeight: "800",
              },
              "h1 strong": {
                fontWeight: "900",
                color: "inherit",
              },
              h2: {
                color: "var(--tw-prose-headings)",
                fontWeight: "700",
              },
              "h2 strong": {
                fontWeight: "800",
                color: "inherit",
              },
              h3: {
                color: "var(--tw-prose-headings)",
                fontWeight: "600",
              },
              "h3 strong": {
                fontWeight: "700",
                color: "inherit",
              },
              h4: {
                color: "var(--tw-prose-headings)",
                fontWeight: "600",
              },
              "h4 strong": {
                fontWeight: "700",
                color: "inherit",
              },
              img: {},
              picture: {
                display: "block",
              },
              video: {},
              kbd: {
                fontWeight: "500",
                fontFamily: "inherit",
                color: "var(--tw-prose-kbd)",
                boxShadow:
                  "0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%)",
              },
              code: {
                color: "var(--tw-prose-code)",
                fontWeight: "600",
              },
              "code::before": {
                content: '"`"',
              },
              "code::after": {
                content: '"`"',
              },
              "a code": {
                color: "inherit",
              },
              "h1 code": {
                color: "inherit",
              },
              "h2 code": {
                color: "inherit",
              },
              "h3 code": {
                color: "inherit",
              },
              "h4 code": {
                color: "inherit",
              },
              "blockquote code": {
                color: "inherit",
              },
              "thead th code": {
                color: "inherit",
              },
              pre: {
                color: "var(--tw-prose-pre-code)",
                backgroundColor: "var(--tw-prose-pre-bg)",
                overflowX: "auto",
                fontWeight: "400",
              },
              "pre code": {
                backgroundColor: "transparent",
                borderWidth: "0",
                borderRadius: "0",
                padding: "0",
                fontWeight: "inherit",
                color: "inherit",
                fontSize: "inherit",
                fontFamily: "inherit",
                lineHeight: "inherit",
              },
              "pre code::before": {
                content: "none",
              },
              "pre code::after": {
                content: "none",
              },
              table: {
                width: "100%",
                tableLayout: "auto",
                textAlign: "start",
                marginTop: "em(32, 16)",
                marginBottom: "em(32, 16)",
              },
              thead: {
                borderBottomWidth: "1px",
                borderBottomColor: "var(--tw-prose-th-borders)",
              },
              "thead th": {
                color: "var(--tw-prose-headings)",
                fontWeight: "600",
                verticalAlign: "bottom",
              },
              "tbody tr": {
                borderBottomWidth: "1px",
                borderBottomColor: "var(--tw-prose-td-borders)",
              },
              "tbody tr:last-child": {
                borderBottomWidth: "0",
              },
              "tbody td": {
                verticalAlign: "baseline",
              },
              tfoot: {
                borderTopWidth: "1px",
                borderTopColor: "var(--tw-prose-th-borders)",
              },
              "tfoot td": {
                verticalAlign: "top",
              },
              "figure > *": {},
              figcaption: {
                color: "var(--tw-prose-captions)",
              },
            },
            {
              "--tw-prose-body": "#374151",
              "--tw-prose-headings": "#111827",
              "--tw-prose-lead": "#4b5563",
              "--tw-prose-links": "#111827",
              "--tw-prose-bold": "#111827",
              "--tw-prose-counters": "#6b7280",
              "--tw-prose-bullets": "#d1d5db",
              "--tw-prose-hr": "#e5e7eb",
              "--tw-prose-quotes": "#111827",
              "--tw-prose-quote-borders": "#e5e7eb",
              "--tw-prose-captions": "#6b7280",
              "--tw-prose-kbd": "#111827",
              "--tw-prose-kbd-shadows": "24 24 27",
              "--tw-prose-code": "#111827",
              "--tw-prose-pre-code": "#e5e7eb",
              "--tw-prose-pre-bg": "#1f2937",
              "--tw-prose-th-borders": "#d1d5db",
              "--tw-prose-td-borders": "#e5e7eb",
              "--tw-prose-invert-body": "#d1d5db",
              "--tw-prose-invert-headings": "#fff",
              "--tw-prose-invert-lead": "#9ca3af",
              "--tw-prose-invert-links": "#fff",
              "--tw-prose-invert-bold": "#fff",
              "--tw-prose-invert-counters": "#9ca3af",
              "--tw-prose-invert-bullets": "#4b5563",
              "--tw-prose-invert-hr": "#374151",
              "--tw-prose-invert-quotes": "#f3f4f6",
              "--tw-prose-invert-quote-borders": "#374151",
              "--tw-prose-invert-captions": "#9ca3af",
              "--tw-prose-invert-kbd": "#fff",
              "--tw-prose-invert-kbd-shadows": "255 255 255",
              "--tw-prose-invert-code": "#fff",
              "--tw-prose-invert-pre-code": "#d1d5db",
              "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
              "--tw-prose-invert-th-borders": "#4b5563",
              "--tw-prose-invert-td-borders": "#374151",
            },
            {
              fontSize: "rem(16)",
              lineHeight: "round(28 / 16)",
              p: {
                marginTop: "em(20, 16)",
                marginBottom: "em(20, 16)",
              },
              '[class~="lead"]': {
                fontSize: "em(20, 16)",
                lineHeight: "round(32 / 20)",
                marginTop: "em(24, 20)",
                marginBottom: "em(24, 20)",
              },
              blockquote: {
                marginTop: "em(32, 20)",
                marginBottom: "em(32, 20)",
                paddingInlineStart: "em(20, 20)",
              },
              h1: {
                fontSize: "em(36, 16)",
                marginTop: "0",
                marginBottom: "em(32, 36)",
                lineHeight: "round(40 / 36)",
              },
              h2: {
                fontSize: "em(24, 16)",
                marginTop: "em(48, 24)",
                marginBottom: "em(24, 24)",
                lineHeight: "round(32 / 24)",
              },
              h3: {
                fontSize: "em(20, 16)",
                marginTop: "em(32, 20)",
                marginBottom: "em(12, 20)",
                lineHeight: "round(32 / 20)",
              },
              h4: {
                marginTop: "em(24, 16)",
                marginBottom: "em(8, 16)",
                lineHeight: "round(24 / 16)",
              },
              img: {
                marginTop: "em(32, 16)",
                marginBottom: "em(32, 16)",
              },
              picture: {
                marginTop: "em(32, 16)",
                marginBottom: "em(32, 16)",
              },
              "picture > img": {
                marginTop: "0",
                marginBottom: "0",
              },
              video: {
                marginTop: "em(32, 16)",
                marginBottom: "em(32, 16)",
              },
              kbd: {
                fontSize: "em(14, 16)",
                borderRadius: "rem(5)",
                paddingTop: "em(3, 16)",
                paddingInlineEnd: "em(6, 16)",
                paddingBottom: "em(3, 16)",
                paddingInlineStart: "em(6, 16)",
              },
              code: {
                fontSize: "em(14, 16)",
              },
              "h2 code": {
                fontSize: "em(21, 24)",
              },
              "h3 code": {
                fontSize: "em(18, 20)",
              },
              pre: {
                fontSize: "em(14, 16)",
                lineHeight: "round(24 / 14)",
                marginTop: "em(24, 14)",
                marginBottom: "em(24, 14)",
                borderRadius: "rem(6)",
                paddingTop: "em(12, 14)",
                paddingInlineEnd: "em(16, 14)",
                paddingBottom: "em(12, 14)",
                paddingInlineStart: "em(16, 14)",
              },
              ol: {
                marginTop: "em(20, 16)",
                marginBottom: "em(20, 16)",
                paddingInlineStart: "em(26, 16)",
              },
              ul: {
                marginTop: "em(20, 16)",
                marginBottom: "em(20, 16)",
                paddingInlineStart: "em(26, 16)",
              },
              li: {
                marginTop: "em(8, 16)",
                marginBottom: "em(8, 16)",
              },
              "ol > li": {
                paddingInlineStart: "em(6, 16)",
              },
              "ul > li": {
                paddingInlineStart: "em(6, 16)",
              },
              "> ul > li p": {
                marginTop: "em(12, 16)",
                marginBottom: "em(12, 16)",
              },
              "> ul > li > *:first-child": {
                marginTop: "em(20, 16)",
              },
              "> ul > li > *:last-child": {
                marginBottom: "em(20, 16)",
              },
              "> ol > li > *:first-child": {
                marginTop: "em(20, 16)",
              },
              "> ol > li > *:last-child": {
                marginBottom: "em(20, 16)",
              },
              "ul ul, ul ol, ol ul, ol ol": {
                marginTop: "em(12, 16)",
                marginBottom: "em(12, 16)",
              },
              dl: {
                marginTop: "em(20, 16)",
                marginBottom: "em(20, 16)",
              },
              dt: {
                marginTop: "em(20, 16)",
              },
              dd: {
                marginTop: "em(8, 16)",
                paddingInlineStart: "em(26, 16)",
              },
              hr: {
                marginTop: "em(48, 16)",
                marginBottom: "em(48, 16)",
              },
              "hr + *": {
                marginTop: "0",
              },
              "h2 + *": {
                marginTop: "0",
              },
              "h3 + *": {
                marginTop: "0",
              },
              "h4 + *": {
                marginTop: "0",
              },
              table: {
                fontSize: "em(14, 16)",
                lineHeight: "round(24 / 14)",
              },
              "thead th": {
                paddingInlineEnd: "em(8, 14)",
                paddingBottom: "em(8, 14)",
                paddingInlineStart: "em(8, 14)",
              },
              "thead th:first-child": {
                paddingInlineStart: "0",
              },
              "thead th:last-child": {
                paddingInlineEnd: "0",
              },
              "tbody td, tfoot td": {
                paddingTop: "em(8, 14)",
                paddingInlineEnd: "em(8, 14)",
                paddingBottom: "em(8, 14)",
                paddingInlineStart: "em(8, 14)",
              },
              "tbody td:first-child, tfoot td:first-child": {
                paddingInlineStart: "0",
              },
              "tbody td:last-child, tfoot td:last-child": {
                paddingInlineEnd: "0",
              },
              figure: {
                marginTop: "em(32, 16)",
                marginBottom: "em(32, 16)",
              },
              "figure > *": {
                marginTop: "0",
                marginBottom: "0",
              },
              figcaption: {
                fontSize: "em(14, 16)",
                lineHeight: "round(20 / 14)",
                marginTop: "em(12, 14)",
              },
            },
            {
              "> :first-child": {
                marginTop: "0",
              },
              "> :last-child": {
                marginBottom: "0",
              },
            },
          ],
        },
        sm: {
          css: [
            {
              fontSize: "rem(14)",
              lineHeight: "round(24 / 14)",
              p: {
                marginTop: "em(16, 14)",
                marginBottom: "em(16, 14)",
              },
              '[class~="lead"]': {
                fontSize: "em(18, 14)",
                lineHeight: "round(28 / 18)",
                marginTop: "em(16, 18)",
                marginBottom: "em(16, 18)",
              },
              blockquote: {
                marginTop: "em(24, 18)",
                marginBottom: "em(24, 18)",
                paddingInlineStart: "em(20, 18)",
              },
              h1: {
                fontSize: "em(30, 14)",
                marginTop: "0",
                marginBottom: "em(24, 30)",
                lineHeight: "round(36 / 30)",
              },
              h2: {
                fontSize: "em(20, 14)",
                marginTop: "em(32, 20)",
                marginBottom: "em(16, 20)",
                lineHeight: "round(28 / 20)",
              },
              h3: {
                fontSize: "em(18, 14)",
                marginTop: "em(28, 18)",
                marginBottom: "em(8, 18)",
                lineHeight: "round(28 / 18)",
              },
              h4: {
                marginTop: "em(20, 14)",
                marginBottom: "em(8, 14)",
                lineHeight: "round(20 / 14)",
              },
              img: {
                marginTop: "em(24, 14)",
                marginBottom: "em(24, 14)",
              },
              picture: {
                marginTop: "em(24, 14)",
                marginBottom: "em(24, 14)",
              },
              "picture > img": {
                marginTop: "0",
                marginBottom: "0",
              },
              video: {
                marginTop: "em(24, 14)",
                marginBottom: "em(24, 14)",
              },
              kbd: {
                fontSize: "em(12, 14)",
                borderRadius: "rem(5)",
                paddingTop: "em(2, 14)",
                paddingInlineEnd: "em(5, 14)",
                paddingBottom: "em(2, 14)",
                paddingInlineStart: "em(5, 14)",
              },
              code: {
                fontSize: "em(12, 14)",
              },
              "h2 code": {
                fontSize: "em(18, 20)",
              },
              "h3 code": {
                fontSize: "em(16, 18)",
              },
              pre: {
                fontSize: "em(12, 14)",
                lineHeight: "round(20 / 12)",
                marginTop: "em(20, 12)",
                marginBottom: "em(20, 12)",
                borderRadius: "rem(4)",
                paddingTop: "em(8, 12)",
                paddingInlineEnd: "em(12, 12)",
                paddingBottom: "em(8, 12)",
                paddingInlineStart: "em(12, 12)",
              },
              ol: {
                marginTop: "em(16, 14)",
                marginBottom: "em(16, 14)",
                paddingInlineStart: "em(22, 14)",
              },
              ul: {
                marginTop: "em(16, 14)",
                marginBottom: "em(16, 14)",
                paddingInlineStart: "em(22, 14)",
              },
              li: {
                marginTop: "em(4, 14)",
                marginBottom: "em(4, 14)",
              },
              "ol > li": {
                paddingInlineStart: "em(6, 14)",
              },
              "ul > li": {
                paddingInlineStart: "em(6, 14)",
              },
              "> ul > li p": {
                marginTop: "em(8, 14)",
                marginBottom: "em(8, 14)",
              },
              "> ul > li > *:first-child": {
                marginTop: "em(16, 14)",
              },
              "> ul > li > *:last-child": {
                marginBottom: "em(16, 14)",
              },
              "> ol > li > *:first-child": {
                marginTop: "em(16, 14)",
              },
              "> ol > li > *:last-child": {
                marginBottom: "em(16, 14)",
              },
              "ul ul, ul ol, ol ul, ol ol": {
                marginTop: "em(8, 14)",
                marginBottom: "em(8, 14)",
              },
              dl: {
                marginTop: "em(16, 14)",
                marginBottom: "em(16, 14)",
              },
              dt: {
                marginTop: "em(16, 14)",
              },
              dd: {
                marginTop: "em(4, 14)",
                paddingInlineStart: "em(22, 14)",
              },
              hr: {
                marginTop: "em(40, 14)",
                marginBottom: "em(40, 14)",
              },
              "hr + *": {
                marginTop: "0",
              },
              "h2 + *": {
                marginTop: "0",
              },
              "h3 + *": {
                marginTop: "0",
              },
              "h4 + *": {
                marginTop: "0",
              },
              table: {
                fontSize: "em(12, 14)",
                lineHeight: "round(18 / 12)",
              },
              "thead th": {
                paddingInlineEnd: "em(12, 12)",
                paddingBottom: "em(8, 12)",
                paddingInlineStart: "em(12, 12)",
              },
              "thead th:first-child": {
                paddingInlineStart: "0",
              },
              "thead th:last-child": {
                paddingInlineEnd: "0",
              },
              "tbody td, tfoot td": {
                paddingTop: "em(8, 12)",
                paddingInlineEnd: "em(12, 12)",
                paddingBottom: "em(8, 12)",
                paddingInlineStart: "em(12, 12)",
              },
              "tbody td:first-child, tfoot td:first-child": {
                paddingInlineStart: "0",
              },
              "tbody td:last-child, tfoot td:last-child": {
                paddingInlineEnd: "0",
              },
              figure: {
                marginTop: "em(24, 14)",
                marginBottom: "em(24, 14)",
              },
              "figure > *": {
                marginTop: "0",
                marginBottom: "0",
              },
              figcaption: {
                fontSize: "em(12, 14)",
                lineHeight: "round(16 / 12)",
                marginTop: "em(8, 12)",
              },
            },
            {
              "> :first-child": {
                marginTop: "0",
              },
              "> :last-child": {
                marginBottom: "0",
              },
            },
          ],
        },
        lg: {
          css: [
            {
              fontSize: "rem(18)",
              lineHeight: "round(32 / 18)",
              p: {
                marginTop: "em(24, 18)",
                marginBottom: "em(24, 18)",
              },
              '[class~="lead"]': {
                fontSize: "em(22, 18)",
                lineHeight: "round(32 / 22)",
                marginTop: "em(24, 22)",
                marginBottom: "em(24, 22)",
              },
              blockquote: {
                marginTop: "em(40, 24)",
                marginBottom: "em(40, 24)",
                paddingInlineStart: "em(24, 24)",
              },
              h1: {
                fontSize: "em(48, 18)",
                marginTop: "0",
                marginBottom: "em(40, 48)",
                lineHeight: "round(48 / 48)",
              },
              h2: {
                fontSize: "em(30, 18)",
                marginTop: "em(56, 30)",
                marginBottom: "em(32, 30)",
                lineHeight: "round(40 / 30)",
              },
              h3: {
                fontSize: "em(24, 18)",
                marginTop: "em(40, 24)",
                marginBottom: "em(16, 24)",
                lineHeight: "round(36 / 24)",
              },
              h4: {
                marginTop: "em(32, 18)",
                marginBottom: "em(8, 18)",
                lineHeight: "round(28 / 18)",
              },
              img: {
                marginTop: "em(32, 18)",
                marginBottom: "em(32, 18)",
              },
              picture: {
                marginTop: "em(32, 18)",
                marginBottom: "em(32, 18)",
              },
              "picture > img": {
                marginTop: "0",
                marginBottom: "0",
              },
              video: {
                marginTop: "em(32, 18)",
                marginBottom: "em(32, 18)",
              },
              kbd: {
                fontSize: "em(16, 18)",
                borderRadius: "rem(5)",
                paddingTop: "em(4, 18)",
                paddingInlineEnd: "em(8, 18)",
                paddingBottom: "em(4, 18)",
                paddingInlineStart: "em(8, 18)",
              },
              code: {
                fontSize: "em(16, 18)",
              },
              "h2 code": {
                fontSize: "em(26, 30)",
              },
              "h3 code": {
                fontSize: "em(21, 24)",
              },
              pre: {
                fontSize: "em(16, 18)",
                lineHeight: "round(28 / 16)",
                marginTop: "em(32, 16)",
                marginBottom: "em(32, 16)",
                borderRadius: "rem(6)",
                paddingTop: "em(16, 16)",
                paddingInlineEnd: "em(24, 16)",
                paddingBottom: "em(16, 16)",
                paddingInlineStart: "em(24, 16)",
              },
              ol: {
                marginTop: "em(24, 18)",
                marginBottom: "em(24, 18)",
                paddingInlineStart: "em(28, 18)",
              },
              ul: {
                marginTop: "em(24, 18)",
                marginBottom: "em(24, 18)",
                paddingInlineStart: "em(28, 18)",
              },
              li: {
                marginTop: "em(12, 18)",
                marginBottom: "em(12, 18)",
              },
              "ol > li": {
                paddingInlineStart: "em(8, 18)",
              },
              "ul > li": {
                paddingInlineStart: "em(8, 18)",
              },
              "> ul > li p": {
                marginTop: "em(16, 18)",
                marginBottom: "em(16, 18)",
              },
              "> ul > li > *:first-child": {
                marginTop: "em(24, 18)",
              },
              "> ul > li > *:last-child": {
                marginBottom: "em(24, 18)",
              },
              "> ol > li > *:first-child": {
                marginTop: "em(24, 18)",
              },
              "> ol > li > *:last-child": {
                marginBottom: "em(24, 18)",
              },
              "ul ul, ul ol, ol ul, ol ol": {
                marginTop: "em(16, 18)",
                marginBottom: "em(16, 18)",
              },
              dl: {
                marginTop: "em(24, 18)",
                marginBottom: "em(24, 18)",
              },
              dt: {
                marginTop: "em(24, 18)",
              },
              dd: {
                marginTop: "em(12, 18)",
                paddingInlineStart: "em(28, 18)",
              },
              hr: {
                marginTop: "em(56, 18)",
                marginBottom: "em(56, 18)",
              },
              "hr + *": {
                marginTop: "0",
              },
              "h2 + *": {
                marginTop: "0",
              },
              "h3 + *": {
                marginTop: "0",
              },
              "h4 + *": {
                marginTop: "0",
              },
              table: {
                fontSize: "em(16, 18)",
                lineHeight: "round(24 / 16)",
              },
              "thead th": {
                paddingInlineEnd: "em(12, 16)",
                paddingBottom: "em(12, 16)",
                paddingInlineStart: "em(12, 16)",
              },
              "thead th:first-child": {
                paddingInlineStart: "0",
              },
              "thead th:last-child": {
                paddingInlineEnd: "0",
              },
              "tbody td, tfoot td": {
                paddingTop: "em(12, 16)",
                paddingInlineEnd: "em(12, 16)",
                paddingBottom: "em(12, 16)",
                paddingInlineStart: "em(12, 16)",
              },
              "tbody td:first-child, tfoot td:first-child": {
                paddingInlineStart: "0",
              },
              "tbody td:last-child, tfoot td:last-child": {
                paddingInlineEnd: "0",
              },
              figure: {
                marginTop: "em(32, 18)",
                marginBottom: "em(32, 18)",
              },
              "figure > *": {
                marginTop: "0",
                marginBottom: "0",
              },
              figcaption: {
                fontSize: "em(16, 18)",
                lineHeight: "round(24 / 16)",
                marginTop: "em(16, 16)",
              },
            },
            {
              "> :first-child": {
                marginTop: "0",
              },
              "> :last-child": {
                marginBottom: "0",
              },
            },
          ],
        },
        xl: {
          css: [
            {
              fontSize: "rem(20)",
              lineHeight: "round(36 / 20)",
              p: {
                marginTop: "em(24, 20)",
                marginBottom: "em(24, 20)",
              },
              '[class~="lead"]': {
                fontSize: "em(24, 20)",
                lineHeight: "round(36 / 24)",
                marginTop: "em(24, 24)",
                marginBottom: "em(24, 24)",
              },
              blockquote: {
                marginTop: "em(48, 30)",
                marginBottom: "em(48, 30)",
                paddingInlineStart: "em(32, 30)",
              },
              h1: {
                fontSize: "em(56, 20)",
                marginTop: "0",
                marginBottom: "em(48, 56)",
                lineHeight: "round(56 / 56)",
              },
              h2: {
                fontSize: "em(36, 20)",
                marginTop: "em(56, 36)",
                marginBottom: "em(32, 36)",
                lineHeight: "round(40 / 36)",
              },
              h3: {
                fontSize: "em(30, 20)",
                marginTop: "em(48, 30)",
                marginBottom: "em(20, 30)",
                lineHeight: "round(40 / 30)",
              },
              h4: {
                marginTop: "em(36, 20)",
                marginBottom: "em(12, 20)",
                lineHeight: "round(32 / 20)",
              },
              img: {
                marginTop: "em(40, 20)",
                marginBottom: "em(40, 20)",
              },
              picture: {
                marginTop: "em(40, 20)",
                marginBottom: "em(40, 20)",
              },
              "picture > img": {
                marginTop: "0",
                marginBottom: "0",
              },
              video: {
                marginTop: "em(40, 20)",
                marginBottom: "em(40, 20)",
              },
              kbd: {
                fontSize: "em(18, 20)",
                borderRadius: "rem(5)",
                paddingTop: "em(5, 20)",
                paddingInlineEnd: "em(8, 20)",
                paddingBottom: "em(5, 20)",
                paddingInlineStart: "em(8, 20)",
              },
              code: {
                fontSize: "em(18, 20)",
              },
              "h2 code": {
                fontSize: "em(31, 36)",
              },
              "h3 code": {
                fontSize: "em(27, 30)",
              },
              pre: {
                fontSize: "em(18, 20)",
                lineHeight: "round(32 / 18)",
                marginTop: "em(36, 18)",
                marginBottom: "em(36, 18)",
                borderRadius: "rem(8)",
                paddingTop: "em(20, 18)",
                paddingInlineEnd: "em(24, 18)",
                paddingBottom: "em(20, 18)",
                paddingInlineStart: "em(24, 18)",
              },
              ol: {
                marginTop: "em(24, 20)",
                marginBottom: "em(24, 20)",
                paddingInlineStart: "em(32, 20)",
              },
              ul: {
                marginTop: "em(24, 20)",
                marginBottom: "em(24, 20)",
                paddingInlineStart: "em(32, 20)",
              },
              li: {
                marginTop: "em(12, 20)",
                marginBottom: "em(12, 20)",
              },
              "ol > li": {
                paddingInlineStart: "em(8, 20)",
              },
              "ul > li": {
                paddingInlineStart: "em(8, 20)",
              },
              "> ul > li p": {
                marginTop: "em(16, 20)",
                marginBottom: "em(16, 20)",
              },
              "> ul > li > *:first-child": {
                marginTop: "em(24, 20)",
              },
              "> ul > li > *:last-child": {
                marginBottom: "em(24, 20)",
              },
              "> ol > li > *:first-child": {
                marginTop: "em(24, 20)",
              },
              "> ol > li > *:last-child": {
                marginBottom: "em(24, 20)",
              },
              "ul ul, ul ol, ol ul, ol ol": {
                marginTop: "em(16, 20)",
                marginBottom: "em(16, 20)",
              },
              dl: {
                marginTop: "em(24, 20)",
                marginBottom: "em(24, 20)",
              },
              dt: {
                marginTop: "em(24, 20)",
              },
              dd: {
                marginTop: "em(12, 20)",
                paddingInlineStart: "em(32, 20)",
              },
              hr: {
                marginTop: "em(56, 20)",
                marginBottom: "em(56, 20)",
              },
              "hr + *": {
                marginTop: "0",
              },
              "h2 + *": {
                marginTop: "0",
              },
              "h3 + *": {
                marginTop: "0",
              },
              "h4 + *": {
                marginTop: "0",
              },
              table: {
                fontSize: "em(18, 20)",
                lineHeight: "round(28 / 18)",
              },
              "thead th": {
                paddingInlineEnd: "em(12, 18)",
                paddingBottom: "em(16, 18)",
                paddingInlineStart: "em(12, 18)",
              },
              "thead th:first-child": {
                paddingInlineStart: "0",
              },
              "thead th:last-child": {
                paddingInlineEnd: "0",
              },
              "tbody td, tfoot td": {
                paddingTop: "em(16, 18)",
                paddingInlineEnd: "em(12, 18)",
                paddingBottom: "em(16, 18)",
                paddingInlineStart: "em(12, 18)",
              },
              "tbody td:first-child, tfoot td:first-child": {
                paddingInlineStart: "0",
              },
              "tbody td:last-child, tfoot td:last-child": {
                paddingInlineEnd: "0",
              },
              figure: {
                marginTop: "em(40, 20)",
                marginBottom: "em(40, 20)",
              },
              "figure > *": {
                marginTop: "0",
                marginBottom: "0",
              },
              figcaption: {
                fontSize: "em(18, 20)",
                lineHeight: "round(28 / 18)",
                marginTop: "em(18, 18)",
              },
            },
            {
              "> :first-child": {
                marginTop: "0",
              },
              "> :last-child": {
                marginBottom: "0",
              },
            },
          ],
        },

        slate: {
          css: {
            "--tw-prose-body": "#334155",
            "--tw-prose-headings": "#0f172a",
            "--tw-prose-lead": "#475569",
            "--tw-prose-links": "#0f172a",
            "--tw-prose-bold": "#0f172a",
            "--tw-prose-counters": "#64748b",
            "--tw-prose-bullets": "#cbd5e1",
            "--tw-prose-hr": "#e2e8f0",
            "--tw-prose-quotes": "#0f172a",
            "--tw-prose-quote-borders": "#e2e8f0",
            "--tw-prose-captions": "#64748b",
            "--tw-prose-kbd": "#0f172a",
            "--tw-prose-kbd-shadows": "15 23 42",
            "--tw-prose-code": "#0f172a",
            "--tw-prose-pre-code": "#e2e8f0",
            "--tw-prose-pre-bg": "#1e293b",
            "--tw-prose-th-borders": "#cbd5e1",
            "--tw-prose-td-borders": "#e2e8f0",
            "--tw-prose-invert-body": "#cbd5e1",
            "--tw-prose-invert-headings": "#fff",
            "--tw-prose-invert-lead": "#94a3b8",
            "--tw-prose-invert-links": "#fff",
            "--tw-prose-invert-bold": "#fff",
            "--tw-prose-invert-counters": "#94a3b8",
            "--tw-prose-invert-bullets": "#475569",
            "--tw-prose-invert-hr": "#334155",
            "--tw-prose-invert-quotes": "#f1f5f9",
            "--tw-prose-invert-quote-borders": "#334155",
            "--tw-prose-invert-captions": "#94a3b8",
            "--tw-prose-invert-kbd": "#fff",
            "--tw-prose-invert-kbd-shadows": "255 255 255",
            "--tw-prose-invert-code": "#fff",
            "--tw-prose-invert-pre-code": "#cbd5e1",
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": "#475569",
            "--tw-prose-invert-td-borders": "#334155",
          },
        },

        // Invert (for dark mode)
        invert: {
          css: {
            "--tw-prose-body": "var(--tw-prose-invert-body)",
            "--tw-prose-headings": "var(--tw-prose-invert-headings)",
            "--tw-prose-lead": "var(--tw-prose-invert-lead)",
            "--tw-prose-links": "var(--tw-prose-invert-links)",
            "--tw-prose-bold": "var(--tw-prose-invert-bold)",
            "--tw-prose-counters": "var(--tw-prose-invert-counters)",
            "--tw-prose-bullets": "var(--tw-prose-invert-bullets)",
            "--tw-prose-hr": "var(--tw-prose-invert-hr)",
            "--tw-prose-quotes": "var(--tw-prose-invert-quotes)",
            "--tw-prose-quote-borders": "var(--tw-prose-invert-quote-borders)",
            "--tw-prose-captions": "var(--tw-prose-invert-captions)",
            "--tw-prose-kbd": "var(--tw-prose-invert-kbd)",
            "--tw-prose-kbd-shadows": "var(--tw-prose-invert-kbd-shadows)",
            "--tw-prose-code": "var(--tw-prose-invert-code)",
            "--tw-prose-pre-code": "var(--tw-prose-invert-pre-code)",
            "--tw-prose-pre-bg": "var(--tw-prose-invert-pre-bg)",
            "--tw-prose-th-borders": "var(--tw-prose-invert-th-borders)",
            "--tw-prose-td-borders": "var(--tw-prose-invert-td-borders)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwind-scrollbar-hide"),
  ],
};

export default config;
