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
