import PropTypes from 'prop-types';
import useForm from 'shared/hooks/useForm';
import { useRef, useEffect } from 'react';
import OldInput from '../OldInput/OldInput';
import Input from '../Input';

import style from './SearchBar.module.scss';

const SearchBar = ({ onSubmit, selectedCategory }) => {
  const formRef = useRef(null);

  const { state, setState, handleChange, handleSubmitSearch  } = useForm({
    initialState: { search: '' },
    onSubmit,
  });

  const { search } = state;

  useEffect(() => {
    setState({ search: '' });
  
  }, [selectedCategory]);


  const remove = () => {
    setState({
      search: '',
    });
    formRef.current.submit();
  };

  return (
    <form
      ref={formRef}
      className={style.searchForm}
      onSubmit={handleSubmitSearch}
    >
      <div className={style.container}>
        <OldInput
          className={style.searchInput}
          type="search"
          name="search"
          value={search}
          onChange={handleChange} //handleChange з useForm
          onClick={handleSubmitSearch} //handleSubmitSearch з useForm
          onRemove={remove}
          autoComplete="off"
          placeholder="Пошук смаколиків"
        />
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string, // Додайте властивість для слідкування за категорією
};

export default SearchBar;
