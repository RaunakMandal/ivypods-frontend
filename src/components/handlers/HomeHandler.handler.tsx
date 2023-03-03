import { Navigate } from "react-router";
import Home from '../base/Home.component';

const HomeHandler = () => {
  const token = localStorage.getItem('token');
  return token ? <Home /> : <Navigate to="/login" />;
}

export default HomeHandler;