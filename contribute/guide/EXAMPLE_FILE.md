---
id: 123
title: Django Blog with User Accounts and Comments
date: 2023-06-01
category: Django
modelCount: 3
tags:
  - Django
  - Model
  - ERD
  - Blog
  - User Auth
fileName: EXAMPLE_FILE.md
contributor:
  name: John Doe
  social:
    github: https://github.com/johndoe
    twitter: https://twitter.com/johndoe
---

# Django Blog with User Accounts and Comments

이 글에서는 사용자 인증 기능이 있는 Django 블로그 앱을 만드는 방법을 알아보겠습니다. 사용자는 블로그 포스트를 작성할 수 있고, 다른 사용자의 포스트에 댓글을 달 수 있습니다.

## 모델 코드

### accounts/models.py

```python
# accounts > models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.username
```

### blog/models.py

```python
# blog > models.py

from django.db import models
from django.conf import settings

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'Comment by {self.author.username} on {self.post.title}'
```

이 코드 블록은 `#` 주석이 없으므로 오른쪽 에디터에는 표시되지 않지만 Markdown 본문에는 표시됩니다.

```python
class SomeModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
```

## ERD

```viz
digraph G {
  rankdir=LR;
  node [shape=plaintext];

  subgraph cluster_accounts {
    label="accounts";

    User [label=<<table border="0" cellborder="1" cellspacing="0">
          <tr><td><b>User</b></td></tr>
          <tr><td>id</td></tr>
          <tr><td>username</td></tr>
          <tr><td>email</td></tr>
          <tr><td>password</td></tr>
          <tr><td>bio</td></tr>
         </table>>];
  }

  subgraph cluster_blog {
    label="blog";

    Post [label=<<table border="0" cellborder="1" cellspacing="0">
          <tr><td><b>Post</b></td></tr>
          <tr><td>id</td></tr>
          <tr><td>title</td></tr>
          <tr><td>content</td></tr>
          <tr><td>created_at</td></tr>
          <tr><td>updated_at</td></tr>
          <tr><td>author_id</td></tr>
         </table>>];

    Comment [label=<<table border="0" cellborder="1" cellspacing="0">
          <tr><td><b>Comment</b></td></tr>
          <tr><td>id</td></tr>
          <tr><td>content</td></tr>
          <tr><td>created_at</td></tr>
          <tr><td>updated_at</td></tr>
          <tr><td>post_id</td></tr>
          <tr><td>author_id</td></tr>
         </table>>];
  }

  User -> Post [label="1:N"];
  User -> Comment [label="1:N"];
  Post -> Comment [label="1:N"];
}
```

우측의 ERD는 `User`, `Post`, `Comment` 모델 간의 관계를 보여줍니다.

- 한 명의 사용자(`User`)는 여러 개의 포스트(`Post`)를 작성할 수 있습니다.
- 한 명의 사용자(`User`)는 여러 개의 댓글(`Comment`)을 작성할 수 있습니다.
- 하나의 포스트(`Post`)에는 여러 개의 댓글(`Comment`)이 달릴 수 있습니다.

## 앱 분리 및 모델 설계

이 프로젝트에서는 `accounts` 앱과 `blog` 앱을 분리하여 개발했습니다.

- `accounts` 앱: 사용자 인증 및 프로필 관리를 담당합니다.
- `blog` 앱: 블로그 포스트 작성, 조회, 댓글 관리를 담당합니다.

각 앱의 모델은 명확한 역할을 가지고 있으며, 앱 간의 의존성을 최소화하면서도 필요한 관계를 설정했습니다.
