import { Route, Redirect } from 'react-router-dom';
import { ROUTE_SIGN_IN } from '../../utils/constants';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>{props.loggedIn ? <Component {...props} /> : <Redirect to={ROUTE_SIGN_IN} />}</Route>
);

export default ProtectedRoute;
