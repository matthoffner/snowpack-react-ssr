import React from 'react';
import Shell from './shell';

const canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

function Loading() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {canUseDOM ? 'Connected to client' : 'Connected to server'}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign up
        </a>
      </header>
      <Shell />
    </div>
  );
}

export default Loading;
