export function setAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

export function getAccessToken() {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
}

export function deleteAccessToken() {
  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('goods');
}

export function parseJwt() {
  try {
    return JSON.parse(atob(getAccessToken().split('.')[1]));
  } catch (e) {
    return null;
  }
}
