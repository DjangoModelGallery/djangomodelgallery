---
id: 001
title: Dl
date: 2024-03-24
category: Blog
modelCount: 7
tags:
  - Django
  - Model
  - Blog
  - Post
fileName: about.md
contributor:
  name: 이혜림
  social:
    github: https://github.com/matty255
---

[[toc]]

## md 파일에 대한 주의사항

이 파일은 예시 파일입니다. 이렇게, 실제 파일을 생성할 때는 위의 프론트매터(Front Matter)가 모두 포함되어야 합니다. 프론트매터는 파일의 메타데이터를 정의하는 데 사용되며, `id`, `title`, `date`, `category`, `modelCount`, `tags`, `fileName`, `contributor` 등의 필드를 포함해야 합니다. 각 필드의 값은 해당 파일의 내용을 정확하게 반영해야 합니다.
이 중, `slug` = 주소는 `filename`에서 md를 뺀 것입니다.

# 이 워크스페이스는 다음과 같은 구조를 가지고 있습니다:

- `.env.local`, `.env.local.example`: 환경 변수를 설정하는 파일들입니다.
- `.eslintrc.json`: ESLint 설정 파일입니다.
- `.github/workflows/`: GitHub Actions 워크플로우를 정의하는 디렉토리입니다.
- `.gitignore`: Git이 추적하지 않을 파일과 디렉토리를 지정하는 파일입니다.
- `.next/`: Next.js의 빌드 결과물이 저장되는 디렉토리입니다.
- `.tailwind.config.example.ts`: Tailwind CSS 설정 예제 파일입니다.
- `.vscode/settings.json`: Visual Studio Code 설정 파일입니다.
- `about/about.md`: 프로젝트에 대한 정보를 담은 Markdown 파일입니다.
- `constants/`: 프로젝트에서 사용하는 상수를 정의하는 파일들이 있는 디렉토리입니다.
- `next-env.d.ts`, `next.config.mjs`: Next.js 설정 파일입니다.
- `package.json`: 프로젝트의 의존성과 스크립트를 정의하는 파일입니다.
- `postcss.config.js`: PostCSS 설정 파일입니다.
- `posts/`: 블로그 포스트가 저장되는 디렉토리입니다.
- `public/`: 정적 파일이 저장되는 디렉토리입니다.
- `README.md`: 프로젝트에 대한 기본 정보와 사용 방법을 설명하는 파일입니다.
- `src/`: 소스 코드가 저장되는 디렉토리입니다.
- `tailwind.config.ts`: Tailwind CSS 설정 파일입니다.
- `tsconfig.json`: TypeScript 설정 파일입니다.

## Django 모델 공유를 위한

이 워크스페이스는 Next.js와 TypeScript를 기반으로 하며, Tailwind CSS를 사용하여 스타일링하고 있습니다. 또한, GitHub Actions를 사용하여 CI/CD 파이프라인을 구성하고 있습니다.
