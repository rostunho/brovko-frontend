import Modal from 'shared/components/Modal/Modal';
import Image from 'shared/components/Image';
import ChevronArrowIcon from 'shared/icons/ChevronArrowIcon';
import styles from './ReviewItemLargeImage.module.scss';

export default function ReviewItemLargeImage({
  idx,
  src,
  alt,
  closeLargeImage,
  nextLargeImage,
  previousLargeImage,
  disableNext,
  disablePrev,
}) {
  return (
    <Modal
      className={styles.modal}
      closeModal={closeLargeImage}
      buttonClassName={styles['close-button']}
    >
      <div className={styles.modal}>
        <Image
          key={idx}
          src={src}
          alt={`preview-${alt}`}
          className={styles.modalImg}
        />
        <button
          type="button"
          className={styles['change-image']}
          onClick={previousLargeImage}
          disabled={disablePrev}
        >
          <ChevronArrowIcon className={styles['chevron-icon']} />
        </button>
        <button
          type="button"
          className={styles['change-image']}
          onClick={nextLargeImage}
          disabled={disableNext}
        >
          <ChevronArrowIcon className={styles['chevron-icon']} />
        </button>
      </div>
    </Modal>
  );
}
