import React from 'react';

function Card({ card, onCardClick, ...props }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="cards__card">
      <img src={card.link} alt="" className="cards__card-image" onClick={handleClick} />
      <div className="cards__description">
        <h2 className="cards__card-title">{card.name}</h2>
        <div className="cards__like-wrapper">
          <button type="button" className="button cards__like-button"></button>
          <span className="cards__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button type="button" className="button cards__del-button" />
    </div>
  );
}

export default Card;
