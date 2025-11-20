import commonRoutes from './commonRoutes';
import courseRoutes from './courseRoutes';
import studentRoutes from './StudentRoutes';
import TeacherRoutes from './TeacherRoutes';

const routes = [
  ...commonRoutes,
  ...courseRoutes,
  ...studentRoutes,
  ...TeacherRoutes,
];

export default routes;
