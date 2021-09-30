import React, { useReducer } from 'react';
import { useEffect } from 'react/cjs/react.development';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'input_change':
      return {
        ...state,
        value: action.value,
        isValid: action.validator(action.value),
      };
    default:
      return state;
  }
};

export default function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
  });

  const changeHandler = (e) => {
    dispatch({
      type: 'input_change',
      value: e.target.value,
      validator: props.validator,
    });
  };

  const { value, isValid } = inputState;
  const { id, onInputChnage } = props;

  useEffect(() => {
    onInputChnage(id, value, isValid);
  }, [id, value, isValid, onInputChnage]);

  return (
    <input
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
      onChange={changeHandler}
      value={inputState.value}
    />
  );
}
