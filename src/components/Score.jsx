import React, { useState } from 'react';

const Score = (props) => {

    return (
        <div className="score">
            <h2>Score : {props.value} </h2>
        </div>
    );
};

export default Score;