import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SingIn from "./SingIn";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<Home></Home> />
        <Route path="/login" element=<Login></Login> />
        <Route path="/singin" element=<SingIn></SingIn> />
      </Routes>
    </BrowserRouter>
  );
}
