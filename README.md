# PUCCI Opulence - Luxury E-commerce Platform

A modern, full-stack luxury fashion e-commerce platform featuring a React frontend with TypeScript and a Spring Boot backend with MySQL database.

## 🏗️ Project Structure

```
pucci-opulence-web-main/
├── backend/                    # Spring Boot Backend (Java)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/pucci/opulence/
│   │   │   │   ├── config/           # Configuration classes
│   │   │   │   ├── controller/       # REST API controllers
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── model/            # JPA Entity models
│   │   │   │   ├── repository/       # JPA Repositories
│   │   │   │   ├── service/          # Business logic services
│   │   │   │   └── PucciOpulenceApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml                # Maven dependencies
│
├── frontend/                  # React Frontend (TypeScript)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── config/            # Configuration files
│   │   └── lib/               # Utility functions
│   ├── public/                # Static assets
│   └── package.json           # NPM dependencies
│
└── database/                  # Database Scripts
    ├── schema.sql             # Complete DB schema with dummy data
    ├── import.bat             # Database import script
    └── README.md              # Database documentation
```

## 🚀 Technology Stack

### Backend
- **Framework:** Spring Boot 3.2.0
- **Language:** Java 17
- **Database:** MySQL 8.0+
- **ORM:** Spring Data JPA / Hibernate
- **Build Tool:** Maven
- **API Style:** RESTful

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **Routing:** React Router

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Java Development Kit (JDK) 17 or higher**
- **Maven 3.6+**
- **MySQL 8.0+**
- **Node.js 18+ and npm**
- **Git**

## 🗄️ Database Setup

### Quick Setup (Recommended)

1. **Install MySQL** (if not already installed)

2. **Start MySQL Server**

3. **Import Database with Dummy Data**
   ```bash
   cd database
   mysql -u root -proot < schema.sql
   ```
   
   Or on Windows, simply run:
   ```bash
   database\import.bat
   ```

This will create the database with:
- ✅ 5 dummy users (password: `password123`)
- ✅ 8 products (4 TOPS, 4 TROUSERS)
- ✅ Sample cart items
- ✅ Sample orders

### Manual Setup

If you prefer, the application can auto-create tables (but without dummy data):

4. **Database Credentials**
   - Username: `root`
   - Password: `root`
   - Database: `pucci_opulence`
   - Port: `3306`

   > **Note:** The application is configured to automatically create the database if it doesn't exist.

## ⚙️ Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

   Or run the JAR file:
   ```bash
   java -jar target/pucci-opulence-backend-1.0.0.jar
   ```

4. **Verify backend is running:**
   - Open browser and navigate to: `http://localhost:5000/api/health`
   - You should see: `{"message":"PUCCI Opulence API is running","status":"ok"}`

5. **Database will be automatically:**
   - Created (if it doesn't exist)
   - Schema will be generated from JPA entities
   - Seeded with sample products on first run

## 🎨 Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Open browser and navigate to: `http://localhost:5173`

## 🔌 API Endpoints

### Authentication (No JWT Required)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/user/{id}` - Get user by ID

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category (TOPS/TROUSERS)
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Cart
- `GET /api/cart/user/{userId}` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item quantity
- `DELETE /api/cart/{id}` - Remove item from cart
- `DELETE /api/cart/user/{userId}` - Clear user's cart

### Orders
- `GET /api/orders/user/{userId}` - Get user's orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/{id}/status` - Update order status

### Search
- `GET /api/search?q={query}` - Search products by name or description

### Health Check
- `GET /api/health` - Check API status

## 📦 Sample Data

### Using schema.sql (Recommended)

Import `database/schema.sql` to get comprehensive dummy data:

**Users (5):**
- john.doe@example.com (password: password123)
- jane.smith@example.com (password: password123)
- michael.j@example.com (password: password123)
- emily.davis@example.com (password: password123)
- david.w@example.com (password: password123)

**Products (8):**
1. White PUCCI Tee - ₹799.99 (TOPS)
2. Black Gradient Graffiti - ₹1299.99 (TOPS)
3. Flared Black Comforts - ₹1499.99 (TROUSERS)
4. Pleated Ivory - ₹1599.99 (TROUSERS)
5. Navy Blue Polo - ₹899.99 (TOPS)
6. Charcoal Grey Hoodie - ₹1599.99 (TOPS)
7. Slim Fit Denim - ₹1899.99 (TROUSERS)
8. Beige Chinos - ₹1399.99 (TROUSERS)

Plus sample cart items and orders!

## 🛠️ Development

### Backend Development
- **Hot Reload:** Spring Boot DevTools is included for automatic restart
- **Database Changes:** Using `spring.jpa.hibernate.ddl-auto=update` for automatic schema updates
- **Logs:** Check console for SQL queries and application logs

### Frontend Development
- **Hot Reload:** Vite provides instant HMR (Hot Module Replacement)
- **Type Checking:** TypeScript ensures type safety
- **Linting:** ESLint configured for code quality

## 🔧 Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties`:

```properties
# Server Port
server.port=5000

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/pucci_opulence?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Frontend Configuration
Create `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Production Build

### Backend
```bash
cd backend
mvn clean package
java -jar target/pucci-opulence-backend-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
```

The production build will be in the `dist/` folder.

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error:**
- Ensure MySQL is running
- Verify credentials (root/root)
- Check if port 3306 is available

**Port Already in Use:**
- Change port in `application.properties`
- Kill process using port 5000

**Maven Build Fails:**
- Ensure JDK 17+ is installed
- Run `mvn clean install -U` to force update dependencies

### Frontend Issues

**Dependencies Installation Fails:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**API Connection Error:**
- Ensure backend is running on port 5000
- Check CORS configuration in backend

### Database Issues

**No Products Showing:**
- Import the database schema: `cd database && mysql -u root -proot < schema.sql`
- Or run `database\import.bat`

**Login Not Working:**
- Ensure you imported schema.sql with dummy users
- Use email: `john.doe@example.com` and password: `password123`

## 📝 Key Features

- ✅ **No JWT Authentication** - Simplified authentication without tokens
- ✅ **Product Catalog** - Browse luxury fashion items
- ✅ **Category Filtering** - Filter by TOPS and TROUSERS
- ✅ **Shopping Cart** - Add, update, and remove items
- ✅ **Order Management** - Place and track orders
- ✅ **Search Functionality** - Search products by name/description
- ✅ **Responsive Design** - Mobile-friendly UI
- ✅ **Auto Database Setup** - Automatic schema creation and data seeding

## 🔐 Security Notes

> **Important:** This application uses simplified authentication without JWT tokens for development purposes. For production use, implement proper authentication and authorization mechanisms.

## 📄 License

This project is for educational and demonstration purposes.

## 👥 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using Spring Boot and React**
