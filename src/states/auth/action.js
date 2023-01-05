import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

export const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

export const loginActionCreator = (authUser) => ({
  type: ActionType.SET_AUTH_USER,
  payload: { authUser },
});

export const logoutActionCreator = () => ({
  type: ActionType.UNSET_AUTH_USER,
  payload: { authUser: null },
});

export const asyncLoginUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });

      api.putAccesToken(token);

      const authUser = await api.getUserLogged();

      dispatch(loginActionCreator(authUser));
    } catch (error) {
      alert("Login failed");
    }

    dispatch(hideLoading());
  };

export const ayncLogout = () => async (dispatch) => {
  dispatch(logoutActionCreator());
  api.putAccesToken("");
};

export const asyncRegisterUser =
  ({ email, name, password }) =>
  async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ email, name, password });

      dispatch(asyncLoginUser({ email, password }));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
