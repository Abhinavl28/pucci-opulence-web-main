# PUCCI Opulence Backend API

Backend REST API for the PUCCI Opulence e-commerce web application, built with Node.js, Express, Sequelize, and MySQL.

## 🚀 Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Product Management**: CRUD operations for products with categories (Tops, Trousers)
- **Shopping Cart**: Add, update, remove items with size and quantity management
- **Order Management**: Create orders, view order history, order details
- **Search Functionality**: Search products by name, description, or category
- **MySQL Database**: Persistent data storage with Sequelize ORM

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## ⚙️ Installation

1. **Clone the repository and navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update the following:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=pucci_opulence
   JWT_SECRET=your_jwt_secret_key_change_in_production
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Create MySQL database**
   ```sql
   CREATE DATABASE pucci_opulence;
   ```
   
   Or use MySQL command line:
   ```bash
   mysql -u root -p -e "CREATE DATABASE pucci_opulence;"
   ```

5. **Run the server**
   ```bash
   npm run dev
   ```
   
   The server will automatically:
   - Connect to the database
   - Sync all models (create tables if they don't exist)
   - Start listening on port 5000

## 🗄️ Database Schema

The following tables are automatically created by Sequelize:

- **users**: User accounts with authentication
- **products**: Product catalog (Tops, Trousers)
- **carts**: Shopping cart items
- **orders**: Customer orders
- **order_items**: Individual items within orders

## 📡 API Endpoints

### Authentication

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/signup` | POST | ❌ | Register new user |
| `/api/auth/login` | POST | ❌ | Login user |
| `/api/auth/profile` | GET | ✅ | Get user profile |

### Products

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/products` | GET | ❌ | Get all products |
| `/api/products/:id` | GET | ❌ | Get product by ID |
| `/api/products/category/:category` | GET | ❌ | Get products by category |
| `/api/products` | POST | ❌ | Create product (admin) |

### Cart

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/cart` | GET | ✅ | Get user's cart |
| `/api/cart/add` | POST | ✅ | Add item to cart |
| `/api/cart/:id` | PUT | ✅ | Update cart item quantity |
| `/api/cart/:id` | DELETE | ✅ | Remove item from cart |
| `/api/cart` | DELETE | ✅ | Clear entire cart |

### Orders

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/orders/create` | POST | ✅ | Create order from cart |
| `/api/orders` | GET | ✅ | Get user's order history |
| `/api/orders/:id` | GET | ✅ | Get order by ID |

### Search

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/search?query=searchterm` | GET | ❌ | Search products |

## 🧪 Testing with Postman

### 1. Sign Up
```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

### 2. Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Get All Products
```http
GET http://localhost:5000/api/products
```

### 4. Add to Cart (requires auth token)
```http
POST http://localhost:5000/api/cart/add
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "product_id": 1,
  "size": "M",
  "quantity": 2
}
```

### 5. Create Order (requires auth token)
```http
POST http://localhost:5000/api/orders/create
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "shipping_name": "John Doe",
  "shipping_address1": "123 Main St",
  "shipping_address2": "Apt 4B",
  "shipping_city": "Mumbai",
  "shipping_state": "Maharashtra",
  "shipping_pincode": "400001",
  "shipping_phone": "1234567890",
  "payment_method": "card"
}
```

### 6. Search Products
```http
GET http://localhost:5000/api/search?query=white
```

## 🔗 Frontend Integration

1. **Update API base URL** in your React frontend:
   ```javascript
   const API_BASE_URL = "http://localhost:5000/api";
   ```

2. **Store JWT token** after login:
   ```javascript
   localStorage.setItem("token", response.data.token);
   ```

3. **Include token in requests**:
   ```javascript
   headers: {
     "Authorization": `Bearer ${localStorage.getItem("token")}`,
     "Content-Type": "application/json"
   }
   ```

4. **Update AuthContext** to use API endpoints instead of localStorage

5. **Update CartContext** to sync with backend API

## 🛠️ Development

- **Development mode with auto-reload**: `npm run dev`
- **Production mode**: `npm start`

## 📝 Notes

- The database tables are automatically created/updated when the server starts
- JWT tokens expire after 7 days
- All passwords are hashed using bcrypt before storage
- CORS is configured to allow requests from `http://localhost:5173` (Vite default port)

## 🔒 Security Considerations

- Change `JWT_SECRET` in production
- Use environment variables for all sensitive data
- Implement rate limiting for production
- Add input validation middleware
- Consider using HTTPS in production
- Add admin role authentication for product creation

## 🐛 Troubleshooting

- **Database connection error**: Check MySQL is running and credentials in `.env` are correct
- **Port already in use**: Change `PORT` in `.env` or stop the process using port 5000
- **CORS errors**: Ensure `CORS_ORIGIN` in `.env` matches your frontend URL

## 📄 License

ISC

