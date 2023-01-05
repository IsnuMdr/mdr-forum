import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { loginActionCreator } from "../auth/action";

export const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

export const setIsPreloadActionCreator = (isPreload) => ({
  type: ActionType.SET_IS_PRELOAD,
  payload: { isPreload },
});

export const asyncPreload = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const authUser = await api.getUserLogged();

    dispatch(loginActionCreator(authUser));
  } catch (error) {
    dispatch(loginActionCreator(null));
  }

  dispatch(setIsPreloadActionCreator(false));
  dispatch(hideLoading());
};
