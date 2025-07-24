import routes from './index'; 
import { useRoutes } from 'react-router-dom';

function AppRoutes() {
  const element = useRoutes(routes);
  return element;

}
export default AppRoutes;
