---
id: 005
title: Django Tagging Model
date: 2023-06-05
category: Blog
modelCount: 1
tags:
  - Django
  - Model
  - Tagging
  - Blog
fileName: 005_django-tagging-model.md
contributor:
  name: 황병헌
  social:
    github: https://github.com/Ruler-H
---

# Django Tagging Model

이 글에서는 Django를 사용하여 블로그 애플리케이션에 태그 기능을 추가할 때 사용할 수 있는 태그 모델에 대해 알아보겠습니다.

## 장고 모델 코드
```python
# post > models.py
from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField("Tag", related_name="posts")

    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
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
    Post [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="title" bgcolor="lightgrey"><b>Post</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>title</td></tr>
                <tr><td>content</td></tr>
                <tr><td>created_at</td></tr>
                <tr><td>updated_at</td></tr>
                <tr><td port="author_fId">🔑 author_id (FK)</td></tr>
                <tr><td port="tags_fId">🔑 tags_id (FK)</td></tr>
               </table>>];

    Tag [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="title" bgcolor="lightgrey"><b>Tag</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>name</td></tr>
                <tr><td>created_at</td></tr>
               </table>>];
  }

  edge [color=blue, fontcolor=black, dir=none]; // dir=none으로 화살표 없앰
  Tag:id_fId -> Post:tags_fId [arrowhead="none", arrowtail="crow", dir="both"];
}
```

## 모델 생성 프롬프트
### 1. Post 모델
 - title : Post의 제목을 저장합니다.
 - content : Post의 내용을 저장합니다.
 - created_at : Post의 생성 시간을 자동으로 저장합니다.
 - updated_at : Post의 수정 시간을 자동으로 저장합니다.
 - author : Post의 작성자(User)를 외래키로 연결합니다.
 - tags : Post의 다대다 관계인 Tag들을 외래키로 연결합니다.

### 2. Tag 모델
 - post : Comment가 달린 Post를 외래키로 연결합니다.
 - content : Comment의 내용을 저장합니다.
 - created_at : Comment의 생성 시간을 자동으로 저장합니다.
 - updated_at : Comment의 수정 시간을 자동으로 저장합니다.
 - author : Comment의 작성자(User)를 외래키로 연결합니다.

## 기여자의 설명
 - User 모델의 경우 사용하는 사용자 모델을 적용해도 무관합니다.