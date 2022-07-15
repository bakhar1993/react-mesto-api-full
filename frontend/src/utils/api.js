class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    // тело конструктора
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {  headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }, })
      .then(this._chekingResponse)
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {  headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }, })
      .then(this._chekingResponse)
  }


  setUserInfo({ userData },token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    }).then(this._chekingResponse)
  }

  addCards(dataCard,token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link
      })
    }).then(this._chekingResponse)
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._chekingResponse)

  }
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._chekingResponse)
  }

  deleteCard(cardId,token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._chekingResponse)
  }

  editAvatar(data,token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: data.avatar })
    }).then(this._chekingResponse)
  }
  _chekingResponse(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject(`Ошибка: ${data.status}`);
  }

  changeLikeCardStatus(cardId, isLiked,token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(this._chekingResponse)
  }

}

// const token = localStorage.getItem("token");
const api = new Api({
 baseUrl: 'https://mesto.bakhar1993.nomorepartiesxyz.ru',
//baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }
});

export default api;