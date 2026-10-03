import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Stopwatch } from './Stopwatch';

afterEach(() => {
  vi.useRealTimers();
});

describe('Stopwatch', () => {
  it('renders 00:00.00 initially', () => {
    render(<Stopwatch />);
    expect(screen.getByRole('timer')).toHaveTextContent('00:00.00');
  });

  it('changes the Start button to Stop when started', () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
  });

  it('resets elapsed time to 00:00.00', () => {
    vi.useFakeTimers();
    render(<Stopwatch />);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    act(() => { vi.advanceTimersByTime(1_250); });
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(screen.getByRole('timer')).toHaveTextContent('00:00.00');
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });

  it('adds a lap entry to the lap list', () => {
    vi.useFakeTimers();
    const onLap = vi.fn();
    render(<Stopwatch onLap={onLap} />);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    act(() => { vi.advanceTimersByTime(1_250); });
    fireEvent.click(screen.getByRole('button', { name: 'Lap' }));

    expect(screen.getByText('Lap 1')).toBeInTheDocument();
    expect(onLap).toHaveBeenCalledWith(1_250, 1_250);
  });
});
