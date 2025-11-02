-- ============================================
-- PUCCI Opulence Database Schema
-- ============================================

-- Drop existing database if exists and create new
DROP DATABASE IF EXISTS pucci_opulence;
CREATE DATABASE pucci_opulence;
USE pucci_opulence;

-- ============================================
-- Table: users
-- ============================================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: products
-- ============================================
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category ENUM('TOPS', 'TROUSERS') NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    images JSON NOT NULL,
    sizes VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: carts
-- ============================================
CREATE TABLE carts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    size VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: orders
-- ============================================
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    shipping_address TEXT,
    shipping_city VARCHAR(100),
    shipping_state VARCHAR(100),
    shipping_zip VARCHAR(20),
    shipping_country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: order_items
-- ============================================
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    size VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DUMMY DATA - Users
-- ============================================
INSERT INTO users (name, email, phone, password_hash) VALUES
('John Doe', 'john.doe@example.com', '+1-555-0101', '75K3eLr+dx6JJFuJ7LwIpEpOFmwGZZkRiB84PURz6U8='),
('Jane Smith', 'jane.smith@example.com', '+1-555-0102', '75K3eLr+dx6JJFuJ7LwIpEpOFmwGZZkRiB84PURz6U8='),
('Michael Johnson', 'michael.j@example.com', '+1-555-0103', '75K3eLr+dx6JJFuJ7LwIpEpOFmwGZZkRiB84PURz6U8='),
('Emily Davis', 'emily.davis@example.com', '+1-555-0104', '75K3eLr+dx6JJFuJ7LwIpEpOFmwGZZkRiB84PURz6U8='),
('David Wilson', 'david.w@example.com', '+1-555-0105', '75K3eLr+dx6JJFuJ7LwIpEpOFmwGZZkRiB84PURz6U8=');

-- Note: All passwords are hashed version of "password123"

-- ============================================
-- DUMMY DATA - Products
-- ============================================
INSERT INTO products (name, category, description, price, images, sizes) VALUES
(
    'White PUCCI Tee',
    'TOPS',
    'A premium oversized tee featuring the iconic PUCCI branding. Crafted from the finest cotton for ultimate comfort and style.',
    799.99,
    '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80","https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"]',
    'Oversized S,M,L,XL'
),
(
    'Black Gradient Graffiti',
    'TOPS',
    'An exclusive oversized piece featuring bold gradient graffiti design. A statement piece for the fashion-forward.',
    1299.99,
    '["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80","https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80"]',
    'Oversized S,M,L,XL'
),
(
    'Flared Black Comforts',
    'TROUSERS',
    'Luxurious flared trousers in deep black. Tailored to perfection with a comfortable fit that exudes elegance.',
    1499.99,
    '["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80","https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80"]',
    '28,30,32,34'
),
(
    'Pleated Ivory',
    'TROUSERS',
    'Sophisticated pleated trousers in pristine ivory. A timeless piece that combines classic elegance with modern sophistication.',
    1599.99,
    '["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80","https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80"]',
    '28,30,32,34'
),
(
    'Navy Blue Polo',
    'TOPS',
    'Classic navy blue polo shirt with PUCCI embroidery. Perfect for casual elegance.',
    899.99,
    '["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80","https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80"]',
    'S,M,L,XL,XXL'
),
(
    'Charcoal Grey Hoodie',
    'TOPS',
    'Premium heavyweight hoodie in charcoal grey. Ultimate comfort meets street style.',
    1599.99,
    '["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80","https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80"]',
    'Oversized S,M,L,XL'
),
(
    'Slim Fit Denim',
    'TROUSERS',
    'Premium slim fit denim jeans in classic blue. Timeless style with modern comfort.',
    1899.99,
    '["https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80","https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80"]',
    '28,30,32,34,36'
),
(
    'Beige Chinos',
    'TROUSERS',
    'Elegant beige chinos perfect for any occasion. Versatile and comfortable.',
    1399.99,
    '["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80","https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"]',
    '28,30,32,34,36'
);

-- ============================================
-- DUMMY DATA - Cart Items
-- ============================================
INSERT INTO carts (user_id, product_id, quantity, size) VALUES
(1, 1, 2, 'M'),
(1, 3, 1, '32'),
(2, 2, 1, 'L'),
(2, 4, 1, '30'),
(3, 5, 3, 'XL'),
(4, 6, 1, 'M'),
(5, 7, 2, '34');

-- ============================================
-- DUMMY DATA - Orders
-- ============================================
INSERT INTO orders (user_id, total_amount, status, shipping_address, shipping_city, shipping_state, shipping_zip, shipping_country) VALUES
(1, 3099.97, 'DELIVERED', '123 Main Street, Apt 4B', 'New York', 'NY', '10001', 'USA'),
(2, 2799.98, 'SHIPPED', '456 Oak Avenue', 'Los Angeles', 'CA', '90001', 'USA'),
(3, 2699.97, 'PROCESSING', '789 Pine Road', 'Chicago', 'IL', '60601', 'USA'),
(4, 1599.99, 'PENDING', '321 Elm Street', 'Houston', 'TX', '77001', 'USA'),
(5, 3799.98, 'DELIVERED', '654 Maple Drive', 'Phoenix', 'AZ', '85001', 'USA');

-- ============================================
-- DUMMY DATA - Order Items
-- ============================================
INSERT INTO order_items (order_id, product_id, quantity, size, price) VALUES
-- Order 1 items
(1, 1, 2, 'M', 799.99),
(1, 3, 1, '32', 1499.99),
-- Order 2 items
(2, 2, 1, 'L', 1299.99),
(2, 4, 1, '30', 1599.99),
-- Order 3 items
(3, 5, 3, 'XL', 899.99),
-- Order 4 items
(4, 6, 1, 'M', 1599.99),
-- Order 5 items
(5, 7, 2, '34', 1899.99);

-- ============================================
-- Verification Queries
-- ============================================
-- SELECT COUNT(*) as total_users FROM users;
-- SELECT COUNT(*) as total_products FROM products;
-- SELECT COUNT(*) as total_cart_items FROM carts;
-- SELECT COUNT(*) as total_orders FROM orders;
-- SELECT COUNT(*) as total_order_items FROM order_items;

-- ============================================
-- Summary
-- ============================================
-- Users: 5 dummy users (password: password123)
-- Products: 8 products (4 TOPS, 4 TROUSERS)
-- Cart Items: 7 items across different users
-- Orders: 5 orders with different statuses
-- Order Items: 7 items across orders
-- ============================================
