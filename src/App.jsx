import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Selection from "./components/Selection";
import QuestionsReponses from "./components/QuestionsReponses";
import FullscreenComponent from "./components/FullscreenComponent"; // Importez le composant FullscreenComponent
import LoserResultPage from './components/LoserResultPage.jsx';
import Header from "./components/Header";


const App = () => {
  return (
    
    <Router>
    
      <div>
      <Header/>
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
          <Route path="/fullscreen" element={<FullscreenComponent />} /> {/* Route pour le composant FullscreenComponent */}
          <Route path="/loser-result" element={<LoserResultPage />} /> {/* Route pour la page de résultat du loser */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
