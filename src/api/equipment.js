import request from '~/api/request';

export function createEquipment(data) {
  return request({
    url: '/equipment/create',
    method: 'post',
    data,
  });
}

export function getEquipmentListByUid() {
  return request({
    url: '/equipment/listByUid',
    method: 'get',
  });
}

export function getEquipmentList(params) {
  return request({
    url: '/equipment/list',
    method: 'get',
    params,
  });
}

export function bindEquipment(data) {
  return request({
    url: '/equipment/bind',
    method: 'post',
    data,
  });
}
