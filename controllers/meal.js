const Meal = require("../models/meal");

exports.createMeal = async (req, res, next) => {
  try {
    const meal = new Meal({
      userId: req.body.userId,
      foods: req.body.foods,
      totalCalories: req.body.totalCalories,
      date: req.body.date,
    });
    await meal.save();
    res.status(201).json({ message: "Repas enregistré !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllMeals = async (req, res, next) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOneMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findOne({ _id: req.params.id });
    res.status(200).json(meal);
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.modifyMeal = async (req, res, next) => {
  try {
    const meal = await Meal.updateOne(
      { _id: req.params },
      { ...req.body, _id: req.params.id }
    );
    res.status(200).json({ message: "Repas modifié !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteMeal = async (req, res, next) => {
  try {
    await Meal.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Repas supprimé !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
