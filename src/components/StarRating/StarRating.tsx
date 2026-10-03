import { useRef, useState } from 'react';

export interface StarRatingProps {
  /** Selected rating. When provided, the component is controlled. */
  value?: number;
  /** Initial rating for uncontrolled usage. */
  defaultValue?: number;
  /** Called when the user chooses a rating. */
  onChange?: (value: number) => void;
  /** Number of stars to display. */
  count?: number;
  /** Disables pointer and keyboard interaction. */
  disabled?: boolean;
  /** Visual size of the stars. */
  size?: 'sm' | 'md' | 'lg';
}

const fontSizes: Record<NonNullable<StarRatingProps['size']>, number> = {
  sm: 20,
  md: 28,
  lg: 36,
};

export function StarRating({
  value,
  defaultValue = 0,
  onChange,
  count = 5,
  disabled = false,
  size = 'md',
}: StarRatingProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const starRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const displayValue = hoverValue ?? currentValue;
  const safeCount = Math.max(0, Math.floor(count));

  const selectValue = (nextValue: number) => {
    if (disabled) return;
    if (!isControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>, index: number) => {
    if (disabled) return;

    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') nextIndex = Math.min(index + 1, safeCount - 1);
    if (event.key === 'ArrowLeft') nextIndex = Math.max(index - 1, 0);
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = safeCount - 1;

    if (nextIndex !== null && safeCount > 0) {
      event.preventDefault();
      starRefs.current[nextIndex]?.focus();
      selectValue(nextIndex + 1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectValue(index + 1);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Star rating"
      aria-disabled={disabled}
      style={{ display: 'inline-flex', gap: 6, opacity: disabled ? 0.5 : 1 }}
    >
      {Array.from({ length: safeCount }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= displayValue;

        return (
          <span
            key={starValue}
            ref={(element) => { starRefs.current[index] = element; }}
            role="radio"
            aria-label={`${starValue} ${starValue === 1 ? 'star' : 'stars'}`}
            aria-checked={starValue === currentValue}
            aria-disabled={disabled}
            tabIndex={0}
            onClick={() => selectValue(starValue)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onMouseEnter={() => { if (!disabled) setHoverValue(starValue); }}
            onMouseLeave={() => setHoverValue(null)}
            style={{
              color: isFilled ? '#f4b740' : '#d8d9e2',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontSize: fontSizes[size],
              lineHeight: 1,
              transition: 'color 120ms ease, transform 120ms ease',
              transform: hoverValue === starValue ? 'scale(1.12)' : 'scale(1)',
              userSelect: 'none',
            }}
          >
            {'\u2605'}
          </span>
        );
      })}
    </div>
  );
}
