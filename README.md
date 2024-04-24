# Django Model Gallery

## 회의 때 설명할 안건
- `main` 브랜치에 `push`를 하면, 자동으로 post가 올라갑니다. Next.js에서 실행시에 md 파일들을 긁어오기 때문입니다.
- github pages 배포를 조직 단위로 하려면 조직의 이름 = 레포의 이름이어야 해서
- 부득이하게 이전버전 레포의 이름을 바꾸었습니다.
- 풀 받으실 때 오류 날 수 있으니 참고바람(리모트가 자동으로 안바뀌는 경우이니 리셋해주세요.) 
- 대부분의 기능은 살려져있으나 아직 TODO에 있는거 만드는 중입니다.
- 예외처리가 아직 부족하여 post를 추가하다 에러를 만날 수 있습니다. 제보 바랍니다.
- 일요일까지 열심히 고칠 예정
- 현재 md파일 만드는 가이드가, 파일이름을 001 이렇게 하라고 되어있는데...? 근데 3명 이상씩 만들면 파일명을 어떻게 안겹치게하지...
- 대안1: 001을 빼고 파일명으로만 하고, 개별 주소를 slug = 파일명으로 한다.
- 대안2: 업로드시 타임스탬프를 찍어서 그거로 정렬 및 필터를 하고 -> 타임스탬프에 따라 id를 숫자로 부여한다.
- DB가 있음 참 좋은데 아무튼 대안도 추천받아야겠습니다.
- 내일 점심 쯤 정리해서 라운지에 올릴 예정

## TODO:

- useViz에 유효하지 않은 값이 들어갔을때 이전 그래프를 유지하면서 경고 스테이터스 띄우기
- 컨트리뷰트, 라이센스 등 기존 사이트의 md를 가져올 수 있게 getPosts 리팩토링
- 카테고리, 푸터
- 주석 달기
- 기존 v1에 있는거 옮기기
- 검색 기능 추가

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
import { CATEGORIES } from "./categories";

const categoryTitles = Object.keys(CATEGORIES);
const NAVBAR_ITEMS = ["Home", "About", "Contact", ...categoryTitles];

const NAVBAR_TITLE = "Django Model Gallery";
const NAVBAR_TITLE_SHORT = "DMG";

export { NAVBAR_ITEMS, NAVBAR_TITLE, NAVBAR_TITLE_SHORT };
```

### 카테고리 설정

constants > categories.ts

카테고리는 다음과 같이 설정합니다:

```ts
import { Category } from "@/types/posts/posts";

const CATEGORIES: Category = {
  shopping: {
    categoryName: "shopping",
    title: "쇼핑",
    description: "쇼핑 관련한 정보를 담은 카테고리",
    icon: "/assets/icons/star.svg",
  },
  // ...
};

const CATEGORIES_ARRAY = Object.entries(CATEGORIES).map(([key, value]) => ({
  key,
  ...value,
}));

export { CATEGORIES, CATEGORIES_ARRAY };
export type CategoryKey = keyof typeof CATEGORIES;
```

카테고리 아이콘

> https://fonts.google.com/icons

### 메타데이터 설정

constants > SEO.ts

LOOT_LAYOUT_METADATA

LOOT_POSTS_METADATA

LOOT_POST_DETAIL_METADATA

현재 3개가 있고, 이 중에서 POST_DETAIL은 동적으로 메타데이터를 교체할 수 있습니다.

Next.js의 metadata 공식문서를 참고하여 필요한 prop을 추가할 수 있습니다.

> https://nextjs.org/docs/app/api-reference/functions/generate-metadata
