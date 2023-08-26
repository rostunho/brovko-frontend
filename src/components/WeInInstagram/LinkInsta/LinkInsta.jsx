import styles from './linkInsta.module.scss';
import Image from 'shared/components/Image';
import brovko1 from './brovko1.jpg';
import brovko2 from './brovko2.jpg';
import brovko3 from './brovko3.jpg';
import brovko4 from './brovko4.jpg';
import InstagramIconWe from 'shared/icons/InstagramIconWe';

const LinkInsta = () => {
  return (
    <>
      <a
        className={styles.imageContainer}
        href="https://www.instagram.com/brovko.pet/"
      >
  <div className={styles.imagesWrapper}>
          <Image src={brovko1} />
          <Image src={brovko2} />
          <Image src={brovko3} />
          <Image src={brovko4} />
        </div>
        <div className={styles.iconContainer}>
          <InstagramIconWe />
        </div>
      </a>
    </>
  );
};

export default LinkInsta;
