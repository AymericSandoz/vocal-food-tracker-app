import axios from "axios";

export const textToMeal = async (req) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages : [
          {
            role: "system",
            content: `Tu es une IA qui analyse les repas. Rends ta réponse sous forme de JSON et dans la langue de l'utilisateur.
            Retourne un JSON avec :
            - Heure du repas ("meal_time"). Si pas d'heure précisée, mettre "null".
            - Total des calories ("total_calories")
            - Nom du repas ("meal_name"). Par exemple, "déjeuner", "dîner", "collation", etc. Mettre "null" si tu ne peux pas le déterminer.
            - Liste des aliments avec :
              - nom ("item"),
              - quantité estimée ("quantity"),
              - calories par portion ("calories"), en indiquant l'unité de mesure.
              - calories totales estimées ("estimated_total_calories").`,
          },
          {
            role: "user",
            content: req.text,
          },
        ],
        max_tokens: 500,
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const mealAnalysis = response.data.choices[0].message.content;

    // Retourne la réponse (qui est du texte JSON parsable)
    return JSON.parse(mealAnalysis);
  } catch (error) {
    console.error("Erreur lors de l'analyse OpenAI:", error.response?.data || error.message);
    throw new Error("Erreur lors de l'analyse du repas");
  }
};
