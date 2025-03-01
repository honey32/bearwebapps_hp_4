# Honey32's Blog "Bear Web Apps"

Portofolio site, semi-static using Next.js.

Monorepo using `turborepo` and `pnpm` for tear down code into ui / style (css-in-js) etc.

- `apps/web` Site itself
- `packages/eslint-config` Generated eslint config
- `packages/typescript-config` Generated typescript config
- `packages/style` toy CSS-in-JS implementation using React 19 `<style />` hoisting
- `packages/ui` UI components

# Commands

## Start dev server

```sh
pnpm run dev
```

## Build

```sh
pnpm run build:web
```

## Check 

```sh
pnpm run check-types
pnpm run lint
pnpm run check-format
```

## Format

```sh
pnpm run format
```