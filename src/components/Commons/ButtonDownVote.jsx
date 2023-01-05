import { AiFillDislike, AiOutlineDislike } from "react-icons/ai";
import PropTypes from "prop-types";

export default function ButtonDownVote({ votedDown, downVotesBy, handleVoteDown }) {
  return (
    <div className="thread-downvote__button" onClick={handleVoteDown}>
      {votedDown ? <AiFillDislike /> : <AiOutlineDislike />}

      <span className="thread-downvote__label">{downVotesBy?.length || 0}</span>
    </div>
  );
}

ButtonDownVote.propTypes = {
  votedDown: PropTypes.bool.isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleVoteDown: PropTypes.func.isRequired,
};
