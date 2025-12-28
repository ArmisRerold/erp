import { use } from "react";
import { useState } from "react";

export default function SubMenu({ items, stateSubMenu, setStateSubMenu}) {

  const div = [...items]
  
  return (
    <ul className="flex flex-row w-full gap-5 bg-slate-500 shadow-black shadow-2xl">
      {div.map((item, index) => (
        <li
          key={index}
          className={`font-bold cursor-pointer text-black p-2 ${stateSubMenu == index?"bg-slate-200":"bg-slate-500"} `}
          onClick={(e)=>{
            setStateSubMenu(index)
            e.target.value = index
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
