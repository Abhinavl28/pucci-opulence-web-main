# 📁 Backend Files Overview

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                    # Sequelize database connection
│   ├── models/
│   │   ├── User.js                  # User model (authentication)
│   │   ├── Product.js               # Product model (catalog)
│   │   ├── Cart.js                  # Cart model (shopping cart)
│   │   ├── Order.js                 # Order model (purchases)
│   │   └── OrderItem.js             # OrderItem model (order details)
│   ├── controllers/
│   │   ├── authController.js        # Sign up, login, profile
│   │   ├── productController.js     # Product CRUD operations
│   │   ├── cartController.js        # Cart management
│   │   ├── orderController.js       # Order creation & history
│   │   └── searchController.js      # Product search
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js            # /api/auth endpoints
│   │   ├── productRoutes.js         # /api/products endpoints
│   │   ├── cartRoutes.js            # /api/cart endpoints
│   │   ├── orderRoutes.js           # /api/orders endpoints
│   │   └── searchRoutes.js          # /api/search endpoints
│   ├── app.js                       # Express app & server setup
│   └── seed.js                      # Database seeding script
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies & scripts
├── env.template                     # Environment variables template
├── README.md                        # Full documentation
├── QUICK_START.md                   # Quick setup guide
├── ENV_SETUP.md                     # Environment setup details
├── POSTMAN_COLLECTION.md            # API testing examples
└── FRONTEND_INTEGRATION.md          # Frontend integration guide
```

## Key Files Explained

### Configuration
- **`src/config/db.js`**: Sequelize configuration and database connection
- **`env.template`**: Environment variables template (copy to `.env`)

### Models (Database Schema)
- **`User.js`**: Stores user accounts with email, password hash, name, phone
- **`Product.js`**: Product catalog with name, price, category, images, sizes
- **`Cart.js`**: Shopping cart items linked to users and products
- **`Order.js`**: Customer orders with shipping and payment info
- **`OrderItem.js`**: Individual items within each order

### Controllers (Business Logic)
- **`authController.js`**: 
  - `signUp()`: Create new user account
  - `signIn()`: Authenticate user and return JWT
  - `getProfile()`: Get user profile
- **`productController.js`**:
  - `getAllProducts()`: List all products
  - `getProductById()`: Get single product
  - `getProductsByCategory()`: Filter by category
  - `createProduct()`: Add new product
- **`cartController.js`**:
  - `getCart()`: Get user's cart with items
  - `addToCart()`: Add product to cart
  - `updateCartItem()`: Change quantity
  - `removeFromCart()`: Delete item
  - `clearCart()`: Empty cart
- **`orderController.js`**:
  - `createOrder()`: Create order from cart
  - `getOrders()`: Get user's order history
  - `getOrderById()`: Get specific order details
- **`searchController.js`**:
  - `searchProducts()`: Search by name/description/category

### Middleware
- **`authMiddleware.js`**: Validates JWT tokens for protected routes

### Routes (API Endpoints)
- **`authRoutes.js`**: `/api/auth/*` - Authentication endpoints
- **`productRoutes.js`**: `/api/products/*` - Product endpoints
- **`cartRoutes.js`**: `/api/cart/*` - Cart endpoints (protected)
- **`orderRoutes.js`**: `/api/orders/*` - Order endpoints (protected)
- **`searchRoutes.js`**: `/api/search/*` - Search endpoint

### Main Application
- **`app.js`**: 
  - Express server setup
  - Middleware configuration
  - Route registration
  - Database sync
  - Server startup

### Utilities
- **`seed.js`**: Populates database with initial product data

## Database Tables (Auto-created)

1. **users**: User accounts
2. **products**: Product catalog
3. **carts**: Shopping cart items
4. **orders**: Customer orders
5. **order_items**: Order line items

## API Endpoints Summary

| Route | Method | Auth | Controller | Description |
|-------|--------|------|------------|-------------|
| `/api/auth/signup` | POST | ❌ | authController | Register user |
| `/api/auth/login` | POST | ❌ | authController | Login user |
| `/api/auth/profile` | GET | ✅ | authController | Get profile |
| `/api/products` | GET | ❌ | productController | List products |
| `/api/products/:id` | GET | ❌ | productController | Get product |
| `/api/products/category/:cat` | GET | ❌ | productController | Filter by category |
| `/api/cart` | GET | ✅ | cartController | Get cart |
| `/api/cart/add` | POST | ✅ | cartController | Add to cart |
| `/api/cart/:id` | PUT | ✅ | cartController | Update item |
| `/api/cart/:id` | DELETE | ✅ | cartController | Remove item |
| `/api/orders/create` | POST | ✅ | orderController | Create order |
| `/api/orders` | GET | ✅ | orderController | Order history |
| `/api/orders/:id` | GET | ✅ | orderController | Get order |
| `/api/search?query=` | GET | ❌ | searchController | Search products |

## Scripts

- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm run seed`: Populate database with sample products

