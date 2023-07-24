// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Selection from "./components/Selection";
import QuestionsReponses from "./components/QuestionsReponses";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Quiz App</h1>

        {/* Liens pour naviguer entre les pages */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        {/* Définir les routes pour afficher les composants */}
        <Routes>
          <Route path="/questions" element={<QuestionsReponses />} />
          <Route path="/" element={<Selection />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
