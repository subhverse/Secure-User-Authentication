# Secure User Authentication

React + Express + MongoDB + JWT auth app.

## GitHub direct upload (poora folder)

1. PowerShell:
   ```powershell
   cd "c:\Users\Lenovo\OneDrive\Desktop\secure user authentication"
   .\prepare-github-upload.ps1
   ```
2. GitHub → repo → **Add file** → **Upload files**
3. **Poora `secure user authentication` folder** drag karo (~51 files, 100 limit ke andar)
4. Commit

`node_modules` hata diya jata hai script se — baad mein `npm run setup` chalao.

## Setup (clone / upload ke baad)

```bash
npm run setup
```

## Run

```bash
cd server && npm run dev
cd client && npm run dev
```

- http://localhost:5173 — frontend  
- http://localhost:5000/api/health — API
