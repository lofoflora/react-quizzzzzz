import React, { useState, useEffect } from "react";
import he from "he";

const Questions = ({ category, difficulty, type, amount }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const decodedQuestions = data.results.map((question) => {
          return {
            ...question,
            question: he.decode(question.question),
            correct_answer: he.decode(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map((answer) => he.decode(answer)),
          };
        });

        setQuestions(decodedQuestions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [category, difficulty, type, amount]);

  return (
    <div>
      <h2>Quiz Questions</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <h3>{question.question}</h3>
            <ul>
              {question.incorrect_answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
              <li>{question.correct_answer}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
