import Menu from "../components/Menu";
import Header from "../components/Header";
import { TextField } from "@mui/material";
import DefaultLayout from "../layouts/DefaultLayout";
import ButtonDefault from "../components/ButtonDefault";
import { Search } from "@mui/icons-material";
import BasicTable from "../components/Table";
import api from "../api/api.js";
import { useState, useEffect } from "react";
export default function Clientes() {
  
  const [clientes, setClientes] = useState();
  async function updateTable() {
    const TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsImVtYWlsIjoic291emFAZ21haWwuY29tIiwiaWF0IjoxNzY2ODY1NzIyLCJleHAiOjE3NjY5NTIxMjJ9.qT3GEoUMAxyxAgWJaLWVwwb_M48VrbWaP7V1I6FcSLA";
    const response = await api.get("/client", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data = response.data.map((i) => ({
      id: i.id,
      nome: i.nome,
      email: i.email,
      telefone: i.telefone,
    }));

    console.log(data);
    setClientes(data);
  }
  useEffect(() => {
    updateTable();
  }, []);
  

  return (
    <>
      <DefaultLayout
        titlePage={"Cliente"}
        children={
          <>
            <div id="search-bar" className="flex flex-row p-4 justify-between">
              <fieldset>
                <TextField variant="outlined" size="small"></TextField>
                <ButtonDefault children={<Search></Search>}></ButtonDefault>
              </fieldset>
              <ButtonDefault>+ clientes</ButtonDefault>
            </div>
            <div className="p-4">
             
              <BasicTable rows={clientes}></BasicTable>
            </div>
          </>
        }
      ></DefaultLayout>
    </>
  );
}
