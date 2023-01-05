/* eslint-disable operator-linebreak */
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import {
  neutralThreadActionCreator,
  receiveThreadsActionCreator,
  voteDownThreadActionCreator,
  voteUpThreadActionCreator,
} from "../threads/action";
import {
  neutralThreadDetailActionCreator,
  voteDownThreadDetailActionCreator,
  voteUpThreadDetailActionCreator,
} from "../threadsDetail/action";
import { receiveUsersActionCreator } from "../users/action";

export const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const users = await api.getAllUsers();
    const threads = await api.getAllThreads();

    dispatch(receiveUsersActionCreator(users));
    dispatch(receiveThreadsActionCreator(threads));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

export const asyncNeutralThread =
  ({ threadId, isThreadVotedDown = false }) =>
  async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(neutralThreadActionCreator({ threadId, userId: authUser.id }));

    if (threadDetail) dispatch(neutralThreadDetailActionCreator(authUser.id));

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      if (isThreadVotedDown) {
        dispatch(voteDownThreadActionCreator({ threadId, userId: authUser.id }));
      } else {
        dispatch(voteUpThreadActionCreator({ threadId, userId: authUser.id }));
      }

      if (!threadDetail && isThreadVotedDown) {
        dispatch(voteDownThreadDetailActionCreator(authUser.id));
      } else {
        dispatch(voteUpThreadDetailActionCreator(authUser.id));
      }

      alert(error.message);
    }
  };
