import Menu from "../components/Menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SubMenu from "../components/SubMenu";
import Header from "../components/Header";
import DefaultLayout from "../layouts/DefaultLayout";
export default function Financeiro(props) {
  const [stateSubMenu, setStateSubMenu] = useState(0);
  const itemsSubmenu = ["Entradas", "Saídas"];
  return (
    <>
      <DefaultLayout
        titlePage={"Financeiro"}
        SubMenu={
          <>
            <SubMenu
              items={itemsSubmenu}
              stateSubMenu={stateSubMenu}
              setStateSubMenu={setStateSubMenu}
            ></SubMenu>
          </>
        }
        children={<>
        
        </>}
      ></DefaultLayout>
    </>
  );
}
