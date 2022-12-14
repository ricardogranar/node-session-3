const mongoose = require("mongoose");

// Ruta de la base de datos. Esta es local, podría ser la ruta de mongo atlas.
const DB_URL = "mongodb+srv://root:root@cluster0.fgxc5a7.mongodb.net/dragon-ball?retryWrites=true&w=majority";

if (!DB_URL) throw new Error("No se encuentra la URL a la base de datos");

const connectDb = async () => {
  try {
    const db = await mongoose.connect(DB_URL);
    const { name, host } = db.connection;
    console.log(`Conectado con éxito a la db: ${name} en ${host}`);
  } catch(error) {
    console.log("Error conectando a la base de datos:", error);
  }
};

module.exports = {
  connectDb,
  DB_URL,
}