class Api {
  constructor(baseUrl, token, refreshLikesCount) {
    this._baseUrl = baseUrl;
    this._token = token;
    this.refreshLikesCount = refreshLikesCount;
    this.handleLikeRequest = this.handleLikeRequest.bind(this);
  }

  // 01. ��������� ���������� � ������������
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(res => this._checkResponseStatus(res));
  }

  // 02. �������� ������� ��������
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(res => this._checkResponseStatus(res));
  }

  // 03. ���������� ����� ���������� � ������������
  setInfo(newName, newAbout) {
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

  // 04. ���������� ����� ��������
  setCard({ cardName, cardLink }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(res => this._checkResponseStatus(res));
  }

  // 07. �������� ��������
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(res => {
      if (!res.ok) {
        return Promise.reject(`������: ${res.status}`);
      }
      return res;
    });
  }

  // 08.1 ��������� ���� ��������
  _addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    }).then(res => this._checkResponseStatus(res));
  }

  // 08.2 ����� ���� � ��������
  _deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(res => this._checkResponseStatus(res));
  }

  // 08.03 ���������� �������
  handleLikeRequest(cardId, isLiked) {
    return isLiked ? this._addLike(cardId) : this._deleteLike(cardId);
  }

  // 09. �������� ������
  setAvatar(link) {
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
      return Promise.reject(`������: ${res.status}`);
    }
    return res.json();
  }
}
const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-72',
  '68333b4f-3010-4a3d-9689-ccc9befca82f'
);

export default api;
