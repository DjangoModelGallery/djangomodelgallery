---
id: 002
title: Django Shopping Mall Product Model
date: 2024-03-29
category: Shopping Mall
modelCount: 1
tags:
  - Django
  - Model
  - Shopping Mall
  - Product
fileName: 002_django-shopping-mall-product-model.md
contributor:
  name: 황병헌
  social:
    github: https://github.com/Ruler-H
---

# Django Shopping Mall Product Model

이 글에서는 Django를 사용하여 쇼핑몰 애플리케이션을 개발할 때 사용할 수 있는 상품 모델에 대해 살펴보겠습니다.

...

## 장고 모델 코드
```python
# product > models.py

import decimal
from django.db import models
from django.db.models import Avg
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    available = models.BooleanField(default=True)
    discount_rate = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    delivery_fee = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    seller = models.ForeignKey(User, related_name="products", on_delete=models.CASCADE)
    category = models.ForeignKey(
        Category, related_name="products", on_delete=models.CASCADE
    )
    

    def __str__(self):
        return self.name

    def get_discounted_price(self):
        return self.price * (1 - self.discount_rate)

    def get_average_rating(self):
        ratings = self.ratings.all().aggregate(average=Avg("stars"))
        return (
            round(decimal.Decimal(ratings["average"]), 1) if ratings["average"] else 0
        )


class Image(models.Model):
    product = models.ForeignKey(
        Product, related_name="images", on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="product/images/", blank=True, null=True)

    def __str__(self):
        return f"Image of {self.product.name}"


class Rating(models.Model):
    product = models.ForeignKey(
        Product, related_name="ratings", on_delete=models.CASCADE
    )
    author = models.ForeignKey(User, related_name="ratings", on_delete=models.CASCADE)
    review = models.TextField()
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Rating of {self.product.name} by {self.user.username}"


class RatingImage(models.Model):
    rating = models.ForeignKey(Rating, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="rating/images/", blank=True, null=True)

    def __str__(self):
        return f"Image of {self.rating.product.name}'s Rating by {self.rating.user.username}"

```

```python
# order > models.py

from django.db import models
from django.contrib.auth.models import User
from shoppinmall_product.product.models import Product

ORDER_STATUS = (("P", "Pending"), ("D", "Delivering"), ("C", "Completed"))


class Order(models.Model):
    orderer = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=ORDER_STATUS, default="P")

    def __str__(self):
        return f"{self.product.name} x {self.quantity} by {self.orderer.username}"

```

```python
# accounts > models.py
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username
```

## ERD
```viz
digraph AppSchema {
  rankdir=LR; // 노드들을 가로로 배치
  node [shape=plaintext]; // 노드 스타일을 plaintext로 설정

  // 앱 'Product'를 위한 서브그래프
  subgraph cluster_ShoppingMall {
    label="Product";
    color=blue;
    style=dashed;

    // 'Product' 앱의 테이블 정의 (HTML-like 레코드 형식)
    Product [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="name" bgcolor="lightgrey"><b>Product</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>name</td></tr>
                <tr><td>description</td></tr>
                <tr><td>price</td></tr>
                <tr><td>stock</td></tr>
                <tr><td>available</td></tr>
                <tr><td>discount_rate</td></tr>
                <tr><td>delivery_fee</td></tr>
                <tr><td>created_at</td></tr>
                <tr><td port="seller_id_fId">🔑 seller_id (FK)</td></tr>
                <tr><td port="category_id_fId">🔑 category_id (FK)</td></tr>
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
                <tr><td port="product_id_fId">🔑 product_id (FK)</td></tr>
               </table>>];
    
    Rating [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="review" bgcolor="lightgrey"><b>Rating</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>review</td></tr>
                <tr><td>stars</td></tr>
                <tr><td>created_at</td></tr>
                <tr><td>updated_at</td></tr>
                <tr><td port="product_id_fId">🔑 product_id (FK)</td></tr>
                <tr><td port="author_id_fId">🔑 author_id (FK)</td></tr>
               </table>>];
    
    RatingImage [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="image" bgcolor="lightgrey"><b>RatingImage</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>image</td></tr>
                <tr><td port="rating_id_fId">🔑 rating_id (FK)</td></tr>
               </table>>];
  }

  // 앱 'Orders'를 위한 서브그래프
  subgraph cluster_Order {
    label="Order";
    color=green;
    style=dashed;

    // 'Orders' 앱의 테이블 정의 (HTML-like 레코드 형식)
    Order [label=<<table border="0" cellborder="1" cellspacing="0">
                <tr><td port="order" bgcolor="lightgrey"><b>Order</b></td></tr>
                <tr><td port="id_fId">🔐 id</td></tr>
                <tr><td>quantity</td></tr>
                <tr><td>order_date</td></tr>
                <tr><td>status</td></tr>
                <tr><td port="orderer_id_fId">🔑 orderer(FK)</td></tr>
                <tr><td port="product_id_fId">🔑 product(FK)</td></tr>
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
  Product:category_id_fId -> Category:id_fId [arrowhead="none", arrowtail="crow", dir="none"];
  Product:seller_id_fId -> CustomUser:id_fId [arrowhead="none", arrowtail="crow", dir="none"];
  Image:product_id_fId -> Product:id_fId [arrowhead="none", arrowtail="crow", dir="both"];
  Rating:product_id_fId -> Product:id_fId [arrowhead="none", arrowtail="crow", dir="both"];
  Rating:author_id_fId -> CustomUser:id_fId [arrowhead="none", arrowtail="crow", dir="none"];
  RatingImage:rating_id_fid -> Rating: id_fId [arrowhead="none", arrowtail="crow", dir="both"];
  Order:orderer_id_fid -> CustomUser: id_fId [arrowhead="none", arrowtail="crow", dir="none"];
  Order:product_id_fid -> Product: id_fId [arrowhead="none", arrowtail="crow", dir="none"];
}

```

## 모델 생성 프롬프트
### 1. Product 모델
#### (1) 필드
 - name : 제품의 이름을 저장합니다.
 - description : 제품의 설명을 저장합니다
 - price : 제품의 가격을 저장합니다.
 - stock : 제품의 재고 수량을 저장합니다.
 - available : 제품 구매 가능 여부를 저장합니다.
 - discount_rate : 제품의 할인률을 저장합니다.
 - delivery_fee : 제품의 배달비를 저장합니다.
 - created_at : 제품의 등록일을 저장합니다.
 - seller : 제품의 판매자(User)를 외래키로 연결합니다.
 - category : 제품의 항목(Category)를 외래키로 연결합니다.
#### (2) 메서드
 - get_dicount_price : 할인률이 적용된 제품의 현재 가격을 반환합니다.
 - get_average_rating : 제품의 별점 평균을 소숫점 첫번째 자리까지 반환합니다.

### 2. Category 모델
#### (1) 필드
 - name : Category명을 저장합니다.

### 3. Image 모델
#### (1) 필드
 - product : Image를 갖는 Product를 외래키로 연결합니다.
 - image : 제품 Image가 저장된 경로를 저장합니다.

### 4. Rating 모델
#### (1) 필드
 - product : Rating의 대상 Product를 외래키로 연결합니다.
 - author : Rating의 작성자(User)를 외래키로 연결합니다.
 - review : Product에 대한 후기 내용을 저장합니다.
 - stars : Product에 대한 점수를 1 ~ 5 사이의 범위로 저장합니다.
 - created_at : Rating의 작성 시간을 자동으로 저장합니다.
 - updated_at : Rating의 수정 시간을 자동으로 저장합니다.

### 5. RatingImage 모델
#### (1) 필드
 - rating : Image를 갖는 Rating을 외래키로 연결합니다.
 - image : Rating Image가 저장된 경로를 저장합니다.

### 6. Order 모델
#### (1) 필드
 - orderer : 주문한 사용자(User)를 외래키로 연결합니다.
 - product : 주문 대상 제품(Product)를 외래키로 연결합니다.
 - quantity : 주문 수량을 양수 값으로 저장합니다.
 - order_date : 주문 일자를 자동으로 저장합니다.
 - status : 주문 상태를 P(Pending), D(Delivering), C(Completed) 상태 중 하나로 저장합니다.

### 7. User 모델
 - username : User명을 저장합니다.
 - email : User의 email을 저장합니다.
 - is_active : User의 활동 여부를 Boolean 값으로 저장합니다.
 - is_staff : User의 권한이 admin인지를 Boolean 값으로 저장합니다.
 - cerated_at : User의 생성 시간을 자동으로 저장합니다.
 - updated-at : User의 수정 시간을 자동으로 저장합니다.

## 기여자의 설명
 - User 모델의 경우 사용하는 사용자 모델을 적용해도 무관합니다.