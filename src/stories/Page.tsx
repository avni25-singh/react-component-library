import React from 'react';

import { Header } from './Header';
import './page.css';

type User = {
  name: string;
};

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>();

  return (
    <article className="storybook-shell">
      <Header
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />

      <main className="storybook-page">
        <section className="storybook-hero" aria-labelledby="page-title">
          <span className="storybook-eyebrow"><span className="eyebrow-dot" /> Your component workspace</span>
          <h2 id="page-title">Build interfaces<br /><span>one component at a time.</span></h2>
          <p className="hero-copy">
            Bring your UI to life with a{' '}
            <a href="https://componentdriven.org" target="_blank" rel="noopener noreferrer">
              <strong>component-driven</strong>
            </a>{' '}
            workflow. Start with focused building blocks, then compose them into complete pages.
          </p>
          <a className="hero-link" href="https://storybook.js.org/docs" target="_blank" rel="noopener noreferrer">
            Explore the documentation <span aria-hidden="true">+</span>
          </a>
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        </section>

        <section className="storybook-content" aria-labelledby="patterns-title">
          <div className="section-heading">
            <div>
              <span className="section-kicker">A better way to build</span>
              <h3 id="patterns-title">From small pieces to polished pages</h3>
            </div>
            <p>Keep your UI focused, flexible, and easy to review.</p>
          </div>

          <div className="storybook-cards">
            <article className="storybook-card">
              <span className="card-number">01</span>
              <div className="card-icon card-icon-purple" aria-hidden="true">UI</div>
              <h4>Compose with confidence</h4>
              <p>Connect child components and use their stories as realistic building blocks for full page layouts.</p>
              <a href="https://storybook.js.org/docs" target="_blank" rel="noopener noreferrer">Learn about composition <span aria-hidden="true">&gt;</span></a>
            </article>
            <article className="storybook-card">
              <span className="card-number">02</span>
              <div className="card-icon card-icon-blue" aria-hidden="true">ST</div>
              <h4>Work with real states</h4>
              <p>Render pages with mock data to explore useful states without navigating through your app.</p>
              <a href="https://storybook.js.org/docs/writing-stories" target="_blank" rel="noopener noreferrer">Explore stories <span aria-hidden="true">&gt;</span></a>
            </article>
            <article className="storybook-card">
              <span className="card-number">03</span>
              <div className="card-icon card-icon-peach" aria-hidden="true">API</div>
              <h4>Mock your services</h4>
              <p>Assemble data from services and mock those services in Storybook for repeatable previews.</p>
              <a href="https://storybook.js.org/docs/writing-stories/mocking-data-and-modules" target="_blank" rel="noopener noreferrer">See how mocking works <span aria-hidden="true">&gt;</span></a>
            </article>
          </div>

          <div className="storybook-footer-row">
            <p>Ready to get started? Follow a guided walkthrough in the{' '}
              <a href="https://storybook.js.org/tutorials/" target="_blank" rel="noopener noreferrer">Storybook tutorials</a>.
            </p>
          </div>
        </section>

        <div className="tip-wrapper">
          <span className="tip">Tip</span> Adjust the width of the canvas with the{' '}
          <svg width="10" height="10" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path
                d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
                id="a"
                fill="#999"
              />
            </g>
          </svg>
          Viewports addon in the toolbar
        </div>
      </main>
    </article>
  );
};
