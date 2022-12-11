import React, { Suspense } from 'react';
import { Route, useLocation, Routes } from 'react-router-dom';
import router, { RouteType } from 'src/router';
import PageLoading from 'src/components/PageLoading';
import NotFound from 'src/components/NotFound';
import Initialization from './Initialization';

/** 空白路由页 */
const BLANK_ROUTER = [ '/', '/login' ];

function App() {
  const { pathname } = useLocation();

  const renderRoute = (route: RouteType) => {
    const { path, component: RouteComp } = route;
    return (
      <Route
        key={path}
        path={path}
        element={
          <Suspense fallback={<PageLoading tip="页面加载中..." />}>
            {/* 此处可做权限判断 */}
            <div style={{width: '1200px', margin: '0 auto', padding: '200px 0'}}><RouteComp /></div>
          </Suspense>
        }
      />
    );
  };

  if (BLANK_ROUTER.includes(pathname)) {
    return <Routes><Route>{router.map((route) => renderRoute(route))}</Route></Routes>;
  }

  return (
    <Initialization>
      <Routes>
        <Route path="/">
          {router.map((route) => renderRoute(route))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Initialization>
  );
}

export default App;
