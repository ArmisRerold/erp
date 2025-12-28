import {
  Dashboard,
  Group,
  Inventory,
  AttachMoney,
  Person,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
function Menu() {
  const statusMenu = localStorage.getItem("menu") || 0;
  console.log(statusMenu)
  const navigate = useNavigate();
  const [clickedItem, setClickedItem] = useState(statusMenu);
  const styleItemMenu = `h-[100px] w-[100px] rounded-md shadow-2xl flex flex-col items-center justify-center cursor-pointer`;
  const itemsMenu = [
    {
      icon: <Dashboard sx={{ fontSize: 50, textAlign: "center" }} />,
      title: "Dashboard",
    },
    {
      icon: <Group sx={{ fontSize: 50, textAlign: "center" }} />,
      title: "Clientes",
    },
    {
      icon: <Inventory sx={{ fontSize: 50, textAlign: "center" }} />,
      title: "Estoque",
    },
    {
      icon: <AttachMoney sx={{ fontSize: 50, textAlign: "center" }} />,
      title: "Financeiro",
    },
    {
      icon: <Person sx={{ fontSize: 50, textAlign: "center" }} />,
      title: "Perfil",
    },
  ];

  function mudarClicked(index) {
    return Number(clickedItem) === index
      ? "bg-white text-slate-400"
      : "bg-slate-400 text-white";
  }

  function onClickItemMenu(index) {
    setClickedItem(index);
    localStorage.setItem("menu", index);

  }

  return (
    <>
      <nav>
        <ul className="w-[120px] h-screen bg-slate-700 flex flex-col p-3 gap-2 shadow-black shadow-2xl">
          {itemsMenu.map((item, index) => (
            <li
              className={`${mudarClicked(index) + styleItemMenu} `}
              onClick={() => onClickItemMenu(index)}
              key={index}
            >
              <NavLink to={`/${item.title}`}>
                {item.icon}
                <p>{item.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Menu;
