// Tiny Intel-HEX parser. Production: replace with `intel-hex` npm package.
export interface EcuImage { entryPoint: number; bytes: Uint8Array; }

export function parseHex(text: string): EcuImage {
  const bytes: number[] = [];
  let base = 0, entry = 0;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line.startsWith(':')) continue;
    const len  = parseInt(line.substr(1, 2), 16);
    const addr = parseInt(line.substr(3, 4), 16);
    const type = parseInt(line.substr(7, 2), 16);
    const data = line.substr(9, len * 2);
    if (type === 0x00) {
      const offset = base + addr;
      for (let i = 0; i < len; i++) bytes[offset + i] = parseInt(data.substr(i * 2, 2), 16);
    } else if (type === 0x04) {
      base = parseInt(data, 16) << 16;
    } else if (type === 0x05) {
      entry = parseInt(data, 16);
    }
  }
  return { entryPoint: entry, bytes: new Uint8Array(bytes) };
}
