import { TextField, Button, Paper, Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
export default function SingIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row items-center justify-center w-screen h-screen bg-slate-300">
        <Paper elevation={6} className="flex flex-col p-8 gap-4 items-center">
          <h1 className="text-3xl">SingIn</h1>

          <TextField
            variant="outlined"
            value={name}
            label="name"
            size="small"
            type="email"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></TextField>
          <TextField
            variant="outlined"
            value={email}
            label="email"
            size="small"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></TextField>
          <TextField
            variant="outlined"
            value={password}
            type="password"
            size="small"
            label="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></TextField>

          <Button className="bg-slate-600 w-full" variant="contained">
            Cadastrar
          </Button>
          <Button
            className="bg-slate-600 w-full"
            variant="outlined"
            onClick={() => {
              navigate("/login");
            }}
          >
            Já possuo cadastro
          </Button>
        </Paper>
      </div>
    </>
  );
}
