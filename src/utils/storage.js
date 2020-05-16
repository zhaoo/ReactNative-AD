import {AsyncStorage} from 'react-native';

export async function setItem(key, value) {
  if (value == null) {
    return Promise.reject(
      'StorageService Error: value should not be null or undefined',
    );
  }
  return await AsyncStorage.setItem(key, value);
}

export function getItem(key) {
  return AsyncStorage.getItem(key).then(function(value) {
    return value;
  });
}

export const clear = AsyncStorage.clear;

export async function removeItem(...args) {
  return await AsyncStorage.removeItem(...args);
}

export function multiGet(keys) {
  return AsyncStorage.multiGet(keys).then(results => {
    return results.map(item => {
      return [item[0], item[1]];
    });
  });
}

export function multiRemove(keys) {
  return AsyncStorage.multiRemove(keys);
}
