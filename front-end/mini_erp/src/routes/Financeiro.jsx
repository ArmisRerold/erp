import Menu from "../components/Menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SubMenu from "../components/SubMenu";
import Header from "../components/Header";
export default function Financeiro(props) {
  const [stateSubMenu, setStateSubMenu] = useState(0);
  const itemsSubmenu = ["Entradas", "Saídas"];
  return (
    <>
      <div className="flex flex-col">
        

        <div className="w-full">
          <SubMenu
            items={itemsSubmenu}
            stateSubMenu={stateSubMenu}
            setStateSubMenu={setStateSubMenu}
            className="w-full"
          ></SubMenu>
        </div>
      </div>
    </>
  );
}
