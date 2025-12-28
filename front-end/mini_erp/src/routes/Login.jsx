import { TextField, Button, Paper, Link } from "@mui/material";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
const theme = createTheme({
  palette: {
    mode: "dark", // "light" ou "dark"
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.2rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row items-center justify-center w-screen h-screen bg-slate-300">
        <Paper elevation={6} className="flex flex-col p-8 gap-4 items-center">
          <h1 className="text-3xl">Login</h1>
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

          <Button className="bg-slate-600 w-full" variant="contained" onClick={async()=>{
            const response = await api.post("/login",{email, password})
            console.log(response.data)
          }}>
            Entrar
          </Button>
          <Button
            className="bg-slate-600 w-full"
            variant="outlined"
            onClick={() => {
              navigate("/singin");
            }}
          >
            Não possuo cadastro
          </Button>
          <Link href="">esqueci minha senha</Link>
        </Paper>
      </div>
    </>
  );
}
