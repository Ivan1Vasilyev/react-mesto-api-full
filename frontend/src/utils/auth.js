const baseUrl = 'https://api.shaloban.students.nomoredomains.club';

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(res.json()));

export const register = async (userData) => {
  const response = await fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      origin: baseUrl,
    },
    body: JSON.stringify(userData),
  });
  return checkResponse(response);
};

export const login = async (userData) => {
  const response = await fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      origin: baseUrl,
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(userData),
  });
  console.log(response.headers);
  return checkResponse(response);
};

export const checkToken = async (token) => {
  const response = await fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      origin: baseUrl,
      'Access-Control-Allow-Credentials': true,
    },
  });
  return checkResponse(response);
};
