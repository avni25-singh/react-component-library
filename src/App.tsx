import { Accordion, AccordionItem, StarRating, Stopwatch } from './index';

export default function App() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Reusable UI Components</p>
        <h1>React Component Library</h1>
        <p className="subtitle">
          A small design system built with React, TypeScript, Vite, Storybook, and Vitest.
        </p>
      </section>

      <section className="component-grid">
        <article className="demo-card">
          <h2>Accordion</h2>
          <Accordion defaultOpen={['overview']}>
            <AccordionItem id="overview" title="Overview">
              <p>Build accessible, flexible UI panels with a simple composition API.</p>
            </AccordionItem>
            <AccordionItem id="usage" title="Usage">
              <p>Perfect for FAQs, settings, and expandable content sections.</p>
            </AccordionItem>
            <AccordionItem id="a11y" title="Accessibility">
              <p>Includes proper button semantics, ARIA state, and keyboard-friendly behavior.</p>
            </AccordionItem>
          </Accordion>
        </article>

        <article className="demo-card">
          <h2>Star Rating</h2>
          <div className="rating-row">
            <StarRating defaultValue={4} count={5} size="lg" />
            <span>4.0 / 5</span>
          </div>
        </article>

        <article className="demo-card">
          <h2>Stopwatch</h2>
          <Stopwatch />
        </article>
      </section>
    </main>
  );
}
