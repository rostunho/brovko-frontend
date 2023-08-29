import PropTypes from 'prop-types';
import useForm from 'shared/hooks/useForm';
import { useRef } from 'react';
import Input from '../Input/Input';

import style from './SearchBar.module.scss';

const SearchBar = ({ onSubmit }) => {
  const formRef = useRef(null);

  const { state, handleChange, handleSubmitSearch } = useForm({
    initialState: { search: '' },
    onSubmit,
  });

  const { search } = state;

  return (
    <form
      ref={formRef}
      className={style.searchForm}
      onSubmit={handleSubmitSearch}
    >
      <div className={style.container}>
        <Input
          className={style.searchInput}
          type="search"
          name="search"
          value={search}
          onChange={handleChange} //handleChange з useForm
          onClick={handleSubmitSearch} //handleSubmitSearch з useForm
          autoComplete="off"
          placeholder="Пошук смаколиків"
        />
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
