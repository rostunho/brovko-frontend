import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';
import styles from './NewDescription.module.scss';

export default function NewDescription({
  children,
  handler,
  className,
  ...props
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [firstSentence, setFirstSentence] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const checkResult = checkSearchParams();

    checkResult
      ? setSearchParams({ desc: checkResult })
      : setSearchParams({ desc: 'collapse' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mode = searchParams.get('desc');
    mode === 'full'
      ? setShowFullDescription(true)
      : setShowFullDescription(false);
  }, [searchParams]);

  useEffect(() => {
    children && extractFirstSentence(children);
  }, [children]);

  const checkSearchParams = () => {
    const desc = searchParams.get('desc');
    return desc;
  };

  const handleFullDescription = () => {
    setSearchParams(prevSearchParams => {
      const prevMode = prevSearchParams.get('desc');

      prevMode === 'full'
        ? prevSearchParams.set('desc', 'collapse')
        : prevSearchParams.set('desc', 'full');

      return prevSearchParams;
    });
  };

  const extractFirstSentence = text => {
    const targetText = text.match(/[^.]*\./);

    if (targetText) {
      setFirstSentence(targetText);
    } else {
      setFirstSentence(text);
    }
  };

  return (
    <div className={`${styles.container} ${className ? className : ''}`}>
      <h3 className={styles.title}>Опис:</h3>
      {showFullDescription ? (
        <p className={styles.text}>{children}</p>
      ) : (
        <p>{firstSentence}</p>
      )}
      {/* <button onClick={handleFullDescription}> +++ | --- </button> */}
      <ReadMoreButton
        className={styles['read-more']}
        onClick={handleFullDescription}
      >
        {showFullDescription ? 'Згорнути' : 'Читати повністю'}
      </ReadMoreButton>
    </div>
  );
}
