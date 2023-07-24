// Selection.jsx
import React, { useState, useEffect } from "react";
import TriviaApi from "../TriviaApi"; // Importez votre code de connexion à l'API
import { motion } from "framer-motion";

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
    }

};

   const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
  }

  return (
    <div>
      <motion.div
        className="container mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="col">
            <h4>Théme</h4>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <h4>Difficulté</h4>
            <select
              className="form-select"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <option value="">Select a difficulty</option>
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div
          className="row mt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="col">
            <h4>Type</h4>
            <select
              className="form-select"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </div>
          <div className="col">
            <h4>Nombre de questions</h4>
            <select
              className="form-select"
              value={selectedAmount}
              onChange={handleAmountChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
        </motion.div>

      <button onClick={handleStartButtonClick}>Start Quiz</button>
        <motion.div
          className="mt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            className="btn btn-info"
            onClick={handleStartButtonClick}
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
          >
            Start Quiz
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Selection;