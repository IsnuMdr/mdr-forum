import { ActionType } from "./action";

export const threadDetailReducer = (threadDetail = null, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;

    case ActionType.CLEAR_THREAD_DETAIL:
      return null;

    case ActionType.VOTE_UP_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy
          : [...threadDetail.upVotesBy, action.payload.userId],
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          )
          : threadDetail.downVotesBy,
      };

    case ActionType.VOTE_DOWN_THREAD_DETAIL:
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy
          : [...threadDetail.downVotesBy, action.payload.userId],
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : threadDetail.upVotesBy,
      };

    case ActionType.NEUTRAL_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: threadDetail.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };

    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [...threadDetail.comments, action.payload.comment],
      };

    case ActionType.VOTE_UP_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy
                : [...comment.upVotesBy, action.payload.userId],
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                  (id) => id !== action.payload.userId,
                )
                : comment.downVotesBy,
            };
          }

          return comment;
        }),
      };

    case ActionType.VOTE_DOWN_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy
                : [...comment.downVotesBy, action.payload.userId],
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy,
            };
          }

          return comment;
        }),
      };

    case ActionType.NEUTRAL_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
              downVotesBy: comment.downVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }

          return comment;
        }),
      };

    default:
      return threadDetail;
  }
};
