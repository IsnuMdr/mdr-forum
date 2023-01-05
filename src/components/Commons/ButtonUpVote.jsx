import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import PropTypes from "prop-types";

export default function ButtonUpVote({ votedUp, upVotesBy, handleVoteUp }) {
  return (
    <div className="thread-upvote__button" onClick={handleVoteUp}>
      {votedUp ? <AiFillLike /> : <AiOutlineLike />}

      <span className="thread-upvote__label">{upVotesBy?.length || 0}</span>
    </div>
  );
}

ButtonUpVote.propTypes = {
  votedUp: PropTypes.bool.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleVoteUp: PropTypes.func.isRequired,
};
