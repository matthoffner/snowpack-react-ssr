import React, { Suspense, lazy } from 'react';
import Shell from './shell';
import Menu from './menu';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function App() {
  const DynamicContent = lazy(() => import('./dynamic.js'));
  return (
    <Container>
      <header>
        <Menu />
        <Typography variant="h1">Welcome</Typography>
        <Typography gutterBottom variant="h4">
          About this page
        </Typography>
      </header>
      <Suspense fallback={<Shell />}>
        <DynamicContent />
      </Suspense>
      <div>test</div>
    </Container>
  );
}

export default App;
