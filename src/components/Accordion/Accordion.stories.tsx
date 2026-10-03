import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const AccordionIntro = () => (
  <div className="accordion-intro">
    <span className="accordion-intro-eyebrow">A quick guide</span>
    <h2>Frequently asked questions</h2>
    <p>Everything you need to know about building, previewing, and sharing your components.</p>
  </div>
);

export const SingleMode: Story = {
  args: {
    allowMultiple: false,
    defaultOpen: ['getting-started'],
    children: (
      <>
        <AccordionIntro />
        <AccordionItem id="getting-started" title="What is component-driven development?">
          <p>
            It is a way to build interfaces from small, reusable pieces. Develop each component on
            its own, then combine those pieces into complete screens.
          </p>
        </AccordionItem>
        <AccordionItem id="stories" title="What can I do with a Storybook story?">
          <p>
            A story captures one state of a component. Use stories to review variations, try
            interactions, and share a reliable preview with your team.
          </p>
        </AccordionItem>
        <AccordionItem id="data" title="Can I use mock data in my pages?">
          <p>Yes. Mock data and services let you preview useful page states without setting up a live backend.</p>
        </AccordionItem>
        <AccordionItem id="sharing" title="How do I share my component library?">
          <p>
            Publish your Storybook to a shared host so teammates can browse components and review
            changes in their browser.
          </p>
        </AccordionItem>
      </>
    ),
  },
};

export const MultipleMode: Story = {
  args: {
    allowMultiple: true,
    defaultOpen: ['stories', 'data'],
    children: (
      <>
        <AccordionIntro />
        <AccordionItem id="stories" title="Explore component states">
          <p>Give each important state its own story, from the default appearance to loading and error states.</p>
          <ul className="accordion-panel-list">
            <li>Preview variations side by side.</li>
            <li>Keep examples easy to reproduce.</li>
          </ul>
        </AccordionItem>
        <AccordionItem id="data" title="Build complete pages">
          <p>Compose stories into realistic pages with mock data and the same reusable components.</p>
          <ul className="accordion-panel-list">
            <li>Test layouts without navigating through the app.</li>
            <li>Share a working preview with your team.</li>
          </ul>
        </AccordionItem>
        <AccordionItem id="share" title="Share your work">
          <p>Publish Storybook when you want others to browse and review your component library.</p>
        </AccordionItem>
      </>
    ),
  },
};
