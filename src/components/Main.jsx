import React from 'react';
import api from '../utils/api.js';
import Card from './Card.jsx';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, ...props }) {
  const [userName, setUserName] = React.useState('Имя пользователя');
  const [userDescription, setUserDescription] = React.useState('Описание пользователя');
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards().then(response => setCards(response));
  }, []);

  React.useEffect(() => {
    api.getUserInfo().then(response => {
      setUserName(response.name);
      setUserDescription(response.about);
      setUserAvatar(response.avatar);
    });
  }, [userName, userDescription, userAvatar]);

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

{
  /* <div id="popup-edit-profile" className="popup popup_type_profile">
        <div className="popup__container">
          <p className="popup__heading">Редактировать профиль</p>
          <form id="popup__user-form" name="popup__user-form" className="popup__form" noValidate>
            <fieldset className="popup__fieldset">
              <input
                type="text"
                id="author-name"
                placeholder="Имя"
                name="author-name"
                className="popup__input popup__input_type_name"
                required
                minLength="2"
                maxLength="40"
              />
              <span className="popup__error author-name-error"></span>
            </fieldset>
            <fieldset className="popup__fieldset">
              <input
                type="text"
                id="author-about"
                placeholder="Описание"
                name="author-about"
                className="popup__input popup__input_type_description"
                required
                minLength="2"
                maxLength="200"
              />
              <span className="popup__error author-about-error"></span>
            </fieldset>
            <button type="submit" className="button popup__save-user-data popup__submit-button">
              Сохранить
            </button>

            <button
              id="close-edit-user-button"
              type="button"
              className="button popup__close-button"
            ></button>
          </form>
        </div>
      </div> */
}

{
  /* <div id="place-add-popup-window" className="popup popup_type_card-add">
        <div className="popup__container">
          <p className="popup__heading">Новое место</p>
          <form id="popup__photo-form" name="popup__photo-form" className="popup__form" noValidate>
            <fieldset className="popup__fieldset">
              <input
                type="text"
                placeholder="Название"
                id="photo-name"
                name="photo-name"
                className="popup__input popup__input_type_photo-title"
                required
                minLength="2"
                maxLength="30"
              />
              <span className="popup__error photo-name-error"></span>
            </fieldset>
            <fieldset className="popup__fieldset">
              <input
                type="url"
                placeholder="Ссылка на картинку"
                id="photo-link"
                name="photo-link"
                className="popup__input popup__input_type_photo-link"
                required
              />
              <span className="popup__error photo-link-error"></span>
            </fieldset>
            <button
              type="submit"
              className="button popup__add-photo-button popup__submit-button popup__submit-button_disabled"
              disabled
            >
              Создать
            </button>
          </form>
          <button
            id="close-photo-add-button"
            type="button"
            className="button popup__close-button"
          ></button>
        </div>
      </div> */
}

{
  /* <div className="popup popup_photo-window popup_type_picture">
        <div className="popup__container popup__container_photo-container">
          <figure className="popup__figure">
            <img className="popup__photo" src="#" alt="alt here" />
            <figcaption className="popup__figcaption"></figcaption>
          </figure>

          <button
            id="close-photo-window-button"
            type="button"
            className="button popup__close-button"
          ></button>
        </div>
      </div> */
}

{
  /* <div className="popup popup_type_edit-avatar">
        <div className="popup__container">
          <p className="popup__heading">Обновить аватар</p>
          <form
            id="popup__edit-avatar-form"
            name="popup__edit-avatar-form"
            className="popup__form"
            noValidate
          >
            <fieldset className="popup__fieldset">
              <input
                type="url"
                placeholder="Ссылка на аватарку"
                id="avatar-photo-link"
                name="avatar-photo-link"
                className="popup__input popup__input_type_avatar-photo-link"
                required
              />
              <span className="popup__error avatar-photo-link-error"></span>
            </fieldset>
            <button
              type="submit"
              className="button popup__edit-avatar-button popup__submit-button popup__submit-button_disabled"
              disabled
            >
              Сохранить
            </button>
          </form>
          <button
            id="close-edit-avatar-button"
            type="button"
            className="button popup__close-button"
          ></button>
        </div>
      </div> */
}

{
  /* <div className="popup popup_type_delete-card">
        <div className="popup__container">
          <p className="popup__heading">Вы уверены?</p>
          <button type="button" className="button popup__confirm-card-delete popup__submit-button">
            Да
          </button>
          <button
            id="close-delete-card-button"
            type="button"
            className="button popup__close-button"
          ></button>
        </div>
      </div> */
}
