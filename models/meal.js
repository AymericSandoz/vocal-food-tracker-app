const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  item: { type: String, required: true }, // Nom de l'aliment
  quantity: { type: String, required: true }, // Quantité estimée
  calories: { type: String, required: true }, // Calories par portion
  estimatedTotalCalories: { type: String, required: true }, // Total des calories estimées
});

const mealSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // }, // Lien avec l'utilisateur
    userId: { type: String, required: true }, // Lien avec l'utilisateur
    foods: { type: [foodSchema], required: true }, // Liste des aliments
    totalCalories: { type: Number, required: true }, // Total des calories pour le repas
    date: { type: String }, // Date du repas selon chatgpt
    transcription: { type: String, required: false }, // Transcription du repas
    name: { type: String, required: false }, // Titre du repas
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meal", mealSchema);
