---
id: 004
title: Django Comment Model
date: 2023-06-04
category: Blog
modelCount: 2
tags:
  - Django
  - Model
  - Blog
  - Comment
fileName: 004_django-comment-model.md
contributor:
  name: 황병헌
  social:
    github: https://github.com/Ruler-H
---

# Django Comment Model

이 글에서는 Django를 사용하여 블로그 애플리케이션에 댓글 기능을 추가할 때 사용할 수 있는 댓글 모델에 대해 살펴보겠습니다.

## 장고 모델 코드
```python
# post > models.py

from django.db import models
from django.contrib.auth.models import User


class Comment(models.Model):
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        if len(self.content) > 20:
            return f"{self.author}: {self.content[:20]}..."
        return f"{self.author}: {self.content[:20]}"


class Reply(models.Model):
    comment = models.ForeignKey(
        "Comment", on_delete=models.CASCADE, related_name="replies"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        if len(self.content) > 20:
            return f"{self.author}: {self.content[:20]}..."
        return f"{self.author}: {self.content[:20]}"

```

## ERD

```viz
digraph AppSchema {
  rankdir=LR; // 노드들을 가로로 배치
  node [shape=plaintext]; // 노드 스타일을 plaintext로 설정

  // 앱 'Post'를 위한 서브그래프
  subgraph cluster_Post {
    label="Post";
    color=blue;
    style=dashed;

    // 'Post' 앱의 테이블 정의 (HTML-like 레코드 형식)
    Comment [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="name" bgcolor="lightgrey"><b>Comment</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>content</td></tr>
                <tr><td>created_at</td></tr>
                <tr><td>author</td></tr>
                <tr><td>post</td></tr>
               </table>>];

    Reply [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="name" bgcolor="lightgrey"><b>Reply</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>content</td></tr>
                <tr><td>created_at</td></tr>
                <tr><td>author</td></tr>
                <tr><td port="comment_fId">comment</td></tr>
               </table>>];
  }

  edge [color=blue, fontcolor=black, dir=none]; // dir=none으로 화살표 없앰
  Reply:comment_fId -> Comment:id_fId [arrowhead="none", arrowtail="crow", dir="both"];
}
```

## 모델 생성 프롬프트
### 1. Comment 모델
#### (1) 필드
 - post : Comment가 달린 Post를 외래키로 연결합니다.
 - content : Comment의 내용을 저장합니다.
 - created_at : Comment의 생성 시간을 자동으로 저장합니다.
 - updated_at : Comment의 수정 시간을 자동으로 저장합니다.
 - author : Comment의 작성자(User)를 외래키로 연결합니다.
#### (2) 메서드
 - \_\_str\_\_: Comment 객체가 문자열로 표현될 때 cotent가 20자 이상인 경우에는 '작성자: 내용(20자까지 출력)...'을 반환하고 아닌 경우에는 '작성자: 내용'을 반환합니다.

### 2. Reply 모델
#### (1) 필드
 - comment : Reply가 달린 Comment를 외래키로 연결합니다.
 - content : Reply의 내용을 저장합니다.
 - created_at : Reply의 생성 시간을 자동으로 저장합니다.
 - updated_at : Reply의 수정 시간을 자동으로 저장합니다.
 - author : Reply의 작성자(User)를 외래키로 연결합니다.
 #### (2) 메서드
 - \_\_str\_\_: Reply 객체가 문자열로 표현될 때 cotent가 20자 이상인 경우에는 '작성자: 내용(20자까지 출력)...'을 반환하고 아닌 경우에는 '작성자: 내용'을 반환합니다.

## 기여자의 설명
 - 소개드린 모델의 코드에서는 Post되어진 글에 댓글과 대댓글을 작성하게 되는 상황에서 사용되는 코드로 작성되어 있습니다. Comment와 Reply의 필드 및 메서드는 다른 상황의 댓글, 대댓글에서도 이용 가능하기 때문에 참고해서 사용해주시기 바랍니다.