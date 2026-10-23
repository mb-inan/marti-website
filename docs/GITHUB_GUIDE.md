# GitHub guide — repository, publishing, domain

Written for Windows, no prior git experience assumed. Two routes: **GitHub Desktop** (recommended, no typing commands) or the **command line**. Either way the result is the same: this folder becomes a repository on GitHub, and GitHub Pages serves it as a website.

One thing to know first: GitHub Pages on a free account only works for **public** repositories. The repository being public means anyone who finds it can read the files, which for a website is the point. Nothing confidential should be in this folder (it is not: the strategy documents live in the tex project, not here).

The one thing to weigh: `assets/img/ref/`, `assets/video/` and the dimmed reference photos inside the placeholder images show a customer's hangers and swing tags. They are marked "not for publication" and will be replaced after the shoot, but in a public repository they are technically visible to anyone who finds the address. Two ways to handle it: (a) publish as is and treat the address as internal until the shoot replaces them; (b) ask Claude for a stripped copy (reference material removed, placeholders re-rendered plain) before the first push. Either is fine; (a) is quicker, (b) is cleaner.

**Zip:** `C:\Users\Hax\Desktop\TEX\marti-website-v0.7.zip` is a clean copy of the folder as it stands (minus two superseded clips). It is a backup and a way to hand the whole thing to someone else; GitHub Desktop works directly on the folder, so you do not need to unzip anything to publish.

## A. Create the account and the repository

1. Go to https://github.com and sign up (or sign in). Use a company email if you want the account to outlive personal ones; a personal account is fine to start and the repository can be transferred later.
2. Top right, **+** → **New repository**.
   - Repository name: `marti-website`
   - Description: `MARTI supplier website`
   - Visibility: **Public**
   - Leave "Add a README" unticked (we have one).
   - **Create repository.**
3. Leave this page open; it shows the repository address, e.g. `https://github.com/<your-username>/marti-website`.

## B. Put the files on GitHub

### Route 1 — GitHub Desktop (recommended)

1. Download and install GitHub Desktop: https://desktop.github.com — sign in with the account from step A.
2. **File → Add local repository** → Choose `C:\Users\Hax\Desktop\TEX\website`. If it says the folder is not a repository, click **create a repository** in the same dialog, keep the defaults, and create it.
3. Bottom left: in **Summary** type the current version from `CHANGELOG.md` (today: `v0.7 seam on phones, live end settled`), then **Commit to main**.
4. Top: **Publish repository**. Untick "Keep this code private". Name `marti-website`. **Publish.**
5. Refresh the GitHub page from step A: the files are there.

For every later revision: make the changes in the folder → GitHub Desktop shows them → write a summary (use the version from `CHANGELOG.md`, e.g. `v0.2 hero copy and section order`) → **Commit to main** → **Push origin**. The website updates within a minute or two.

### Route 3 — the browser only (no software)

GitHub's web uploader takes at most 100 files per upload, so the folder is pre-split into five batches at `C:\Users\Hax\Desktop\TEX\github-upload\` with a `README-UPLOAD.txt` giving the exact clicks. In short: create the public repository without a README → on the empty repository page click "uploading an existing file" → drag the contents of `batch-01` (the complete site) → commit → *Add file → Upload files* for `batch-02` … `batch-05` (docs, screenshots, clips, snapshots) → then section C. Later changes: *Add file → Upload files* and drop the changed files at the same path; GitHub replaces them and keeps the history. The batches are copies; the folder in `website\` stays the master.

### Route 2 — command line

Install Git for Windows (https://git-scm.com/download/win), then in PowerShell:

```
cd C:\Users\Hax\Desktop\TEX\website
git init
git add .
git commit -m "v0.7 seam on phones, live end settled"
git branch -M main
git remote add origin https://github.com/<your-username>/marti-website.git
git push -u origin main
```

Later revisions:

```
git add .
git commit -m "v0.2 hero copy and section order"
git push
```

### What you should see

After publishing, the repository page lists the folders (`assets`, `docs`, `snapshots`, `tools`), the six `.html` files, `CHANGELOG.md`, `HANDOVER.md`, `README.md`. The green **Code** button confirms the files are up. If GitHub Desktop shows "No local changes" afterwards, everything is pushed.

## C. Turn on GitHub Pages

1. On the repository page: **Settings** → left menu **Pages**.
2. Under **Build and deployment**: Source = **Deploy from a branch**. Branch = **main**, folder = **/ (root)**. **Save.**
3. Wait one or two minutes, refresh. A box appears: "Your site is live at `https://<your-username>.github.io/marti-website/`".
4. Open it. It should look exactly like the local files. The `.nojekyll` file in the folder tells GitHub to serve the files as they are. Note the address has `/marti-website/` at the end: all links in the site are relative, so that works without any change.
5. Open the same address on your phone: the seam runs horizontally under the top bar there. This is the test the emulator cannot do.

If the page shows a 404 at first, wait another minute and refresh; the first deployment can take up to five. If it still 404s, check Settings → Pages shows "Your site is live" and that the branch is `main` and the folder `/ (root)`.

This address is already shareable for internal review. It is not indexed by search engines until linked from somewhere; still, treat it as public.

## D. Connect the domain (after buying one, see `DOMAIN.md`)

Two sides: tell GitHub the domain, tell the domain's DNS where GitHub is.

**GitHub side**
1. Settings → Pages → **Custom domain**: type the domain (e.g. `martitextile.com`) → **Save**. GitHub creates a `CNAME` file in the repository; pull it (GitHub Desktop: **Fetch origin** → **Pull**) so your local copy has it.
2. Tick **Enforce HTTPS** once it becomes available (may take up to an hour after DNS is set).

**Registrar side (where the domain was bought: e.g. Cloudflare, Namecheap, GoDaddy, 123-reg)**
Add these DNS records:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<your-username>.github.io` |

Then in GitHub Pages set the custom domain to the bare domain (`martitextile.com`); `www.` will redirect to it. DNS changes take from minutes to 24 hours.

Reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## E. Email on the domain

GitHub Pages serves the website only; email needs a separate provider. Options, in order of simplicity:
- Registrar's email forwarding (free with most registrars): `hello@domain` forwards to an existing inbox. Enough for the first months.
- Google Workspace or Microsoft 365 (paid, per user): proper mailboxes with the domain. Choose this when a second person needs an address.

## F. Working together on revisions

- Every change Claude proposes comes with screenshots in `docs/screenshots/<version>/` before it is built.
- When a revision is agreed, the files in `C:\Users\Hax\Desktop\TEX\website` are updated; you commit and push (section B).
- `CHANGELOG.md` is the shared record of what changed and why; `HANDOVER.md` is the current state.
- If something breaks, GitHub keeps every version: in GitHub Desktop, **History** shows each commit and any file can be restored from there.

## H. Versions: naming, tagging, going back

Every change to the site is one commit, and every commit is a version you can return to.

**Naming.** Commit message = the CHANGELOG entry's version and title, e.g. `v0.9 favicon set, cache-busting`. One CHANGELOG entry per commit. Bump the `?v=` query on `assets/css/style.css` and `assets/js/main.js` in all six `.html` files to the same version (this makes every visitor's browser fetch the new files; Claude does this when preparing a revision).

**Tagging (GitHub Desktop).** After committing: *History* tab → right-click the commit → **Create Tag…** → name `v0.9` → *Create Tag* → *Push origin* (tags are pushed with the next push). Tags appear on GitHub under the repository's *Tags* page, so any version can be found by name rather than by date.

**Looking at an old version.** On github.com: *Commits* (or *Tags*) → pick one → **Browse files** → you see the whole folder as it was; **Code → Download ZIP** gives a copy. In Desktop: *History* → select a commit → the right pane shows exactly which lines changed.

**Going back.**
- *Undo one revision:* Desktop → *History* → right-click the commit → **Revert changes in commit** → a new commit undoes it → *Push origin*. History is kept; nothing is lost.
- *Return the whole site to a version:* on github.com open that tag → *Code → Download ZIP* → copy its files over the `website` folder → Desktop shows the differences → commit as `vX.Y rollback to vA.B` → push. Or ask Claude to do the same from the tag.
- *Before GitHub (v0.3–v0.6):* the `snapshots/` folders, see `snapshots/README.md`. From v0.7 on, GitHub history is the record and no new snapshot folders are made.

**Seeing a version live.** GitHub Pages serves only `main`; to look at an old version in a browser, open its `index.html` from the downloaded ZIP locally.

## G. Later, if useful

- Branch protection and pull requests: not needed while one person pushes.
- Moving to Netlify or Cloudflare Pages: both deploy from the same GitHub repository and add form handling. Only worth it if the contact form becomes a problem.
