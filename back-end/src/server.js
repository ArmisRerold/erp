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
import Category from "./models/Category.js";
import Product from "./models/Product.js";


//configuração .env
console.log(process.env.JWT_SECRET)
//rota autenticação
import jwt from "jsonwebtoken";
import auth from "./middleware/auth.js";
import bcrypt from "bcryptjs";
import { where } from "sequelize";


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

app.get("/client", async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients).status(200);
});

//rota cliente
app.get("/client/:id", async (req, res) => {
  const clients = await Client.findOne({where: {
    id: req.params.id,
  }})
  res.json(clients).status(200)
});

app.post("/client", auth, async (req, res) => {
  const {nome, email, telefone, cpf, endereco} = req.body;
  if(!nome || !cpf){
    res.status(400).json({erro: "nome e cpf são campos obrigatórios"})
  }
  const adress = await Adress.create(endereco)
  const id_adress = await adress.id;
  console.log(typeof id_adress)
  const newClient = await Client.create({nome, email, telefone, cpf, endereco:id_adress, autor: req.user.id})
  res.status(201).json({success: "Cliente criado com sucesso"})
});

app.put("/client", auth, async (req, res) => {
  const {id, nome, email, telefone, cpf, endereco} = req.body;
  const adress = await Adress.create(endereco)
  const id_adress = await adress.id;
  console.log(typeof id_adress)
  const newClient = await Client.update({nome, email, telefone, cpf, endereco:id_adress, autor: req.user.id}, {where: {id: id}})
  res.status(201).json({success: "Cliente atualizado com sucesso"})
});

app.delete("/client/:id", async (req, res) => {
  try{
  await Client.destroy({where:{
    id:req.params.id
  }})
  res.status(201).json({success: "excluído com sucess"})
}catch(e){
  res.status(400).json({erro: e})
}

});

app.get("/Category", async(req, res)=>{
  const categories = await Category.findAll()
  res.status(200).json(categories)
})

app.get("/Category/:id", async(req, res)=>{
  const category = await Category.findOne({where: {id: req.params.id}})
  res.status(200).json(category)
})

app.post("/Category", async (req, res)=>{
 const {title} = req.body
 if(!title){
  res.status(400).json({erro: "Titulo é um campo obrigatório"})
 }
 try{
 await Category.create({title})
  res.status(201).json({success: "Categoria criada com sucesso"}) 
}catch(e){
  res.status(400).json({erro: "Erro interno do BD"})
}

})

app.put("/Category", async (req, res) => {
  const { id, title } = req.body;

  if (!id || !title) {
    return res.status(400).json({
      erro: "id e título são campos obrigatórios"
    });
  }

  const [updated] = await Category.update(
    { title },
    { where: { id } }
  );

  if (updated === 0) {
    return res.status(404).json({
      erro: "Categoria não encontrada"
    });
  }

  res.status(200).json({
    success: "Categoria atualizada com sucesso"
  });
});

app.delete("/Category/:id", async(req, res)=>{

  const id = req.params.id
  try{
  await Category.destroy({where: {id: id}})
  res.status(201).json({success: "Categoria deletada com sucesso"})}catch(e){
    res.status(400).json({erro: "Erro interno do Banco de dados"})
  }
})

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
