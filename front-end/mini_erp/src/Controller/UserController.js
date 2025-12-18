//import User from "../models/User";
import api from "../api/api.js";
class UserController {
  constructor(token = "") {
    this.token = token;
  }
  static builder() {
    return new UserController();
  }

  async login(email, password) {
    this.token = (await api.post("/login", { email, password })).data.token;
    return this;
  }

  async getAllUsers() {
    return await api.get("/users", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async register(name, email, password) {
    try {
      const response = await api.post("/singin", {
        name,
        email,
        password,
      });

      // backend retorna 201 quando cria
      if (response.status === 201) {
        await this.login(email, password);
        return this; // mantém o chain
      }

      throw new Error("Resposta inesperada do servidor");
    } catch (error) {
      // erro tratado corretamente
      const message =
        error.response?.data?.erro || error.message || "Erro desconhecido";

      throw new Error(message);
    }
  }
}

async function main() {
  try {
    const UserService2 = await UserController.builder().register(
      "Ariel",
      "maleky12340976554@gmail.com",
      "Marianas10@"
    );
    console.log(await UserService2);
  } catch (e) {
    console.log("e.message");
  }
  const UserService = await UserController.builder().login(
    "moreira@gmail.com",
    "As123@56"
  );

  //console.log(await UserService.getAllUsers());
}
main();
