import AdminPage from '../pages/admin/AdminPage';

const AdminRoutes = [
  {
    path: '/admin',
    element: <AdminPage />,
    roles: ['admin'],
  },
];

export default AdminRoutes;
