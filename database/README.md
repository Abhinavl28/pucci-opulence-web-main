# Database Setup

This folder contains all database-related files for the PUCCI Opulence application.

## Files

- **schema.sql** - Complete database schema with dummy data

## Database Information

- **Database Name:** `pucci_opulence`
- **MySQL Version:** 8.0+
- **Default Credentials:**
  - Username: `root`
  - Password: `root`

## Quick Setup

### Option 1: Auto-Detect MySQL (Recommended for Windows)

```bash
cd database
import-auto.bat
```

This script will automatically find your MySQL installation and import the schema.

### Option 2: MySQL Workbench (Easiest if command line fails)

1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Open SQL Script
4. Select `schema.sql`
5. Execute the script (⚡ icon or Ctrl+Shift+Enter)

### Option 3: Using MySQL Command Line (if in PATH)

```bash
cd database
mysql -u root -proot < schema.sql
```

### Option 4: Let Spring Boot Create Tables

If you can't import the schema, just start the backend:
```bash
cd backend
mvn spring-boot:run
```

Spring Boot will auto-create tables (but without dummy data).

### ⚠️ MySQL Not Found?

See **[IMPORT_INSTRUCTIONS.md](IMPORT_INSTRUCTIONS.md)** for detailed help!

## Database Schema

### Tables

1. **users** - User accounts
   - 5 dummy users included
   - Default password: `password123` (hashed)

2. **products** - Product catalog
   - 8 products (4 TOPS, 4 TROUSERS)
   - Includes images and pricing

3. **carts** - Shopping cart items
   - 7 sample cart items

4. **orders** - Customer orders
   - 5 sample orders with different statuses

5. **order_items** - Order line items
   - 7 order items linked to orders

## Dummy Data Summary

### Users (5)
- john.doe@example.com
- jane.smith@example.com
- michael.j@example.com
- emily.davis@example.com
- david.w@example.com

**Password for all users:** `password123`

### Products (8)
1. White PUCCI Tee - ₹799.99
2. Black Gradient Graffiti - ₹1299.99
3. Flared Black Comforts - ₹1499.99
4. Pleated Ivory - ₹1599.99
5. Navy Blue Polo - ₹899.99
6. Charcoal Grey Hoodie - ₹1599.99
7. Slim Fit Denim - ₹1899.99
8. Beige Chinos - ₹1399.99

### Order Statuses
- DELIVERED (2 orders)
- SHIPPED (1 order)
- PROCESSING (1 order)
- PENDING (1 order)

## Verification

After importing, verify the data:

```sql
USE pucci_opulence;

-- Check all tables
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_products FROM products;
SELECT COUNT(*) as total_cart_items FROM carts;
SELECT COUNT(*) as total_orders FROM orders;
SELECT COUNT(*) as total_order_items FROM order_items;

-- View all products
SELECT id, name, category, price FROM products;

-- View all users
SELECT id, name, email FROM users;
```

## Reset Database

To reset the database and start fresh:

```bash
mysql -u root -proot < schema.sql
```

This will drop the existing database and recreate it with fresh dummy data.

## Notes

- The schema uses `InnoDB` engine for transaction support
- Foreign keys are set with `ON DELETE CASCADE`
- Timestamps are automatically managed
- All tables use `utf8mb4` charset for emoji support
- Indexes are created for frequently queried columns

## Integration with Backend

The Spring Boot backend is configured to use this database:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pucci_opulence
spring.datasource.username=root
spring.datasource.password=root
```

**Note:** The backend can auto-create tables, but using this schema.sql ensures you have dummy data for testing.
