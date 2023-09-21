import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArrowIcon from 'shared/icons/ArrowIcon';
import EllipseIcon from 'shared/icons/EllipseIcon';
import styles from './GoBackButton.module.scss';

function GoBackButton({ from }) {
  const navigate = useNavigate();

  const onGoBackClick = () => {
    navigate(from);
  };

  return (
    <button className={styles.button} onClick={onGoBackClick} from={from}>
      <div className={styles.ellipse}>
        <EllipseIcon />
      </div>

      <div className={styles.arrow}>
        <ArrowIcon />
      </div>
    </button>
  );
}

GoBackButton.propTypes = {
  onClick: PropTypes.func,
};
export default GoBackButton;
