---
title: Infinite Pagination Article Model
date: 2024-04-28

modelCount: 3
tags:
  - Django
  - DRF
  - Infinite Scroll
  - Pagination
  - article
published: true
contributor:
  name: 이혜림
  social:
    github: https://github.com/matty255
---

# infinite 페이지네이션 구현을 위한 Django 모델

이 글에서는 Django REST Framework(DRF)를 활용하여 무한 스크롤 페이지네이션을 구현할 때 필요한 Django 모델 구조와 모델 간의 관계에 대해 설명합니다.

[[toc]]

# 장고 모델 코드

## articles 앱의 모델

```python
# articles > models.py

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Article(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Reply(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='replies')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='replies')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.author}'s reply on {self.article}"
```

[^1]

## accounts 앱의 모델

```python
# accounts > models.py

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
```

[^2]

## ERD

```viz
digraph G {
  rankdir=LR;
  node [shape=plaintext];
  edge [arrowhead=crow, arrowtail=none, dir=back];

  User [label=<<table border="0" cellborder="1" cellspacing="0">
    <tr><td bgcolor="lightblue"><b>User</b></td></tr>
    <tr><td port="id">🔐 id</td></tr>
    <tr><td>username</td></tr>
    <tr><td>email</td></tr>
    <tr><td>bio</td></tr>
    <tr><td>location</td></tr>
    <tr><td>birth_date</td></tr>
  </table>>];

  Article [label=<<table border="0" cellborder="1" cellspacing="0">
    <tr><td bgcolor="lightgreen"><b>Article</b></td></tr>
    <tr><td port="id">🔐 id</td></tr>
    <tr><td>title</td></tr>
    <tr><td>content</td></tr>
    <tr><td>created_at</td></tr>
    <tr><td>updated_at</td></tr>
    <tr><td port="author_id">🔑 author_id (FK)</td></tr>
  </table>>];

  Reply [label=<<table border="0" cellborder="1" cellspacing="0">
    <tr><td bgcolor="orange"><b>Reply</b></td></tr>
    <tr><td port="id">🔐 id</td></tr>
    <tr><td>content</td></tr>
    <tr><td>created_at</td></tr>
    <tr><td>updated_at</td></tr>
    <tr><td port="article_id">🔑 article_id (FK)</td></tr>
    <tr><td port="author_id">🔑 author_id (FK)</td></tr>
  </table>>];

  Article:author_id -> User:id;
  Reply:article_id -> Article:id;
  Reply:author_id -> User:id;
}
```

# 모델 설명

## Article 모델

- `author`: Article을 작성한 유저(User)와 1:N 관계를 가집니다.
- `title`: Article의 제목을 나타냅니다.
- `content`: Article의 내용을 저장합니다.
- `created_at`: Article의 생성 시간을 자동으로 기록합니다.
- `updated_at`: Article의 수정 시간을 자동으로 업데이트합니다.

## Reply 모델

- `article`: Reply가 속한 Article과 1:N 관계를 가집니다.
- `author`: Reply를 작성한 유저(User)와 1:N 관계를 가집니다.
- `content`: Reply의 내용을 저장합니다.
- `created_at`: Reply의 생성 시간을 자동으로 기록합니다.
- `updated_at`: Reply의 수정 시간을 자동으로 업데이트합니다.

## User 모델

- Django의 기본 User 모델을 상속받아 확장합니다.
- `bio`: 유저의 자기소개를 저장합니다.
- `location`: 유저의 위치 정보를 저장합니다.
- `birth_date`: 유저의 생년월일을 저장합니다.

## 모델 간의 관계

- User와 Article은 1:N 관계를 가집니다. 한 명의 유저는 여러 개의 Article을 작성할 수 있습니다.
- Article과 Reply는 1:N 관계를 가집니다. 한 개의 Article에는 여러 개의 Reply가 달릴 수 있습니다.
- User와 Reply는 1:N 관계를 가집니다. 한 명의 유저는 여러 개의 Reply를 작성할 수 있습니다.

# 페이지네이션 구현 방법

DRF의 기본 페이지네이션 클래스를 활용하거나 커스텀 페이지네이션 클래스를 작성하여 무한 스크롤 페이지네이션을 구현할 수 있습니다.

## 1. DRF의 기본 페이지네이션 클래스 사용

DRF에서 제공하는 `PageNumberPagination` 또는 `LimitOffsetPagination` 클래스를 활용하여 페이지네이션을 구현할 수 있습니다.

- `PageNumberPagination`: 페이지 번호를 기준으로 페이지네이션을 수행합니다.
- `LimitOffsetPagination`: offset과 limit 값을 기준으로 페이지네이션을 수행합니다.

```python
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination

class ArticlePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class ReplyPagination(LimitOffsetPagination):
    default_limit = 20
    limit_query_param = 'limit'
    offset_query_param = 'offset'
    max_limit = 50
```

## 2. 커스텀 페이지네이션 클래스 작성

DRF의 기본 페이지네이션 클래스를 상속받아 커스텀 페이지네이션 클래스를 작성할 수 있습니다. 이를 통해 무한 스크롤에 최적화된 페이지네이션을 구현할 수 있습니다.

```python
from rest_framework.pagination import PageNumberPagination

class InfiniteScrollPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_next_link(self):
        if not self.page.has_next():
            return None
        page_number = self.page.next_page_number()
        return self.get_url(page_number)

    def get_previous_link(self):
        if not self.page.has_previous():
            return None
        page_number = self.page.previous_page_number()
        return self.get_url(page_number)

    def get_url(self, page_number):
        return f"{self.request.build_absolute_uri()}?page={page_number}"
```

위와 같이 커스텀 페이지네이션 클래스를 작성하면 `next`와 `previous` 링크를 통해 무한 스크롤을 구현할 수 있습니다.

## DRF 뷰에서의 사용 방법

DRF 뷰에서 페이지네이션을 적용하려면 `pagination_class` 속성에 사용할 페이지네이션 클래스를 지정하면 됩니다.

```python
from rest_framework import viewsets
from .models import Article
from .serializers import ArticleSerializer
from .paginations import InfiniteScrollPagination

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = InfiniteScrollPagination
```

위와 같이 뷰셋에 `pagination_class`를 지정하면 해당 페이지네이션 방식이 적용됩니다.

## 결론

DRF와 Django 모델을 활용하여 무한 스크롤 페이지네이션을 구현할 수 있습니다.
모델 간의 관계를 잘 설계하고, DRF의 페이지네이션 기능을 활용하면 유저 경험을 향상시킬 수 있는 무한 스크롤 기능을 쉽게 구현할 수 있습니다.

[^1]: `articles > models.py`에서 정의된 Article과 Reply 모델입니다.
[^2]: `accounts > models.py`에서 정의된 User 모델입니다. Django의 기본 User 모델을 확장하여 사용합니다.
