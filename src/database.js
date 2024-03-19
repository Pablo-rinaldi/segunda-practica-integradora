const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://pablohrinaldi:jimbobimbo@cluster0.rhjud7m.mongodb.net/Kobb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) =>
    console.log("Error en la conexion con la base de datos", error)
  );
