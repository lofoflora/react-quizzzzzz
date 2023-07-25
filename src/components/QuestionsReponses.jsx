import React, { useState, useEffect } from "react";
import TriviaApi from "../TriviaApi";
import Timer from "./Timer";
import EndScreenComponent from "./EndScreenComponent";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import de Link
import Score from "./Score"; // Assurez-vous d'importer correctement le composant Score

function QuestionsReponses() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Ajout du state pour compter les réponses correctes
  const [scoreData, setScoreData] = useState(null); // Nouvel état pour stocker les résultats du score

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const apiQuestions = await TriviaApi(10, 9, "medium");
        setQuestions(apiQuestions);
      } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
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

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);

    // Vérifiez la réponse et mettez à jour le nombre de réponses correctes
    if (answer === currentQuestion.correct_answer) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
  };

  const isAnswerSelected = (answer) => selectedAnswer === answer;

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      if (answeredQuestions === questions.length - 1) {
        // Mettre à jour l'état scoreData avec les résultats du score
        setScoreData({
          correctAnswers: correctAnswersCount,
          totalQuestions: questions.length,
        });
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
    setShowResults(false);
  };

  return (
    <div className="container mt-5">
      {!timeIsUp && !showResults && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <Timer seconds={60} onTimeIsUp={handleTimeIsUp} />
        </motion.div>
      )}

      {timeIsUp && !showResults && <EndScreenComponent />}

      {/* Supprimez cette partie qui affiche les résultats ici, car nous redirigeons l'utilisateur vers la page du score */}
      {/* {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <h2>Résultats :</h2>
          <p>Nombre de questions correctes : {correctAnswersCount}/{questions.length}</p>
        </motion.div>
      )} */}

      {!timeIsUp && !showResults && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <h5>{currentQuestion.question}</h5>
          {allAnswers.map((answer, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Remplacez les boutons radio par des boutons Bootstrap */}
              <button
                className={`btn btn-outline-light ${
                  isAnswerSelected(answer) ? "active" : ""
                }`}
                onClick={() => handleAnswerSelection(answer)}
              >
                {answer}
              </button>
            </motion.div>
          ))}
          <motion.button
  className="btn btn-info mt-3"
  onClick={handleNextQuestion}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  style={{ color: 'white' }}
>
  Question suivante
</motion.button>

        </motion.div>
      )}

      {showResults && scoreData && (
        <Link to={{ pathname: "/score", state: { scoreData } }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
          >
            <p>
              Nombre de questions correctes : {scoreData.correctAnswers}/
              {scoreData.totalQuestions}
            </p>
          </motion.div>
        </Link>
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
