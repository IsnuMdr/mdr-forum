import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncNeutralComment,
  asyncVoteDownComment,
  asyncVoteUpComment,
} from "../../states/threadsDetail/action";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ButtonUpVote from "../Commons/ButtonUpVote";
import ButtonDownVote from "../Commons/ButtonDownVote";

export const CommentAction = ({ id, upVotesBy, downVotesBy }) => {
  const { id: threadId } = useParams();
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const votedUp = upVotesBy.includes(authUser?.id);
  const votedDown = downVotesBy.includes(authUser?.id);

  const handleVoteUpComment = () => {
    if (votedUp) {
      return dispatch(asyncNeutralComment({ threadId, commentId: id, votedUp }));
    }

    return dispatch(
      asyncVoteUpComment({
        threadId,
        commentId: id,
        isCommentVotedDown: votedDown,
      })
    );
  };

  const handleVoteDownComment = () => {
    if (votedDown) {
      return dispatch(asyncNeutralComment({ threadId, commentId: id, votedDown }));
    }

    return dispatch(
      asyncVoteDownComment({
        threadId,
        commentId: id,
        isCommentVotedUp: votedUp,
      })
    );
  };

  return (
    <footer>
      <ButtonUpVote votedUp={votedUp} upVotesBy={upVotesBy} handleVoteUp={handleVoteUpComment} />
      <ButtonDownVote
        votedDown={votedDown}
        downVotesBy={downVotesBy}
        handleVoteDown={handleVoteDownComment}
      />
    </footer>
  );
};

CommentAction.propTypes = {
  id: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};
