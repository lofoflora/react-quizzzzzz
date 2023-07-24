import React, { useState, useEffect } from 'react';
import TriviaApi from '../TriviaApi';
import Timer from './Timer';
import EndScreenComponent from './EndScreenComponent';
import LoserResultPage from './LoserResultPage';
import { Link } from 'react-router-dom';

function QuestionsReponses() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

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
      if (answeredQuestions === questions.length - 1) {
        setShowResults(true);
      } else {
        setSelectedAnswer(null);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setAnsweredQuestions((prevCount) => prevCount + 1);
      }
    }
  };

  const handleTimeIsUp = () => {
    setTimeIsUp(true);
    if (answeredQuestions === questions.length - 1) {
      setTimerExpired(true);
    } else {
      setShowResults(false);
    }
  };

  return (
    <div>
      {!timeIsUp && !showResults && (
        <Timer seconds={60} onTimeIsUp={handleTimeIsUp} />
      )}

      {timeIsUp && !showResults && !timerExpired && <EndScreenComponent />}
      {timerExpired && <LoserResultPage />}

      {showResults && !timerExpired && (
        <div>
          <h2>Résultats:</h2>
          <p>Nombre de questions correctes : {answeredQuestions}/{questions.length}</p>
          {/* Utilisation de la balise Link pour rediriger vers la page de résultats */}
          <Link to="/page-de-resultats">Voir les résultats</Link>
        </div>
      )}

      {!timeIsUp && !showResults && !timerExpired && (
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
