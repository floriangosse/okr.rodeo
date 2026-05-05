# 10x Key Results — Design Doc

## Overview

A fun, satirical website that generates random OKR key results by combining three lists of corporate buzzword phrases. Tone is corporate satire with a touch of absurdism — results should sound like something a real exec might say in an all-hands.

## Stack

- React + Vite
- No backend, no persistence
- Shareable links via URL query params (`?kr=`)

## Phrase Generation

Three-part formula: `[Verb phrase] [Metric/number + object] [Buzzword tail]`

**List 1 — Verb phrases** (~20 items)
Examples: "Increase", "Drive", "Accelerate", "Optimize", "Leverage", "Reduce friction in", "Unlock", "Scale", "Align stakeholders around", "10x", "Democratize", "Productize", "Sunset legacy approaches to", "Double down on"

**List 2 — Metric + object** (~20 items)
Examples: "NPS by 40%", "time-to-value by 3x", "cross-functional bandwidth by 110%", "quarterly synergy score by EOQ", "EBITDA-adjacent KPIs by 2 sprints", "customer delight index by Q3", "developer velocity by 2x", "stakeholder alignment by 85%"

**List 3 — Buzzword tail** (~20 items)
Examples: "across all verticals", "via agile ceremonies", "through a customer-centric lens", "leveraging our core competencies", "at the intersection of innovation and execution", "by sunsetting legacy thinking", "in a scalable and repeatable way", "with a bias toward action"

Each list has ~20 items → ~8,000 possible combinations.

## UI Layout

**Header**

- Site name: "10x Key Results" — bold, SaaS-product style
- Tagline: "Enterprise-grade OKR generation, powered by synergy"

**Main card** (centered, white card on light gray background)

- Generated KR displayed in large, prominent typography
- Placeholder on first load: "Click Generate to unlock your next breakthrough"
- "KR #XXXX" label (random 4-digit number, cosmetic)

**Actions**

- `Generate` button — primary, generates new random KR
- `Copy` button — secondary, copies KR text to clipboard with checkmark confirmation

**Share**

- "Share this KR" — updates URL with `?kr=<encoded-result>`, shows copyable URL

**Footer**

- Disclaimer: "Results guaranteed to impress in any all-hands meeting. Not responsible for actual OKR adoption."

## Visual Style

- Clean & minimal baseline (white card, light gray background, sans-serif)
- Corporate parody overlay: looks like a real SaaS tool at a glance
- The absurdity of the content provides the comedy — UI plays it straight

## Future Mode

Slot machine / spinning wheel animation where the three phrase parts spin independently before landing. Designed as a second mode, not MVP.
