import React from 'react';

function PopupWithForm({ title, name, isOpen, onClose, ...props }) {
  return (
    <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
      <div className="popup__container">
        <p className="popup__heading">{title}</p>
        <form id="popup__user-form" name={`popup_type_${name}`} className="popup__form" noValidate>
          {props.children}
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

export default PopupWithForm;
