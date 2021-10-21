import React, { useReducer, useEffect } from 'react';
import classes from './Input.module.css';
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: action.validator(action.value),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

export default function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const changeHandler = (e) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: e.target.value,
      validator: props.validator,
    });
  };

  const touchHandler = (e) => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const { value, isValid } = inputState;
  const { id, onInputChange } = props;

  useEffect(() => {
    onInputChange(id, value, isValid);
  }, [id, value, isValid, onInputChange]);

  return (
    <>
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        className={`${props.className} ${classes.input} ${
          !inputState.isValid && inputState.isTouched && classes.invalid
        }`}
      />
      {!inputState.isValid && inputState.isTouched && (
        <p className={classes.errorText}>{props.errorText}</p>
      )}
    </>
  );
}
