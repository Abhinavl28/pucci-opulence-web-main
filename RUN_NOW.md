# 🎯 How to Run the Complete Website - Step by Step

Follow these steps **in order** to get your website running.

## ✅ Prerequisites Check

Before starting, make sure you have:
- [ ] **Node.js** installed (check: `node --version`)
- [ ] **MySQL** installed and running
- [ ] **npm** installed (check: `npm --version`)

---

## 🗄️ STEP 1: Create MySQL Database

**Option A - Command Line:**
```bash
mysql -u root -p
```
Then type:
```sql
CREATE DATABASE pucci_opulence;
EXIT;
```

**Option B - MySQL Workbench:**
1. Open MySQL Workbench
2. Connect to your server
3. Run: `CREATE DATABASE pucci_opulence;`

---

## ⚙️ STEP 2: Configure Backend

1. **Open PowerShell/Terminal** in the project folder

2. **Navigate to backend:**
   ```bash
   cd backend
   ```

3. **Edit `.env` file** (open with Notepad or any text editor):
   - Find: `DB_PASSWORD=yourpassword`
   - Replace `yourpassword` with your **actual MySQL password**
   - Save the file

4. **Install backend dependencies:**
   ```bash
   npm install
   ```
   Wait for installation to complete (may take 1-2 minutes)

---

## 🚀 STEP 3: Start Backend Server

**Keep the terminal open** and run:
```bash
npm run dev
```

You should see:
```
✅ Database connection established
✅ Database synced
🚀 Server running on port 5000
```

**✅ Keep this terminal window open!**

---

## 📦 STEP 4: Seed Products (Add Sample Data)

Open a **NEW terminal window** (keep backend running):

```bash
cd backend
npm run seed
```

You should see:
```
✅ Database connection established
✅ Database synced
✅ Products seeded successfully!
```

---

## 🎨 STEP 5: Set Up Frontend

1. **Open a NEW terminal window** (keep backend running!)

2. **Navigate to frontend:**
   ```bash
   cd pucci-opulence-web-main
   ```

3. **Install frontend dependencies:**
   ```bash
   npm install
   ```
   Wait for installation to complete (may take 2-3 minutes)

---

## 🌐 STEP 6: Start Frontend Server

**In the same terminal window:**
```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

**✅ Keep this terminal window open too!**

---

## 🎉 STEP 7: Open Your Website!

Open your browser and go to:
```
http://localhost:5173
```

**🎊 Your website is now running!**

---

## 📊 Summary - What Should Be Running:

You should have **TWO terminal windows** open:

1. **Terminal 1:** Backend server on port 5000 ✅
2. **Terminal 2:** Frontend server on port 5173 ✅
3. **Browser:** http://localhost:5173 ✅

---

## 🧪 Test It Works:

1. **Backend Health Check:**
   - Visit: http://localhost:5000/api/health
   - Should show: `{"message": "PUCCI Opulence API is running", "status": "ok"}`

2. **Frontend:**
   - Visit: http://localhost:5173
   - You should see the PUCCI Opulence homepage with products

---

## 🐛 Troubleshooting

### "Can't connect to database"
- Check MySQL is running
- Verify password in `backend/.env` is correct
- Make sure database `pucci_opulence` exists

### "Port already in use"
- Backend (5000): Change `PORT` in `backend/.env`
- Frontend (5173): Vite will use next available port automatically

### "Module not found"
- Run `npm install` again in the respective folder
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`

### "npm command not found"
- Install Node.js from https://nodejs.org/

---

## 🎯 Quick Reference Commands

```bash
# Backend (Terminal 1)
cd backend
npm install          # First time only
npm run dev          # Start backend
npm run seed         # Add products (one time)

# Frontend (Terminal 2)
cd pucci-opulence-web-main
npm install          # First time only
npm run dev          # Start frontend
```

---

## 📝 Current Status

**Note:** The frontend currently uses **localStorage** (works without backend).
- Data persists in browser only
- To connect to backend API, see `backend/FRONTEND_INTEGRATION.md`

**The website works perfectly with localStorage!** The backend is ready when you want to integrate it.

---

## 🎊 You're All Set!

Your complete PUCCI Opulence website is now running!

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

Happy coding! 🚀

