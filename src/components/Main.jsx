import React from 'react';
import api from '../utils/api.js';
import Card from './Card.jsx';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, ...props }) {
  const [userName, setUserName] = React.useState('Имя пользователя');
  const [userDescription, setUserDescription] = React.useState('Описание пользователя');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(response => setCards(response))
      .catch(error => console.error('Ошибка в api-запросе: ', error));
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(response => {
        setUserName(response.name);
        setUserDescription(response.about);
        setUserAvatar(response.avatar);
      })
      .catch(error => console.error('Ошибка в api-запросе: ', error));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <div className="profile__avatar-hover"></div>
          <img className="profile__avatar-image" src={userAvatar} alt="Аватар пользователя" />
        </div>
        <div className="profile__info">
          <h1 className="profile__username">{userName}</h1>
          <button
            type="button"
            className="button profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{userDescription}</p>
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
          <Card key={card._id} onCardClick={onCardClick} card={card} />
        ))}
      </section>
      {props.children}
    </main>
  );
}

export default Main;
