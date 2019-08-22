import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState = {
  isAuthenticated: null,
  token: localStorage.getItem("token"),
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      console.log("inside register success");
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        ...action.payload
      };

    case REGISTER_FAIL:
      console.log("inside register success");
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
}
