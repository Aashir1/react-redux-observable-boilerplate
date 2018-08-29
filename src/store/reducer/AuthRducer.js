import actionTypes from "../actionTypes";


const INITIAL_STATE = {
  user: null,
  isLoading: false,
  isError: false,
  errorMsg: ""
};
export default function AuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    default:
    return state;
  }
}
