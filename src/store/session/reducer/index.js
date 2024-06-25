import { ACTION_TYPES } from '../types/index';
import * as localStorage from '../../../utils/helper/localstorage';

function getDefaultState() {
  //FETCH ALL SESSION PROPERTIES FROM LOCAL STORAGE TO AFFECT STORE
  return {
    token: localStorage.getLocalStorageItem('token') || undefined,
    isAuthenticated:
      localStorage.getLocalStorageItem('isAuthenticated') === 'true' || false,
    fullname: localStorage.getLocalStorageItem('fullname') || '',
    roles: localStorage.getLocalStorageItem('roles') || '',
    isLoading: false,
  };
}

function addAuthDetailsToLocalStorage(token, fullname, roles) {
  localStorage.setLocalStorageItem('token', token);
  localStorage.setLocalStorageItem('isAuthenticated', !!token);
  localStorage.setLocalStorageItem('fullname', fullname);
  localStorage.setLocalStorageItem('roles', roles);
}
const session = (state = getDefaultState(), action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTH_LOGIN_FULFILLED: {
      let token = action.payload?.token;
      let fullname = action.payload?.fullname;
      let roles = action.payload?.roles;
      addAuthDetailsToLocalStorage(token, fullname, roles);

      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: undefined,
        token: token,
        fullname: fullname,
        roles: roles,
      };
    }
    case ACTION_TYPES.AUTH_LOGIN_REJECTED: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: { message: 'Authentication Failed', showError: true },
        token: '',
        fullname: '',
        roles: '',
      };
    }

    case ACTION_TYPES.AUTH_LOGOUT_FULFILLED: {
      localStorage.clearAll();
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: '',
        error: undefined,
        fullname: '',
        roles: '',
      };
    }

    case ACTION_TYPES.SHOW_LOADER: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ACTION_TYPES.HIDE_LOADER: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default session;
