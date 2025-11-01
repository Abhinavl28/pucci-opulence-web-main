# 🚀 Complete Website Setup Guide

This guide will help you run both the backend and frontend together.

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- ✅ **npm** (comes with Node.js)

## 🔧 Step 1: Set Up MySQL Database

### Option A: Using MySQL Command Line
```bash
mysql -u root -p
```
Then in MySQL:
```sql
CREATE DATABASE pucci_opulence;
EXIT;
```

### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Run: `CREATE DATABASE pucci_opulence;`

## 🗄️ Step 2: Configure Backend

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Create .env file:**
   ```bash
   # Windows PowerShell
   Copy-Item env.template .env
   
   # Or manually create .env and copy content from env.template
   ```

3. **Edit .env file** with your MySQL credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password_here
   DB_NAME=pucci_opulence
   JWT_SECRET=pucci_opulence_secret_key_2024
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Install backend dependencies:**
   ```bash
   npm install
   ```

## 🚀 Step 3: Start Backend Server

```bash
# Make sure you're in the backend folder
cd backend
npm run dev
```

You should see:
```
✅ Database connection established
✅ Database synced
🚀 Server running on port 5000
```

**Keep this terminal open!**

## 📦 Step 4: Seed Products (Optional but Recommended)

Open a **new terminal** window and run:
```bash
cd backend
npm run seed
```

This will add the 4 sample products to your database.

## 🎨 Step 5: Set Up Frontend

1. **Open a new terminal** (keep backend running)

2. **Navigate to frontend folder:**
   ```bash
   cd pucci-opulence-web-main
   ```

3. **Install frontend dependencies:**
   ```bash
   npm install
   ```

4. **The frontend is already configured** - no changes needed for basic setup!

## 🌐 Step 6: Start Frontend Server

```bash
# Make sure you're in pucci-opulence-web-main folder
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 🎉 Step 7: Access Your Website

Open your browser and go to:
```
http://localhost:5173
```

## ✅ Verify Everything Works

1. **Backend Health Check:**
   - Visit: http://localhost:5000/api/health
   - Should show: `{"message": "PUCCI Opulence API is running", "status": "ok"}`

2. **Frontend:**
   - Visit: http://localhost:5173
   - You should see the PUCCI Opulence homepage

## 🔄 Running Both Servers

You need **TWO terminal windows open**:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd pucci-opulence-web-main
npm run dev
```

## 📝 Current Status

**Note:** The frontend currently uses **localStorage** for data. To connect it to the backend API:

1. See `backend/FRONTEND_INTEGRATION.md` for integration steps
2. Or use the website as-is with localStorage (data won't persist after refresh)

## 🐛 Troubleshooting

### Backend Issues

**"Can't connect to MySQL"**
- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `backend/.env`
- Ensure database exists

**"Port 5000 already in use"**
- Change `PORT` in `backend/.env`
- Or find and kill the process using port 5000

**"Module not found"**
- Run `npm install` in the `backend` folder again

### Frontend Issues

**"Port 5173 already in use"**
- Vite will automatically use the next available port (5174, 5175, etc.)
- Or kill the process using port 5173

**"Module not found"**
- Run `npm install` in the `pucci-opulence-web-main` folder again

### Database Issues

**"Database doesn't exist"**
- Create it: `CREATE DATABASE pucci_opulence;`

**"Access denied for user"**
- Check MySQL username and password in `backend/.env`
- Verify MySQL user has permissions

## 🎯 Next Steps

Once both servers are running:
1. ✅ Test the frontend at http://localhost:5173
2. ✅ Test the backend at http://localhost:5000/api/health
3. 📖 Read `backend/FRONTEND_INTEGRATION.md` to connect them fully
4. 🧪 Use `backend/POSTMAN_COLLECTION.md` to test API endpoints

## 📞 Quick Commands Reference

```bash
# Backend
cd backend
npm install          # First time only
npm run dev          # Start backend
npm run seed         # Add sample products

# Frontend  
cd pucci-opulence-web-main
npm install          # First time only
npm run dev          # Start frontend
```

