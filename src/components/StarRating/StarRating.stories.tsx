import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StarRating } from './StarRating';

const meta = {
  title: 'Components/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    count: 5,
    size: 'md',
  },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: 3 },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = useState(3);
    return <StarRating {...args} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: { value: 3, disabled: true },
};

export const CustomCount: Story = {
  args: { count: 10, defaultValue: 6, size: 'sm' },
};
