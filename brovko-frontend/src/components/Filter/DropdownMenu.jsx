import PropTypes from 'prop-types';
import styles from './Filter.module.scss';

const DropdownMenu = ({ items, onSelect }) => {
  return (
    <ul className={styles.dropdownMenu}>
      {items.map((item, index) => (
        <li
          className={styles.dropdownLi}
          key={index}
          onClick={() => onSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DropdownMenu;
