import { useEffect, useRef, useState } from 'react';

export interface StopwatchProps {
  /** Start timing as soon as the component mounts. */
  autoStart?: boolean;
  /** Called on each timer update with the total elapsed time in milliseconds. */
  onTick?: (elapsedMs: number) => void;
  /** Called when a lap is recorded with its duration and the total elapsed time. */
  onLap?: (lapMs: number, totalMs: number) => void;
}

interface Lap {
  durationMs: number;
  totalMs: number;
}

const formatTime = (milliseconds: number) => {
  const safeMilliseconds = Math.max(0, milliseconds);
  const minutes = Math.floor(safeMilliseconds / 60_000);
  const seconds = Math.floor((safeMilliseconds % 60_000) / 1_000);
  const centiseconds = Math.floor((safeMilliseconds % 1_000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
};

export function Stopwatch({ autoStart = false, onTick, onLap }: StopwatchProps) {
  const [isRunning, setIsRunning] = useState(autoStart);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  useEffect(() => {
    if (!isRunning) return;

    startTimeRef.current = Date.now() - elapsedMs;
    intervalRef.current = setInterval(() => {
      const nextElapsedMs = Date.now() - startTimeRef.current;
      setElapsedMs(nextElapsedMs);
      onTickRef.current?.(nextElapsedMs);
    }, 10);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const getCurrentElapsedMs = () => (
    isRunning ? Date.now() - startTimeRef.current : elapsedMs
  );

  const handleStartStop = () => {
    if (isRunning) setElapsedMs(getCurrentElapsedMs());
    setIsRunning((running) => !running);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedMs(0);
    setLaps([]);
  };

  const handleLap = () => {
    const totalMs = getCurrentElapsedMs();
    const previousTotalMs = laps.at(-1)?.totalMs ?? 0;
    const lap = { durationMs: Math.max(0, totalMs - previousTotalMs), totalMs };
    setLaps((currentLaps) => [...currentLaps, lap]);
    onLap?.(lap.durationMs, totalMs);
  };

  return (
    <section
      aria-label="Stopwatch"
      style={{
        boxSizing: 'border-box',
        width: 'min(100%, 420px)',
        padding: 28,
        border: '1px solid #e3e5ed',
        borderRadius: 20,
        background: 'linear-gradient(145deg, #ffffff, #f7f8fc)',
        boxShadow: '0 18px 45px rgba(34, 37, 72, 0.09)',
        color: '#272943',
        fontFamily: "Inter, 'Nunito Sans', Arial, sans-serif",
      }}
    >
      <div
        role="timer"
        aria-live="off"
        style={{
          padding: '12px 0 24px',
          color: '#292b4c',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 'clamp(42px, 10vw, 58px)',
          fontWeight: 700,
          letterSpacing: '-0.07em',
          lineHeight: 1,
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formatTime(elapsedMs)}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        <button
          type="button"
          onClick={handleStartStop}
          style={{
            minWidth: 104,
            padding: '12px 18px',
            border: 0,
            borderRadius: 999,
            background: isRunning ? '#fff0ed' : '#5553a6',
            color: isRunning ? '#b5493a' : '#fff',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button type="button" onClick={handleReset} style={secondaryButtonStyle}>Reset</button>
        <button type="button" onClick={handleLap} style={secondaryButtonStyle}>Lap</button>
      </div>

      {laps.length > 0 && (
        <ol
          aria-label="Lap times"
          style={{
            display: 'grid',
            gap: 8,
            margin: '24px 0 0',
            padding: 0,
            listStyle: 'none',
          }}
        >
          {laps.map((lap, index) => (
            <li
              key={`${lap.totalMs}-${index}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 8,
                padding: '10px 12px',
                borderRadius: 10,
                background: '#f0f1f8',
                color: '#55576f',
                fontSize: 12,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              <span>Lap {index + 1}</span>
              <span style={{ textAlign: 'center' }}>{formatTime(lap.durationMs)}</span>
              <span style={{ textAlign: 'right' }}>{formatTime(lap.totalMs)}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

const secondaryButtonStyle: React.CSSProperties = {
  minWidth: 76,
  padding: '12px 15px',
  border: '1px solid #dedfeb',
  borderRadius: 999,
  background: '#fff',
  color: '#444660',
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
};
