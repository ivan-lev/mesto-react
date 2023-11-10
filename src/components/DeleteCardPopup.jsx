import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, onCardDelete }) {
  function handleDeleteCard(event) {
    event.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteCard}
      title="Вы уверены?"
      name="delete-card"
      submitButtonText="Удалить"
    />
  );
}

export default DeleteCardPopup;
