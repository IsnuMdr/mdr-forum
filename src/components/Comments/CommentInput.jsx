import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { asyncAddComment } from "../../states/threadsDetail/action";

export default function CommentInput({ threadId }) {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleComment = (event) => {
    event.preventDefault();

    dispatch(asyncAddComment({ threadId, content }));
  };

  return (
    <form onSubmit={handleComment} className="comment-input">
      <div
        className="comment-input__field"
        contentEditable
        spellCheck={false}
        defaultValue={content}
        onInput={(e) => setContent(e.target.innerText)}
        onFocus={(e) => (e.target.innerText = "")}
      />
      <button type="submit">Kirim</button>
    </form>
  );
}

CommentInput.propTypes = {
  threadId: PropTypes.string.isRequired,
};
