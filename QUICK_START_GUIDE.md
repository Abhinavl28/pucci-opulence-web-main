# ⚡ QUICK START - Get Your Website Running NOW!

## 🎯 You need 3 things:
1. ✅ Node.js (You have it! v22.14.0)
2. ✅ MySQL (Check if installed)
3. ✅ 10 minutes

---

## 🚀 FASTEST WAY - Follow These 7 Steps:

### STEP 1: Create Database (30 seconds)
```bash
mysql -u root -p
```
Then type:
```sql
CREATE DATABASE pucci_opulence;
EXIT;
```

### STEP 2: Edit Backend Config (1 minute)
1. Open `backend/.env` file
2. Find: `DB_PASSWORD=yourpassword`
3. Replace `yourpassword` with your **MySQL password**
4. Save

### STEP 3: Install Backend (2 minutes)
```bash
cd backend
npm install
```

### STEP 4: Start Backend ⭐ (Keep this terminal open!)
```bash
npm run dev
```
Wait for: `🚀 Server running on port 5000`

### STEP 5: Add Products (30 seconds)
**NEW terminal:**
```bash
cd backend
npm run seed
```

### STEP 6: Install Frontend (2 minutes)
**NEW terminal:**
```bash
cd pucci-opulence-web-main
npm install
```

### STEP 7: Start Frontend ⭐ (Keep this terminal open!)
```bash
npm run dev
```

---

## 🎉 DONE! Open in Browser:
```
http://localhost:5173
```

---

## 📋 What You Should See:

**Terminal 1 (Backend):**
```
✅ Database connection established
✅ Database synced
🚀 Server running on port 5000
```

**Terminal 2 (Frontend):**
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

**Browser:**
- Beautiful PUCCI Opulence homepage
- Products displayed
- All features working!

---

## ❓ Problems?

**"Can't connect to database"**
→ Check MySQL password in `backend/.env`

**"npm install fails"**
→ Make sure you're in the correct folder (backend OR pucci-opulence-web-main)

**"Port already in use"**
→ Close other apps using port 5000 or 5173

---

## 📖 Need More Details?

See `RUN_NOW.md` for step-by-step instructions.

---

**You're 7 steps away from your running website!** 🚀

