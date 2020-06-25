import request from '~/api/request';
export function createOrder(data) {
  return request({
    url: '/order/create',
    method: 'post',
    data,
  });
}

export function getOrder(orderId) {
  return request({
    url: '/order/' + orderId,
    method: 'get',
  });
}

export function payNotify(orderId) {
  return request({
    url: '/pay/' + orderId,
    method: 'get',
  });
}

export function getOrderList(params) {
  return request({
    url: '/order/list',
    method: 'get',
    params,
  });
}

export function refundOrder(orderId, data) {
  return request({
    url: '/pay/refund/' + orderId,
    method: 'post',
    data,
  });
}

export function deleteOrder(orderId) {
  return request({
    url: '/order/' + orderId,
    method: 'delete',
  });
}

export function getPrice() {
  return request({
    url: '/system/revenue',
    method: 'get',
  });
}
