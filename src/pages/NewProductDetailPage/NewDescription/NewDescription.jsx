import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';
import styles from './NewDescription.module.scss';

export default function NewDescription({ children, className, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const descParam = searchParams.get('desc');
  const [firstSentence, setFirstSentence] = useState('');

  useEffect(() => {
    setInitialDescSearchParam('part');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    children && extractFirstSentence(children);
  }, [children]);

  const handleFullDescription = () => {
    setSearchParams(prevSearchParams => {
      const prevMode = prevSearchParams.get('desc');

      prevMode === 'full'
        ? prevSearchParams.set('desc', 'part')
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

  const setInitialDescSearchParam = value => {
    const existingDesc = searchParams.get('desc');
    console.log('existingDesc :>> ', existingDesc);
    const existingSearchParams = Object.fromEntries(searchParams.entries());
    console.log('existingSearchParams :>> ', existingSearchParams);

    existingDesc
      ? setSearchParams({ ...existingSearchParams, desc: existingDesc })
      : setSearchParams({ ...existingSearchParams, desc: value });
  };

  return (
    <div className={`${styles.container} ${className ? className : ''}`}>
      <h3 className={styles.title}>Опис:</h3>
      {descParam === 'full' ? (
        <p className={styles.text}>{children}</p>
      ) : (
        <p>{firstSentence}</p>
      )}
      <ReadMoreButton
        className={styles['read-more']}
        onClick={handleFullDescription}
      >
        {descParam === 'full' ? 'Згорнути' : 'Читати повністю'}
      </ReadMoreButton>
    </div>
  );
}