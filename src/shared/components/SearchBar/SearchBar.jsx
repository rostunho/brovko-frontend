import PropTypes from 'prop-types';
import useForm from 'shared/hooks/useForm';
import { useRef, useEffect } from 'react';
import Input from '../Input';

import style from './SearchBar.module.scss';

const SearchBar = ({ onSubmit, searchTerm, selectedCategory }) => {
  const formRef = useRef(null);

  const { state, setState, handleChange, handleSubmitSearch } = useForm({
    initialState: { search: '' },
    onSubmit,
  });

  const { search } = state;

  // useEffect(() => {
  //  setState({ search: searchTerm });
  // }, [selectedCategory]);

  const remove = () => {
    setState({
      search: '',
    });
    // formRef.current.submit();
  };

  return (
    <>
      <Input type="search" placeholder="Оновлений пошук смаколиків" />
    </>
  );
};

// SearchBar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   searchTerm: PropTypes.string,
//   selectedCategory: PropTypes.object,
//   onRemove: PropTypes.func,
// };

export default SearchBar;
