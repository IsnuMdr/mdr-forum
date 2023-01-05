import React from "react";
import PropTypes from "prop-types";
import { postedAt } from "../../utils";
import { CommentAction } from "./CommentAction";
import parser from "html-react-parser";

export default function CommentItem({ id, owner, upVotesBy, downVotesBy, content, createdAt }) {
  return (
    <div className="comment-item">
      <header className="comment-item__header">
        <div className="comment-item__owner-info">
          <img src={owner.avatar} alt={owner.name} />
          <div>{owner.name}</div>
        </div>
        <p className="posted-at">{postedAt(createdAt)}</p>
      </header>
      {parser(content)}
      <CommentAction id={id} upVotesBy={upVotesBy} downVotesBy={downVotesBy} />
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.object,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
