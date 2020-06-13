import React, { Suspense, lazy } from 'react';
import Shell from './shell';
import Menu from './menu';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TabPanel from './tab-panel';

function App() {
  const DynamicContent = lazy(() => import('./dynamic.js'));
  return (
    <Container>
      <header>
        <Menu />
        <Typography variant="h2">Hoffner Flying West</Typography>
        <Typography variant="h4"><a href="/about">About</a></Typography>
      </header>
      <Suspense fallback={<Shell />}>
        <DynamicContent />
      </Suspense>
      <Container>
        <TabPanel />
      </Container>
    </Container>
  );
}

export default App;
