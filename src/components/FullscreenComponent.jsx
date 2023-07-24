import React, { useRef, useEffect, useState } from 'react';

const FullscreenComponent = () => {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      // Vérifier si la vidéo est proche de la fin (à 0.1 seconde près)
      if (video.duration - video.currentTime <= 0.1) {
        setVideoEnded(true);
        video.pause(); // Mettre la vidéo en pause à la fin
      }
    };

    // Lorsque le composant est monté, ajustez la taille de la vidéo
    if (video) {
      video.play(); // Démarrez la lecture automatiquement
      video.style.width = '250%'; // Agrandissez l'image de 250%
      video.style.height = '250%';
      video.playbackRate = 1.5; // Multipliez la vitesse de lecture par 1.5

      // Ajoutez l'événement pour détecter la fin de la vidéo
      video.addEventListener('timeupdate', handleTimeUpdate);
    }

    // Nettoyez l'événement lorsque le composant est démonté
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  const handleButtonAction = () => {
    // Rediriger vers la page de résultat du loser lorsque le bouton est cliqué
    // Remplacez '/loser-result' par l'URL de la page de résultat du loser que vous souhaitez utiliser
    window.location.href = '/loser-result';
  };

  return (
    <div className="fullscreen-container">
      {/* Insérer la vidéo ici */}
      {!videoEnded && (
        <video autoPlay muted ref={videoRef} className="video-container">
          <source src="src/assets/explosion.mp4" type="video/mp4" />
          {/* Ajouter d'autres sources vidéo pour la compatibilité avec différents formats */}
        </video>
      )}
      {videoEnded && (
        <div className="video-overlay">
          <div className="centered-content">
            <p style={{ fontSize: '150%' }}>Et voilà, tu n'as pas été assez rapide ! <br />
            A cause de toi, la planète et <br />
            toute l'humanité ont été détruites. <br />
            Mais si tu veux voir ton résultat de loser, <br />
            clique ici :</p>
            <button onClick={handleButtonAction}>Résultat du loser</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullscreenComponent;
