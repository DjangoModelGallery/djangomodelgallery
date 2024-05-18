---
id: 001
title: Django Blog Post Model
date: 2024-03-24
category: Blog
modelCount: 7
tags:
  - Django
  - Model
  - Blog
  - Post
fileName: 001_django-blog-post-model.md
contributor:
  name: 황병헌
  social:
    github: https://github.com/Ruler-H
---

# Django Blog Post Model

이 글에서는 Django를 사용하여 블로그 애플리케이션을 만들 때 사용할 수 있는 블로그 포스트 모델에 대해 알아보겠습니다.

[[toc]]

# 장고 모델 코드

## post 앱의 모델

```python
# post > models.py

from django.db import models
from django.urls import reverse


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey("accounts.CustomUser", on_delete=models.CASCADE)
    view_count = models.IntegerField(default=0)
    category = models.ForeignKey("Category", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("post:detail", kwargs={"pk": self.pk})

    def increase_view_count(self):
        self.view_count += 1
        self.save()

    def comment_count(self):
        return self.comments.count()


class Comment(models.Model):
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey("accounts.CustomUser", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author}: {self.content[:20]}"

    def get_absolute_url(self):
        return reverse("post:comment_update", kwargs={"pk": self.pk})

    def reply_count(self):
        return self.replies.count()


class Reply(models.Model):
    comment = models.ForeignKey(
        "Comment", on_delete=models.CASCADE, related_name="replies"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey("accounts.CustomUser", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author}: {self.content[:20]}"

    def get_absolute_url(self):
        return reverse("post:reply_update", kwargs={"pk": self.pk})


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse(
            "post:post_list_by_category", kwargs={"category_name": self.name}
        )

    def post_count(self):
        return self.post_set.count()


class Image(models.Model):
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="blog/post/images/")

    def __str__(self):
        return f"Image for {self.post.title}"


class Attachment(models.Model):
    post = models.ForeignKey(
        "Post", on_delete=models.CASCADE, related_name="attachments"
    )
    attach_file = models.FileField(upload_to="blog/post/attachments/")

    def __str__(self):
        return f"Attachment for {self.post.title}"

```

[^1]

## accounts 앱의 모델

```python
# accounts > models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse


class CustomUser(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    profile_image = models.ImageField(upload_to="profile/", blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password"]

    def __str__(self):
        return self.username

    def get_absolute_url(self):
        return reverse("accounts:profile", kwargs={"pk": self.pk})
```

[^2]

## ERD

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

[^3]

# 모델 설명

## Post 모델

### 필드

- `title`: Post의 제목을 저장합니다.
- `content`: Post의 내용을 저장합니다.
- `created_at`: Post의 생성 시간을 자동으로 저장합니다.
- `updated_at`: Post의 수정 시간을 자동으로 저장합니다.
- `author`: Post의 작성자(User)를 외래키로 연결합니다.
- `view_count`: Post의 조회 수를 저장합니다.
- `category`: Post의 Category를 외래키로 연결합니다.

### 메서드

- `get_absolute_url`: 대상 Post의 detail 경로로 이동시켜주는 메서드입니다. 해당 메서드를 커스텀 없이 사용하기 위해서는 post 앱의 app_name을 'post'로 하고, urlpattern의 post의 detail path의 name 속성 값을 detail로 해주어야 합니다.
- `increase_view_count`: 대상 Post의 view_count 필드 값을 1 증가시켜주는 메서드입니다. 해당 post를 조회하는 로직에서 사용하기에 용이한 메서드입니다.
- `comment_count`: 대상 Post에 달린 댓글 수를 반환해주는 메서드입니다. 게시물 제목 마지막 부분에 댓글 수를 추가해주거나 post 상세 화면에서 댓글이 시작하는 상단 부분에 댓글 수를 출력하는 로직에 사용될 것으로 예상하는 메서드입니다.

## Comment 모델

### 필드

- `post`: Comment가 달린 Post를 외래키로 연결합니다.
- `content`: Comment의 내용을 저장합니다.
- `created_at`: Comment의 생성 시간을 자동으로 저장합니다.
- `updated_at`: Comment의 수정 시간을 자동으로 저장합니다.
- `author`: Comment의 작성자(User)를 외래키로 연결합니다.

### 메서드

- `get_absolute_url`: 대상 Comment가 수정되는 경로로 이동시켜주는 메서드입니다. 해당 메서드를 커스텀 없이 사용하기 위해서는 post 앱의 app_name을 'post'로 하고, urlpattern의 comment 관련 update path의 name 속성 값을 comment_update로 해주어야 합니다.
- `reply_count`: 대상 Comment에 달린 대댓글 수를 반환해주는 메서드입니다. 댓글 마지막 부분에 대댓글 수를 추가해주는 등의 로직에 사용될 것으로 예상하는 메서드입니다.

## Reply 모델

### 필드

- `comment`: Reply가 달린 Comment를 외래키로 연결합니다.
- `content`: Reply의 내용을 저장합니다.
- `created_at`: Reply의 생성 시간을 자동으로 저장합니다.
- `updated_at`: Reply의 수정 시간을 자동으로 저장합니다.
- `author`: Reply의 작성자(User)를 외래키로 연결합니다.

### 메서드

- `get_absolute_url`: 대상 Reply가 수정되는 경로로 이동시켜주는 메서드입니다. 해당 메서드를 커스텀 없이 사용하기 위해서는 post 앱의 app_name을 'post'로 하고, urlpattern의 reply 관련 update path의 name 속성 값을 reply_update로 해주어야 합니다.


## Category 모델

### 필드

- `name`: Category명을 저장합니다.

### 메서드

- `get_absolute_url`: 대상 Category를 갖는 Post의 목록을 반환하는 경로로 이동시켜주는 메서드입니다. Tag를 버튼과 같은 기능을 통해 클릭 시 해당 Tag를 갖는 Post를 보려하는 로직에서 사용되는 것으로 예상합니다.
- `post_count`: 대상 Category에 속한 게시물 수를 반환하는 메시드입니다. Category 객체의 post_set 속성을 사용하여 해당 카테고리에 속한 게시물들을 가져오고, 그 개수를 세어 반환합니다. Tag 항목과 함께 개수를 출력해 주는 등의 기능에 사용될 수 있습니다.

## Image 모델

### 필드
- `post`: Image를 갖는 Post를 외래키로 연결합니다.
- `image`: Image가 저장된 경로를 저장합니다.

## Attachment 모델

### 필드

- `post`: Attachment를 갖는 Post를 외래키로 연결합니다.
- `attach_file`: Attachment가 저장된 경로를 저장합니다.

## User 모델

### 필드

- `username`: User명을 저장합니다.
- `email`: User의 email을 저장합니다.
- `is_active`: User의 활동 여부를 Boolean 값으로 저장합니다.
- `is_staff`: User의 권한이 admin인지를 Boolean 값으로 저장합니다.
- `cerated_at`: User의 생성 시간을 자동으로 저장합니다.
- `updated-at`: User의 수정 시간을 자동으로 저장합니다.

[^4]

# 기여자의 설명

- User 모델의 경우 사용하는 사용자 모델을 적용해도 무관합니다. 세부적인 User 모델에 관한 설명은 유저 모델 게시물을 참고해 주시기 바랍니다.

[^1]: `post > models.py`에서 정의된 블로그 관련 모델 코드입니다.
[^2]: `accounts > models.py`에서 정의된 사용자 모델 코드입니다.
[^3]: ERD 다이어그램은 블로그 애플리케이션의 데이터베이스 구조를 시각화한 것입니다.
[^4]: 각 모델의 필드와 역할을 설명하는 모델 생성 프롬프트입니다.
