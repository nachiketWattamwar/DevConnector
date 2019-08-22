import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  token: localStorage.getItem("token"),
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        ...action.payload
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
}
