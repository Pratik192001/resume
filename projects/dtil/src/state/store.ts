import { create } from 'zustand';
import type { EcuImage } from '../loader/hex';

type Status = 'idle' | 'loading' | 'running' | 'stopped';
type Sample = { t: number; [k: string]: number };

interface VecuState {
  status: Status;
  signals: Sample[];
  loadImage: (img: EcuImage) => Promise<void>;
  injectSignal: (id: number, value: number) => void;
}

export const useVecuStore = create<VecuState>((set, get) => {
  // The Worker is created lazily so SSR / tests don't blow up.
  let worker: Worker | null = null;
  const ensureWorker = () => {
    if (worker) return worker;
    worker = new Worker(new URL('../worker/vecu.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (e) => {
      if (e.data.type === 'snapshot') {
        const [es, bs, th] = e.data.values;
        const sample: Sample = { t: e.data.t, EngineSpeed: es, BrakeStatus: bs, Throttle: th };
        const tail = [...get().signals, sample].slice(-200);
        set({ signals: tail });
      }
      if (e.data.type === 'loaded') {
        worker!.postMessage({ type: 'start' });
        set({ status: 'running' });
      }
    };
    return worker;
  };
  return {
    status: 'idle',
    signals: [],
    async loadImage(_img) {
      set({ status: 'loading' });
      // In MVP the WASM module itself is the "image". A real loader copies _img.bytes into wasm memory.
      ensureWorker().postMessage({ type: 'load', wasmUrl: '/vecu.js' });
    },
    injectSignal(id, value) { ensureWorker().postMessage({ type: 'inject', id, value }); },
  };
});
