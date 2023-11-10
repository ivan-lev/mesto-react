import { React, useState, useEffect } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [placeName, setPlaceName] = useState('');
  const [placePhoto, setPlacePhoto] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setPlaceName('');
      setPlacePhoto('');
    }
  }, [isOpen]);

  const handlePlaceName = event => {
    setPlaceName(event.target.value);
  };

  const handlePlacePhoto = event => {
    setPlacePhoto(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAddPlace(placeName, placePhoto);
  };

  return (
    <div className={`popup popup_type_card-add  ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <p className="popup__heading">Новое место</p>
        <form
          id="popup__user-form"
          name="popup_type_card-add"
          className="popup__form"
          onSubmit={handleSubmit}
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
              value={placeName}
              onChange={handlePlaceName}
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
              value={placePhoto}
              onChange={handlePlacePhoto}
            />
            <span className="popup__error photo-link-error"></span>
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

export default AddPlacePopup;
