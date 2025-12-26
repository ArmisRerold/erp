import Menu from "../components/Menu"
import { Card, TextField, Button } from "@mui/material"
import { Search } from "@mui/icons-material"
import SubMenu from "../components/SubMenu"
import TableProdutos from "../components/TableProdutos"
export default function Estoque() {
  return (
    <>
      <main className="flex flex-row">
        <Menu default={2}></Menu>
        <div className="w-full">
          <header className="w-full bg-slate-700 p-2 flex flex-row">
            <h2 className="text-2xl font-black text-white">Estoque</h2>
          </header>
          
          <nav>

            <ul className="flex flex-row w-full gap-5 bg-slate-500 shadow-black shadow-2xl">
              <li className="font-bold text-black p-2 bg-slate-200">
                Produtos
              </li>
              <li className="font-bold text-white p-2">Movimentações</li>
              <li className="font-bold text-white p-2">Categorias</li>
            </ul>
          </nav>
          <div className="p-3 flex flex-row">
            <div className="w-[80%] p-4">
              <div className="p-2 flex flex-row justify-between" id="filter">
                <div id="containerSearch">
                  <TextField
                    type="search"
                    variant="outlined"
                    size="small"
                  ></TextField>
                  <Button sx={{background: ""}} variant="contained">
                    <Search />
                  </Button>
                </div>
                <Button variant="contained">+ produto</Button>
              </div>
              <TableProdutos></TableProdutos>
            </div>
            <div
              id="container-cards"
              className="grid grid-row-3 gap-3 w-[20%] h-full p-4"
            >
              <Card
                sx={{ height: 120 }}
                elevation={10}
                className="flex flex-col items-center"
              >
                <p className="text-4xl font-medium p-3 ">20</p>
                <p>{"Quantidade de produtos"}</p>
              </Card>
              <Card
                sx={{ height: 120 }}
                elevation={10}
                className="flex flex-col items-center"
              >
                <p className="text-4xl font-medium p-3 ">10</p>
                <p>{"Produtos com estoque"}</p>
              </Card>
              <Card
                sx={{ height: 120 }}
                elevation={10}
                className="flex flex-col items-center"
              >
                <p className="text-4xl font-medium p-3 ">10</p>
                <p>{"Produtos sem Estoque"}</p>
              </Card>
              <Card
                sx={{ height: 120 }}
                elevation={10}
                className="flex flex-col items-center"
              >
                <p className="text-4xl font-medium p-3 ">R$ 10.000,00</p>
                <p>{"Valor total em estoque"}</p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
