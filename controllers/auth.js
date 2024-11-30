import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

// Gestion des erreurs de création d'utilisateur
const signUpErrors = (error) => {
  let error_message;
  if (error.message.includes("duplicate key error collection")) {
    error_message = "Cet email est déjà utilisé";
  } else if (error.message.includes("email")) {
    error_message = "Email invalide";
  } else {
    error_message = "Erreur lors de l'inscription";
  }
  return error_message;
};

// Inscription
exports.signup = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur avec les champs dynamiques
    const user = new User({
      email,
      password: hashedPassword,
      ...rest, // Inclut les autres champs restants
    });

    // Sauvegarde de l'utilisateur
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.KEY_JWT, {
      expiresIn: "150d",
    });

    res.status(201).json({
      message: "Utilisateur créé !",
    });
  } catch (error) {
    const formattedErrors = signUpErrors(error);
    res.status(401).json({
      message: formattedErrors,
    });
  }
};

// Connexion
exports.login = async (req, res) => {
  console.log("login");
  try {
    const { email, password } = req.body;

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401) // 401 Unauthorized pour une tentative de connexion invalide
        .json({ error: "Mot de passe ou identifiant incorrect !" });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Mot de passe ou identifiant incorrect !" });
    }

    // Génération du token JWT
    const token = jwt.sign({ userId: user._id }, process.env.KEY_JWT, {
      expiresIn: "150d",
    });

    res.status(200).json({
      userId: user._id,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur serveur, veuillez réessayer." });
  }
};
