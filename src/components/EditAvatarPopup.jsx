import { React, useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.jsx';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen]);

  const handleSubmit = event => {
    event.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="edit-avatar"
      submitButtonText="Сохранить"
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
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
