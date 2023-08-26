import PropTypes from 'prop-types';

const DropdownMenu = ({ items, onSelect }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => onSelect(item)}>
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
