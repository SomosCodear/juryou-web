/* globals window */
import queryString from 'query-string';
import { DateTime } from 'luxon';
import { IDP_URL } from '~/data/config';
import {
  getAuthToken,
  setAuthToken,
  getAuthExpires,
  setAuthExpires,
} from '~/api/auth';

export const useLogin = () => {
  if (typeof window !== 'undefined') {
    let authToken = getAuthToken();
    let authExpires = getAuthExpires();

    if (window.location.hash !== '') {
      const hash = queryString.parse(window.location.hash.slice(1));
      const { id_token: idToken, expires_in: expiresIn } = hash;
      window.history.replaceState(null, null, ' ');

      authToken = idToken;
      authExpires = DateTime.utc().plus({ seconds: expiresIn }).toISO();

      setAuthToken(authToken);
      setAuthExpires(authExpires);
    }

    if (authToken == null || DateTime.fromISO(authExpires) <= DateTime.utc()) {
      window.location = IDP_URL;
    }
  }
};
