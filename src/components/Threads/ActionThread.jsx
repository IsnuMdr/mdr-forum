import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { asyncNeutralThread } from "../../states/shared/action";
import {
  asyncVoteDownThread,
  asyncVoteUpThread,
} from "../../states/threads/action";
import { BsReply } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ButtonUpVote from "../Commons/ButtonUpVote";
import ButtonDownVote from "../Commons/ButtonDownVote";

export const ActionThread = ({ id, upVotesBy, downVotesBy, totalComments }) => {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const votedUp = upVotesBy.includes(authUser?.id);
  const votedDown = downVotesBy.includes(authUser?.id);

  const handleVoteUp = () => {
    if (authUser !== null) {
      if (votedUp) {
        return dispatch(asyncNeutralThread({ threadId: id, votedUp }));
      }

      return dispatch(
        asyncVoteUpThread({ threadId: id, isVotedDown: votedDown })
      );
    } else {
      navigate("/login");
    }
  };

  const handleVoteDown = () => {
    if (authUser !== null) {
      if (votedDown) {
        return dispatch(asyncNeutralThread({ threadId: id, votedDown }));
      }

      return dispatch(
        asyncVoteDownThread({ threadId: id, isVotedUp: votedUp })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <ButtonUpVote
        votedUp={votedUp}
        upVotesBy={upVotesBy}
        handleVoteUp={handleVoteUp}
      />
      <ButtonDownVote
        votedDown={votedDown}
        downVotesBy={downVotesBy}
        handleVoteDown={handleVoteDown}
      />
      <div className="thread-item__total-comments">
        <BsReply />
        {totalComments}
      </div>
    </>
  );
};

ActionThread.propTypes = {
  id: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};
