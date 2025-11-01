# 🚀 Quick Start - Run Complete Website

## Option 1: Automatic Start (Windows)

**Double-click:** `START_WEBSITE.bat`

This will automatically start both backend and frontend servers.

## Option 2: Manual Start

### First Time Setup:

1. **Set up MySQL Database:**
   ```sql
   CREATE DATABASE pucci_opulence;
   ```

2. **Configure Backend:**
   ```bash
   cd backend
   Copy-Item env.template .env
   # Edit .env with your MySQL password
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd pucci-opulence-web-main
   npm install
   ```

### Every Time You Run:

**Open TWO terminal windows:**

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

### Seed Products (One Time):
```bash
cd backend
npm run seed
```

## 🌐 Access Your Website

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/health

## ⚠️ Important

- Keep **BOTH terminals** running
- Backend must start before frontend
- MySQL must be running

## 📖 Full Setup Guide

See `SETUP_COMPLETE_WEBSITE.md` for detailed instructions.

