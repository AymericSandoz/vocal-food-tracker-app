exports.speechToMeal = async (req, res) => {
  try {
    const transcriptionData = await speechToText(req);
    const mealAnalysis = await textToMeal(transcriptionData);
    const data = { transcriptionData, mealAnalysis };
    const meal = await createMeal(data);
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.textToMeal = async (req, res) => {
  try {
    const transcriptionData = req.body;
    const mealAnalysis = await textToMeal(transcriptionData);
    const data = { transcriptionData, mealAnalysis };
    const meal = await createMeal(data);
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.speechToSport = async (req, res) => {
  try {
    const transcriptionData = await speechToText(req);
    const sportAnalysis = await textToSport(transcriptionData);
    const data = { transcriptionData, sportAnalysis };
    const sport = await createSport(data);
    res.json(sport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.textToSport = async (req, res) => {
  try {
    const transcriptionData = req.body;
    const sportAnalysis = await textToSport(transcriptionData);
    const data = { transcriptionData, sportAnalysis };
    const sport = await createSport(data);
    res.json(sport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
