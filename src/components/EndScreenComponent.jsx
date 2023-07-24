import React from 'react';

const EndScreenComponent = () => {
  return (
    <div className="end-screen">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="video-container">
              {/* Remplacez le lien de la vidéo par le lien de votre vidéo */}
              <iframe
                title="EndScreenVideo"
                src="src/assets/explosion.mp4"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="scrolling-text">
              {/* Insérez ici le texte défilant */}
              {/* Par exemple : */}
              <p>C'est la fin de la vidéo...</p>
              <p>Remplissez le reste du texte ici...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndScreenComponent;
