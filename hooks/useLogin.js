/* globals window */
import queryString from 'query-string';
import { DateTime } from 'luxon';
import { AUTH_TOKEN_KEY, AUTH_EXPIRES_KEY } from '~/data/constants';
import { IDP_URL } from '~/data/config';

export const useLogin = () => {
  if (typeof window !== 'undefined') {
    let authToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
    let authExpires = window.localStorage.getItem(AUTH_EXPIRES_KEY);

    if (window.location.hash !== '') {
      const hash = queryString.parse(window.location.hash.slice(1));
      const { id_token: idToken, expires_in: expiresIn } = hash;
      window.history.replaceState(null, null, ' ');

      authToken = idToken;
      authExpires = DateTime.utc().plus({ seconds: expiresIn }).toISO();

      window.localStorage.setItem(AUTH_TOKEN_KEY, authToken);
      window.localStorage.setItem(AUTH_EXPIRES_KEY, authExpires);
    }

    if (authToken == null || DateTime.fromISO(authExpires) <= DateTime.utc()) {
      window.location = IDP_URL;
    }
  }
};
