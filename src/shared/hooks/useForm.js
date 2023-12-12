import { useState, useCallback, useEffect } from 'react';

const useForm = ({ initialState, onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  // useEffect(() => {
  //   setState(prevState => ({ ...prevState, ...initialState }));
  // }, [initialState]);

  const handleChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      setState(prevState => {
        return { ...prevState, [name]: value };
      });
    },
    [setState]
  );

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  const handleSubmitSearch = e => {
    e.preventDefault();
    onSubmit({ ...state });
  };

  return { state, setState, handleChange, handleSubmit, handleSubmitSearch };
};

export default useForm;
