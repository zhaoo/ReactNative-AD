import {getItem, setItem, removeItem} from '~/utils/storage';

const key = 'token';

export async function getToken() {
  return await getItem(key);
}

export async function setToken(token) {
  return await setItem(key, token);
}

export async function removeToken() {
  return await removeItem(key);
}
