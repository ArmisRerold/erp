import User from "./User.js";
import Client from "./Client.js";
import Adress from "./Adress.js";
// Client → User
Client.belongsTo(User, {
  foreignKey: "autor",
});

User.hasMany(Client, {
  foreignKey: "autor",
});

// Client → Adress
Client.belongsTo(Adress, {
  foreignKey: "endereco",
});

Adress.hasMany(Client, {
  foreignKey: "endereco",
});
