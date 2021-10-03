import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'change':
      let formIsValid = true;
      for (const property in state.inputs) {
        if (!state.inputs[property]) {
          continue;
        }
        if (action.id === property) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[property].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: { value: action.value, isValid: action.isValid },
        },
        formIsValid,
      };
    case 'SET_DATA':
      return { inputs: action.inputs, formIsValid: action.formIsValid };
    default:
      return state;
  }
};
export default function useForm(initialState, initialFormValid) {
  const [formState, formDispatch] = useReducer(formReducer, {
    inputs: initialState,
    formIsValid: initialFormValid || false,
  });

  const onInputChange = useCallback((id, value, isValid) => {
    formDispatch({
      type: 'change',
      value: value,
      isValid: isValid,
      id: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    formDispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return { formState, onInputChange, setFormData };
}
