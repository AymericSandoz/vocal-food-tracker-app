const express = require("express");
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes

const stuffCtrl = require("../controllers/meals");
const auth = require("../middleware/auth");

router.post("/", auth, stuffCtrl.createMeal);
router.get("/:id", auth, stuffCtrl.getOneMeal);
router.put("/:id", auth, stuffCtrl.modifyMeal);
router.delete("/:id", stuffCtrl.deleteMeal);
router.get("/", auth, stuffCtrl.getAllMeals);
