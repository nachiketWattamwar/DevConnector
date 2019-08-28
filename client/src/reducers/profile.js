import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_ALL_PROFILES,
  GET_GITHUB_REPOS
} from "../actions/types";
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GITHUB_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case CLEAR_PROFILE:
      return { ...state, loading: false, profile: null, repos: [] };
    default:
      return state;
  }
}
