import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login.component';
import HomeHandler from "./components/handlers/HomeHandler.handler";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<HomeHandler />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;