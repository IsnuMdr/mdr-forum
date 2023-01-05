/* eslint-disable operator-linebreak */
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

export const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  VOTE_UP_THREAD_DETAIL: "VOTE_UP_THREAD_DETAIL",
  VOTE_DOWN_THREAD_DETAIL: "VOTE_DOWN_THREAD_DETAIL",
  NEUTRAL_THREAD_DETAIL: "NEUTRAL_THREAD_DETAIL",
  ADD_COMMENT: "ADD_COMMENT",
  VOTE_UP_COMMENT: "VOTE_UP_COMMENT",
  VOTE_DOWN_COMMENT: "VOTE_DOWN_COMMENT",
  NEUTRAL_COMMENT: "NEUTRAL_COMMENT",
};

export const receiveThreadDetailActionCreator = (threadDetail) => ({
  type: ActionType.RECEIVE_THREAD_DETAIL,
  payload: {
    threadDetail,
  },
});

export const clearThreadDetailActionCreator = () => ({
  type: ActionType.CLEAR_THREAD_DETAIL,
});

export const voteUpThreadDetailActionCreator = (userId) => ({
  type: ActionType.VOTE_UP_THREAD_DETAIL,
  payload: {
    userId,
  },
});

export const voteDownThreadDetailActionCreator = (userId) => ({
  type: ActionType.VOTE_DOWN_THREAD_DETAIL,
  payload: {
    userId,
  },
});

export const neutralThreadDetailActionCreator = (userId) => ({
  type: ActionType.NEUTRAL_THREAD_DETAIL,
  payload: {
    userId,
  },
});

export const addCommentActionCreator = (comment) => ({
  type: ActionType.ADD_COMMENT,
  payload: {
    comment,
  },
});

export const voteUpCommentActionCreator = ({ userId, commentId }) => ({
  type: ActionType.VOTE_UP_COMMENT,
  payload: {
    userId,
    commentId,
  },
});

export const voteDownCommentActionCreator = ({ userId, commentId }) => ({
  type: ActionType.VOTE_DOWN_COMMENT,
  payload: {
    userId,
    commentId,
  },
});

export const neutralCommentActionCreator = ({ userId, commentId }) => ({
  type: ActionType.NEUTRAL_COMMENT,
  payload: {
    userId,
    commentId,
  },
});

export const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(showLoading());
  dispatch(clearThreadDetailActionCreator());

  try {
    const threadDetail = await api.getDetailThreadById(threadId);

    dispatch(receiveThreadDetailActionCreator(threadDetail));
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }

  dispatch(hideLoading());
};

export const asyncVoteUpThreadDetail = (isThreadVoteDown) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();

  dispatch(voteUpThreadDetailActionCreator(authUser.id));

  try {
    await api.upVoteThread(threadDetail.id);
  } catch (error) {
    if (isThreadVoteDown) {
      dispatch(voteDownThreadDetailActionCreator(authUser.id));
    } else {
      dispatch(neutralThreadDetailActionCreator(authUser.id));
    }

    throw new Error(`Error: ${error}`);
  }
};

export const asyncVoteDownThreadDetail = (isThreadVoteUp) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();

  dispatch(voteDownThreadDetailActionCreator(authUser.id));

  try {
    await api.downVoteThread(threadDetail.id);
  } catch (error) {
    if (isThreadVoteUp) {
      dispatch(voteUpThreadDetailActionCreator(authUser.id));
    } else {
      dispatch(neutralThreadDetailActionCreator(authUser.id));
    }

    throw new Error(`Error: ${error}`);
  }
};

export const asyncAddComment =
  ({ threadId, content }) =>
  async (dispatch) => {
    try {
      const comment = await api.createComment({ threadId, content });

      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

export const asyncVoteUpComment =
  ({ threadId, commentId, isCommentVotedDown }) =>
  async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(voteUpCommentActionCreator({ userId: authUser.id, commentId }));

    try {
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      if (isCommentVotedDown) {
        dispatch(voteDownCommentActionCreator({ userId: authUser.id, commentId }));
      } else {
        dispatch(neutralCommentActionCreator({ userId: authUser.id, commentId }));
      }

      throw new Error(`Error: ${error}`);
    }
  };

export const asyncVoteDownComment =
  ({ threadId, commentId, isCommentVotedUp }) =>
  async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(voteDownCommentActionCreator({ userId: authUser.id, commentId }));

    try {
      await api.downVoteComment({ threadId, commentId });
    } catch (error) {
      if (isCommentVotedUp) {
        dispatch(voteUpCommentActionCreator({ userId: authUser.id, commentId }));
      } else {
        dispatch(neutralCommentActionCreator({ userId: authUser.id, commentId }));
      }

      throw new Error(`Error: ${error}`);
    }
  };

export const asyncNeutralComment =
  ({ threadId, commentId, isCommentVotedDown = false }) =>
  async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(neutralCommentActionCreator({ userId: authUser.id, commentId }));

    try {
      await api.neutralVoteComment({ threadId, commentId });
    } catch (error) {
      if (isCommentVotedDown) {
        dispatch(voteDownCommentActionCreator({ userId: authUser.id, commentId }));
      } else {
        dispatch(voteUpCommentActionCreator({ userId: authUser.id, commentId }));
      }

      throw new Error(`Error: ${error}`);
    }
  };
