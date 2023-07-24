import React, { useState, useEffect } from "react";
import TriviaApi from "../TriviaApi";

function QuestionsReponses() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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

  const handleAnswerSelection = (answer) => setSelectedAnswer(answer);
  const isAnswerSelected = (answer) => selectedAnswer === answer;
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
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