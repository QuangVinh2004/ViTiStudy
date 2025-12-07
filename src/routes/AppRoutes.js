import routes from './index';
import { useRoutes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function filterRoutesByRole(routes, user) {
  const userRole = user?.role;
  return routes.map(route => {
    if (route.roles) {
      return {
        ...route,
        element: userRole && route.roles.includes(userRole)
          ? route.element
          : <Navigate to="/not-found" replace />,
        children: route.children ? filterRoutesByRole(route.children, user) : undefined,
      };
    }
    return {
      ...route,
      children: route.children ? filterRoutesByRole(route.children, user) : undefined,
    };
  });
}

function AppRoutes() {
  const { user } = useContext(AuthContext);

  // Always call useRoutes, even if user is undefined
  const filteredRoutes = user === undefined
    ? [{ path: '*', element: <div>Loading...</div> }] // Fallback route for loading state
    : filterRoutesByRole(routes, user);

  const element = useRoutes(filteredRoutes);

  return element;
}

export default AppRoutes;