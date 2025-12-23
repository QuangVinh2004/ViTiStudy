import commonRoutes from './commonRoutes';
import courseRoutes from './courseRoutes';
import studentRoutes from './StudentRoutes';
import TeacherRoutes from './TeacherRoutes';
import AdminRoutes from './AdminRoutes';

const routes = [
  ...commonRoutes,
  ...courseRoutes,
  ...studentRoutes,
  ...TeacherRoutes,
  ...AdminRoutes,
];

export default routes;
