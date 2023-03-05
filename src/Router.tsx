import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login.component";
import Signup from "./components/auth/Signup.component";
import Home from "./components/base/Home.component";
import LoggedInRoute from "./components/handlers/LoggedInRoute.handler";
import LoggedOutRoute from "./components/handlers/LoggedOutRoute.handler";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <LoggedInRoute>
              <Home />
            </LoggedInRoute>
          }
        />
        <Route
          path="/login"
          element={
            <LoggedOutRoute>
              <Login />
            </LoggedOutRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <LoggedOutRoute>
              <Signup />
            </LoggedOutRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
