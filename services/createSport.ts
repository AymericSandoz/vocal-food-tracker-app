const Sport = require('../models/sport');

export const createSport = async (data) => {
  const { transcriptionData, sportAnalysis } = data;
  try {
    console.log('Transcription data:', transcriptionData);
    console.log('Sport analysis:', sportAnalysis);

    const sports = sportAnalysis.sports || [];

    const createdSports = [];

    for (const sport of sports) {
      // Créer un nouvel objet Sport avec les informations fournies
      const newSport = new Sport({
        userId: 'test', // Remplacer par l'ID de l'utilisateur authentifié
        time: sport.sport_time || new Date().toISOString(),
        caloriesBurned: sport.calories_burned,
        sport: sport.sport,
        duration: sport.duration,
        transcription: transcriptionData.text // Ajouter la transcription
      });
      // Enregistrer le nouvel objet Sport dans la base de données
      await newSport.save();
      console.log('createdSports:', createdSports);

      createdSports.push(newSport);
    }

    return createdSports;
  } catch (error) {
    console.error('Error saving sport:', error);
    return []; // Return an empty array in case of an error
  }
}