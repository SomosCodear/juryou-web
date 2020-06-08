import unfetch from 'isomorphic-unfetch';
import { API_URL } from '~/data/config';
import { getAuthToken } from './auth';

export const RESOURCES = {
  INVOICE: 'invoice',
};

const DEFAULT_HEADERS = {
  'content-type': 'application/json',
};

const makeHeaders = () => {
  const authToken = getAuthToken();

  return {
    ...DEFAULT_HEADERS,
    authorization: `Bearer ${authToken}`,
  };
};

export const create = async (resource, data) => {
  const url = `${API_URL}/${resource}`;

  const response = await unfetch(url, {
    headers: makeHeaders(),
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response.json();
};
