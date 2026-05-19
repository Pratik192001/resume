# DTiL — DigitalTwin-in-the-Loop

> Browser-based virtual ECU runner. Drag a `.hex`, see CAN signals move live. Zero install, zero license.

## Why this exists

New Bosch engineers wait 2–6 weeks for HIL bench access just to do a basic integration smoke test. Desktop vECU tools cost thousands per seat and are Windows-only. **DTiL shifts integration left, all the way into the browser.**

## What it does (MVP)

- Loads an Intel-HEX ECU image into a WASM sandbox in the browser.
- Runs a minimal AUTOSAR-style scheduler at 1 kHz inside a Web Worker.
- Simulates a CAN bus (TX/RX queues, periodic frames, fault injection).
- Exposes the RTE signal table to a React dashboard with live charts.
- Runs YAML test cases and reports pass/fail in the UI.

## Week-by-week roadmap (Day 1 → Day 28)

| Week | Days | Goal | Demoable checkpoint |
|---|---|---|---|
| **W1 — Foundations** | D1–D2 | Emscripten + WASI-SDK toolchain | Hello-world C → WASM in browser console |
| | D3–D5 | Minimal AUTOSAR-like runtime: scheduler, RTE stub, 1 SWC | `BSW_Init()` runs in WASM, prints to web console |
| | D6–D7 | CAN bus model in Web Worker | Hardcoded CAN frame appears every 10ms |
| **W2 — Integration** | D8–D10 | Hex/ELF loader (intel-hex + wasmparser) | Drag-drop `.hex` → entry point hit |
| | D11–D12 | RTE port introspection via JS bridge | React panel lists all RTE signals from loaded ECU |
| | D13–D14 | Fault-injection API | Force `EngineSpeed=0` → SWC reacts |
| **W3 — UX & Tests** | D15–D17 | React dashboard + live Recharts plots | 4 signals streaming at 10 Hz |
| | D18–D19 | YAML test runner | 5-step test, pass/fail in UI |
| | D20–D21 | Save/load session via URL hash | Reload → session restored |
| **W4 — Polish + Pitch** | D22–D24 | Perf tuning (worker pool, OffscreenCanvas) | 60 fps with 50 signals |
| | D25–D26 | Polished demo SWC (engine RPM + brake) | "Floor throttle" demo with live needle |
| | D27 | Architecture diagram, README, deploy on Vercel | Public URL works |
| | D28 | Pitch rehearsal + 2-min demo video | Final video |

## Quick start

```bash
# prerequisites: Node 20+, emsdk activated
cmake -S vecu -B vecu/build && cmake --build vecu/build
npm ci
npm run dev      # http://localhost:5173
npm test
```

## Scope-cut plan (if behind by end of Week 2)

| Behind on... | Cut | Keep | Story |
|---|---|---|---|
| WASM toolchain | Drop ELF, hex-only | Hex drag-drop + WASM exec | "Hex is what cal tools export anyway" |
| RTE auto-discovery | Hardcode 3 demo signals | Live plotting of those 3 | "Manual signal map; auto-discovery in v2" |
| Test runner | Drop YAML → click-to-assert | Single manual assertion | "Interactive test exploration" |
| Performance | Drop SharedArrayBuffer | 100 Hz instead of 1 kHz | "Real-time mode is v2" |
| **Catastrophic** | Ship hardcoded demo SWC only | The visual demo | "Runtime first; loader is 1-week add-on" |

## Layout

```
dtil/
├── README.md, ARCHITECTURE.md
├── package.json, vite.config.ts, tsconfig.json
├── ci.yml                      # paste into .github/workflows/ in real repo
├── vecu/                       # C sources → WASM
│   ├── CMakeLists.txt
│   ├── bsw/{scheduler.c, canif.c, rte_stub.c}
│   ├── swc/engine_mgr.c
│   └── bridge/js_exports.c
├── src/
│   ├── main.tsx, App.tsx
│   ├── worker/{vecu.worker.ts, canbus.ts}
│   ├── loader/{hex.ts, elf.ts}
│   ├── components/{SignalGrid, SignalChart, FaultInjector, HexDropzone, TestRunner}.tsx
│   └── state/store.ts
├── tests/
└── docs/{pitch.md, arch-diagram.svg}
```

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) and [`docs/pitch.md`](./docs/pitch.md).
