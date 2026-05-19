# Hackathon / Showcase Projects

Four project skeletons targeting Bosch internal showcase + external hackathons.
Each is sized for a **3–4 week solo or small-team build**.

| # | Project | One-line | Folder |
|---|---|---|---|
| 1 | **DTiL** | Browser-based virtual ECU + HIL replacement (WASM) | [`./dtil`](./dtil) |
| 2 | **AutosarLens** | Real-time LSP for ARXML — validate as you type | [`./autosarlens`](./autosarlens) |
| 3 | **CalibGuard** | Safety-aware A2L/DCM calibration diff & reviewer | [`./calibguard`](./calibguard) |
| 4 | **FuSa-Sentinel** | Continuous ISO 26262 verification in CI (DevSafetyOps) | [`./fusa-sentinel`](./fusa-sentinel) |

Each project folder contains:
- `README.md` — pitch + week-by-week roadmap + scope-cut plan
- `ARCHITECTURE.md` — system architecture & tech-stack justification
- `ci.yml` — sample CI workflow (copy to repo root `.github/workflows/` when extracting)
- Folder skeleton with stub source files
- `docs/pitch.md` — 2-minute showcase pitch script

## Recommended pick order

1. **DTiL** — most unique, highest wow-factor, hits both Automotive + WebDev resumes.
2. **AutosarLens** — highest internal-adoption potential at Bosch.
3. **CalibGuard** — blue-ocean inside Bosch FuSa/calibration teams.
4. **FuSa-Sentinel** — invents the category of "DevSafetyOps".

## Extracting a project to its own repo later

When you're ready to make any of these a standalone repo:
```bash
git subtree split --prefix=projects/dtil -b dtil-only
# then push dtil-only to a new repo's main branch
```
