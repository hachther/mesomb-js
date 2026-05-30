// Creates a small CJS wrapper so Node/webpack users can require() the package.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const cjsPath = new URL("../dist/index.cjs", import.meta.url);
const jsPath = new URL("../dist/index.js", import.meta.url);

// Ensure dist exists (tsc should create it).
const dir = dirname(cjsPath.pathname);
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

// Minimal CJS proxy to the ESM build.
const body = `
"use strict";
module.exports = require("./index.js");
`;
writeFileSync(cjsPath, body.trimStart(), "utf-8");
