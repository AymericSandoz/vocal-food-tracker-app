exports.signup = (req, res, next) => {
  const signUpErrors = (errors) => {
    const error = { pseudo: "", email: "" };

    if (errors.message.includes("pseudo"))
      error.pseudo = "Pseudo incorrect ou déjà utilisé";

    if (errors.message.includes("email")) error.email = "Email invalide";

    return error;
  };

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        pseudo: req.body.pseudo,
        name: req.body.name,
        club: req.body.club,
      });
      user
        .save()
        .then(() => res.status(200).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(201).json(signUpErrors(error)));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res.status(500).json({ err });
    }

    if (user) {
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(200).json({
              error: "Mot de passe ou identifiant incorrect !",
            });
          } else {
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.KEY_JWT, {
                expiresIn: "150d",
              }),
              pseudo: user.pseudo,
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      res.status(200).json({
        error: "Mot de passe ou identifiant incorrect !",
      });
    }
  });
};
