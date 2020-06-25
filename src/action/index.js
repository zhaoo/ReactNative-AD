import {ToastAndroid} from 'react-native';
import store from '~/store';
import {loginAction, logoutAction} from './actionCreator';
import {setToken, removeToken, getToken} from '~/utils/token';
import {login, logout, getInfo} from '~/api/user';

export async function fetchLogin(params, navigation) {
  const res = await login(params);
  const {token} = res.data;
  if (token) {
    setToken(token);
    const info = await getInfo(token);
    const user = info.data;
    store.dispatch(loginAction(token, user));
    ToastAndroid.show(res.message, ToastAndroid.SHORT);
    navigation.navigate('My');
  }
}

export async function fetchLogout(navigation) {
  const res = await logout();
  removeToken();
  store.dispatch(logoutAction());
  ToastAndroid.show(res.message, ToastAndroid.SHORT);
  navigation.navigate('My');
}

export async function fetchUserInfo() {
  const token = await getToken();
  const res = await getInfo(token);
  const user = res.data;
  store.dispatch(loginAction(token, user));
}
