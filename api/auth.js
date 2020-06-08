/* globals window */
const AUTH_TOKEN_KEY = 'auth-token';
const AUTH_EXPIRES_KEY = 'auth-expires';

export const getAuthToken = () => window.localStorage.getItem(AUTH_TOKEN_KEY);
export const setAuthToken = (authToken) => window.localStorage.setItem(AUTH_TOKEN_KEY, authToken);
export const getAuthExpires = () => window.localStorage.getItem(AUTH_EXPIRES_KEY);
export const setAuthExpires = (authExpires) => window.localStorage.setItem(
  AUTH_EXPIRES_KEY,
  authExpires,
);
