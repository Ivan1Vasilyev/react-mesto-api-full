class Api {
  constructor(settings) {
    this._address = settings.address;
    this._headers = settings.headers;
  }

  _responseHandler = (response) => (response.ok ? response.json() : Promise.reject(response.json()));

  getUserInfo = () =>
    fetch(`${this._address}users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._responseHandler)
      .then((response) => {
        this.id = response._id;
        return response;
      });

  _getDefaultCards = () =>
    fetch(`${this._address}cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then(this._responseHandler);

  loadDefaultData = () => Promise.all([this.getUserInfo(), this._getDefaultCards()]);

  editUserData = (newData) =>
    fetch(`${this._address}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newData),
      credentials: 'include',
    }).then(this._responseHandler);

  setUserAvatar = (link) =>
    fetch(`${this._address}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(link),
      credentials: 'include',
    }).then(this._responseHandler);

  addCard = (card) =>
    fetch(`${this._address}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card),
      credentials: 'include',
    }).then(this._responseHandler);

  _addLikeCard = (id) =>
    fetch(`${this._address}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then(this._responseHandler);

  _removeLikeCard = (id) =>
    fetch(`${this._address}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._responseHandler);

  toggleLike = (card) =>
    card.likes.some((user) => user._id === this.id) ? this._removeLikeCard(card._id) : this._addLikeCard(card._id);

  deleteCard = (id) =>
    fetch(`${this._address}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._responseHandler);
}

export const api = new Api({
  address: 'https://api.shaloban.students.nomoredomains.club/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    origin: 'https://api.shaloban.students.nomoredomains.club',
  },
});
