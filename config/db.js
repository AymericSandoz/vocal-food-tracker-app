import mongoose from "mongoose";
//Coonexion à MONGODB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));
