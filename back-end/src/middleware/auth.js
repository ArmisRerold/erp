import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 🔥 dados disponíveis na rota
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
