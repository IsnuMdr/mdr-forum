import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { asyncAddThread } from "../states/threads/action";

export default function AddNewThreadPage() {
  const [title, setTitle] = useInput("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAppendThread = (newThread) => {
    dispatch(asyncAddThread(newThread));
    navigate("/");
  };

  return (
    <>
      <div className="new-thread-page">
        <h2>Buat Diskusi Baru</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleAppendThread({
              title: title,
              body: body,
              category: category,
            });
          }}
          className="new-thread-input"
        >
          <input type="text" placeholder="Judul" value={title} onChange={setTitle} />
          <input type="text" placeholder="Kategori" value={category} onChange={setCategory} />
          <div
            className="input-body"
            contentEditable
            spellCheck={false}
            onInput={(event) => {
              setBody(event.target.innerText);
            }}
          />
          <button type="submit" className="d-flex justify-content-center gap-2">
            <span>Buat</span>
            <FaPaperPlane className="mt-1" />
          </button>
        </form>
      </div>
    </>
  );
}
