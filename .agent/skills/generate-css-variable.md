# Skill: generate-css-variable

**Purpose:** Add or change a design token in `apps/web/src/styles/tokens.css` consistently, without creating duplicates, one-offs or accessibility regressions.

## When to use
A component needs a value that isn't tokenised (colour, size, space, radius, shadow, duration, z-index, aspect ratio, font), or the brand changes.

## Decision tree
1. **Does a token already do this?** Search `tokens.css` for the role, not the value. If yes → use it.
2. **Is it a raw value (palette) or a role (semantic)?**
   - New raw colour → add to §1 *primitives* as `--palette-{hue}-{step}` (only if it's truly a new colour).
   - How it's used → add a **semantic** token in §2 that references a primitive: `--color-{role}-{variant}`.
3. **Is it component-specific?** Prefer a local custom property on the component that *references* global tokens: `.card { --card-pad: var(--space-5); }`. Promote to global only when 3+ components share it.
4. **Does it change on dark surfaces or breakpoints?** Override the semantic token inside `.surface-dark` (colour) or set it in a `min-width` media block; never fork components.

## Naming
`--{category}-{role}-{variant}`; categories: `palette`, `color`, `font`, `text`, `leading`, `tracking`, `space`, `radius`, `border`, `shadow`, `duration`, `ease`, `z`, `container`, `aspect`, `overlay`, `tap`. Lowercase, hyphenated, no values in names (`--color-brand-accent`, not `--color-green`).

## Steps
1. Write the intent in one line (what role, where used).
2. Pick the section in `tokens.css`; add in scale order (keep scales sorted).
3. **Colour tokens:** compute WCAG contrast against every surface it will sit on. Text ≥ 4.5:1 (large 3:1), UI ≥ 3:1. Record ratios in a comment when < 7:1.
4. **Type/space tokens:** stay on the scale (4px spacing base; type ratio ≈ 1.2–1.25). Use `clamp()` for fluid type; provide min/max in rem.
5. Add dark-surface override if applicable.
6. Replace usages; search for the old raw value (`grep -rnE '#[0-9a-fA-F]{3,8}|[0-9]+px' src/components`).
7. Update `design-system.md` if the token is user-facing (brand/type/layout).
8. Run build + visual check (375/1440) + axe.

## Output contract
Diff to `tokens.css` (with comment for intent/contrast) + usage replacements + doc update. Never rename or delete a token without a repo-wide search and migration in the same PR.

## Example
Need a subtle brand-tinted border for cards:
```css
/* §2 semantic */
--color-border-brand-subtle: color-mix(in srgb, var(--palette-blue-800) 18%, var(--palette-white));
```
```css
.card { border: var(--border-width) solid var(--color-border-brand-subtle); }
```

## Anti-patterns
Duplicating a value under a new name · tokens named after their value · token per component instance · hard-coded fallback values inside `var()` (`var(--x, #fff)`) that hide missing tokens · using `--palette-*` in components.
