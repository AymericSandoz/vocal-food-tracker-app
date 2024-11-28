const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  item: { type: String, required: true }, // Nom de l'aliment
  quantity: { type: Number, required: true }, // Quantité estimée
  unit: { type: String, required: true }, // Unité de mesure (g, ml, etc.)
  calories: { type: Number, required: true }, // Calories par portion
  estimated_total_calories: { type: Number, required: true }, // Total des calories estimées
});

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Lien avec l'utilisateur
  foods: { type: [foodSchema], required: true }, // Liste des aliments
  totalCalories: { type: Number, required: true }, // Total des calories pour le repas
  date: { type: Date, default: Date.now }, // Date du repas
});

module.exports = mongoose.model("Meal", mealSchema);
