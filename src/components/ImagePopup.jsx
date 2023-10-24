import React from 'react';

function ImagePopup({ name, link, onClose, ...props }) {
  return (
    <div className={`popup popup_photo-window ${link ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_photo-container">
        <figure className="popup__figure">
          <img className="popup__photo" src={link} alt={name} />
          <figcaption className="popup__figcaption">{name}</figcaption>
        </figure>

        <button
          id="close-photo-window-button"
          type="button"
          className="button popup__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
