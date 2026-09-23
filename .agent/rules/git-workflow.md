# Git & Delivery Workflow

- Trunk-based: short-lived branches `feat/…`, `fix/…`, `docs/…`, `chore/…` → PR → squash merge to `main`.
- **Conventional Commits:** `feat(hero): add scroll cue`, `fix(form): announce success`, `docs(prd): update sitemap`.
- PR template: what/why · screenshots (375 & 1440) · a11y & perf notes · checklist from `agent.md` §3.
- CI (GitHub Actions): install → lint → typecheck → build → unit tests → Playwright smoke + axe → Lighthouse CI → link check. Cloudflare builds preview per PR.
- Protected `main`: required checks + 1 review (self-review allowed for solo work, but CI must pass).
- Releases: tag `vX.Y.Z` when a phase completes; keep `CHANGELOG.md`.
- Never commit: `.env*`, exports containing leads, large raw photos (use R2/Git LFS or optimise first).
