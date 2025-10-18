# Segment (React + Vite)

This repository is a small demo React app scaffolded with Vite. 

Features implemented
- Right-hand slide-in popup
- Segment name input
- A primary "Add schema to segment" dropdown with the following options: First Name (first_name), Last Name (last_name), Gender (gender), Age (age), Account Name (account_name), City (city), State (state)
- "+Add new schema" action which appends a new dropdown into a blue box; newly added dropdowns exclude already-selected options and can be changed or removed
- Save action that POSTs JSON to `/api/segments` in the format: { name: string, schemas: string[] }

Getting started

Requirements
- Node.js 16+ (or a recent Active LTS)

Install

```powershell
cd d:\CustomerLab\Segment
npm install
```

Run dev server

```powershell
npm run dev
```

Build for production

```powershell
npm run build
```

Project layout (key files)
- `src/App.jsx` — app container and the "Save Segment" button
- `src/components/Popup.jsx` — popup panel implementation 
- `src/components/Header.jsx` — simple header
- `src/index.css`, `src/App.css` — styles

API

The save logic posts to `/api/segments` with a JSON body:

```json
{
	"name": "Segment Name",
	"schemas": ["first_name", "gender", "city"]
}
```


Notes & next improvements
- Consider adding a focus trap for full a11y (e.g., `focus-trap-react`).
- Add validation (non-empty name, at least one schema) and user-facing error messages for network failures.