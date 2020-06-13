import React from 'react';
import Loading from './Loading';
import About from './about';

const Route = {
    '/': {
        component: React.lazy(() => import('./App.js')),
        fallback: Loading
    },
    '/about': {
        component: React.lazy(() => import('./about.js')),
        fallback: About
    },
    '*': {
        component: React.lazy(() => import('./App.js')),
        fallback: Loading
    }
};

export default () => {
    const Component = Route[location.pathname].component || Route['*'].component;
    const Fallback = Route[location.pathname].fallback || Route['*'].fallback;

    return (
        <React.Suspense fallback={<Fallback />}>
            <Component />
        </React.Suspense>
    );
};
