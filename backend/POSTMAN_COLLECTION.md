# Postman API Testing Guide

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### 1. Sign Up
```http
POST {{base_url}}/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

### 2. Login
```http
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Signed in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

### 3. Get Profile (Requires Auth)
```http
GET {{base_url}}/auth/profile
Authorization: Bearer {{token}}
```

---

## Product Endpoints

### 4. Get All Products
```http
GET {{base_url}}/products
```

### 5. Get Product by ID
```http
GET {{base_url}}/products/1
```

### 6. Get Products by Category
```http
GET {{base_url}}/products/category/TOPS
```
or
```http
GET {{base_url}}/products/category/TROUSERS
```

### 7. Create Product (Admin)
```http
POST {{base_url}}/products
Content-Type: application/json

{
  "name": "New Product",
  "category": "TOPS",
  "description": "Product description",
  "price": 999.99,
  "images": [
    "https://images.unsplash.com/photo-xxx?w=800&q=80"
  ],
  "sizes": "S,M,L,XL"
}
```

---

## Cart Endpoints (All require authentication)

### 8. Get Cart
```http
GET {{base_url}}/cart
Authorization: Bearer {{token}}
```

### 9. Add to Cart
```http
POST {{base_url}}/cart/add
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "product_id": 1,
  "size": "M",
  "quantity": 2
}
```

### 10. Update Cart Item
```http
PUT {{base_url}}/cart/1
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "quantity": 3
}
```

### 11. Remove from Cart
```http
DELETE {{base_url}}/cart/1
Authorization: Bearer {{token}}
```

### 12. Clear Cart
```http
DELETE {{base_url}}/cart
Authorization: Bearer {{token}}
```

---

## Order Endpoints (All require authentication)

### 13. Create Order
```http
POST {{base_url}}/orders/create
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "shipping_name": "John Doe",
  "shipping_address1": "123 Main Street",
  "shipping_address2": "Apt 4B",
  "shipping_city": "Mumbai",
  "shipping_state": "Maharashtra",
  "shipping_pincode": "400001",
  "shipping_phone": "1234567890",
  "payment_method": "card"
}
```

**Payment methods:** `card`, `upi`, `cash`

### 14. Get Order History
```http
GET {{base_url}}/orders
Authorization: Bearer {{token}}
```

### 15. Get Order by ID
```http
GET {{base_url}}/orders/1
Authorization: Bearer {{token}}
```

---

## Search Endpoints

### 16. Search Products
```http
GET {{base_url}}/search?query=white
```

---

## Health Check

### 17. Health Check
```http
GET {{base_url}}/health
```

---

## Postman Environment Variables

Create a Postman environment with:
- `base_url`: `http://localhost:5000/api`
- `token`: (set this after login, copy from response)

## Testing Flow

1. **Sign up** or **Login** → Copy the `token` from response
2. Set `token` in Postman environment variable
3. **Get all products** → Note product IDs
4. **Add products to cart** using product IDs
5. **Get cart** to verify items
6. **Create order** with shipping details
7. **Get order history** to see orders

