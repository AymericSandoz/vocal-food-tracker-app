const Sport = require('../models/sport');

export const createSport = async (data) => {
    const { transcriptionData, sportAnalysis } = data;
    try {
        // Créer un nouvel objet Sport avec les informations fournies
        const newSport = new Sport({
            userId: 'test', // Remplacer par l'ID de l'utilisateur authentifié
            time: sportAnalysis.sport_time || new Date().toISOString(),
            totalCalories: sportAnalysis.total_calories,
            name: sportAnalysis.sport,
            duration: sportAnalysis.duration,
            transcription: transcriptionData.text // Ajouter la transcription
        });
        // Enregistrer le nouvel objet Sport dans la base de données
        await newSport.save();
        return newSport;
    } catch (error) {
        console.error('Error saving sport:', error);
    }
}