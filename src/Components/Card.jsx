import React from 'react';

const Card = ({ value, isFlipped, isMatched, onClick }) => {
  return (
    <div
      className={`card ${isFlipped || isMatched ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        {/* Front face: question mark when face-down, hidden when flipped */}
        <div className="card-front">
          {!(isFlipped || isMatched) ? '❓' : ''}
        </div>
        {/* Back face: emoji when flipped */}
        <div className="card-back">{value}</div>
      </div>
    </div>
  );
};

export default Card;