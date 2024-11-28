const Meal = require("../models/meal");

export const createMeal = async (data) => {
  const { transcriptionData, mealAnalysis } = data;
  console.log("createMeal:", data);
  console.log("foodItems:", mealAnalysis.foods);

  try {
    // Créer un nouvel objet Meal avec les informations fournies
    const newMeal = new Meal({
      meal_time: mealAnalysis.meal_time || new Date().toISOString(),
      total_calories: mealAnalysis.total_calories,
      meal_name: mealAnalysis.meal_name,
      foods: mealAnalysis.foods.map(food => ({
        item: food.item,
        quantity: food.quantity,
        calories: food.calories,
        estimated_total_calories: food.estimated_total_calories
      })),
      transcription: transcriptionData.text // Ajouter la transcription
    });

    // Enregistrer le nouvel objet Meal dans la base de données
    await newMeal.save();

    console.log("Meal saved successfully:", newMeal);
    return newMeal;
  } catch (error) {
    console.error("Error saving meal:", error);
    throw new Error("Could not save meal. Please try again.");
  }
};