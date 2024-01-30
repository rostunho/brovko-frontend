import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserStatus } from 'redux/user/userSelectors';
import { getProductById } from 'shared/services/api';

import ReviewItemAdminBar from './ReviewItemAdminBar/ReviewItemAdminBar';
import ReviewItemImageBox from './ReviewItemImageBox/ReviewItemImageBox';
import Avatar from 'components/Avatar';
import ReviewRating from 'components/ProductDetail/ProductReview/ReviewRating';
// import Button from '../Button';
// import Image from '../Image';
import styles from './NewReviewItem.module.scss';

export default function NewReviewItem({ review }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const userStatus = useSelector(selectUserStatus);
  const isAdmin = userStatus === 'manager' || userStatus === 'superadmin';
  //   const product = getProductById(review.productId);

  //   console.log(
  //     'search params into NewReviewItem >>:',
  //     searchParams.get('comments')
  //     );

  //   const review = {
  //     commentId: '65b3fbf8901517283f927b2b',
  //     productId: '65774bcfac9f4692259ceb3c',
  //     status: {
  //       approved: false,
  //       approvedBy: {
  //         userId: '',
  //         userName: 'Testing Name',
  //         userEmail: 'testing@email.com',
  //       },
  //       approvedAt: '2024-01-23T17:34:46.244+00:00',
  //     },
  //     owner: {
  //       userId: '655405b5f665faef65fc89fb',
  //       name: '',
  //       email: 'dolphin10001000@gmail.com',
  //       avatarURL:
  //         'https://res.cloudinary.com/dzkpbth3u/image/upload/v1700348297/avatars/655405b5f665faef65fc89fbneytiri-na39vi-avatar-7a244de.jpg.jpg',
  //     },
  //     text: 'Тут повинен бути текст коментаря. Тут повинен бути текст коментаря. Тут повинен бути текст коментаря',
  //     createdAt: '2024-01-26T18:37:44.869Z',
  //     reviewURL: [
  //       'https://res.cloudinary.com/dzkpbth3u/image/upload/v1705095147/reviews/655405b5f665faef65fc89fbavatar-neytiri-zoe-saldana.jpg.jpg',
  //       'https://res.cloudinary.com/dzkpbth3u/image/upload/v1705095148/reviews/655405b5f665faef65fc89fbavatar-neytiri-na39vi-7f7aff1.jpg.jpg',
  //       'https://res.cloudinary.com/dzkpbth3u/image/upload/v1705095149/reviews/655405b5f665faef65fc89fbneytiri-na39vi-avatar-7a244de.jpg.jpg',
  //     ],
  //   };

  return (
    <li className={styles.container}>
      <p className={styles.product}>{review.productName}</p>
      <div className={styles.author}>
        <Avatar
          src={review.owner.avatarURL}
          size="40px"
          marginLeft="0"
          marginRight="0"
          locked
        />
        <div>
          <p className={styles.user}>
            {review.owner.name || review.owner.email}
          </p>
          <p className={styles['post-date']}>
            {new Date(review.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <ReviewRating />
      <p className={styles.message}>{review.text}</p>
      {review.reviewURL.length > 0 && (
        <ReviewItemImageBox reviewURLs={review.reviewURL} />
      )}

      {isAdmin && (
        <ReviewItemAdminBar
          mode={searchParams.get('comments')}
          name={
            review?.status?.approvedBy?.userName ||
            review?.status?.approvedBy?.userEmail
          }
          date={new Date(review.status.approvedAt).toLocaleString()}
          ids={{
            productId: review.productId,
            commentId: review.commentId,
            textId: review.textId,
          }}
        />
      )}
    </li>
  );
}
