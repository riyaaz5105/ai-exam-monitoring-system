# SkillBridge AI Frontend

This frontend is the React + Vite client for the SkillBridge AI learning gap analyzer.

It provides:

- login and registration screens
- a welcome dashboard
- a file upload page for study materials
- Axios API calls to a FastAPI backend

## Run locally

```bash
cd gap_analyzer/frontend
npm install
npm run dev
```

The app uses `http://127.0.0.1:8000/api` as the backend base URL in `src/services/api.js`.

## Pages

- `Login.jsx` — user sign-in and JWT token storage
- `Register.jsx` — create a new account
- `Dashboard.jsx` — welcome page with navigation
- `UploadMaterial.jsx` — upload study materials to the backend

## Notes

- The frontend stores the JWT token and user profile in `localStorage`.
- The upload page posts files to `/api/material/upload`.
- If your backend runs on a different host or port, update `frontend/src/services/api.js`.
