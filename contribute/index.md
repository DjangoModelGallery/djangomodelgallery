---
title: Contribute Guide
date: 2024-05-05
category: Django
modelCount: 0
tags:
  - Django
  - Beginner

contributor:
  name: 이혜림
  social:
    github: https://github.com/matty255
---

# Django 모델 갤러리 페이지용 Markdown 파일 작성 가이드

이 가이드는 Django 모델 갤러리 페이지용 Markdown 파일을 작성하는 방법을 자세히 설명합니다. 가이드를 정확히 지켜 Markdown 파일을 작성해주세요.

잘 작성된 모델 갤러리 페이지는 다른 개발자들에게 좋은 예시가 될 것입니다.

## 1. 프론트매터(Front Matter) 작성

Markdown 파일의 맨 위에는 프론트매터를 작성해야 합니다. 프론트매터는 Markdown 파일의 메타데이터를 담고 있는 YAML 형식의 블록입니다. 아래와 같은 템플릿을 사용하여 프론트매터를 작성해주세요.

또는 [TEMPLATE.md](https://github.com/DjangoModelGallery/djangomodelgallery/blob/main/contribute/TEMPLATE.md) 를 복사하여 새 파일에 붙여넣으세요.

```yaml
---
title: 모델 갤러리 페이지 제목
date: 2024-05-05
category: 카테고리
modelCount: 모델 개수
tags:
  - 태그1
  - 태그2
  - ...
published: true
contributor:
  name: 작성자 이름
  social:
    github: 작성자 GitHub 프로필 URL (없을 경우 빈 문자열)
    twitter: 작성자 Twitter 프로필 URL (없을 경우 빈 문자열)
---
```

### 프론트매터 필드 설명

- `title`: 모델 갤러리 페이지의 제목입니다. (필수)
- `date`: Markdown 파일의 작성일자입니다. `YYYY-MM-DD` 형식으로 입력해주세요. (필수)
- `category`: 모델 갤러리 페이지의 카테고리입니다. (필수)
  - 기존에 사용된 카테고리 중에서 선택하거나, 새로운 카테고리를 만들 수 있습니다.
  - 새로운 카테고리를 만들 때는 이미 비슷한 카테고리가 있는지 신중하게 확인해주세요.
  - 영문일 경우 카테고리의 첫 글자는 대문자로 사용해주세요.
  - 12자 이상의 긴 단어 사용은 지양해주세요.
- `modelCount`: 모델 개수입니다. (필수)
- `tags`: 모델 갤러리 페이지의 태그입니다. (선택)
  - 영문일 경우 태그의 첫 글자는 대문자로 사용해주세요.
  - 12자 이상의 긴 단어 사용은 지양해주세요.
- `published`: 모델 갤러리 페이지의 공개 여부입니다. (선택)
  - `true`로 설정하면 리스트 및 상세 페이지에 노출되지 않습니다. (GitHub 저장소에는 남아 있습니다.)
  - 기본값은 `true`입니다.
- `contributor`: 작성자 정보입니다. (필수)
  - `name`: 작성자의 이름입니다.
  - `social`: 작성자의 소셜 정보입니다.
    - `github`: 작성자의 GitHub 프로필 URL입니다. 입력하고 싶지 않을 경우 지워도 됩니다.
    - `twitter`: 작성자의 Twitter 프로필 URL입니다. 입력하고 싶지 않을 경우 지워도 됩니다.

### 작성 시 주의사항

- 이전 버전과의 차이점
  - `id`와 `filename` 필드가 제거되었습니다.
  - `published` 필드가 추가되었습니다. 선택 필드이므로 입력하지 않아도 됩니다.

## 2. Markdown 파일 내용 작성

프론트매터 아래에는 Markdown으로 formatted된 내용을 자유롭게 작성할 수 있습니다. 그러나 모델 갤러리 페이지 렌더링을 위해 몇 가지 규칙을 준수해야 합니다.

### 2.1. 목차

- `[[toc]]`를 본문에 넣으면 자동으로 목차가 생성됩니다.
- 목차를 생성하지 않으려면 `[[toc]]`를 넣지 않으면 됩니다.

### 2.2. 코드 블록

- Python 코드 블록은 `python` 언어 태그를 사용해주세요.

  ````
  ```python
  print("Hello, World!")
  ```
  ````

- 각 코드 블록의 맨 위에 `# 앱 이름 > 파일 이름` 형식의 주석을 추가하면, 해당 주석이 코드 탭의 이름으로 사용됩니다.

  ````
  ```python
  # blog > models.py

  from django.db import models

  class Post(models.Model):
      # ...
  ```
  ````

- Python 코드 블록 최상단에 `#` 주석을 추가하지 않으면, 해당 코드 블록은 편집기에는 표시되지 않고 Markdown 본문에만 표시됩니다.
- Python 코드 블록은 여러 개 작성할 수 있습니다.
- python이 아닌, 다른 언어의 코드블록도 물론 작성할 수 있습니다.

### 2.3. ERD(Entity-Relationship Diagram)

- ERD는 `viz` 코드 블록을 사용하여 작성해주세요.

  ````
  ```viz
  // ERD를 작성하는 Graphviz 코드
  ```
  ````

- `viz` 코드 블록은 한 개만 작성해주세요. 여러 개를 작성하면 첫 번째 블록만 표시됩니다.
- `viz` 코드 블록은 Markdown 본문에 직접 표시되지 않습니다.
- ERD 작성 방법은 예제 파일인 [graph-viz-guide.md](../contribute/graph-viz-guide.md)를 참고해주세요.

### 2.4. 각주

- 원하는 부분에 `[^1]` 같은 `^`와 `숫자` 형식으로 각주를 표시할 수 있습니다.
- 본문에서 사용한 각주 이름과 일치하는 내용을 Markdown 파일 하단에 작성해주세요.

  ```
  본문 내용 [^1]

  [^1]: 첫 번째 주석 내용
  ```

- 각주 내용 작성 순서에 따라 자동으로 번호가 매겨집니다.

### 2.5. 앱 분리 및 모델 설계

- 가능한 앱을 분리하고, 가독성 있게 모델을 설계해주세요.
- 모델 간의 관계(1:N, M:N 등)에 대해 자세히 설명해주세요.

## 3. Pull Request 생성

Markdown 파일 작성이 완료되면, Pull Request를 생성하여 리뷰를 요청하세요.

1. 작성한 Markdown 파일을 적절한 브랜치에 커밋합니다.
2. GitHub에서 Pull Request를 생성합니다.
3. Pull Request에 적절한 제목과 설명을 작성합니다.
4. 리뷰어를 지정합니다.

Pull Request가 생성되면, 리뷰어가 Markdown 파일을 검토하고 필요한 경우 피드백을 제공합니다. 피드백이 있다면 해당 사항을 수정하고 다시 커밋하세요.

Markdown 파일이 승인되면, Pull Request가 머지되고 배포 과정이 진행됩니다.

## 4. 예시 파일

예시 파일을 참고하여 Markdown 파일을 작성하시기 바랍니다.  
[템플릿 보기](https://github.com/DjangoModelGallery/djangomodelgallery/blob/main/contribute/TEMPLATE.md)
