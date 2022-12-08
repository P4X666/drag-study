import React from 'react';

export type RouteType = {
  path: string;
  exact?: boolean;
  component: React.LazyExoticComponent<() => React.ReactElement>;
}

const routes = [
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import('src/pages/Home')),
  },
  {
    path: '/simple',
    component: React.lazy(() => import('src/pages/SimpleExample')),
  },
  {
    path: '/antd',
    component: React.lazy(() => import('src/pages/AntdExample')),
  },
];

export default routes;
