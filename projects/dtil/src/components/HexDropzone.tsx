import { useCallback } from 'react';
import { useVecuStore } from '../state/store';
import { parseHex } from '../loader/hex';

export function HexDropzone() {
  const load = useVecuStore(s => s.loadImage);
  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const text = await file.text();
    const image = parseHex(text);
    await load(image);
  }, [load]);
  return (
    <div onDragOver={e => e.preventDefault()} onDrop={onDrop}
         style={{ border: '2px dashed #888', borderRadius: 8, padding: 32, textAlign: 'center' }}>
      Drop a <code>.hex</code> file here to load the virtual ECU.
    </div>
  );
}
