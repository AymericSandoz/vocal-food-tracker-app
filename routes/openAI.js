import express from "express";
import auth from "../middleware/auth";
import openAIController from "../controllers/openAI";
import upload from "../middleware/upload"; // Adjust the path as necessary

const router = express.Router();

// speech to meal
router.post(
  "/speech-to-meal",
  auth,
  upload.single("audio"),
  openAIController.speechToMeal
);

// text to meal
router.post("/text-to-meal", auth, openAIController.textToMeal);

// speech to sport (physical activity)
router.post(
  "/speech-to-sport",
  auth,
  upload.single("audio"),
  openAIController.speechToSport
);

// text to sport (physical activity)
router.post("/text-to-sport", auth, openAIController.textToSport);

module.exports = router;
