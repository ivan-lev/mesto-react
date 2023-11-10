import React from 'react';

function DeleteCardPopup({ isOpen, onClose, onCardDelete }) {
  function handleDeleteCard(event) {
    event.preventDefault();
    onCardDelete();
  }

  return (
    <div className={`popup popup_type_delete-card  ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <p className="popup__heading">Вы уверены?</p>
        <form
          id="popup__user-form"
          name="popup_type_delete-card"
          className="popup__form"
          onSubmit={handleDeleteCard}
        >
          <button type="submit" className="button popup__save-user-data popup__submit-button">
            Удалить
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

export default DeleteCardPopup;
