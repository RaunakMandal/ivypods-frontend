import { Navigate } from "react-router";

const LoggedInRoute = ({ children }: { children: JSX.Element }) => {
  let auth = localStorage.getItem('token');
  return auth ? children : <Navigate to="/login" />;
};

export default LoggedInRoute;