import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {removeToken, getToken} from '~/utils/token';
import {baseURL} from '~/config';

const service = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

service.interceptors.request.use(
  async config => {
    config.headers['X-Token'] = await getToken();
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log('Response => ', res, '\n');
    if (res.code !== 20000) {
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        removeToken();
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

service.interceptors.request.use(request => {
  console.log('Request => ', request, '\n');
  return request;
});

export default service;
