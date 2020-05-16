import request from '~/api/request';
export function getShuffingList() {
  return request({
    url: '/config/shuffingList',
    method: 'get',
  });
}

export function getActivityList(params) {
  return request({
    url: '/activity/list',
    method: 'get',
    params,
  });
}
