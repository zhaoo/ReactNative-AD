import request from '~/api/request';

export function sign() {
  return request({
    url: '/auth/sign',
    method: 'get',
  });
}
