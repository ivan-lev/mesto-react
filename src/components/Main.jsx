import React from 'react';
import Card from './Card.jsx';
import CurrentUserContext from '../contexts/currentUserContext.js';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  setCards,
  onCardClick,
  onCardLike,
  onCardDelete,
  ...props
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <div className="profile__avatar-hover"></div>
          <img
            className="profile__avatar-image"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__username">{currentUser.name}</h1>
          <button
            type="button"
            className="button profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          id="open-popup-add-photo-button"
          type="button"
          className="button profile__add-photo-button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards">
        {cards.map(card => (
          <Card
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            card={card}
          />
        ))}
      </section>
      {props.children}
    </main>
  );
}

export default Main;
