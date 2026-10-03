import { Accordion, AccordionItem, StarRating, Stopwatch } from './index';

const techStack = ['React', 'TypeScript', 'Vite', 'Storybook', 'Vitest'];

export default function App() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Reusable UI Components</p>
          <h1>React Component Library</h1>
          <p className="subtitle">
            A small design system built to make UI creation faster, cleaner, and more reusable.
          </p>

          <div className="badge-row" aria-label="Technology stack">
            {techStack.map((item) => (
              <span key={item} className="stack-badge">{item}</span>
            ))}
          </div>
        </div>

        <div className="hero-panel">
          <div className="mini-label">Live Preview</div>
          <div className="mini-stat">
            <strong>3</strong>
            <span>core components</span>
          </div>
          <div className="mini-stat">
            <strong>100%</strong>
            <span>component-focused</span>
          </div>
        </div>
      </section>

      <section className="component-grid">
        <article className="demo-card">
          <div className="card-header">
            <h2>Accordion</h2>
            <span className="tag">Accessible</span>
          </div>
          <Accordion defaultOpen={['overview']}>
            <AccordionItem id="overview" title="Overview">
              <p>Build accessible, flexible UI panels with a simple composition API.</p>
            </AccordionItem>
            <AccordionItem id="usage" title="Usage">
              <p>Perfect for FAQs, settings, and expandable content sections.</p>
            </AccordionItem>
            <AccordionItem id="a11y" title="Accessibility">
              <p>Includes button semantics, ARIA state, and keyboard-friendly behavior.</p>
            </AccordionItem>
          </Accordion>
        </article>

        <article className="demo-card">
          <div className="card-header">
            <h2>Star Rating</h2>
            <span className="tag">Interactive</span>
          </div>
          <div className="rating-row">
            <StarRating defaultValue={4} count={5} size="lg" />
            <span>4.0 / 5</span>
          </div>
        </article>

        <article className="demo-card stopwatch-card">
          <div className="card-header">
            <h2>Stopwatch</h2>
            <span className="tag">Utility</span>
          </div>
          <Stopwatch />
        </article>
      </section>
    </main>
  );
}
