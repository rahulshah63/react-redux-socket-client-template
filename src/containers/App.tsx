import React, { useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from '@constants/routes';
import Login from '@containers/login';
import Dashboard from '@containers/dashboard';
import { AuthenticatedRoute, UnauthenticatedRoute } from '@components/authentication';
interface AppProps {}

const Main: React.FC<AppProps> = () => {
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routes.LOGIN} element={<UnauthenticatedRoute component={Login} />} />
      <Route path={routes.DASHBOARD} element={<AuthenticatedRoute component={Dashboard} />} />
    </Routes>
  );
};

export default Main;
