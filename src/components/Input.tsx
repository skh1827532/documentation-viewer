import React, { useState } from "react";

const Input = ({ onClick, input, setInput }) => {
  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input-tag"
        placeholder="Enter a URL to search"
      />

      <button onClick={() => onClick()} className="btn-primary">
        GO
      </button>
    </div>
  );
};

export default Input;
