import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';
import styles from './NewDescription.module.scss';
import * as DOMPurify from 'dompurify';

export default function NewDescription({
  children,
  className,
  isMobile,
  ...props
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const descParam = searchParams.get('desc');
  const [firstSentence, setFirstSentence] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    isMobile
      ? setInitialDescSearchParam('part')
      : setInitialDescSearchParam('full');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    children && extractFirstSentence(children);
    const cleanedText = DOMPurify.sanitize(children);
    setText(cleanedText);
  }, [children]);

  const extractFirstSentence = text => {
    const cleanedText = DOMPurify.sanitize(text);
    const targetText = cleanedText.match(/.*?[.!?](?:\s|$)/);

    if (targetText) {
      setFirstSentence(targetText);
    } else {
      setFirstSentence(text);
    }
  };

  const setInitialDescSearchParam = value => {
    const existingDesc = descParam;
    const existingSearchParams = Object.fromEntries(searchParams.entries());

    existingDesc
      ? setSearchParams(
          { ...existingSearchParams, desc: existingDesc },
          { replace: true }
        )
      : setSearchParams(
          { ...existingSearchParams, desc: value },
          { replace: true }
        );
  };

  const handleViewMode = () => {
    setSearchParams(
      prevSearchParams => {
        const prevMode = prevSearchParams.get('desc');

        prevMode === 'full'
          ? prevSearchParams.set('desc', 'part')
          : prevSearchParams.set('desc', 'full');

        return prevSearchParams;
      },
      { replace: true }
    );
  };

  return (
    <div className={`${styles.container} ${className ? className : ''}`}>
      <h3 className={styles.title}>Опис:</h3>
      {descParam === 'full' || !isMobile ? (
        <div
          className={styles.descriptionWrapper}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      ) : (
        <div
          className={styles.descriptionWrapper}
          dangerouslySetInnerHTML={{ __html: firstSentence }}
        ></div>
      )}
      {isMobile && (
        <ReadMoreButton
          className={styles['read-more']}
          onClick={handleViewMode}
        >
          {descParam === 'full' ? 'Згорнути' : 'Читати повністю'}
        </ReadMoreButton>
      )}
    </div>
  );
}
