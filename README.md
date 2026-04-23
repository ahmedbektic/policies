# Toggleable Demo Policy Site

This repository publishes one static policy URL for a live Terms and Conditions Analyzer demo. Change only `policy-mode.js` to switch the built `index.html` between the friendly policy and the predatory policy.

The toggle works because the build step replaces the static `dist/index.html`. It is not a client-side runtime toggle, so server-side fetchers can read the full selected policy document directly from the public GitHub Pages URL.

## Local Test

```sh
node build-demo-site.js
python -m http.server 8008 -d dist
```

Open `http://127.0.0.1:8008`.

## Initialize And Push

```sh
git init
git add .
git commit -m "add toggleable demo policy site"
```

Create an empty GitHub repo, then run:

```sh
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## Enable GitHub Pages

Go to the repo's **Settings -> Pages** page.

Select **GitHub Actions** as the Pages source if needed.

Wait for the Pages workflow to finish.

The public policy URL will be:

```text
https://<username>.github.io/<repo>/
```

## Demo Flow

1. Keep `POLICY_MODE = "good"` in `policy-mode.js`.
2. Push/deploy.
3. Add the GitHub Pages URL to the analyzer watchlist.
4. Confirm the first stored version is the friendly policy.
5. In GitHub, open the repository, click `policy-mode.js`, click the pencil edit button, and change `"good"` to `"bad"`.
6. Commit directly to `main`.
7. Wait for the Pages action to finish.
8. In the analyzer app, click "Check now" for the same watched policy URL.
9. Open history and compare versions.
10. The diff should show friendly clauses changing into predatory clauses.

## Switch From Good To Bad In GitHub UI

1. Open `https://github.com/<username>/<repo>`.
2. Click `policy-mode.js`.
3. Click the pencil edit button.
4. Change this line:

```js
export const POLICY_MODE = "good";
```

to:

```js
export const POLICY_MODE = "bad";
```

5. Choose **Commit directly to the `main` branch**.
6. Click **Commit changes**.
7. Open the **Actions** tab and wait for **Deploy GitHub Pages** to finish.
8. Use the same public URL in the analyzer:

```text
https://<username>.github.io/<repo>/
```

## Caution Notes

Do not change the public URL between good and bad. The analyzer needs the same tracked URL.

Wait for the GitHub Pages workflow to complete before clicking "Check now."

If the old page still appears, wait one minute and hard-refresh the public URL.

Only edit `policy-mode.js` during the demo. Valid values are `"good"` and `"bad"`.
