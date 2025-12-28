import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SingIn from "./SingIn";
import Estoque from "./Estoque";
import DefaultLayout from "../layouts/DefaultLayout"
import Financeiro from "./Financeiro";
import Clientes from "./Clientes";
import { NavLink } from "react-router-dom";


export default function AppRoutes() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<DefaultLayout titlePage={"Dashboard"} children=<Home></Home> ></DefaultLayout>/>
        <Route path="/Dashboard" element=<Home></Home> />
        <Route path="/login" element=<Login></Login> />
        <Route path="/singin" element=<SingIn></SingIn> />
        <Route path="/financeiro" element={<><Financeiro></Financeiro></>}/>
        <Route path="/estoque" element=<Estoque></Estoque> />
        <Route path="/clientes" element=<Clientes></Clientes> />
        
      </Routes>
    </BrowserRouter>
  );
}
