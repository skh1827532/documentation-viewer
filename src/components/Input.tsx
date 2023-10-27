import React, { useState } from "react";
import { InputProps } from "../types";
const Input: React.FC<InputProps> = ({ onClick, input, setInput, empty }) => {
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
      {empty && (
        <div
          style={{
            margin: "1rem",
            marginTop: "0",
            color: "red",
            fontWeight: "bold",
          }}
        >
          Field should not be empty!
        </div>
      )}
    </div>
  );
};

export default Input;
