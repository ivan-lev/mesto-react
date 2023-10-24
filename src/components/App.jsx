import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import { CurrentYear } from '../utils/utils.jsx';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = card => {
    setSelectedCard(card);
  };

  const handleEscClose = event => {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  };

  const handleClickClose = event => {
    if (
      event.target.classList.contains('popup_opened') ||
      event.target.classList.contains('popup__close-button')
    ) {
      closeAllPopups();
    }
  };

  if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mouseup', handleClickClose);
  } else {
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('mouseup', handleClickClose);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      >
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
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
        </PopupWithForm>

        <PopupWithForm
          name="card-add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
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
        </PopupWithForm>

        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
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
        </PopupWithForm>

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup name={selectedCard?.name} link={selectedCard?.link} onClose={closeAllPopups} />
      </Main>
      <Footer>
        <CurrentYear />
      </Footer>
    </div>
  );
}

export default App;
