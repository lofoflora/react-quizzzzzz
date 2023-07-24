import axios from 'axios';

const TriviaApi = async (amount, category, difficulty) => {
  try {
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`);
    return response.data.results;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des questions :', error);
    return [];
  }
};

export default TriviaApi;
