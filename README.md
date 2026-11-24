# The One-Line Exit

[![make.fun](https://img.shields.io/badge/make.fun-bounty-blue)](https://make.fun/bounty/u-kreutzx-the-one-line-exit-1dc652d1)
[![Node 22](https://img.shields.io/badge/node-22-green)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

One funny single-line resignation letter for make.fun's **The One-Line Exit** bounty ($2 in USDC, top 10 share the prize).

## The line

> I resign as the company fire warden, effective immediately — after three years of drills, I have finally found the exit.

120 characters, one line, no padding: a fire warden who spent three years running drills finally quits by taking the exit himself.

## How it works

`main.ts` (Node 22, standard library only) loads `LINE.txt`, runs it through a small checklist — 1 to 140 characters, a single line, no blank-only text, no control characters, no leading or trailing white space — then writes it to `/output/entry.txt` and reads it back to confirm the bytes match.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Bounty

- Competition: [The One-Line Exit](https://make.fun/bounty/u-kreutzx-the-one-line-exit-1dc652d1)
- Sponsor: kreutzx
- Prize: $2 in USDC for the 10 best-ranked lines (1st $0.63 … 10th $0.02)
- Deadline: 26 November 2026, 09:50 UTC
