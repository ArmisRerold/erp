//Express
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

//config BD
import User from "./models/User.js";
import Adress from "./models/Adress.js";
import Client from "./models/Client.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

//rota autenticação
import jwt from "jsonwebtoken";
dotenv.config({ path: "../.env" });
import auth from "./middleware/auth.js";

app.get("/users", auth, async (req, res) => {
  const users = await User.findAll();
  res.json(users).status(200);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  var user;
  try {
    user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }
  } catch (e) {
    res.status(400).json({ erro: "Erro interno no servidor" });
  }
  const validaSenha = await bcrypt.compare(password, user.password);
  if (!validaSenha) {
    res.status(401).json({ erro: "email ou senha incorreto(s)" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token }).status(200);
});

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
app.post("/singin", async (req, res) => {
  var { name, email, password } = req.body;
  name = String(name).trim();
  email = String(email).trim().toLowerCase();

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ erro: "Nome, email e senha são campos obrigatórios" });
  }
  if (!validarEmail(email)) {
    return res.status(400).json({ erro: "email inválido" });
  }
  try {
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!senhaRegex.test(password)) {
      return res.status(400).json({
        erro: "Senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e símbolo",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const response = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "Usuário criado com sucesso",
    });
  } catch (erro) {
    if (erro.name === "SequelizeUniqueConstraintError") {
      res
        .status(409)
        .json({ erro: "Email já cadastrado. Porfavor vá para login." });
    }
    res.status(500).json({
      erro: "Erro interno ao criar usuário",
    });
  }
});

app.get("/cliente", async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients).status(200);
});

//rota cliente
app.get("/cliente/:id", (req, res) => {});

app.post("/cliente", auth, (req, res) => {
  const {nome, email, telefone, cpf, endereco} = req.body;
  console.log({nome, email, telefone, cpf, endereco})
});

app.delete("/cliente", (req, res) => {});

app.put("/cliente", (req, res) => {});

//rota produto
app.get("/produto/:id", (req, res) => {});

app.post("/produto", (req, res) => {});

app.delete("/produto", (req, res) => {});

app.put("/produto", (req, res) => {});

//rota movimentacao_estoque
app.get("/movimentacao_estoque/:id", (req, res) => {});

app.post("/movimentacao_estoque", (req, res) => {});

app.delete("/movimentacao_estoque", (req, res) => {});

app.put("/movimentacao_estoque", (req, res) => {});

app.listen(3000, () => {
  console.log("servindo na url: http://localhost:3000");
});
//rota
