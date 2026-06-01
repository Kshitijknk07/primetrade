# Authentication Testing Guide

## Prerequisite: Clear Browser State
Before each test, open browser DevTools and:
1. Press `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
2. Delete "All time" - Cookies and cached images/files
3. Or use private/incognito window

## Test 1: Wrong Credentials (Should Fail)
1. Go to http://localhost:3000/login
2. Email: `random@notexist.com`
3. Password: `random123456`
4. Click "Sign In"

### Expected Behavior:
- Error toast appears: "Invalid credentials"
- Stay on login page
- Nothing saved to localStorage
- Cannot access /dashboard

### How to verify:
- Look for red error toast in bottom-right
- Open DevTools Console
- Type: `localStorage.getItem('token')` → should return `null`
- Try accessing http://localhost:3000/dashboard → redirects to /login

---

## Test 2: Valid Credentials (Should Succeed)
1. Go to http://localhost:3000/login
2. Email: `testuser@example.com`
3. Password: `TestPass123!`
4. Click "Sign In"

### Expected Behavior:
- Success toast appears: "Logged in successfully!"
- Redirected to /dashboard
- Token saved to localStorage
- Can see dashboard with tasks

### How to verify:
- Look for green success toast
- DevTools Console: `localStorage.getItem('token')` → shows JWT
- URL shows http://localhost:3000/dashboard
- Can see navbar with "Primetrade | Tasks | Profile | Logout"

---

## Test 3: Token Expiration (Session Reset)
1. First, login with valid credentials (Test 2)
2. Open DevTools Console
3. Type: `localStorage.clear()`
4. Try accessing http://localhost:3000/dashboard

### Expected Behavior:
- Immediately redirected to /login
- No dashboard access
- Token is required

---

## Test 4: Register New User
1. Go to http://localhost:3000/register
2. Email: `newuser@test.com`
3. Username: `newuser123`
4. Password: `Password123!`
5. First Name: `Test`
6. Last Name: `User`
7. Click "Create Account"

### Expected Behavior:
- Success toast appears
- Auto-redirected to /dashboard
- Can see new user in navbar
- Token saved to localStorage

---

## Quick API Test (Terminal)
```bash
# Test wrong credentials
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"wrong@test.com","password":"wrong123"}'
# Expected: 401 {"success":false,"message":"Invalid credentials"}

# Test valid credentials
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"TestPass123!"}'
# Expected: 200 {"success":true,"message":"Login successful","data":{...token...}}
```

---

## Database Users (Available for Testing)
- Email: `kshitijnkwork@gmail.com` | Password: (ask admin)
- Email: `testuser@example.com` | Password: `TestPass123!`

---

## Troubleshooting

### Error Toast Not Showing?
1. Check browser console for errors
2. Check that Sonner library is loaded
3. Try using private/incognito window

### Can't Access Dashboard Even With Valid Token?
1. Check backend is running: `curl http://localhost:5000/api/v1/auth/login`
2. Check token isn't expired
3. Clear browser cache completely
4. Restart frontend dev server

### Getting CORS Errors?
- Backend CORS is configured for `http://localhost:3000`
- Make sure frontend is running on port 3000
- Check network tab in DevTools for failed requests
