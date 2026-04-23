const fs = require("node:fs");
const path = require("node:path");

const rootDir = __dirname;
const modeFile = path.join(rootDir, "policy-mode.js");
const distDir = path.join(rootDir, "dist");
const outputFile = path.join(distDir, "index.html");

const modeSource = fs.readFileSync(modeFile, "utf8");
const modeMatch = modeSource.match(/^\s*export\s+const\s+POLICY_MODE\s*=\s*"([^"]+)"\s*;?\s*$/m);

if (!modeMatch) {
  throw new Error('Expected policy-mode.js to contain: export const POLICY_MODE = "good";');
}

const policyMode = modeMatch[1];

if (policyMode !== "good" && policyMode !== "bad") {
  throw new Error(`Invalid POLICY_MODE "${policyMode}". Allowed values are "good" or "bad".`);
}

const sourceFile = path.join(rootDir, `demo-policy-${policyMode}.html`);
const sourceHtml = fs.readFileSync(sourceFile, "utf8");
const modeComment = `<!-- DEMO_POLICY_MODE: ${policyMode} -->`;
const outputHtml = sourceHtml.replace(/^(<!doctype html>\s*)/i, `$1${modeComment}\n`);

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(outputFile, outputHtml, "utf8");

console.log(`Deployed demo policy mode: ${policyMode}`);
