# Database Import Instructions

## ⚠️ MySQL Command Not Found?

If you see the error: `'mysql' is not recognized as an internal or external command`

This means MySQL command-line tools are not in your system PATH. Here are several ways to import the database:

---

## Method 1: MySQL Workbench (Easiest)

1. **Open MySQL Workbench**
2. **Connect to your MySQL server**
   - Host: localhost
   - Port: 3306
   - Username: root
   - Password: root

3. **Open SQL Script**
   - File → Open SQL Script
   - Navigate to: `c:\Code\Code\Pucci\pucci-opulence-web-main\database\schema.sql`
   - Click Open

4. **Execute Script**
   - Click the lightning bolt icon (⚡) or press `Ctrl+Shift+Enter`
   - Wait for completion

5. **Verify**
   - You should see: "5 rows affected", "8 rows affected", etc.
   - Check the schemas panel - you should see `pucci_opulence` database

---

## Method 2: Add MySQL to PATH

### Find MySQL Installation

MySQL is typically installed at:
- `C:\Program Files\MySQL\MySQL Server 8.0\bin`
- `C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin`

### Add to PATH (Windows)

1. **Open System Properties**
   - Press `Win + X`
   - Click "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"

2. **Edit PATH**
   - Under "System variables", find "Path"
   - Click "Edit"
   - Click "New"
   - Add: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
   - Click "OK" on all dialogs

3. **Restart Command Prompt**
   - Close all command prompt windows
   - Open a new one

4. **Test MySQL**
   ```bash
   mysql --version
   ```

5. **Run Import Script**
   ```bash
   cd c:\Code\Code\Pucci\pucci-opulence-web-main\database
   import.bat
   ```

---

## Method 3: Use Full MySQL Path

Create a new file: `database\import-with-path.bat`

```batch
@echo off
echo ========================================
echo PUCCI Opulence - Database Import
echo ========================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Try common MySQL installation paths
set MYSQL_PATH=""

if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
)

if exist "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    set MYSQL_PATH="C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe"
)

if exist "C:\Program Files\MySQL\MySQL Server 5.7\bin\mysql.exe" (
    set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 5.7\bin\mysql.exe"
)

if %MYSQL_PATH%=="" (
    echo ERROR: MySQL not found in common installation paths
    echo Please install MySQL or add it to PATH
    pause
    exit /b 1
)

echo Found MySQL at: %MYSQL_PATH%
echo Importing database...
echo.

%MYSQL_PATH% -u root -proot < schema.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Database imported successfully!
    echo ========================================
    echo.
    echo Database: pucci_opulence
    echo Users: 5 dummy users
    echo Products: 8 products
    echo.
) else (
    echo.
    echo ERROR: Import failed!
    echo.
)

pause
```

---

## Method 4: Manual Command Line

1. **Find MySQL bin folder**
   - Usually: `C:\Program Files\MySQL\MySQL Server 8.0\bin`

2. **Open Command Prompt in that folder**
   - Navigate to the bin folder in File Explorer
   - Type `cmd` in the address bar
   - Press Enter

3. **Run import command**
   ```bash
   mysql -u root -proot < "c:\Code\Code\Pucci\pucci-opulence-web-main\database\schema.sql"
   ```

---

## Method 5: Let Spring Boot Create Tables

If you can't import the schema, the Spring Boot backend will automatically create the tables:

1. **Just start the backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Spring Boot will:**
   - Create the database `pucci_opulence`
   - Generate all tables from JPA entities
   - Load 4 sample products (minimal data)

3. **Note:** You won't have the 5 dummy users, but you can:
   - Register new accounts through the frontend
   - Still test all features

---

## Verification

After importing, verify the data:

### Using MySQL Workbench
1. Connect to server
2. Select `pucci_opulence` database
3. Right-click on tables → "Select Rows"
4. Check: users (5), products (8), carts (7), orders (5)

### Using Command Line
```bash
mysql -u root -proot
```

```sql
USE pucci_opulence;
SELECT COUNT(*) as total FROM users;      -- Should be 5
SELECT COUNT(*) as total FROM products;   -- Should be 8
SELECT COUNT(*) as total FROM carts;      -- Should be 7
SELECT COUNT(*) as total FROM orders;     -- Should be 5
EXIT;
```

### Using the Application
1. Start backend: `cd backend && mvn spring-boot:run`
2. Check console for: `✅ Database contains 8 products`
3. Start frontend: `cd frontend && npm run dev`
4. Open: http://localhost:5173
5. You should see 8 products

---

## Troubleshooting

### MySQL Not Installed
- Download from: https://dev.mysql.com/downloads/mysql/
- During installation, set root password to: `root`

### Can't Find MySQL Installation
Search for `mysql.exe` in File Explorer:
1. Open File Explorer
2. Go to C:\ drive
3. Search for: `mysql.exe`
4. Note the path (usually in a `bin` folder)

### Wrong Password
If your MySQL root password is not `root`:
1. Edit `backend/src/main/resources/application.properties`
2. Change: `spring.datasource.password=your_actual_password`

### MySQL Service Not Running
1. Press `Win + R`
2. Type: `services.msc`
3. Find "MySQL80" or "MySQL"
4. Right-click → Start

---

## Quick Summary

**Easiest Method:** Use MySQL Workbench
1. Open Workbench
2. Connect to server
3. File → Open SQL Script → select `schema.sql`
4. Click ⚡ to execute

**Alternative:** Let Spring Boot create tables (no dummy data)
1. Just run: `cd backend && mvn spring-boot:run`
2. Register users through the app

---

Need more help? Check the main README.md or SETUP_GUIDE.md
