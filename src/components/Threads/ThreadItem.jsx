import PropTypes from "prop-types";
import parser from "html-react-parser";
import { postedAt } from "../../utils";
import { ActionThread } from "./ActionThread";
import { Link } from "react-router-dom";

export default function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
}) {
  return (
    <div className="threads-list">
      <div className="thread-item">
        <header className="thread-item__header">
          <span className="thread-item__category">#{category}</span>
          <h4 className="thread-item__title">
            <Link to={`/thread/${id}`}>{title}</Link>
          </h4>
        </header>
        <div className="thread-item__body">{parser(body)}</div>
        <footer className="thread-item__footer">
          <ActionThread
            id={id}
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            totalComments={totalComments}
          />
          <div>{postedAt(createdAt)}</div>
          <div className="thread-item__owner">
            Dibuat oleh <strong>{user?.name}</strong>
          </div>
        </footer>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};
