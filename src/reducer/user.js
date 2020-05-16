import actionType from '~/action/actionType';
import {getToken} from '~/utils/token';
import {getInfo} from '~/api/user';

const initialStore = {
  token: null,
  user: null,
};

getToken().then(async value => {
  initialStore.token = value;
  const res = await getInfo(value);
  initialStore.user = res.data;
});

const user = (state = initialStore, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default user;
