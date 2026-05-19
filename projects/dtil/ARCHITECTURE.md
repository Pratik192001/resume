# DTiL — Architecture

```
┌─────────────────────────── Browser Tab ───────────────────────────┐
│                                                                    │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────────────┐    │
│  │ React UI    │←→ │  State Mgr   │←→ │  WASM Bridge (TS)    │    │
│  │ (Recharts,  │   │  (Zustand)   │   │   - signal table     │    │
│  │  signal     │   └──────────────┘   │   - fault-inject API │    │
│  │  grid, FI)  │           ↑          └──────────┬───────────┘    │
│  └─────────────┘           │                     │                │
│                            │                     ▼                │
│  ┌─────────────────────────┴──────────────────────────────────┐   │
│  │              Web Worker  (Soft Real-Time Core)             │   │
│  │  ┌──────────┐ ┌─────────────┐ ┌────────────────────────┐   │   │
│  │  │ Scheduler│→│ vECU (WASM) │→│ CAN Bus Model (TX/RX)  │   │   │
│  │  │ 1ms tick │ │ - BSW stub  │ │ - periodic frames      │   │   │
│  │  │ perf.now │ │ - RTE       │ │ - signal pack/unpack   │   │   │
│  │  └──────────┘ └─────────────┘ └────────────────────────┘   │   │
│  └────────────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  Hex/ELF Loader  (wasmparser, intel-hex)                   │   │
│  └────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

## Tech-stack justification

| Layer | Choice | Why |
|---|---|---|
| Runtime | **WASM via Emscripten** | Only way to run C/AUTOSAR code in browser deterministically |
| Worker | **Web Worker + SharedArrayBuffer** | Off-main-thread → main UI stays 60 fps even at 1 kHz tick |
| UI | **React + Recharts + Zustand** | Author's existing stack; Recharts handles streaming data |
| Persistence | **URL hash + IndexedDB** | Zero-backend MVP; can add Vercel KV later |
| Build | **Vite + ts-loader + emcc** | Instant HMR; clean ESM-importable WASM |

## The core algorithm — 1 ms soft-real-time scheduler

See [`src/worker/vecu.worker.ts`](./src/worker/vecu.worker.ts). The non-obvious bit is the self-correcting drift loop using `performance.now()` deadlines instead of `setInterval` (which drifts catastrophically under GC pressure).

## Determinism caveats

Browsers are NOT real-time OSes. We target **soft real-time** (95th percentile tick within ±200 µs). This is fine for integration-level smoke tests but NOT for FTTI-sensitive validation — that explicitly stays on HIL.
