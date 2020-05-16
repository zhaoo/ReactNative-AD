import actionType from './actionType';

export function loginAction(token, user) {
  return {
    type: actionType.LOGIN,
    token,
    user,
  };
}

export function logoutAction() {
  return {
    type: actionType.LOGOUT,
  };
}

export function userInfoAction(userInfo) {
  return {
    type: actionType.USER_INFO,
    userInfo,
  };
}
