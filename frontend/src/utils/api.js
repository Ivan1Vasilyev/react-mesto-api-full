const baseUrl = 'https://moovies.nomoredomains.work';
const headers = { 'Content-Type': 'application/json' };

const responseHandler = response => (response.ok ? response.json() : Promise.reject(response.json()));

export const register = async userData => {
  const response = await fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify(userData),
  });
  return responseHandler(response);
};

export const login = async userData => {
  const response = await fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify(userData),
    credentials: 'include',
  });
  return responseHandler(response);
};

export const logout = async _id => {
  const response = await fetch(`${baseUrl}/signout`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ _id }),
    credentials: 'include',
  });
  return responseHandler(response);
};

export const getUserInfo = async () => {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
  return responseHandler(res);
};

const getDefaultCards = async () => {
  const response = await fetch(`${baseUrl}/cards`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
  return responseHandler(response);
};

export const loadDefaultData = () => Promise.all([getUserInfo(), getDefaultCards()]);

export const editUserData = async newData => {
  const response = await fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(newData),
    credentials: 'include',
  });
  return responseHandler(response);
};

export const setUserAvatar = async link => {
  const response = await fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(link),
    credentials: 'include',
  });
  return responseHandler(response);
};

export const addCard = async card => {
  const response = await fetch(`${baseUrl}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify(card),
    credentials: 'include',
  });
  return responseHandler(response);
};

const addLikeCard = async id => {
  const response = await fetch(`${baseUrl}/cards/${id}/likes`, {
    method: 'PUT',
    headers,
    credentials: 'include',
  });
  return responseHandler(response);
};

const removeLikeCard = async id => {
  const response = await fetch(`${baseUrl}/cards/${id}/likes`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  });
  return responseHandler(response);
};

export const toggleLike = (cardId, isLiked) => (isLiked ? removeLikeCard(cardId) : addLikeCard(cardId));

export const deleteCard = async id => {
  const response = await fetch(`${baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  });
  return responseHandler(response);
};
