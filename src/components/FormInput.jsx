import React, { useState } from "react";

const FormInput = ({ text, inputValue, setInputValue, id }) => {
  const [isLabelOpened, setIsLabelOpened] = useState(false);
  const [isInputCompleted, setIsInputCompleted] = useState(false);
  return (
    <div className="row-message-form-input">
      <label className={`${isLabelOpened ? "open" : ""}`} htmlFor={id}>
        {text}
      </label>
      <input
        value={inputValue}
        className={`${isInputCompleted ? "completed" : ""}`}
        onFocus={() => {
          setIsLabelOpened(true);
        }}
        onBlur={() => {
          if (inputValue === "") {
            setIsLabelOpened(false);
            setIsInputCompleted(false);
          } else {
            setIsInputCompleted(true);
          }
        }}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (e.target.value !== "") {
            setIsLabelOpened(true);
          }
        }}
        id={id}
        type="text"
      />
    </div>
  );
};
export default FormInput;
