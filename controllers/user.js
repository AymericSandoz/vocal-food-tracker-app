const User = require("../models/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.modifyUser = async (req, res, next) => {
  try {
    const user = await User.updateOne(
      { _id: req.params },
      { ...req.body, _id: req.params.id }
    );
    res.status(200).json({ message: "Utilisateur modifié !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Utilisateur supprimé !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
