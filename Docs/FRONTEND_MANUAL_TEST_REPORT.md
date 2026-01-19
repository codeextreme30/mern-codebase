# Frontend Manual Test Report

Date: 2026-01-14

## Scope
Manual verification of the React (Vite) frontend routes and primary UI behavior.

- Frontend base URL: `http://127.0.0.1:5173/`
- Backend health endpoint (for smoke integration): `http://localhost:5000/api/status`

## Prerequisites
- Backend running and reachable.
- Frontend started with:
  - `cd Frontend`
  - `npm run dev -- --host 127.0.0.1 --port 5173`

## Evidence
- Backend health endpoint returns a successful JSON response at `/api/status`.
- Frontend browser shows the Login route at `/login` with the “Login Page” header.

## Results (Step-by-step)

### 1) Backend status (reference)
**Check:** Open `http://localhost:5000/api/status`

**Expected:**
- HTTP 200
- JSON body contains `success: true` and message indicating the server is running.

**Actual:**
- PASS — endpoint returned `success: true`, `status: 200`, and message “Server is running”.

---

### 2) Frontend route: `/login`
**Check:** Open `http://127.0.0.1:5173/login`

**Expected:**
- SPA route loads without a full page failure.
- “Login Page” UI appears.

**Actual:**
- PASS — “Login Page” is visible and the URL reflects `/login`.

**Observation:**
- A shared UI section (grid content + “Click Me” button) is visible above the route content.
- This is expected given the current structure where some layout content exists outside `<Routes>`.

**Recommendation (optional improvement):**
- If the intent is to show only the navbar globally, move the shared grid/button into the Home page (or a dedicated layout component) so `/login` shows only login-related UI.

---

## Notes / Known Warnings
- Vite prints a Node version warning on Node `20.17.0` indicating Vite prefers Node `20.19+` (or `22.12+`).
  - The frontend still starts in dev mode, but upgrading Node is recommended to avoid future issues.

## Conclusion
- Backend health endpoint verified.
- Frontend routing to `/login` verified and working.
- Layout content appears globally by design of current router component structure; adjust if undesired.
