const Meal = require("../models/meal");
import mongoose from "mongoose";

export const createMeal = async (data) => {
  const { transcriptionData, mealAnalysis } = data;
  console.log("createMeal:", data);
  console.log("foodItems:", mealAnalysis.foods);

  try {
    // Créer un nouvel objet Meal avec les informations fournies
    const newMeal = new Meal({
      userId: 'test', // Remplacer par l'ID de l'utilisateur authentifié
      time: mealAnalysis.meal_time || new Date().toISOString(),
      totalCalories: mealAnalysis.total_calories,
      name: mealAnalysis.meal_name,
      foods: mealAnalysis.foods.map(food => ({
        item: food.item,
        quantity: String(food.quantity),
        calories: String(food.calories),
        estimatedTotalCalories: String(food.estimated_total_calories)
      })),
      transcription: transcriptionData.text // Ajouter la transcription
    });

    // Enregistrer le nouvel objet Meal dans la base de données
    await newMeal.save();

    console.log("Meal saved successfully:", newMeal);
    return newMeal;
  } catch (error) {
    console.error("Error saving meal:", error);

  }
};