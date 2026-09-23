# Skill: component-builder

**Purpose:** Build a reusable, accessible, token-driven Astro component in vanilla CSS.

## Inputs (ask if missing)
- Component name & layer (`ui` | `section` | `layout`)
- Purpose and where it appears (pages)
- Props and variants; content source (props, slot, or content collection)
- Interactive states; responsive behaviour; any JS need (default: none)
- Reference (sample screenshot area / sitemap page)

## Steps
1. **Check the catalogue** (`rules/design-system.md` §4) and `src/components/`. Reuse or extend before creating.
2. **Choose semantic HTML** first (landmark/heading/list/button/link). Write the markup with no styling.
3. **Define props** (`interface Props`) with sensible defaults; expose `class` passthrough only if needed.
4. **Write scoped CSS** in the component using tokens only:
   - Base = mobile layout. Enhance with `min-width` queries (literals from `--bp-*`) or container queries.
   - BEM-lite classes; state via `[data-*]`/`[aria-*]`.
   - Use `@layer components`.
   - Dark-surface variants rely on `.surface-dark` token swap — do not write colour overrides.
5. **States:** hover, `:focus-visible`, active, disabled, loading, error as applicable. Touch: no hover-only info.
6. **Motion:** only if it explains a change; `transform/opacity`; durations from tokens; reduced-motion safe.
7. **Enhance with JS only if required** (`scripts/*.ts`, < 5 KB). Provide no-JS fallback.
8. **Add a usage example** to `src/pages/_kitchen-sink.astro` (dev-only, `noindex`, excluded from sitemap).
9. **Verify:** 320/375/768/1024/1440; keyboard; axe; no CLS; token audit (`grep -E '#[0-9a-fA-F]{3,8}' component` → none).
10. **Document:** update the catalogue line in `design-system.md`.

## Output contract
```
src/components/{layer}/{Name}.astro
(optional) src/scripts/{name}.ts
(updated) src/pages/_kitchen-sink.astro, .agent/rules/design-system.md
```

## Template
```astro
---
// src/components/sections/ServiceTile.astro
import { Image } from 'astro:assets';
interface Props {
  title: string;
  href: string;
  image: ImageMetadata;
  alt?: string;          // '' for decorative
}
const { title, href, image, alt = '' } = Astro.props;
---
<a class="service-tile" href={href}>
  <Image class="service-tile__img" src={image} alt={alt} widths={[400, 640, 900]} sizes="(min-width:64rem) 33vw, (min-width:48rem) 50vw, 100vw" />
  <span class="service-tile__body surface-dark">
    <h3 class="service-tile__title">{title}</h3>
    <span class="service-tile__cta">Read more<span class="visually-hidden"> about {title}</span></span>
  </span>
</a>

<style>
  @layer components {
    .service-tile { position: relative; display: block; aspect-ratio: var(--aspect-tile); overflow: hidden; border-radius: var(--radius-none); isolation: isolate; }
    .service-tile__img { position: absolute; inset: 0; inline-size: 100%; block-size: 100%; object-fit: cover; transition: transform var(--duration-slow) var(--ease-out); }
    .service-tile::after { content: ''; position: absolute; inset: 0; background: var(--overlay-tile); z-index: 1; }
    .service-tile__body { position: absolute; inset-inline: var(--space-5); inset-block-end: var(--space-5); z-index: 2; display: grid; gap: var(--space-2); }
    .service-tile__title { font: var(--font-weight-regular) var(--text-xl)/var(--leading-snug) var(--font-display); color: var(--color-text-strong); }
    .service-tile__cta { font-size: var(--text-sm); text-decoration: underline; text-underline-offset: 0.2em; }
    .service-tile:focus-visible { outline: 2px solid var(--color-focus-ring-on-dark); outline-offset: 3px; }
    @media (hover: hover) and (prefers-reduced-motion: no-preference) {
      .service-tile:hover .service-tile__img { transform: scale(1.03); }
    }
  }
</style>
```

## Anti-patterns
Raw hex/px values · `!important` · hover-only reveals · images without dimensions · `div` buttons · one-off spacing on the component root (use section spacing) · client directives without justification.
