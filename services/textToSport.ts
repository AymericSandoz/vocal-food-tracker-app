import axios from 'axios';

export const textToSport = async (req) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages : [
            {
              role: "system",
                content: `Tu es une IA qui analyse les activités physiques. Rends ta réponse sous forme de JSON et dans la langue de l'utilisateur.
                Retourne un JSON avec un tableau "sports" contenant plusiers objets avec les propriétés suivantes :
                - Type d'activité physique ("sport"). Par exemple, "footing", "vélo", "natation", etc. Mettre "null" si tu ne peux pas le déterminer.
                - Durée de l'activité ("duration"). Si pas de durée précisée, mettre "null".
                - Calories brûlées ("calories_burned")`,
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
        const sportAnalysis = response.data.choices[0].message.content;
        return JSON.parse(sportAnalysis);
    } catch (error) {
        console.error("Erreur lors de l'analyse OpenAI:", error.response?.data || error.message);
        throw new Error("Erreur lors de l'analyse du sport");
    }
}

