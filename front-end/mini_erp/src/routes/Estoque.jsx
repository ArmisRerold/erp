import Menu from "../components/Menu";
import { Card, TextField, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import SubMenu from "../components/SubMenu";
import api from "../api/api";
import { useEffect, useState } from "react";
import BasicTable from "../components/Table";
import DefaultLayout from "../layouts/DefaultLayout";
import ButtonDefault from "../components/ButtonDefault";
function ViewProdutos() {
  const [produtos, setProdutos] = useState();
  
  async function updateProdutos() {
    const TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsImVtYWlsIjoic291emFAZ21haWwuY29tIiwiaWF0IjoxNzY2ODY1NzIyLCJleHAiOjE3NjY5NTIxMjJ9.qT3GEoUMAxyxAgWJaLWVwwb_M48VrbWaP7V1I6FcSLA";
    const response = await api.get("/produto", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    async function obterCategoria(id) {
      const response = await api.get(`category/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      return response.data;
    }

    const data = await Promise.all(
      response.data.map(async (i) => {
        const categoria = await obterCategoria(i.category);
        const viewProdutos = {
          id: i.id,
          nome: i.name,
          unidadeMedida: i.unMeasure,
          preco: i.sell_value,
          categoria: categoria.title,
        };
        return viewProdutos;
      })
    );

    setProdutos(data);
  }

  useEffect(() => {
    updateProdutos();
  }, []);

  return (
    <>
      <div className="p-3 flex flex-row w-full h-full">
        <div className="w-[80%] p-4">
          <div id="search-bar" className="flex flex-row p-4 justify-between">
            <fieldset>
              <TextField variant="outlined" size="small"></TextField>
              <ButtonDefault children={<Search></Search>}></ButtonDefault>
            </fieldset>
            <ButtonDefault>+ clientes</ButtonDefault>
          </div>

          <BasicTable rows={produtos}></BasicTable>
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
    </>
  );
}

function ViewMovimentacoes(){


  const [movimentacoes, setMovimentacoes] = useState()

  async function updateProdutos() {
    const TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsImVtYWlsIjoic291emFAZ21haWwuY29tIiwiaWF0IjoxNzY2ODY1NzIyLCJleHAiOjE3NjY5NTIxMjJ9.qT3GEoUMAxyxAgWJaLWVwwb_M48VrbWaP7V1I6FcSLA";
    const response = await api.get("/movimentacao_estoque", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
/*
    const data = await Promise.all(
      response.data.map(async (i) => {
        const categoria = await obterCategoria(i.category);
        const viewProdutos = {
          id: i.id,
          nome: i.name,
          unidadeMedida: i.unMeasure,
          preco: i.sell_value,
          categoria: categoria.title,
        };
        return viewProdutos;
      })
    );*/

    setMovimentacoes(response.data);
    console.log(movimentacoes)
  }

  useEffect(() => {
    updateProdutos();
  }, []);

  return <>
  <div className="flex flex-row w-full h-full p-4 gap-4">
    <div className="flex flex-col w-80% p-4">
      <div id="search-bar" className="flex flex-row justify-between">
            <fieldset>
              <TextField variant="outlined" size="small"></TextField>
              <ButtonDefault children={<Search></Search>}></ButtonDefault>
            </fieldset>
            <ButtonDefault>+ clientes</ButtonDefault>
          </div>
      <BasicTable rows={movimentacoes}></BasicTable>
    </div>

  </div>
  </>
}

function renderItensSubmenu(){

}

function ViewCategorias(){
  const [categorias, setCategorias] = useState()

  async function updateCategoria() {
    const TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsImVtYWlsIjoic291emFAZ21haWwuY29tIiwiaWF0IjoxNzY2ODY1NzIyLCJleHAiOjE3NjY5NTIxMjJ9.qT3GEoUMAxyxAgWJaLWVwwb_M48VrbWaP7V1I6FcSLA";
    const response = await api.get("/category", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    setCategorias(response.data)
  }

  useEffect(()=>{
    updateCategoria()
  }, [])

  return <>
  <div className="flex flex-col w-full h-full p-4 gap-4">
    <div id="search-bar" className="flex flex-row justify-between">
            <fieldset>
              <TextField variant="outlined" size="small"></TextField>
              <ButtonDefault children={<Search></Search>}></ButtonDefault>
            </fieldset>
            <ButtonDefault>+ clientes</ButtonDefault>
          </div>
  <BasicTable rows={categorias}></BasicTable>
  </div>
  
  </>
}

export default function Estoque() {
  const [stateSubMenuGlobal, setStateSubMenuGlobal] = useState(0);
  const optionsMenu = ["Produtos", "Movimentações", "Categorias"];

  return (
    <>
      <DefaultLayout
        titlePage={"Estoque"}
        children={
          <>
            <SubMenu
              items={optionsMenu}
              stateSubMenu={stateSubMenuGlobal}
              setStateSubMenu={setStateSubMenuGlobal}
            ></SubMenu>
            
            <div className={`${stateSubMenuGlobal==0?("flex"):("hidden")} w-full h-full`} >
              <ViewProdutos/>
            </div>
            <div className={`${stateSubMenuGlobal==1?("flex"):("hidden")} w-full h-full`} >
              <ViewMovimentacoes/>
            </div>
            <div className={`${stateSubMenuGlobal==2?("flex"):("hidden")} w-full h-full`} >
              <ViewCategorias/>
            </div>
             

             
          
            

          </>
        }
      ></DefaultLayout>
    </>
  );
}
