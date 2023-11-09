import './App.css';
import React from 'react';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/currentUserContext.js';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import CurrentYear from './CurrentYear.jsx';

import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      document.addEventListener('keyup', handleEscClose);
    }

    return () => {
      document.removeEventListener('keyup', handleEscClose);
    };
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(response => setCurrentUser(response))
      .catch(error => console.error('Ошибка получения информации о пользователе: ', error));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(response => setCards(response))
      .catch(error => console.error('Ошибка получения карточек: ', error));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = card => {
    setSelectedCard(card);
  };

  const handleEscClose = event => {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.handleLikeRequest(card._id, !isLiked).then(newCard => {
      setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
    });
  };

  const handleCardDelete = card => {
    api.deleteCard(card._id);
    const cardsFiltered = cards.filter(cardToCheck => {
      return cardToCheck._id !== card._id;
    });
    setCards(cardsFiltered);
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserInfo(name, about)
      .then(response => setCurrentUser(response))
      .catch(error => console.error('Ошибка сохранения данных пользователся: ', error));
    closeAllPopups();
  };

  const handleUpdateAvatar = link => {
    api
      .setUserAvatar(link)
      .then(response => setCurrentUser(response))
      .catch(error => console.error('Ошибка сохранения аватара пользователся: ', error));
    closeAllPopups();
  };

  const handleAddPlaceSubmit = (placeName, placePhoto) => {
    api
      .setNewPlace(placeName, placePhoto)
      .then(response => setCards([response, ...cards]))
      .catch(error => console.error('Ошибка добавления нового места: ', error));
    closeAllPopups();
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          setCards={setCards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        >
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm name="delete-card" title="Вы уверены?" onClose={closeAllPopups} />

          <ImagePopup
            name={selectedCard?.name}
            link={selectedCard?.link}
            onClose={closeAllPopups}
          />
        </Main>
        <Footer>
          <CurrentYear />
        </Footer>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
