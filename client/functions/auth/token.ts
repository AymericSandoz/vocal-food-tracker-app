import AsyncStorage from '@react-native-async-storage/async-storage';

// Pour stocker le token après la connexion
const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('@jwt_token', token);
  } catch (e) {
    console.error('Erreur lors du stockage du token', e);
  }
};

// Pour récupérer le token lors de la connexion
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@jwt_token');
    return token;
  } catch (e) {
    console.error('Erreur lors de la récupération du token', e);
  }
};

const isAuthenticated = async () => {
    try {
        const token = await AsyncStorage.getItem('@jwt_token');
        return token !== null; // Retourne vrai si un token est présent, sinon faux
      } catch (e) {
        console.error('Erreur lors de la vérification de l\'authentification', e);
        return false;
      }
}

const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('@jwt_token');
      } catch (e) {
        console.error('Erreur lors de la suppression du token', e);
      }
}

export { storeToken, getToken, isAuthenticated, removeToken };