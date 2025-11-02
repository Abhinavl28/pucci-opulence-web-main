# PUCCI Opulence API Endpoints

Base URL: `http://localhost:5000/api`

## ✅ CORS Configuration
All endpoints now allow requests from:
- `http://localhost:8080` (Frontend - Vite)
- `http://localhost:5173` (Frontend - Vite alternative)
- `http://localhost:3000` (Frontend - React alternative)

---

## 🔐 Authentication Endpoints

### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0101",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0101"
  }
}
```

---

### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0101"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "message": "Invalid email or password"
}
```

---

### GET `/api/auth/user/{id}`
Get user details by ID.

**Response (200 OK):**
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0101"
}
```

---

## 🛍️ Product Endpoints

### GET `/api/products`
Get all products.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "White PUCCI Tee",
    "category": "TOPS",
    "description": "Premium cotton tee...",
    "price": 799.99,
    "images": ["url1", "url2"],
    "sizes": ["S", "M", "L", "XL"]
  }
]
```

---

### GET `/api/products/{id}`
Get product by ID.

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "White PUCCI Tee",
  "category": "TOPS",
  "description": "Premium cotton tee...",
  "price": 799.99,
  "images": ["url1", "url2"],
  "sizes": ["S", "M", "L", "XL"]
}
```

---

### GET `/api/products/category/{category}`
Get products by category (TOPS or TROUSERS).

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "White PUCCI Tee",
    "category": "TOPS",
    "price": 799.99
  }
]
```

---

## 🔍 Search Endpoint

### GET `/api/search?q={query}`
Search products by name or description.

**Example:** `/api/search?q=white`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "White PUCCI Tee",
    "category": "TOPS",
    "price": 799.99
  }
]
```

---

## 🛒 Cart Endpoints

### GET `/api/cart/user/{userId}`
Get cart items for a user.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "quantity": 2,
    "size": "M",
    "product": {
      "id": 1,
      "name": "White PUCCI Tee",
      "price": 799.99
    }
  }
]
```

---

### POST `/api/cart`
Add item to cart.

**Request Body:**
```json
{
  "userId": 1,
  "productId": 1,
  "quantity": 2,
  "size": "M"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "userId": 1,
  "productId": 1,
  "quantity": 2,
  "size": "M"
}
```

---

### PUT `/api/cart/{id}`
Update cart item quantity.

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "quantity": 3
}
```

---

### DELETE `/api/cart/{id}`
Remove item from cart.

**Response (200 OK):**
```json
{
  "message": "Item removed from cart"
}
```

---

### DELETE `/api/cart/user/{userId}`
Clear all cart items for a user.

**Response (200 OK):**
```json
{
  "message": "Cart cleared successfully"
}
```

---

## 📦 Order Endpoints

### GET `/api/orders/user/{userId}`
Get all orders for a user.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "userId": 1,
    "totalAmount": 1599.98,
    "status": "DELIVERED",
    "shippingAddress": "123 Main St",
    "orderDate": "2024-01-15T10:30:00",
    "items": [
      {
        "id": 1,
        "productId": 1,
        "quantity": 2,
        "price": 799.99
      }
    ]
  }
]
```

---

### POST `/api/orders`
Create a new order.

**Request Body:**
```json
{
  "userId": 1,
  "shippingAddress": "123 Main St, City, State 12345",
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "size": "M"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "userId": 1,
  "totalAmount": 1599.98,
  "status": "PENDING",
  "shippingAddress": "123 Main St",
  "orderDate": "2024-01-15T10:30:00"
}
```

---

## ❤️ Health Check

### GET `/api/health`
Check if API is running.

**Response (200 OK):**
```json
{
  "message": "PUCCI Opulence API is running",
  "status": "ok"
}
```

---

## 📝 Test Credentials

**Email:** `john.doe@example.com`  
**Password:** `password123`

Other test users:
- jane.smith@example.com
- michael.j@example.com
- emily.davis@example.com
- david.w@example.com

All use password: `password123`

---

## ⚠️ Important Notes

1. **Password Hash:** All passwords in database must use SHA-256 Base64 encoding
2. **CORS:** Port 8080 is now enabled for all endpoints
3. **Database:** MySQL connection required (localhost:3306)
4. **Port:** Backend runs on port 5000
