import mongoose from "mongoose";
const sportSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // }, // Lien avec l'utilisateur
    userId: { type: String, required: true }, // Lien avec l'utilisateur
    duration: { type: String, required: true }, // Durée de l'activité
    sport: { type: String, required: true }, // Nom de l'activité
    caloriesBurned: { type: Number, required: true }, // Calories brûlées
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sport", sportSchema);
