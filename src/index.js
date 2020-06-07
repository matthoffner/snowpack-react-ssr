import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import Provider from './provider';
import './index.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  ssrForceFetchDelay: 100,
  //  link: new SchemaLink({ schema }),
  link: new HttpLink({
    uri: 'https://m5j9784k8j.sse.codesandbox.io',
  })
});

ReactDOM.unstable_createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider>
        <Router />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
  )

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
