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
    <div id="root">
      <Container>
        <header className="App-header">
          <Menu />
          <Typography variant="h2">Hoffner Flying West</Typography>
          <Typography gutterBottom variant="h4">
            {canUseDOM ? 'Connected to client' : 'Connected to server'}
          </Typography>
        </header>
        <Shell />
      </Container>
    </div>
  );
}

export default Loading;
