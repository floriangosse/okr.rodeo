# 10x Key Results Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a React + Vite website that generates satirical OKR key results by combining three lists of corporate buzzword phrases, with copy-to-clipboard and shareable URL support.

**Architecture:** Single-page React app with no backend. Phrase generation is pure client-side logic combining one item from each of three phrase lists. Shareable links encode the result as a URL query param (`?kr=`).

**Tech Stack:** React 18, Vite, TypeScript, Vitest for unit tests, plain CSS (no CSS framework)

---

### Task 1: Scaffold the project

**Files:**

- Create: project root via `npm create vite@latest`

**Step 1: Scaffold with Vite**

```bash
cd /Users/floriangosse/Workspace/okr-spinning-wheel
npm create vite@latest . -- --template react-ts
npm install
```

**Step 2: Remove boilerplate**

Delete: `src/assets/react.svg`, `public/vite.svg`, `src/App.css`
Clear `src/App.jsx` down to a bare component:

```jsx
export default function App() {
  return <div>10x Key Results</div>;
}
```

Clear `src/index.css` to empty.

**Step 3: Install Vitest**

```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
```

**Step 4: Configure Vitest in vite.config.js**

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.js",
  },
});
```

**Step 5: Create test setup file**

Create `src/test-setup.js`:

```js
import "@testing-library/jest-dom";
```

**Step 6: Add test script to package.json**

In `package.json`, add to scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

**Step 7: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server running at http://localhost:5173

**Step 8: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold React + Vite project with Vitest"
```

---

### Task 2: Phrase data

**Files:**

- Create: `src/data/phrases.ts`
- Create: `src/data/phrases.test.ts`

**Step 1: Write the failing test**

Create `src/data/phrases.test.js`:

```js
import { verbPhrases, metricObjects, buzzwordTails } from './phrases'
import { describe, test, expect } from 'vitest'

describe('phrases', () => {
test('each list has at least 15 items', () => {
  expect(verbPhrases.length).toBeGreaterThanOrEqual(15)
  expect(metricObjects.length).toBeGreaterThanOrEqual(15)
  expect(buzzwordTails.length).toBeGreaterThanOrEqual(15)
})

test('all items are non-empty strings', () => {
  ;[...verbPhrases, ...metricObjects, ...buzzwordTails].forEach(item => {
    expect(typeof item).toBe('string')
    expect(item.trim().length).toBeGreaterThan(0)
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `phrases.js` not found

**Step 3: Create the phrase data**

Create `src/data/phrases.ts`:

```js
export const verbPhrases = [
  "Increase",
  "Drive",
  "Accelerate",
  "Optimize",
  "Leverage",
  "Reduce friction in",
  "Unlock",
  "Scale",
  "Align stakeholders around",
  "10x",
  "Democratize",
  "Productize",
  "Sunset legacy approaches to",
  "Double down on",
  "Operationalize",
  "Ideate around",
  "Synergize",
  "Disrupt",
  "Future-proof",
  "Right-size",
];

export const metricObjects = [
  "NPS by 40%",
  "time-to-value by 3x",
  "cross-functional bandwidth by 110%",
  "quarterly synergy score by EOQ",
  "EBITDA-adjacent KPIs by 2 sprints",
  "customer delight index by Q3",
  "developer velocity by 2x",
  "stakeholder alignment by 85%",
  "thought leadership output by 200%",
  "organizational agility by one full quarter",
  "our go-to-market readiness by 360 degrees",
  "net retention by a hockey-stick amount",
  "team engagement scores beyond 9000",
  "pipeline coverage by at least one paradigm shift",
  "brand equity through the roof",
  "the innovation funnel by 47%",
  "core synergies to double digits",
  "OKR completion rates meta-OKR",
  "headcount efficiency until morale improves",
  "vibes-based metrics by Q4",
];

export const buzzwordTails = [
  "across all verticals",
  "via agile ceremonies",
  "through a customer-centric lens",
  "leveraging our core competencies",
  "at the intersection of innovation and execution",
  "by sunsetting legacy thinking",
  "in a scalable and repeatable way",
  "with a bias toward action",
  "using a data-driven framework",
  "without disrupting the current roadmap",
  "by thinking outside the box, but at scale",
  "through radical cross-team transparency",
  "while maintaining psychological safety",
  "in lockstep with our north star metric",
  "before the next board meeting",
  "leveraging AI and also blockchain",
  "with full executive sponsorship",
  "via a tiger team task force",
  "in a way that moves the needle holistically",
  "by failing fast and learning faster",
];
```

**Step 4: Run test to verify it passes**

```bash
npm test
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add OKR phrase data lists"
```

---

### Task 3: Generator logic

**Files:**

- Create: `src/lib/generator.ts`
- Create: `src/lib/generator.test.ts`

**Step 1: Write the failing tests**

Create `src/lib/generator.test.ts`:

```ts
import { describe, test, expect } from 'vitest'
import { generateKR, encodeKR, decodeKR } from './generator'
import { verbPhrases, buzzwordTails } from '../data/phrases'

describe('generator', () => {
test('generateKR returns a non-empty string', () => {
  const result = generateKR()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('generateKR result contains one item from each list', () => {
  // Run many times to catch randomness issues
  for (let i = 0; i < 50; i++) {
    const result = generateKR()
    const hasVerb = verbPhrases.some(v => result.startsWith(v))
    const hasTail = buzzwordTails.some(t => result.endsWith(t))
    expect(hasVerb).toBe(true)
    expect(hasTail).toBe(true)
  }
})

test('encodeKR and decodeKR are inverse operations', () => {
  const kr = 'Scale developer velocity by 2x across all verticals'
  expect(decodeKR(encodeKR(kr))).toBe(kr)
})

test('decodeKR returns null for invalid input', () => {
  expect(decodeKR(null)).toBeNull()
  expect(decodeKR('')).toBeNull()
  expect(decodeKR(undefined)).toBeNull()
})
```

**Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `generator.js` not found

**Step 3: Implement the generator**

Create `src/lib/generator.ts`:

```ts
import { verbPhrases, metricObjects, buzzwordTails } from "../data/phrases";

function pick(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateKR() {
  return `${pick(verbPhrases)} ${pick(metricObjects)} ${pick(buzzwordTails)}`;
}

export function encodeKR(kr) {
  return btoa(encodeURIComponent(kr));
}

export function decodeKR(encoded) {
  if (!encoded) return null;
  try {
    return decodeURIComponent(atob(encoded));
  } catch {
    return null;
  }
}
```

**Step 4: Run test to verify it passes**

```bash
npm test
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/
git commit -m "feat: add KR generator and URL encoding logic"
```

---

### Task 4: Main KR card component

**Files:**

- Create: `src/components/KRCard.tsx`
- Modify: `src/App.tsx`

**Step 1: Build KRCard component**

Create `src/components/KRCard.tsx`:

```tsx
interface KRCardProps {
  kr: string | null;
  krNumber: number;
}

export default function KRCard({ kr, krNumber }: KRCardProps) {
  return (
    <div className="kr-card">
      <span className="kr-number">KR #{krNumber}</span>
      <p className="kr-text">{kr ?? "Click Generate to unlock your next breakthrough"}</p>
    </div>
  );
}
```

**Step 2: Wire up App.jsx with generate logic**

Replace `src/App.tsx`:

```tsx
import { useState, useEffect } from "react";
import KRCard from "./components/KRCard";
import type { JSX } from "react";
import { generateKR, decodeKR, encodeKR } from "./lib/generator";

function randomKRNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

export default function App(): JSX.Element {
  const [kr, setKR] = useState<string | null>(null);
  const [krNumber, setKRNumber] = useState<number>(randomKRNumber());
  const [copied, setCopied] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("kr");
    const decoded = decodeKR(encoded);
    if (decoded) {
      setKR(decoded);
      setKRNumber(randomKRNumber());
    }
  }, []);

  function handleGenerate() {
    const newKR = generateKR();
    setKR(newKR);
    setKRNumber(randomKRNumber());
    setCopied(false);
    setShareUrl(null);
    window.history.replaceState(null, "", window.location.pathname);
  }

  function handleCopy() {
    if (!kr) return;
    navigator.clipboard.writeText(kr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleShare() {
    if (!kr) return;
    const url = `${window.location.origin}${window.location.pathname}?kr=${encodeKR(kr)}`;
    setShareUrl(url);
    window.history.replaceState(null, "", `?kr=${encodeKR(kr)}`);
  }

  function handleCopyShareUrl() {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="site-title">10x Key Results</h1>
        <p className="tagline">Enterprise-grade OKR generation, powered by synergy</p>
      </header>

      <main className="main">
        <KRCard kr={kr} krNumber={krNumber} />

        <div className="actions">
          <button className="btn btn-primary" onClick={handleGenerate}>
            Generate
          </button>
          <button className="btn btn-secondary" onClick={handleCopy} disabled={!kr}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>

        {kr && (
          <div className="share">
            {!shareUrl ? (
              <button className="share-link" onClick={handleShare}>
                Share this KR →
              </button>
            ) : (
              <div className="share-url-row">
                <input className="share-url-input" readOnly value={shareUrl} />
                <button className="btn btn-secondary" onClick={handleCopyShareUrl}>
                  Copy URL
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          Results guaranteed to impress in any all-hands meeting. Not responsible for actual OKR
          adoption.
        </p>
      </footer>
    </div>
  );
}
```

**Step 3: Verify in browser**

```bash
npm run dev
```

Open http://localhost:5173. Click Generate, verify a KR appears. Click Copy.

**Step 4: Commit**

```bash
git add src/components/ src/App.jsx
git commit -m "feat: add KR card component and main app wiring"
```

---

### Task 5: Styling

**Files:**

- Modify: `src/index.css`

**Step 1: Write the CSS**

Replace `src/index.css` with:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #f0f2f5;
  color: #1a1a2e;
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.site-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0052cc;
  letter-spacing: -0.5px;
}

.tagline {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.main {
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.kr-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.06),
    0 4px 16px rgba(0, 0, 0, 0.04);
  position: relative;
}

.kr-number {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kr-text {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6;
  color: #111827;
  flex: 1;
  display: flex;
  align-items: center;
}

.kr-card:has(.kr-text:empty) .kr-text,
.kr-text {
  color: #111827;
}

.actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  padding: 0.625rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition:
    background 0.15s,
    transform 0.1s;
}

.btn:active {
  transform: scale(0.98);
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-primary {
  background: #0052cc;
  color: #ffffff;
  flex: 1;
}

.btn-primary:hover:not(:disabled) {
  background: #0041a8;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.share {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.share-link {
  background: none;
  border: none;
  color: #0052cc;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
  text-align: left;
  font-weight: 500;
}

.share-link:hover {
  text-decoration: underline;
}

.share-url-row {
  display: flex;
  gap: 0.5rem;
}

.share-url-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.8rem;
  color: #6b7280;
  background: #f9fafb;
  outline: none;
}

.footer {
  margin-top: auto;
  padding-top: 3rem;
  text-align: center;
  font-size: 0.75rem;
  color: #9ca3af;
}
```

**Step 2: Verify in browser**

```bash
npm run dev
```

Check: card looks clean, buttons styled, layout centered, share URL row appears after clicking "Share this KR".

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add UI styling with corporate parody aesthetic"
```

---

### Task 6: Final verification

**Step 1: Run all tests**

```bash
npm test
```

Expected: all tests pass

**Step 2: Test shareable URL flow**

1. Open http://localhost:5173
2. Click Generate
3. Click "Share this KR →"
4. Copy the URL from the input
5. Open the URL in a new tab
6. Verify the same KR is displayed

**Step 3: Commit**

```bash
git add .
git commit -m "chore: final verification pass"
```
