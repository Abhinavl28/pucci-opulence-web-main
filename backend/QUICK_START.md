# 🚀 Quick Start Guide

## Prerequisites Check
- ✅ Node.js installed (v16+)
- ✅ MySQL installed and running
- ✅ Database created

## Setup (5 minutes)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
# Copy the template
cp env.template .env

# Edit .env with your MySQL credentials
# Windows: notepad .env
# Mac/Linux: nano .env
```

### 3. Create Database
```sql
CREATE DATABASE pucci_opulence;
```

Or via command line:
```bash
mysql -u root -p -e "CREATE DATABASE pucci_opulence;"
```

### 4. Start Server
```bash
npm run dev
```

You should see:
```
✅ Database connection established
✅ Database synced
🚀 Server running on port 5000
```

### 5. Seed Products (Optional)
```bash
npm run seed
```

## Test the API

Open browser or Postman:
```
GET http://localhost:5000/api/health
```

Should return:
```json
{"message": "PUCCI Opulence API is running", "status": "ok"}
```

## Next Steps

1. **Test Authentication**: See `POSTMAN_COLLECTION.md`
2. **Integrate Frontend**: See `FRONTEND_INTEGRATION.md`
3. **Read Full Docs**: See `README.md`

## Troubleshooting

**Can't connect to database?**
- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `.env`
- Ensure database exists: `SHOW DATABASES;`

**Port already in use?**
- Change `PORT` in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill` (Mac/Linux)

**Module not found?**
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

