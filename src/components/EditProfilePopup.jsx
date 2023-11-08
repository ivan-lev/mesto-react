import React from 'react';

function EditProfilePopup({ isOpen, onClose, ...props }) {
  return (
    <div className={`popup popup_type_profile ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <p className="popup__heading">Редактировать профиль</p>
        <form id="popup__user-form" name="popup_type_profile" className="popup__form" noValidate>
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
            onClick={onClose}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePopup;
