# Accessibility — WCAG 2.2 AA

- **Semantics first:** landmarks (`header`, `nav`, `main`, `footer`), one `h1`, heading order, lists for lists, `button` for actions, `a` for navigation.
- **Skip link** to `#main` as first focusable element.
- **Keyboard:** all functionality operable; logical tab order; visible `:focus-visible` on every interactive element (3:1 against adjacent colours); no keyboard traps; Esc closes menus/lightbox and returns focus.
- **Contrast:** text ≥ 4.5:1 (large ≥ 3:1), UI components ≥ 3:1. Text over photos **always** on a scrim token; verify on the lightest part of the image. Green `#7ED958` text only on dark.
- **Targets:** min 44×44 CSS px (`--tap-target-min`).
- **Images:** meaningful `alt`; decorative `alt=""`; logos `alt="Talk Events"`; background images carrying meaning need a text equivalent.
- **Motion:** honour `prefers-reduced-motion`; carousels/auto-scroll need pause/stop; nothing flashes > 3×/second.
- **Forms:** visible `<label>` for every field, `autocomplete` tokens (`name`, `email`, `tel`), `inputmode`, error summary + inline errors (`aria-describedby`, `aria-invalid`), don't rely on colour alone, don't clear input on error, success announced with `role="status"`.
- **Language:** `lang="en-NG"`; mark any other language with `lang`.
- **Script accent words:** ensure heading text reads correctly to screen readers (no letter-spacing tricks, no text in images).
- **Zoom/reflow:** works at 200% and 320px width; never disable pinch-zoom (`maximum-scale` must not be set — note the sample site does this; do not copy).
- **Media:** captions for any video with speech; no autoplay with sound; background video muted, pausable, poster fallback.
- **Testing:** axe in CI; manual keyboard pass; VoiceOver (iOS) + TalkBack (Android) pass on key flows; 200% zoom check.
- Publish an accessibility statement with a contact route.
