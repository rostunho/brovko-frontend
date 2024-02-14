import Image from 'shared/components/Image';
import styles from './NotFound.module.scss';
import smakolyk1 from './img/1.png';
import smakolyk2 from './img/2.png';
import smakolyk3 from './img/3.png';
import smakolyk4 from './img/4.png';
import smakolyk5 from './img/5.png';
import smakolyk6 from './img/6.png';
import Text from 'shared/components/Text/Text';

export default function NotFound() {
  const images = [
    smakolyk1,
    smakolyk2,
    smakolyk3,
    smakolyk4,
    smakolyk5,
    smakolyk6,
  ];
  const ramdomIndex = Math.floor(Math.random() * images.length);
  const ramdomImage = images[ramdomIndex];
  console.log(ramdomImage);
  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.textTop}>4</p>
        <div className={styles.spinWrapper}>
          <Image src={ramdomImage} className={styles.spinning} />
        </div>
        <p className={styles.textBottom}>4</p>
      </div>
      <Text className={styles.message}>Смаколик не знайдено</Text>
    </>
  );
}
