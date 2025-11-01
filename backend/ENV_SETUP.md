# Environment Setup Guide

## Quick Setup

1. **Copy the environment example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file with your settings:**
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=pucci_opulence
   JWT_SECRET=your_jwt_secret_key_change_in_production
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Create MySQL Database:**
   ```sql
   CREATE DATABASE pucci_opulence;
   ```

   Or via command line:
   ```bash
   mysql -u root -p -e "CREATE DATABASE pucci_opulence;"
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Run the server (creates tables automatically):**
   ```bash
   npm run dev
   ```

6. **Seed initial products (optional):**
   ```bash
   npm run seed
   ```

## Environment Variables Explained

- **PORT**: Server port (default: 5000)
- **DB_HOST**: MySQL host (usually localhost)
- **DB_USER**: MySQL username
- **DB_PASSWORD**: MySQL password
- **DB_NAME**: Database name (pucci_opulence)
- **JWT_SECRET**: Secret key for JWT tokens (change in production!)
- **CORS_ORIGIN**: Frontend URL for CORS (default: http://localhost:5173)

