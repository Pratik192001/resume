// Soft-real-time core. Runs the vECU WASM at ~1 kHz with self-correcting drift.
// Wire up: the React side spawns this Worker and posts {type: 'load', wasmUrl}.

const TICK_MS = 1;
let wasm: any = null;
let running = false;
let nextDeadline = 0;

async function loadWasm(url: string) {
  // @ts-ignore — emscripten emits a default export factory in ES6 mode
  const factory = (await import(/* @vite-ignore */ url)).default;
  wasm = await factory();
  wasm._vecu_init();
}

function tick() {
  if (!running || !wasm) return;
  const now = performance.now();
  while (nextDeadline <= now) {
    wasm._vecu_tick();
    nextDeadline += TICK_MS;
  }
  // Snapshot signals at 50 Hz (every 20 ticks).
  if ((Math.floor(now) % 20) === 0) postSnapshot();
  const drift = nextDeadline - performance.now();
  // setTimeout floor on most browsers is ~1ms — good enough for soft-RT.
  setTimeout(tick, Math.max(0, drift));
}

function postSnapshot() {
  const n = wasm._vecu_signal_count();
  const values: number[] = [];
  for (let i = 0; i < n; i++) values.push(wasm._vecu_get_signal(i));
  (self as any).postMessage({ type: 'snapshot', t: performance.now(), values });
}

self.addEventListener('message', async (ev: MessageEvent<any>) => {
  const msg = ev.data;
  if (msg.type === 'load') { await loadWasm(msg.wasmUrl); (self as any).postMessage({ type: 'loaded' }); }
  if (msg.type === 'start') { running = true; nextDeadline = performance.now() + TICK_MS; tick(); }
  if (msg.type === 'stop')  { running = false; }
  if (msg.type === 'inject' && wasm) { wasm._vecu_set_signal(msg.id, msg.value); }
});
