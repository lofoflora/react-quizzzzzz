import React from "react";
import { motion } from "framer-motion";

function Score({ location }) {
  const scoreData = location.state?.scoreData; // Utilisez l'opérateur de coalescence nulle pour éviter les erreurs si scoreData est indéfini

  if (!scoreData) {
    // Gérez le cas où les données du score ne sont pas disponibles
    return <p>Erreur lors de la récupération des résultats du score.</p>;
  }

  const { correctAnswers, totalQuestions } = scoreData;
  const scorePercentage = (correctAnswers / totalQuestions) * 100;

  return (
    <div className="container mt-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card text-center">
          <div className="card-header">
            <h2>Résultats du Quiz</h2>
          </div>
          <div className="card-body">
            <h4 className="card-title">
              Vous avez répondu correctement à{" "}
              <span className="text-success">{correctAnswers}</span> question
              {correctAnswers !== 1 ? "s" : ""}
              {" sur "}
              <span className="text-primary">{totalQuestions}</span>.
            </h4>
            <div className="progress mt-4">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${scorePercentage}%` }}
                aria-valuenow={scorePercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {scorePercentage.toFixed(1)}%
              </div>
            </div>
            <p className="mt-2">
              Votre score :{" "}
              <span className="text-primary">
                {scorePercentage.toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Score;
