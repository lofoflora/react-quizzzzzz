import React, { useState } from "react";
import Selection from "./components/Selection";
import Questions from "./components/Questions";

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedType, setSelectedType] = useState("multiple");
  const [selectedAmount, setSelectedAmount] = useState("5");

  const handleStartQuiz = (category, difficulty, type, amount) => {
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);
    setSelectedType(type);
    setSelectedAmount(amount);
    setQuizStarted(true);
  };

  return (
    <div>
      <h1>Quiz App</h1>
      {quizStarted ? (
        <Questions
          category={selectedCategory}
          difficulty={selectedDifficulty}
          type={selectedType}
          amount={selectedAmount}
        />
      ) : (
        <Selection onStartQuiz={handleStartQuiz} />
      )}
    </div>
  );
};

export default App;
