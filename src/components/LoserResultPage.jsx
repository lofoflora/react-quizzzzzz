import React from 'react';

const LoserResultPage = ({ correctAnswers, totalQuestions }) => {
  // Mettez ici le contenu de la page des résultats du "loser"
  return (
    <div>
      <h2>Résultats du loser</h2>
      <p>Voici tes résultats de loser :</p>
      <p>Nombre de questions correctes : {correctAnswers}/{totalQuestions}</p>
      <p>Tu as été trop lent, mieux vaut essayer encore !</p>
      {/* Ajoutez le contenu supplémentaire ici */}
    </div>
  );
};

export default LoserResultPage;
