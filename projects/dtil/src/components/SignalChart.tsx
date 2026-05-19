import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Sample = { t: number; [k: string]: number };

export function SignalChart({ signals }: { signals: Sample[] }) {
  return (
    <div style={{ height: 320, marginTop: 24 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={signals}>
          <XAxis dataKey="t" tick={false} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="EngineSpeed" dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="Throttle"    dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="BrakeStatus" dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
