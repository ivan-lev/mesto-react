import { React, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

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
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      name="card-add"
      submitButtonText="Сохранить"
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
    </PopupWithForm>
  );
}

export default AddPlacePopup;
