# PUCCI Opulence Backend

Spring Boot REST API for the PUCCI Opulence e-commerce platform.

## Technology Stack

- **Spring Boot 3.2.0**
- **Java 17**
- **Spring Data JPA**
- **MySQL 8.0+**
- **Maven**
- **Lombok**

## Project Structure

```
src/
├── main/
│   ├── java/com/pucci/opulence/
│   │   ├── config/
│   │   │   ├── CorsConfig.java          # CORS configuration
│   │   │   └── DataInitializer.java     # Database seeding
│   │   ├── controller/
│   │   │   ├── AuthController.java      # Authentication endpoints
│   │   │   ├── ProductController.java   # Product CRUD
│   │   │   ├── CartController.java      # Shopping cart
│   │   │   ├── OrderController.java     # Order management
│   │   │   ├── SearchController.java    # Product search
│   │   │   └── HealthController.java    # Health check
│   │   ├── dto/
│   │   │   ├── UserDTO.java
│   │   │   ├── RegisterRequest.java
│   │   │   ├── LoginRequest.java
│   │   │   ├── CartRequest.java
│   │   │   └── OrderRequest.java
│   │   ├── model/
│   │   │   ├── User.java                # User entity
│   │   │   ├── Product.java             # Product entity
│   │   │   ├── Cart.java                # Cart entity
│   │   │   ├── Order.java               # Order entity
│   │   │   └── OrderItem.java           # Order item entity
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   ├── ProductRepository.java
│   │   │   ├── CartRepository.java
│   │   │   ├── OrderRepository.java
│   │   │   └── OrderItemRepository.java
│   │   ├── service/
│   │   │   ├── UserService.java
│   │   │   ├── ProductService.java
│   │   │   ├── CartService.java
│   │   │   └── OrderService.java
│   │   └── PucciOpulenceApplication.java
│   └── resources/
│       └── application.properties       # Configuration
└── test/
```

## Database Schema

### Users Table
- id (PK, Auto Increment)
- name
- email (Unique)
- phone
- password_hash
- created_at
- updated_at

### Products Table
- id (PK, Auto Increment)
- name
- category (ENUM: TOPS, TROUSERS)
- description
- price (Decimal)
- images (JSON)
- sizes
- created_at
- updated_at

### Carts Table
- id (PK, Auto Increment)
- user_id (FK → Users)
- product_id (FK → Products)
- quantity
- size
- created_at
- updated_at

### Orders Table
- id (PK, Auto Increment)
- user_id (FK → Users)
- total_amount (Decimal)
- status (ENUM: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- shipping_address
- shipping_city
- shipping_state
- shipping_zip
- shipping_country
- created_at
- updated_at

### Order Items Table
- id (PK, Auto Increment)
- order_id (FK → Orders)
- product_id (FK → Products)
- quantity
- size
- price (Decimal)
- created_at
- updated_at

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/user/{id}` - Get user details

### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Filter by category
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Cart
- `GET /api/cart/user/{userId}` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/{id}` - Update cart item
- `DELETE /api/cart/{id}` - Remove from cart
- `DELETE /api/cart/user/{userId}` - Clear cart

### Orders
- `GET /api/orders/user/{userId}` - Get user orders
- `GET /api/orders/{id}` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}/status` - Update order status

### Search
- `GET /api/search?q={query}` - Search products

### Health
- `GET /api/health` - API health check

## Running the Application

### Development Mode
```bash
mvn spring-boot:run
```

### Build JAR
```bash
mvn clean package
```

### Run JAR
```bash
java -jar target/pucci-opulence-backend-1.0.0.jar
```

## Configuration

Edit `src/main/resources/application.properties`:

```properties
# Server
server.port=5000

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/pucci_opulence?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## Features

- ✅ RESTful API design
- ✅ JPA/Hibernate ORM
- ✅ Automatic database creation
- ✅ Data seeding on startup
- ✅ CORS enabled
- ✅ Input validation
- ✅ Exception handling
- ✅ Simplified authentication (no JWT)
- ✅ Transaction management

## Development Notes

- **No JWT Authentication**: Simplified for development
- **Password Hashing**: SHA-256 (upgrade to BCrypt for production)
- **CORS**: Configured for localhost:5173 and localhost:3000
- **Auto DDL**: Database schema auto-updates on entity changes
- **Data Seeding**: Automatic product seeding on first run

## Testing

Access the API at: `http://localhost:5000/api`

Health check: `http://localhost:5000/api/health`

## Dependencies

- spring-boot-starter-web
- spring-boot-starter-data-jpa
- mysql-connector-j
- lombok
- spring-boot-starter-validation
- spring-boot-devtools
