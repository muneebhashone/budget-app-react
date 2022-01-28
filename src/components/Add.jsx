import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAppContext } from "../Context/AppContext";

function Add() {
  const [type, setType] = useState("inc");
  const inputRef = useRef({});
  const { dispatch } = useAppContext();
  const submitBtnRef = useRef(null);

  const handleEnterKey = (e) => {
    if (e.key !== "Enter") return;
    submitBtnRef.current.click();
  };

  const handleSubmit = () => {
    let action;
    const description = inputRef.current.description.value;
    const value = inputRef.current.value.value;

    if (type === "inc") {
      action = "addIncome";
    } else {
      action = "addExpense";
    }

    if (!description || !value) {
      alert("Please fill up all required fields");
      return;
    }

    const newItem = {
      description,
      value,
    };

    console.log({ newItem, type });

    dispatch({ type: action, payload: newItem });

    inputRef.current.description.value = "";
    inputRef.current.value.value = "";
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, []);

  return (
    <div className="add">
      <div className="add__container">
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            console.log(e.target.value);
          }}
          className={`add__type ${type === "inc" ? "" : "red-focus"}`}
        >
          <option value="inc">+</option>
          <option value="exp">-</option>
        </select>
        <input
          ref={(el) => (inputRef.current.description = el)}
          type="text"
          className="add__description"
          placeholder="Add description"
        />
        <input
          ref={(el) => (inputRef.current.value = el)}
          type="number"
          className="add__value"
          placeholder="Value"
        />
        <button onClick={handleSubmit} ref={submitBtnRef} className="add__btn">
          <i className="ion-ios-checkmark-outline"></i>
        </button>
      </div>
    </div>
  );
}

export default Add;