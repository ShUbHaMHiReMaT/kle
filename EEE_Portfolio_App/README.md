# EEE Mini Project Portfolio — Deployment Guide

A Google Apps Script web app for the Department of Electrical & Electronics Engineering, KLE Technological University. It uses Google Sheets (database), Google Drive (evidence) and the Gemini API (AI Mentor), and is embedded in Google Sites.

## Files

| File | Purpose |
|---|---|
| `Code.gs` | Server: initialisation, data layer, role checks, records, sign-off locks, evidence, reviews, Gemini, admin |
| `Handbook.gs` | Fixed department name and the full handbook-derived structure (themes, stages, rubric, reviews, lenses) |
| `Seed.gs` | 2026–27 class list (17 teams, 54 students by SRN, 11 guides, titles) and its import function |
| `Books.gs` | Built-in study notes from the 12 department textbooks/battery references (chapter pointers + why each book), used by the AI Mentor quiz and answers — no PDF reading at runtime |
| `Index.html` | Page shell and design system (responsive layout, light/dark themes) |
| `App.html` | Client application, included into `Index.html` |
| `appsscript.json` | Manifest: OAuth scopes, V8 runtime, web-app settings |
| `PORTFOLIO_STRUCTURE.md` | The portfolio structure derived from the handbook |

## 1. Create the project

1. Sign in with the **department / HoD Google account** that will own the data. This account becomes the permanent administrator.
2. Go to <https://script.google.com> → **New project**. Name it `EEE Mini Project Portfolio`.
3. **Project Settings** (gear icon) → tick **Show "appsscript.json" manifest file in editor**.
4. Create the files and paste in the contents:
   - `Code.gs` (replace the default code)
   - **+ → Script** named `Handbook` (it becomes `Handbook.gs`)
   - **+ → HTML** named `Index`
   - **+ → HTML** named `App`
   - Replace the contents of `appsscript.json`
5. Click **Save**.

## 2. Set the Gemini API key (the server-side "env" variable)

1. **Project Settings → Script properties → Add script property**.
2. Property: `GEMINI_API_KEY`. Value: your key from <https://aistudio.google.com/apikey>.
3. Optional: add `GEMINI_MODEL` (for example `gemini-2.5-flash`). The model can also be changed in the Admin UI.

`setup()` creates the empty `GEMINI_API_KEY` slot if it is missing. The key is read only on the server. It never appears in the HTML or JS, in the spreadsheet, or in any response sent to a browser; the Admin UI shows only its last 4 characters. You can add further keys and assign them to teams from **Administration → Gemini AI**; those keys are also stored in Script Properties.

## 3. Initialise and authorise

1. In the editor, choose the function **`setup`** and click **Run**.
2. Approve the permissions (Sheets, Drive, external requests for Gemini, sending sign-in emails).
3. The execution log shows the URLs of the backend spreadsheet and the Drive folder.

`setup()` is idempotent: it creates missing sheets, columns and folders and never deletes or overwrites data. It also runs automatically on the first web request.

## 4. Deploy as a web app

1. **Deploy → New deployment → Select type: Web app**.
2. **Execute as:** *Me (the owner account)*.
3. **Who has access:**
   - With a Google Workspace domain (for example `kletech.ac.in`): choose **Anyone within KLE Technological University**. Users are identified by their Google login automatically.
   - With personal Gmail accounts: choose **Anyone with a Google account**. Users sign in with a 6-digit code emailed to their registered address.
4. **Deploy** and copy the **Web app URL** (it ends in `/exec`).
5. After later code changes: **Deploy → Manage deployments → Edit → Version: New version → Deploy**. The URL stays the same and the data is preserved.

## 5. Embed in Google Sites

1. Open your Google Site → **Insert → Embed → By URL** → paste the `/exec` URL → **Insert**.
2. Drag the embed to **full page width** and make it tall (at least 900 px). On mobile, Sites stacks it to full width.
3. Optionally add a **Button** link to the same URL labelled "Open portfolio in full screen". This works best on phones.
4. **Publish** the site, limiting viewers to your organisation if available.

The app sets `XFrameOptionsMode.ALLOWALL` so that Sites can embed it.

## 6. First-time administration (all done in the UI)

1. Open the web app as the owner → **Administration**.
2. **Faculty**: add guides (singly or in bulk). Roles: `Faculty` (own teams), `Coordinator` / `Reviewer` (Administration + all portfolios + reviews, but no Gemini keys or settings), `HoD/Admin` (everything).
3. **Teams**: create teams, choose one of the 6 themes and an artefact, assign a guide, co-guide and reviewers, and tick members. A Drive evidence folder is created and shared automatically.
4. **Students**: add them singly or use **Import 2026–27 class list**, or bulk-paste `SRN, Name, Email (optional), Team name`.
5. **Gemini AI**: click **Test** on the environment key, set the default model, daily limit and temperature, and optionally assign keys or models per team.
6. **Settings**: hard-gate enforcement, whether students see their marks, and email-code sign-in.

## 7. Security model

**Server side (the real protection):**
- No credentials exist in the client. Fetching the page with `curl` returns only the HTML/JS shell: no API keys, no tokens, no data, no spreadsheet IDs. Data is returned only through `google.script.run` after the server identifies the user.
- Every action passes through one dispatcher (`api()`), which checks the role and then team membership (`teamAccess_`). Students see only their own team and only their own individual reflections. Faculty see only the teams assigned to them and cannot edit student records. Admin functions check the role on the server.
- Gemini keys live only in Script Properties.
- Every cell is written as literal text, which blocks spreadsheet formula injection. All user content is rendered as text nodes, which blocks XSS.
- Sign-in by emailed code: 6-digit code valid for 10 minutes, 5 attempts, 5 requests per 15 minutes, 6-hour session token. The server does not reveal whether an email is registered.
- Signed sections lock on the server; unlocking requires a reason and is logged. Evidence deletion is a soft delete, and the Drive file is kept. All writes are recorded in the `Audit` sheet.
- Writes are serialised with `LockService`. Version checks detect conflicting edits by teammates.

**Client-side deterrents (as you requested):**
- Right-click is disabled everywhere.
- F12, Ctrl/Cmd+Shift+I/J/C/K, Ctrl+U (view source), Ctrl+S and Ctrl+P are blocked.
- Text selection, copy and drag are disabled outside form fields.
- When developer tools are detected, the page is covered by a shield screen.
- The console is silenced.

These deterrents are not security. A determined user can always read the JavaScript a browser receives, for example by disabling JavaScript or using a proxy. The design therefore assumes the client code is public: it contains nothing secret, and every rule is enforced again on the server.

## 8. Data backend (created automatically)

Sheets: `Faculty`, `Students`, `Teams`, `Stages`, `Records`, `Evidence`, `Comments`, `Reviews`, `MentorLog`, `Audit`. Do not edit them by hand. They are a store, not a UI.

Drive: `EEE Mini Project Portfolio — 2026–27/Team Evidence/<Team>/<Stage>/…`.

## 9. Limits to know

- Evidence uploads are limited to 10 MB per file. For larger files (videos, datasets), add a Drive or Git link instead.
- Apps Script quotas apply, for example email (100/day for consumer accounts, 1,500 for Workspace) and URL fetch calls.
- `gemini-2.5-flash` is the default model. Use **Load available models** in the Gemini tab to choose from the models your key supports.
