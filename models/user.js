import mongoose from "mongoose";

const weightHistorySchema = new mongoose.Schema({
  weight: { type: Number, required: true }, // Poids en kg
  date: { type: Date, default: Date.now }, // Date de l'enregistrement
});

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true }, // Nom de l'utilisateur
    lastName: { type: String, required: true }, // Prénom de l'utilisateur
    email: { type: String, required: true, unique: true }, // Email unique
    password: { type: String, required: true }, // Mot de passe
    height: { type: Number, required: false }, // Taille en cm
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    }, // Genre
    dateOfBirth: { type: Date, required: false }, // Date de naissance
    weightHistory: { type: [weightHistorySchema], required: false }, // Historique des poids
    createdAt: { type: Date, default: Date.now }, // Date de création du compte
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
