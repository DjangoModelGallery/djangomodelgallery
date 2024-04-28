# Django Model Gallery

## TODO:

- useViz에 유효하지 않은 값이 들어갔을때 이전 그래프를 유지하면서 경고 스테이터스 띄우기
- 주석 달기

### framework

- Next.js
- Typescript

### state management

- Zustand

### UI

- tailwindCSS
- daisyUI

## 프로젝트 사용법

### 실행 방법

```bash
git clone [repo-url] [appname]
cd [appname]
npm install


npm run dev
```

### Constants

이 프로젝트에서는 여러 가지 설정과 상수를 사용하여 컨텐츠를 정의할 수 있습니다. 현재는 프로젝트의 미디어 쿼리 브레이크포인트, 네비게이션 바 항목, 카테고리 등을 커스텀합니다.

root의 constants 폴더를 확인하세요.

### 미디어 쿼리 브레이크포인트 설정

constants > media.ts

미디어 쿼리 브레이크포인트는 다음과 같이 설정합니다:

```ts
import { Breakpoints } from "@/types/ui/media";

const breakpoints: Breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export { breakpoints };
```

### 네비게이션 바 항목 설정

constants > navigation.ts

네비게이션 바 항목은 다음과 같이 설정합니다:

```ts
const NAVBAR_ITEMS = ["Home", "About", "Contact"];

const NAVBAR_TITLE = "Django Model Gallery";
const NAVBAR_TITLE_SHORT = "DMG";

export { NAVBAR_ITEMS, NAVBAR_TITLE, NAVBAR_TITLE_SHORT };
```

### 메타데이터 설정

constants > SEO.ts

LOOT_LAYOUT_METADATA

LOOT_POSTS_METADATA

LOOT_ABOUT_METADATA

LOOT_POST_DETAIL_METADATA

현재 4개가 있고, 이 중에서 POST_DETAIL은 동적으로 메타데이터를 교체할 수 있습니다.

Next.js의 metadata 공식문서를 참고하여 필요한 prop을 추가할 수 있습니다.

> https://nextjs.org/docs/app/api-reference/functions/generate-metadata
