const { mongoose } = require("mongoose");
const Character = require("../../api/characters/characters.model");
const { DB_URL } = require("../database/db");

const characters = [
    {
      name: "Goku",
      race: "saiyan",
      universe: 7,
      transform: true,
      genre: "male",
    },
    {
      name: "Piccolo",
      race: "namekian",
      universe: 7,
      transform: true,
      genre: "namekian",
    },
    {
      name: "Cabba",
      race: "saiyan",
      universe: 6,
      transform: true,
      genre: "male",
    },
    {
      name: "Kale",
      race: "saiyan",
      universe: 6,
      transform: true,
      genre: "female",
    },
    {
      name: "A18",
      race: "android",
      universe: 7,
      transform: false,
      genre: "female",
    },
    {
      name: "Krillin",
      race: "human",
      universe: 7,
      transform: false,
      genre: "male",
    },
    {
      name: "Jiren",
      race: "unknown",
      universe: 11,
      transform: false,
      genre: "male",
    },
    {
      name: "Zen-oh",
      race: "unknown",
      universe: 0,
      transform: false,
      genre: "genderless",
    },
  ];
  
  /**
   * 1. Conectaremos con la db
   * 2. Haremos una búsqueda para ver si tenemos personajes
   *     2.1 si NO tenemos personajes -> continuamos al siguiente paso
   *     2.2 si SI tenemos personajes -> Borramos la colección (drop)
   * 3. Escribir los personajes del array characters
   * 4. Informaremos que hemos escrito los personajes
   * 5. Desconectaremos de la base de datos.
   */
  
  mongoose.connect(DB_URL)
    .then(async () => {
      const allCharacters = await Character.find().lean();
      
      if(!allCharacters.length) {
        console.log("[seed]: No se encuentran personajes, continuo...")
      } else {
        console.log(`[seed]: Encontrados ${allCharacters.length} personajes.`);
        await Character.collection.drop();
        console.log("[seed]: Colección Characters eliminada correctamente");
      }
    })
    .catch((error) => console.log("[seed]: Error eliminando la colección -->", error))
    .then(async() => {
      await Character.insertMany(characters);
      console.log("[seed]: Nuevos personajes añadidos con éxito");
    })
    .catch((error) => console.log("[seed]: Error añadiendo los personajes", error))
    .finally(() => mongoose.disconnect());