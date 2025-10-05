# 🔧 TROUBLESHOOTING - Registration Issue Fixed!

## ✅ What Was Fixed

Updated `AuthContext.jsx` to handle the backend response format correctly:
- Backend returns `user.id` (string)
- Frontend expects `user._id`
- Added conversion to ensure compatibility

## 🧪 Test Now!

### **Step 1: Clear Browser Storage**

Open Browser Console (F12) and run:
```javascript
localStorage.clear();
location.reload();
```

### **Step 2: Try Registration Again**

1. Go to: http://localhost:3000/register
2. Fill in the form:
   ```
   First Name: John
   Last Name: Doe
   Email: john@deakin.edu.au
   Password: Password123!
   Confirm Password: Password123!
   University: Deakin University
   Degree: Computer Science
   Year: 2
   ```
3. Click **"Create account"**
4. ✅ Should work now!

---

## 🐛 If Still Showing "Registration Failed"

### Check Browser Console (F12):

1. Open DevTools (F12)
2. Go to **Console** tab
3. Try registering again
4. Look for error messages

### Common Errors:

#### **Error 1: CORS Error**
```
Access to XMLHttpRequest at 'http://localhost:5002' blocked by CORS
```
**Fix:** Backend is running with CORS enabled. Restart frontend:
```bash
cd frontend
npm run dev
```

#### **Error 2: Network Error**
```
AxiosError: Network Error
```
**Fix:** Backend not running. Start it:
```bash
cd backend
npm run dev
```

#### **Error 3: "User already exists"**
```
400 Bad Request: User already exists
```
**Fix:** Use a different email or clear database:
```bash
mongosh study-buddy-matcher --eval "db.users.deleteMany({})"
```

---

## 🧪 Test Registration with cURL

Test the backend directly:

```bash
curl -X POST http://localhost:5002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test2@deakin.edu.au",
    "password": "Password123!",
    "university": "Deakin University",
    "degree": "Computer Science",
    "yearOfStudy": 2
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "email": "test2@deakin.edu.au",
      "firstName": "Test",
      "lastName": "User",
      "fullName": "Test User"
    },
    "token": "eyJ..."
  }
}
```

---

## 🔍 Check Services Status

```bash
# Check backend
curl http://localhost:5002/health

# Check frontend
curl -I http://localhost:3000

# Check MongoDB
mongosh --eval "db.runCommand({ping: 1})"
```

All should return successful responses.

---

## ✅ Verification Checklist

- [ ] Backend running on port 5002
- [ ] Frontend running on port 3000
- [ ] MongoDB running locally
- [ ] Browser localStorage cleared
- [ ] No CORS errors in console
- [ ] Using unique email address

---

## 📝 What to Share if Still Not Working

1. **Backend logs:**
   ```bash
   tail -20 backend/backend.log
   ```

2. **Browser console errors:**
   - Take screenshot of Console tab (F12)

3. **Network tab:**
   - F12 → Network → Try registration → Share failing request

---

## 🎯 Quick Reset

If nothing works, do a complete reset:

```bash
# 1. Stop all services
pkill -f "nodemon server.js"
pkill -f "vite"

# 2. Clear database
mongosh study-buddy-matcher --eval "db.dropDatabase()"

# 3. Clear frontend storage
# In browser console: localStorage.clear()

# 4. Restart backend
cd backend && npm run dev &

# 5. Restart frontend
cd frontend && npm run dev &

# 6. Try registration again
open http://localhost:3000/register
```

---

## ✅ It Should Work Now!

The AuthContext has been fixed to properly handle the backend response format.

**Try registration again!** 🚀
