import { useSelector } from 'react-redux';
import { selectUser } from 'redux/user/userSelectors';
import RewiewRating from './ReviewRating';
import Image from 'shared/components/Image';
import AdminReviewsButtons from './AdminReviewsButtons';

import styles from './ReviewItem.module.scss';
import { useState } from 'react';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal/Modal';
// import Button from 'shared/components/Button';

const formatDate = dateString => new Date(dateString).toLocaleString();

const ReviewItem = ({ review, isExpandedReview }) => {
  const { firstName, lastName, status } = useSelector(selectUser);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsImage, setModalIsImage] = useState(false);
  const [modalIsId, setModalIsId] = useState(false);

  const [prompDelete, setPrompDelete] = useState(false);

  // console.log('status :>> ', status);

  const {
    owner: { avatarURL, email, name },
    text: { createdAt, reviewURL, text: reviewText },
    // status: { approved, approvedAt, approvedBy },
  } = review;

  const openModalEditPhoto = (id, url) => {
    setModalIsId(id);
    setModalIsImage(url);
    setModalIsOpen(true);
  };

  const closeModalEditPhoto = () => {
    setModalIsOpen(false);
    setPrompDelete(false);
  };

  const modalWindow = (
    <Modal closeModal={closeModalEditPhoto}>
      <div className={styles.modal}>
        <Image
          key={modalIsId}
          src={modalIsImage}
          alt={`preview-${modalIsId}`}
          className={styles.modalImg}
        />
      </div>
    </Modal>
  );

  const ImageGalery = ({ reviewURL }) => {
    const images = reviewURL.map((reviewURL, index) => (
      <Button
        key={index}
        className={styles.btn}
        type="button"
        onClick={e => {
          openModalEditPhoto(index, reviewURL);
        }}
      >
        <Image className={styles.imgReview} key={index} src={reviewURL} />
      </Button>
    ));

    return images;
  };

  return (
    <>
      {isExpandedReview ? (
        <ul className={styles.reviewBox}>
          <li className={styles.reviewItem}>
            <div className={styles.userInfo}>
              <div className={styles.avatarWrapper}>
                <Image
                  className={styles.avatar}
                  src={avatarURL}
                  text={email || name}
                  height={'32px'}
                />
              </div>

              <div>
                <p className={styles.userName}>{name || email}</p>
                <p className={styles.reviewDate}>{formatDate(createdAt)}</p>
              </div>
            </div>

            <RewiewRating />
            <p className={styles.reviewText}>{reviewText}</p>

            {reviewURL && reviewURL[0] !== null && reviewURL.length > 0 && (
              <div className={styles.imgContainer}>
                <ImageGalery reviewURL={reviewURL} />
              </div>
            )}
            {status === 'manager' ||
              (status === 'superadmin' && (
                <AdminReviewsButtons name={firstName + ' ' + lastName} />
              ))}
          </li>
        </ul>
      ) : (
        <>
          <div className={styles.userInfo}>
            <div className={styles.avatarWrapper}>
              <Image
                className={styles.avatar}
                src={avatarURL}
                text={email || name}
                height={'32px'}
              />
            </div>
            <div>
              <p className={styles.userName}> {email || name}</p>
              <p className={styles.reviewDate}>{formatDate(createdAt)}</p>
            </div>
          </div>

          <RewiewRating />

          <p className={styles.reviewText}>{reviewText}</p>
          {reviewURL && reviewURL[0] !== null && reviewURL.length > 0 && (
            <div className={styles.imgContainer}>
              <ImageGalery reviewURL={reviewURL} />
            </div>
          )}
        </>
      )}
      {modalIsOpen && modalWindow}
    </>
  );
};

export default ReviewItem;
