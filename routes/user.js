const express = require("express");
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes

const stuffCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.delete("/:id", auth, stuffCtrl.deleteUser);
router.get("/:id", auth, stuffCtrl.getOneUser);
router.put("/:id", auth, stuffCtrl.modifyUser);
router.get("/", auth, stuffCtrl.getAllUsers);

router.post("/register", userCtrl.signup); //Inscriptions
router.post("/login", userCtrl.login); //Connexion
