/* eslint-disable operator-linebreak */
import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

export const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  VOTE_UP_THREAD: "VOTE_UP_THREAD",
  VOTE_DOWN_THREAD: "VOTE_DOWN_THREAD",
  NEUTRAL_THREAD: "NEUTRAL_THREAD",
};

export const receiveThreadsActionCreator = (threads) => ({
  type: ActionType.RECEIVE_THREADS,
  payload: { threads },
});

export const addThreadActionCreator = (thread) => ({
  type: ActionType.ADD_THREAD,
  payload: { thread },
});

export const voteUpThreadActionCreator = ({ userId, threadId }) => ({
  type: ActionType.VOTE_UP_THREAD,
  payload: { userId, threadId },
});

export const voteDownThreadActionCreator = ({ userId, threadId }) => ({
  type: ActionType.VOTE_DOWN_THREAD,
  payload: { userId, threadId },
});

export const neutralThreadActionCreator = ({ userId, threadId }) => ({
  type: ActionType.NEUTRAL_THREAD,
  payload: { userId, threadId },
});

export const asyncAddThread =
  ({ title, body, category = "general" }) =>
  async (dispatch) => {
    dispatch(showLoading);
    try {
      const thread = await api.createThread({ title, body, category });

      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    dispatch(hideLoading());
  };

export const asyncVoteUpThread =
  ({ threadId, isVotedDown }) =>
  async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading);
    dispatch(voteUpThreadActionCreator({ userId: authUser.id, threadId }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      if (isVotedDown) {
        dispatch(voteDownThreadActionCreator({ userId: authUser.id, threadId }));
      } else {
        dispatch(neutralThreadActionCreator({ userId: authUser.id, threadId }));
      }

      throw new Error(`Error: ${error}`);
    }
    dispatch(hideLoading());
  };

export const asyncVoteDownThread =
  ({ threadId, isVotedUp }) =>
  async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading);
    dispatch(voteDownThreadActionCreator({ userId: authUser.id, threadId }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      if (isVotedUp) {
        dispatch(voteUpThreadActionCreator({ userId: authUser.id, threadId }));
      } else {
        dispatch(neutralThreadActionCreator({ userId: authUser.id, threadId }));
      }

      throw new Error(`Error: ${error}`);
    }
    dispatch(hideLoading());
  };
