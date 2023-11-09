import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
    avatarRef.current.value = '';
  }
  return (
    <div className={`popup popup_type_edit-avatar ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <p className="popup__heading">Обновить аватар</p>
        <form
          id="popup__user-form"
          name={`popup_type_edit-avatar`}
          className="popup__form"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="popup__fieldset">
            <input
              type="url"
              placeholder="Ссылка на аватарку"
              id="avatar-photo-link"
              name="avatar-photo-link"
              className="popup__input popup__input_type_avatar-photo-link"
              required
              ref={avatarRef}
            />
            <span className="popup__error avatar-photo-link-error"></span>
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

export default EditAvatarPopup;
