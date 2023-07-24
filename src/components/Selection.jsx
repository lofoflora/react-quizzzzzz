import React, { useState, useEffect } from "react";

const Selection = ({ onStartQuiz }) => {
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedType, setSelectedType] = useState("multiple");
  const [selectedAmount, setSelectedAmount] = useState("5");

  useEffect(() => {
    // Fetch categories
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Set predefined difficulties
    setDifficulties(["easy", "medium", "hard"]);
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
  };

  const handleStartButtonClick = () => {
    // Validate that all fields have been selected
    if (selectedCategory && selectedDifficulty && selectedType && selectedAmount) {
      onStartQuiz(selectedCategory, selectedDifficulty, selectedType, selectedAmount);
    } else {
      alert("Please select all fields to start the quiz.");
    }
  };

  return (
    <div>
      <h2>Select Category</h2>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <h2>Select Difficulty</h2>
      <select value={selectedDifficulty} onChange={handleDifficultyChange}>
        <option value="">Select a difficulty</option>
        {difficulties.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>

      <h2>Select Type</h2>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True / False</option>
      </select>

      <h2>Select Amount of Questions</h2>
      <select value={selectedAmount} onChange={handleAmountChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>

      <button onClick={handleStartButtonClick}>Start Quiz</button>
    </div>
  );
};

export default Selection;
