import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Stopwatch } from './Stopwatch';

const meta = {
  title: 'Components/Stopwatch',
  component: Stopwatch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Stopwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AutoStart: Story = {
  args: { autoStart: true },
};

export const WithCallbacks: Story = {
  args: {
    onTick: fn(),
    onLap: fn(),
  },
};
