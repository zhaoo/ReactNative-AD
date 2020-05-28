import request from '~/api/request';

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {token},
    headers: {
      'X-Token': token,
    },
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
    data: {},
  });
}

export function updatePassword(data) {
  return request({
    url: '/user/password',
    method: 'post',
    data,
  });
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  });
}

export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data,
  });
}

export function authentication(data) {
  return request({
    url: '/authentication/update',
    method: 'post',
    data,
  });
}

export function sendSmsCode(data) {
  return request({
    url: '/code/register',
    method: 'post',
    data,
  });
}

export function alipayAuth() {
  return request({
    url: '/auth/alipay',
    method: 'post',
    data: {},
  });
}

export function authInfo() {
  return request({
    url: '/auth/info',
    method: 'get',
  });
}
