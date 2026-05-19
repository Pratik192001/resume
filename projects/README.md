# Hackathon / Showcase Projects

Four Bosch-internal-showcase candidate projects. Each is scoped to **3–4 weeks** of solo work and is designed to be demoable end-to-end.

| # | Folder | One-liner | Primary domain |
|---|--------|-----------|----------------|
| 1 | [`dtil/`](./dtil) | **DigitalTwin-in-the-Loop** — Drag a `.hex` into the browser, run an ECU in WASM, watch signals live | AUTOSAR + WebAssembly + React |
| 2 | [`autosarlens/`](./autosarlens) | **AutosarLens** — Real LSP that validates ARXML as you type, with safe cross-file rename | AUTOSAR + Language Servers |
| 3 | [`calibguard/`](./calibguard) | **CalibGuard** — Safety-aware A2L/DCM diff with ISO-26262 risk scoring + audit PDF | Calibration + FuSa |
| 4 | [`fusa-sentinel/`](./fusa-sentinel) | **FuSa-Sentinel** — CI gate that blocks PRs that weaken the ISO 26262 safety case | DevSafetyOps + ISO 26262 |

Each project folder contains:
- `README.md` — week-by-week roadmap, scope-cut plan
- `ARCHITECTURE.md` — system diagram + tech-stack justification
- `docs/pitch.md` — 2-minute internal-showcase pitch script
- A runnable skeleton (build config, key source files, sample fixtures)

> **Author:** Pratik Koratkar — Lead Integrator, Bosch GS
