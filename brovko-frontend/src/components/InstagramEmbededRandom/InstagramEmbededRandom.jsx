import embeddedCode from './instaEbeded';
import Heading from 'shared/components/Heading/Heading';
import styles from './weInInstagram.module.scss';

const InstagramEmbededRandom = () => {
  const embeddedCodeLength = embeddedCode.length;
  const setEmbed = Math.floor(Math.random() * embeddedCodeLength);
  return (
    <>
      <Heading>Ми в Instagram</Heading>
      <div
        dangerouslySetInnerHTML={{ __html: embeddedCode[setEmbed] }}
        className={styles.cont}
      />
    </>
  );
};

export default InstagramEmbededRandom;
