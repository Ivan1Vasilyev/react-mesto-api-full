const address = 'https://api.shaloban.students.nomoredomains.club';
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': true,
  origin: 'https://api.shaloban.students.nomoredomains.club',
};
let currentUserId;

const responseHandler = (response) => (response.ok ? response.json() : Promise.reject(response.json()));

export const register = async (userData) => {
  const response = await fetch(`${address}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      origin: address,
    },
    body: JSON.stringify(userData),
  });
  return responseHandler(response);
};

export const login = async (userData) => {
  const response = await fetch(`${address}/signin`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(userData),
    credentials: 'include',
  });
  return responseHandler(response);
};

export const logout = async (_id) => {
  const response = await fetch(`${address}/signout`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ _id }),
    credentials: 'include',
  });
  return responseHandler(response);
};

export const getUserInfo = async () => {
  const res = await fetch(`${address}/users/me`, {
    method: 'GET',
    headers: headers,
    credentials: 'include',
  });

  const response = await responseHandler(res);
  currentUserId = response._id;
  return response;
};

const getDefaultCards = async () => {
  const response = await fetch(`${address}/cards`, {
    method: 'GET',
    headers: headers,
    credentials: 'include',
  });
  return responseHandler(response);
};

export const loadDefaultData = () => Promise.all([getUserInfo(), getDefaultCards()]);

export const editUserData = async (newData) => {
  const response = await fetch(`${address}/users/me`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(newData),
    credentials: 'include',
  });
  return responseHandler(response);
};

export const setUserAvatar = async (link) => {
  const response = await fetch(`${address}/users/me/avatar`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(link),
    credentials: 'include',
  });
  return responseHandler(response);
};

export const addCard = async (card) => {
  const response = await fetch(`${address}/cards`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(card),
    credentials: 'include',
  });
  return responseHandler(response);
};

const addLikeCard = async (id) => {
  const response = await fetch(`${address}/cards/${id}/likes`, {
    method: 'PUT',
    headers: headers,
    credentials: 'include',
  });
  return responseHandler(response);
};

const removeLikeCard = async (id) => {
  const response = await fetch(`${address}/cards/${id}/likes`, {
    method: 'DELETE',
    headers: headers,
    credentials: 'include',
  });
  return responseHandler(response);
};

export const toggleLike = (card) =>
  card.likes.some((user) => user._id === currentUserId) ? removeLikeCard(card._id) : addLikeCard(card._id);

export const deleteCard = async (id) => {
  const response = await fetch(`${address}/cards/${id}`, {
    method: 'DELETE',
    headers: headers,
    credentials: 'include',
  });
  return responseHandler(response);
};
