# Auth Fix Intent Contract

**Goal:** Fix critical authentication bugs - login accepting any credentials, no navigation, no toasts

**User Answers:**
- Primary Goal: Complete redesign (rewrite auth properly)
- Timeline: Plenty of time
- Priority: All equally important (validation + navigation + toasts + database integrity)

---

## WHAT'S BROKEN

1. Login accepts credentials even if user not registered
2. Frontend doesn't navigate to dashboard after login
3. Sonner toasts not showing
4. Random data being saved to database
5. Auth flow completely broken

---

## ROOT CAUSE

**Middleware Token Mismatch:**
- Frontend stores token in: `localStorage`
- Middleware checks for token in: `request.cookies`
- They never communicate! That's why everything fails.

---

## SUCCESS CRITERIA

✅ Register: Creates user in database with hashed password
✅ Login valid: Works only for registered users
✅ Login invalid: Rejects with error toast  
✅ Navigation: Redirects to dashboard after successful login
✅ Toasts: Show all success/error messages
✅ Database: Contains real user data, not random
✅ Full flow: Register → Login → Dashboard → Logout all work

---

## WHAT WE'LL BUILD

A complete, working auth system where:
- Tokens are properly stored and validated
- Middleware correctly checks authentication
- Frontend properly handles all API responses
- Database stores clean, real data
- Every error is caught and shown to user
- Complete end-to-end flow is tested and works
