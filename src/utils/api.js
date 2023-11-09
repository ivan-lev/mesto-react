class Api {
  constructor(baseUrl, token, refreshLikesCount) {
    this._baseUrl = baseUrl;
    this._token = token;
    this.refreshLikesCount = refreshLikesCount;
    this.handleLikeRequest = this.handleLikeRequest.bind(this);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(res => this._checkResponseStatus(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(res => this._checkResponseStatus(res));
  }

  setUserInfo(newName, newAbout) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    }).then(res => this._checkResponseStatus(res));
  }

  setNewPlace(placeName, placePhoto) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: placeName,
        link: placePhoto
      }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(res => this._checkResponseStatus(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res;
    });
  }

  _addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    }).then(res => this._checkResponseStatus(res));
  }

  _deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(res => this._checkResponseStatus(res));
  }

  handleLikeRequest(cardId, isLiked) {
    return isLiked ? this._addLike(cardId) : this._deleteLike(cardId);
  }

  setUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    }).then(res => this._checkResponseStatus(res));
  }

  _checkResponseStatus(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}
const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-72',
  '68333b4f-3010-4a3d-9689-ccc9befca82f'
);

export default api;
