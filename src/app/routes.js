import { routes as routesHome } from './screens/Home';
import { routes as routesMisc } from './screens/Misc';

export default [
  ...routesHome,
  ...routesMisc,
].map((route, key) => ({ ...route, key }));
