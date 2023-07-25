import React from "react";

const EndScreenComponent = () => {
  return (
    <div className="end-screen">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="video-container">
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
              <div className="scrolling-text-content">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndScreenComponent;