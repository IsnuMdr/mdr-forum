import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

export const ActionType = {
  RECEIVE_LEADERBOARDS: "RECEIVE_LEADERBOARDS",
};

export const receiveLeaderboardsActionCreator = (leaderboards) => ({
  type: ActionType.RECEIVE_LEADERBOARDS,
  payload: { leaderboards },
});

export const asyncReceiveLeaderboard = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const leaderboards = await api.getLeaderboards();
    dispatch(receiveLeaderboardsActionCreator(leaderboards));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};
