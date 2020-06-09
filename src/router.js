import React from 'react';
import Loading from './Loading';
import Post from './post';

const Route = {
    '/': {
        component: React.lazy(() => import('./App.js')),
        fallback: Loading
    },
    '/post': {
        component: React.lazy(() => import('./post.js')),
        fallback: Post
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
