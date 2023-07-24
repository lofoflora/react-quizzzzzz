import React, { useState, useEffect } from 'react';
import TriviaApi from '../TriviaApi';
import Timer from './Timer';
import EndScreenComponent from './EndScreenComponent';

function QuestionsReponses() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeIsUp, setTimeIsUp] = useState(false); // État pour indiquer si le temps est écoulé
  const [answeredQuestions, setAnsweredQuestions] = useState(0); // État pour suivre le nombre de questions répondues
  const [showResults, setShowResults] = useState(false); // État pour afficher les résultats

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const apiQuestions = await TriviaApi(10, 9, 'medium');
        setQuestions(apiQuestions);
      } catch (error) {
        console.error('Erreur lors du chargement des questions :', error);
      }
    }
    fetchQuestions();
  }, []);

  if (questions.length === 0) return <p>Chargement des questions...</p>;

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswers = shuffleArray([
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ]);

  const handleAnswerSelection = (answer) => setSelectedAnswer(answer);
  const isAnswerSelected = (answer) => selectedAnswer === answer;

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      // Vérifier si toutes les questions ont été répondues
      if (answeredQuestions === questions.length - 1) {
        // Afficher les résultats si toutes les questions ont été répondues
        setShowResults(true);
      } else {
        // Passer à la question suivante
        setSelectedAnswer(null);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setAnsweredQuestions((prevCount) => prevCount + 1);
      }
    }
  };

  // Gérer l'expiration du temps
  const handleTimeIsUp = () => {
    setTimeIsUp(true);
    // Afficher EndScreenComponent lorsque le temps est écoulé
    setShowResults(false);
  };

  return (
    <div>
      {!timeIsUp && !showResults && (
        // Afficher le composant Timer avec 60 secondes et gérer l'expiration du temps
        <Timer seconds={60} onTimeIsUp={handleTimeIsUp} />
      )}

      {timeIsUp && !showResults && <EndScreenComponent />}

      {showResults && (
        <div>
          {/* Afficher les résultats ici */}
          <h2>Résultats:</h2>
          {/* Par exemple, afficher le nombre de questions correctement répondues */}
          <p>Nombre de questions correctes : 5/10</p>
          {/* Ajoutez plus d'informations sur les résultats ici */}
        </div>
      )}

      {!timeIsUp && !showResults && (
        <div>
          <h2>{currentQuestion.question}</h2>
          <h3>Choisissez une réponse :</h3>
          {allAnswers.map((answer, index) => (
            <div key={index}>
              <input
                type="radio"
                name="answer"
                checked={isAnswerSelected(answer)}
                onChange={() => handleAnswerSelection(answer)}
              />
              <label>{answer}</label>
            </div>
          ))}
          <button onClick={handleNextQuestion}>Question suivante</button>
        </div>
      )}
    </div>
  );
}

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default QuestionsReponses;
