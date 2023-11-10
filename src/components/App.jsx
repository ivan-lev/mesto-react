import './App.css';
import { React, useState, useEffect } from 'react';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/currentUserContext.js';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import CurrentYear from './CurrentYear.jsx';

import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import DeleteCardPopup from './DeleteCardPopup.jsx';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard ||
      isCardDeletePopupOpen
    ) {
      document.addEventListener('keyup', handleEscClose);
    }

    return () => {
      document.removeEventListener('keyup', handleEscClose);
    };
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isCardDeletePopupOpen,
    selectedCard
  ]);

  useEffect(() => {
    api
      .getUserInfo()
      .then(response => setCurrentUser(response))
      .catch(error => console.error('Ошибка получения информации о пользователе: ', error));
  }, []);

  useEffect(() => {
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

  const handleDeleteButtonClick = card => {
    setIsCardDeletePopupOpen(true);
    setCardToDelete(card);
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
    setIsCardDeletePopupOpen(false);
    if (selectedCard) {
      setSelectedCard(null);
    }
    if (cardToDelete) {
      setCardToDelete({});
    }
  };

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .handleLikeRequest(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(error => console.error('Лайк не поставился, произошла ошибка: ', error));
  };

  const handleCardDeleteWithPopup = () => {
    api
      .deleteCard(cardToDelete._id)
      .then(response => {
        const cardsFiltered = cards.filter(cardToCheck => {
          return cardToCheck._id !== cardToDelete._id;
        });
        setCards(cardsFiltered);
        closeAllPopups();
      })
      .catch(error => console.error('Карточка не удалилась, ошибка: ', error));
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserInfo(name, about)
      .then(response => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch(error => console.error('Ошибка сохранения данных пользователся: ', error));
  };

  const handleUpdateAvatar = link => {
    api
      .setUserAvatar(link)
      .then(response => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch(error => console.error('Ошибка сохранения аватара пользователся: ', error));
  };

  const handleAddPlaceSubmit = (placeName, placePhoto) => {
    api
      .setNewPlace(placeName, placePhoto)
      .then(response => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.error('Ошибка добавления нового места: ', error));
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
          onCardDeleteClick={handleDeleteButtonClick}
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

          <DeleteCardPopup
            isOpen={isCardDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDeleteWithPopup}
          />
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
