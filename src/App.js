import React, { Suspense, lazy } from 'react';
import Shell from './shell';

function App() {
  const DynamicContent = lazy(() => import('./dynamic.js'));
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.jsx</code> and save
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
      <Suspense fallback={<Shell />}>
        <DynamicContent />
      </Suspense>
    </div>
  );
}

export default App;
