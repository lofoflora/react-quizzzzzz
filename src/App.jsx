import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Selection from "./components/Selection";
import QuestionsReponses from "./components/QuestionsReponses";
import "./App.css";
import Header from "./components/Header";
import Score from "./components/Score";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul> */}

        {/* Définir les routes pour afficher les composants */}
        <Routes>
          <Route path="/questions" element={<QuestionsReponses />} />
          <Route path="/" element={<Selection />} />
          <Route path="/score" element={<Score />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
