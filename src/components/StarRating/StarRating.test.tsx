import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StarRating } from './StarRating';

describe('StarRating', () => {
  it('renders the requested number of stars', () => {
    render(<StarRating count={5} />);
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('calls onChange with the clicked star value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<StarRating onChange={onChange} />);

    await user.click(screen.getAllByRole('radio')[2]);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('selects the focused star with Enter', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<StarRating onChange={onChange} />);
    const thirdStar = screen.getAllByRole('radio')[2];

    thirdStar.focus();
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('moves selection with ArrowRight', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<StarRating defaultValue={2} onChange={onChange} />);
    const secondStar = screen.getAllByRole('radio')[1];

    secondStar.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(3);
    expect(screen.getAllByRole('radio')[2]).toHaveFocus();
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(<StarRating disabled onChange={onChange} />);

    fireEvent.click(screen.getAllByRole('radio')[0]);
    fireEvent.keyDown(screen.getAllByRole('radio')[0], { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
  });
});
