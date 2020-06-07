import React, { Suspense, lazy } from 'react';
import Shell from './shell';
import Menu from './menu';

function App() {
  const DynamicContent = lazy(() => import('./dynamic.js'));
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Page loaded
        </p>
        <Menu />
      </header>
      <Suspense fallback={<Shell />}>
        <DynamicContent />
      </Suspense>
    </div>
  );
}

export default App;
