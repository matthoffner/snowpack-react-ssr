import React from 'react';
import Shell from './shell';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Menu from './menu';

const canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

function Loading() {
  return (
    <Container>
      <header className="App-header">
        <Menu />
        <Typography variant="h1">Welcome</Typography>
        <Typography gutterBottom variant="h4">
          {canUseDOM ? 'Connected to client' : 'Connected to server'}
        </Typography>
      </header>
      <Shell />
    </Container>
  );
}

export default Loading;
