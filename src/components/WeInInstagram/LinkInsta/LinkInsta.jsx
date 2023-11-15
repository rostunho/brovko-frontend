import styles from './linkInsta.module.scss';
import Image from 'shared/components/Image';
import brovko1 from './brovko1.jpg';
import brovko2 from './brovko2.jpg';
import brovko3 from './brovko3.jpg';
import brovko4 from './brovko4.jpg';
import InstagramIconWe from 'shared/icons/InstagramIconWe';

const LinkInsta = () => {
  return (
    <a
      className={styles.imageContainer}
      href="https://www.instagram.com/brovko.pet/"
      target='_blank'
      rel='noopener noreferrer nofollow'
      aria-label='Ми в Instagram'
      title='Ми в Instagram'
    >
      <div className={styles.iconContainer}>
        <InstagramIconWe />
      </div>
      <div className={styles.imagesWrapper}>
        <div className={styles.imageWithFrame}>
          <Image src={brovko1} />
          <div className={styles.likeComent}></div>
        </div>
        <div className={styles.imageWithFrame}>
          <Image src={brovko2} />
        </div>
        <div className={styles.imageWithFrame}>
          <Image src={brovko3} />
        </div>
        <div className={styles.imageWithFrame}>
          <Image src={brovko4} />
        </div>
      </div>
    </a>
  );
};

export default LinkInsta;
