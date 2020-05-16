import request from '~/api/request';

export function getGuideList() {
  return request({
    url: '/config/guideList',
    method: 'get',
  });
}

export function getWelcome() {
  return request({
    url: '/config/welcome',
    method: 'get',
  });
}
