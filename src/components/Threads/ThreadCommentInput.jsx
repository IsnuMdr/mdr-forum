import React, { useState } from "react";
import PropTypes from "prop-types";

function ThreadCommentInput({ commentThread }) {
  const [content, setContent] = useState("");

  function commentThreadHandler() {
    if (content.trim()) {
      commentThread(content);
      setContent("");
    }
  }

  function handleCommentChange({ target }) {
    setContent(target.value);
  }

  return (
    <form onSubmit={commentThreadHandler} className="comment-input">
      <div
        className="comment-input__field"
        contentEditable="true"
        spellCheck="false"
        value={content}
        onInput={handleCommentChange}
      />
      <button type="submit">Kirim</button>
    </form>
  );
}

ThreadCommentInput.propTypes = {
  commentThread: PropTypes.func.isRequired,
};

export default ThreadCommentInput;
