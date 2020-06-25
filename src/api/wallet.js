import request from '~/api/request';

export function profit() {
  return request({
    url: '/wallet/profit',
    method: 'get',
  });
}

export function withdraw(data) {
  return request({
    url: '/wallet/withdraw',
    method: 'post',
    data,
  });
}

export function details(data) {
  return request({
    url: '/wallet/details',
    method: 'get',
    data,
  });
}
