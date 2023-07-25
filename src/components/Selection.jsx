import React, { useState, useEffect } from "react";
import TriviaApi from "../TriviaApi";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
    setDifficulties(["Facile", "Moyen", "Difficile"]);
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
        const apiQuestions = await TriviaApi(
          10,
          selectedCategory,
          selectedDifficulty
        );

        // Rediriger vers la page QuestionsReponses avec les sélections du quiz
        // et les questions récupérées de l'API
        window.location.href = "/questions";
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des questions :",
          error
        );
        alert("Une erreur s'est produite lors du démarrage du quiz.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {" "}
        {/* Centrer les colonnes */}
        <div className="col-md-6">
          <h4 className="text-center">Thème</h4> {/* Centrer le texte */}
          <select
            className="form-select form-select-lg mb-3"
            style={{ backgroundColor: "white" }}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Thème
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <h4 className="text-center">Difficulté</h4> {/* Centrer le texte */}
          <select
            className="form-select form-select-lg mb-3"
            style={{ backgroundColor: "white" }}
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
          >
            <option value="" disabled>
              Difficulté
            </option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 d-flex justify-content-center">
        {" "}
        {/* Centrer le bouton */}
        <motion.button
          className="btn btn-info btn-lg"
          onClick={handleStartButtonClick}
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
          style={{ color: 'white' }}
        >
          Start
        </motion.button>
      </div>
    </div>
  );
};

export default Selection;