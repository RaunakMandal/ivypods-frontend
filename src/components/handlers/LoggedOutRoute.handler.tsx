import { Navigate } from "react-router";

const LoggedOutRoute = ({ children }: { children: JSX.Element }) => {
  let auth = localStorage.getItem("token");
  return !auth ? children : <Navigate to="/" />;
};

export default LoggedOutRoute;
