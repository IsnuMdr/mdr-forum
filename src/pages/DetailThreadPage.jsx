import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  asyncReceiveThreadDetail,
  asyncVoteDownThreadDetail,
  asyncVoteUpThreadDetail,
} from "../states/threadsDetail/action";
import { postedAt } from "../utils";
import parser from "html-react-parser";
import { asyncNeutralThread } from "../states/shared/action";
import ButtonUpVote from "../components/Commons/ButtonUpVote";
import ButtonDownVote from "../components/Commons/ButtonDownVote";
import CommentInput from "../components/Comments/CommentInput";
import CommentItem from "../components/Comments/CommentItem";

export default function DetailThreadPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const votedUp = threadDetail?.upVotesBy.includes(authUser?.id);
  const votedDown = threadDetail?.downVotesBy.includes(authUser?.id);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id]);

  const handleVoteUpThreadDetail = () => {
    if (authUser !== null) {
      if (votedUp) {
        return dispatch(asyncNeutralThread({ threadId: id, votedUp }));
      }

      return dispatch(asyncVoteUpThreadDetail(votedDown));
    }
    navigate("/login");
  };

  const handleVoteDownThreadDetail = () => {
    if (authUser !== null) {
      if (votedDown) {
        return dispatch(asyncNeutralThread({ threadId: id, votedDown }));
      }

      return dispatch(asyncVoteDownThreadDetail(votedUp));
    }
    navigate("/login");
  };

  if (threadDetail === null) {
    return (
      <>
        <div className="mx-5 sm:mx-10 md:mx-20 lg:mx-40 my-5">Thread Not Found</div>
      </>
    );
  }

  return (
    <section className="detail-page">
      <header className="thread-header">
        <p className="thread-header__category">#{threadDetail?.category}</p>
      </header>
      <div className="thread-content">
        <h2>{threadDetail?.title}</h2>
        <div className="thread-content__body">{parser(threadDetail?.body)}</div>
      </div>
      <footer className="thread-footer">
        <ButtonUpVote
          votedUp={votedUp}
          upVotesBy={threadDetail?.upVotesBy}
          handleVoteUp={handleVoteUpThreadDetail}
        />
        <ButtonDownVote
          votedDown={votedDown}
          downVotesBy={threadDetail?.downVotesBy}
          handleVoteDown={handleVoteDownThreadDetail}
        />
        <div className="owner-info">
          <span>Dibuat oleh</span>
          <img src={threadDetail?.owner.avatar} alt={threadDetail?.owner.name} />

          <span>{threadDetail?.owner.name}</span>
        </div>
        <div>{postedAt(threadDetail?.createdAt)}</div>
      </footer>
      <div className="thread-comment">
        <div className="thread-comment__input">
          <h3>Beri komentar</h3>
          {authUser !== null ? (
            <CommentInput threadId={threadDetail?.id} />
          ) : (
            <p className="thread-comment__not_login">
              <Link to="/login">Login</Link> untuk memberi komentar
            </p>
          )}
        </div>
        <div className="thread-comment__list">
          <h3>Komentar ({threadDetail.comments.length})</h3>
          <div className="comments-list">
            {threadDetail.comments.map((comment) => (
              <CommentItem key={comment.id} {...comment} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
