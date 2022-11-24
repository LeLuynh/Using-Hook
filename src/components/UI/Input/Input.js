import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const activate = () => {
    return inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        value={props.value}
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});
export default Input;
