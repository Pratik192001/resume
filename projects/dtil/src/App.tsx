import { HexDropzone } from './components/HexDropzone';
import { SignalChart } from './components/SignalChart';
import { useVecuStore } from './state/store';

export default function App() {
  const signals = useVecuStore(s => s.signals);
  const status  = useVecuStore(s => s.status);

  return (
    <div style={{ fontFamily: 'system-ui', padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>DTiL — DigitalTwin-in-the-Loop</h1>
        <small>Browser-based virtual ECU runner · status: <b>{status}</b></small>
      </header>
      <HexDropzone />
      <SignalChart signals={signals} />
    </div>
  );
}
