---
name: refresh-transitive-deps
description: >-
  Refreshes stale transitive dependency versions in pnpm-lock.yaml by running
  plain `pnpm update` at the monorepo root (no CLI flags). Use when the user
  mentions outdated or stale transitives, nested dependency version skew,
  lockfile drift, or wants resolved transitive versions bumped without
  changing direct dependency ranges in package.json.
---

# Refresh transitive dependencies

## Goal

Bump **transitive** packages resolved in `pnpm-lock.yaml` while keeping direct dependency ranges in `package.json` files unchanged. Plain `pnpm update` re-resolves the lockfile within existing semver ranges.

## Workflow

1. **Confirm scope** — User wants transitive refresh, not a direct-dependency major bump or catalog edit. If they need `--latest`, overrides, or catalog changes, stop and ask.

2. **Repository root** — `cd` to the monorepo root (where `pnpm-workspace.yaml` and `package.json` live).

3. **Use project pnpm** — Match CI: enable Corepack if needed, then use the version from `packageManager` in root `package.json`.

4. **Run update (no options)** — Execute exactly:

   ```bash
   pnpm update
   ```

   Do **not** add flags (`--recursive`, `--latest`, `--depth`, `-r`, etc.) unless the user explicitly asks.

5. **Review diff** — Inspect `pnpm-lock.yaml` (and any unexpected `package.json` edits). Summarize which transitive packages changed; call out security-relevant bumps if obvious.

6. **Verify** — From repo root:

   ```bash
   pnpm run check
   ```

   If check fails due to the update, fix or report; do not weaken checks to greenwash.

7. **Report** — State that `pnpm update` was run without options, what changed in the lockfile, and whether `pnpm run check` passed.

## Constraints

- **One command for the update step:** `pnpm update` only.
- **Do not** run `npm update` or substitute `pnpm up` aliases with flags.
- **Do not** edit `catalog:` in `pnpm-workspace.yaml` unless the user asks — that changes direct version pins, not just transitives.
- Prefer a focused lockfile-only change; avoid unrelated refactors in the same pass.

## When this is not enough

If transitives stay stale after `pnpm update`, explain why (pinned overrides, `pnpm.overrides`, exact versions, or out-of-range direct deps) and ask before using stronger pnpm commands.
