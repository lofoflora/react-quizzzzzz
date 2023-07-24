// Selection.jsx
import React, { useState, useEffect } from "react";
import TriviaApi from "../TriviaApi"; // Importez votre code de connexion à l'API

const Selection = () => {
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

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

  const handleStartButtonClick = async () => {
    // Validate that both category and difficulty have been selected
    if (selectedCategory && selectedDifficulty) {
      try {
        // Récupérer les questions de l'API en utilisant votre code de connexion
        const apiQuestions = await TriviaApi(10, selectedCategory, selectedDifficulty);

        // Rediriger vers la page QuestionsReponses avec les sélections du quiz
        // et les questions récupérées de l'API
        window.location.href = "/questions";
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des questions :", error);
        alert("Une erreur s'est produite lors du démarrage du quiz.");
      }
    } else {
      alert("Veuillez sélectionner une catégorie et une difficulté pour commencer le quiz.");
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

      <button onClick={handleStartButtonClick}>Start Quiz</button>
    </div>
  );
};

export default Selection;
