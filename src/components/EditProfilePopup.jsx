import { React, useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/currentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <div className={`popup popup_type_profile ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <p className="popup__heading">Редактировать профиль</p>
        <form
          id="popup__user-form"
          name="popup_type_profile"
          className="popup__form"
          noValidate
          onSubmit={handleSubmit}
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
              value={name}
              onChange={handleChangeName}
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
              value={description}
              onChange={handleChangeDescription}
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
            onClick={onClose}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePopup;
