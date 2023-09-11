import PropTypes from 'prop-types';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import css from './QuantityButton.module.scss';

const QuantityButton = ({ value = 1, setValue, mode, size }) => {
  const addOne = () => {
    setValue(prevValue => prevValue + 1);
  };

  const minusOne = () => {
    setValue(prevValue => prevValue - 1);
  };

  return (
    <div
      className={`${css['quantity-container']} ${
        css[`quantity-container_${mode}`]
      } ${css[`quantity-container_${size}`]}`}
    >
      <button
        className={css['quantity-container__button']}
        type="button"
        onClick={minusOne}
        disabled={value <= 1}
      >
        <AiOutlineMinus className={css['quantity-container__icon']} />
      </button>
      <p className={css['quantity-container__value']}>{value}</p>
      <button
        className={css['quantity-container__button']}
        type="button"
        onClick={addOne}
        disabled={value >= 99}
      >
        <AiOutlinePlus className={css['quantity-container__icon']} />
      </button>
    </div>
  );
};

QuantityButton.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
  mode: PropTypes.string,
  size: PropTypes.string,
};

export default QuantityButton;
