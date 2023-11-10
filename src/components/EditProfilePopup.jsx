import { React, useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/currentUserContext';
import PopupWithForm from './PopupWithForm.jsx';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

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
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="profile"
      submitButtonText="Сохранить"
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
          value={name || ''}
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
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="popup__error author-about-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
