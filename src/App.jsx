import React from 'react';
import Logo from './Logo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <svg className="App-logo" alt="logo">
          <Logo />
        </svg>
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
