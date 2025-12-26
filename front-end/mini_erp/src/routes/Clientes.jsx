import Menu from "../components/Menu"
import Header from "../components/Header"
export default function Clientes(){
  return <>
  <div className="flex flex-row">
        <Menu></Menu>

        <div className="w-full">
          <Header titlePage={"Clientes"}></Header>
          
        </div>
      </div>

  </>
}