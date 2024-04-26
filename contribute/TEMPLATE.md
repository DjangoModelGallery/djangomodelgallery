---
title: 템플릿
date: 2024-05-05
category: Django
modelCount: 0
tags:
  - Django
  - Beginner
published: false
contributor:
  name: 이혜림
  social:
    github: https://github.com/matty255
---

# 타이틀

- v1에서 변경된 점
  - `id`와 `filename`이 필요없어서 템플릿에서 지워졌습니다.
  - 두 버전은 호환되며 frontmatter에 넣어도 에러가 생기지는 않습니다.
  - `published`를 새로 만들었습니다. 필수값이 아니므로 넣지 않아도 됩니다.
  - `published`가 `false`인 경우 리스트 및 상세페이지에 노출되지 않습니다.
  - (github repo에는 남아있습니다.)

## 목차

[[toc]]

- `[[toc]]`를 본문에 넣으면 자동으로 목차가 생깁니다.
- 없어도 에러는 나지 않습니다.

## 모델 코드와 설명

- `?`가 붙은 것은 필수값이 아닙니다.
- 나머지는 필수값입니다.

```typescript
interface Contributor {
  name: string;
  social: {
    github: string;
    twitter?: string;
    insta?: string;
  };
}

interface FrontmatterData {
  title: string;
  date: string;
  category: CategoryKey;
  modelCount: number;
  tags?: string[] | [];
  contributor: Contributor;
  published?: boolean;
}
```

## 각주

원하는 부분에 `[^1]` 같은 `^`와 `number`를 넣

- graph-viz-guide.md를 참고하여 이렇게 만들 수 있습니다.

[^하나]
[^둘]
[^1]

```md
[^하나]
[^둘]
[^1]
```

- 이렇게 컨텐츠는 어떤 것으로 적더라도, 매칭된(같은 이름을 가진) 각주가 있으면 보입니다.
- 컨텐츠의 내용과 관계없이, 먼저 쓰여진 순서대로 번호가 매겨집니다.

```md
[1]
[2]
[3]
```

- 각주 예시

```md
[^1]: `blog > models.py`에서 정의된 블로그 관련 모델 코드입니다. 중복으로 쓰여지더라도 `:1`과 같은 식으로 알아서 분류해줍니다.
[^하나]: 이 각주를 나중에 작성하더라도 `markdown` 내에서 쓰여진 순서에 따라 앞으로 옵니다.
[^둘]: 이 각주는 2번째 각주입니다.
```

## ERD

[^1]

```viz
digraph AppSchema {
  rankdir=LR; // 노드들을 가로로 배치
  node [shape=plaintext]; // 노드 스타일을 plaintext로 설정

  // 앱 'Blog'를 위한 서브그래프
  subgraph cluster_Blog {
    label="Blog";
    color=blue;
    style=dashed;

    // 'Blog' 앱의 테이블 정의 (HTML-like 레코드 형식)
    Post [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="title" bgcolor="lightgrey"><b>Post</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>title</td></tr>
                <tr><td>content</td></tr>
                <tr><td>created_at</td></tr>
                <tr><td>updated_at</td></tr>
                <tr><td>view_count</td></tr>
                <tr><td port="category_id_fId">🔑 category_id (FK)</td></tr>
                <tr><td port="author_id_fId">🔑 author_id (FK)</td></tr>
               </table>>];

    Comment [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="content" bgcolor="lightgrey"><b>Comment</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>content</td></tr>
                <tr><td>created_at</td></tr>
                <tr><td>updated_at</td></tr>
                <tr><td port="post_id_fld">🔑 post_id (FK)</td></tr>
                <tr><td port="author_id_fld">🔑 author_id (FK)</td></tr>
               </table>>];

    Reply [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="content" bgcolor="lightgrey"><b>Reply</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>content</td></tr>
                <tr><td>created_at</td></tr>
                <tr><td>updated_at</td></tr>
                <tr><td port="comment_id_fld">🔑 comment_id (FK)</td></tr>
                <tr><td port="author_id_fld">🔑 author_id (FK)</td></tr>
               </table>>];

    Category [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="name" bgcolor="lightgrey"><b>Category</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>name</td></tr>
               </table>>];

    Image [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="image" bgcolor="lightgrey"><b>Image</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>Image</td></tr>
                <tr><td port="post_id_fld">🔑 post_id (FK)</td></tr>
               </table>>];

    Attachment [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="attach_file" bgcolor="lightgrey"><b>Attachment</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>attach_file</td></tr>
                <tr><td port="post_id_fld">🔑 post_id (FK)</td></tr>
               </table>>];
  }

  // 앱 'Accounts'를 위한 서브그래프
  subgraph cluster_Accounts {
    label="Accounts";
    color=red;
    style=dashed;

    // 'Accounts' 앱의 테이블 정의 (HTML-like 레코드 형식)
    CustomUser [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="username" bgcolor="lightgrey"><b>CustomUser</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>username</td></tr>
                <tr><td>email</td></tr>
                <tr><td>is_active</td></tr>
                <tr><td>is_staff</td></tr>
                <tr><td>created_at</td></tr>
                <tr><td>updated_at</td></tr>
               </table>>];
  }

  // 외래 키 관계의 화살표 스타일 설정
  edge [color=blue, fontcolor=black, dir=none]; // dir=none으로 화살표 없앰

  Comment:post_id_fld -> Post:id_fId [arrowhead="none", arrowtail="crow", dir="both"];
  Image:post_id_fld -> Post:id_fId [arrowhead="none", arrowtail="crow", dir="both"];
  Attachment:post_id_fld -> Post:id_fId [arrowhead="none", arrowtail="crow", dir="both"];
  Reply:comment_id_fld -> Comment:id_fId [arrowhead="none", arrowtail="crow", dir="both"];
  Post:author_id_fId -> CustomUser:id_fId [arrowhead="none", arrowtail="crow", dir="none"];
  Comment:author_id_fld -> CustomUser:id_fId [arrowhead="none", arrowtail="crow", dir="none"];
  Reply:author_id_fld -> CustomUser:id_fId [arrowhead="none", arrowtail="crow", dir="none"];
  Post:category_id_fId -> Category:id_fId [arrowhead="none", arrowtail="crow", dir="none"];

}
```

[^1]: `blog > models.py`에서 정의된 블로그 관련 모델 코드입니다. 중복으로 쓰여지더라도 `:1`과 같은 식으로 알아서 분류해줍니다.
[^하나]: 이 각주를 나중에 작성하더라도 `markdown` 내에서 쓰여진 순서에 따라 앞으로 옵니다.
[^둘]: 이 각주는 2번째 각주입니다.
