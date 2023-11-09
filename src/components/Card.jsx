import React from 'react';
import CurrentUserContext from '../contexts/currentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDeleteClick, onCardDelete, ...props }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `button cards__like-button ${
    isLiked && 'cards__like-button_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  return (
    <div className="cards__card">
      <img src={card.link} alt="" className="cards__card-image" onClick={handleClick} />
      <div className="cards__description">
        <h2 className="cards__card-title">{card.name}</h2>
        <div className="cards__like-wrapper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="cards__like-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button className="button cards__del-button" onClick={handleDeleteClick} />}
    </div>
  );
}

export default Card;
