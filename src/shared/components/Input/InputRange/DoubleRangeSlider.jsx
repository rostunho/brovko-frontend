import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './DoubleRangeSlider.module.scss';

//  МОЖНА СКОРОТИТИ КІЛЬКІСТЬ СТЕЙТІВ, ПРАЦЮЮЧИ ЛИШЕ З ПРОПАМИ

const DoubleRangeSlider = ({ onSubmit, minLimit, maxLimit, min, max }) => {
  const [minPriceLimit, setMinPriceLimit] = useState(minLimit || 0);
  const [maxPriceLimit, setMaxPriceLimit] = useState(maxLimit || 100);

  const [minSelectedValue, setMinSelectedValue] = useState(min);
  const [maxSelectedValue, setMaxSelectedValue] = useState(max);
  const [minDigitValue, setMinDigitValue] = useState(min);
  const [maxDigitValue, setMaxDigitValue] = useState(max);
  const [minRangeValue, setMinRangeValue] = useState(min);
  const [maxRangeValue, setMaxRangeValue] = useState(max);

  const fromSlider = useRef(null);
  const toSlider = useRef(null);
  const fromInput = useRef(null);
  const toInput = useRef(null);
  const controlSlider = useRef(null);

  useEffect(() => {
    setMinPriceLimit(minLimit);
    setMaxPriceLimit(maxLimit);

    !min && setMinSelectedValue(minLimit);
    !max && setMaxSelectedValue(maxLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minLimit, maxLimit]);

  useEffect(() => {
    setMinDigitValue(minSelectedValue);
    setMinRangeValue(minSelectedValue);
  }, [minSelectedValue]);

  useEffect(() => {
    setMaxDigitValue(maxSelectedValue);
    setMaxRangeValue(maxSelectedValue);
  }, [maxSelectedValue]);

  const getParsed = useCallback((currentFrom, currentTo) => {
    const minPrice =
      currentFrom.current.value.trim() === ''
        ? null
        : parseFloat(currentFrom.current.value);
    const maxPrice =
      currentTo.current.value.trim() === ''
        ? null
        : parseFloat(currentTo.current.value);

    return [
      isNaN(minPrice) ? null : minPrice,
      isNaN(maxPrice) ? null : maxPrice,
    ];
  }, []);

  const fillSlider = useCallback(() => {
    if (!toSlider.current || !controlSlider.current) return;

    const rangeDistance = maxLimit - minLimit;

    if (!rangeDistance) {
      controlSlider.current.style.background = '#C6C6C6';
      return;
    }

    const sliderWidth = toSlider.current.offsetWidth;
    const fromPosition =
      ((minSelectedValue - minLimit) / rangeDistance) * (sliderWidth - 15);
    const toPosition =
      ((maxSelectedValue - minLimit) / rangeDistance) * sliderWidth;

    controlSlider.current.style.background = `linear-gradient(
    to right,
    #C6C6C6 0%,
    #C6C6C6 ${(fromPosition / sliderWidth) * 100}%,
    #f3a610 ${(fromPosition / sliderWidth) * 100}%,
    #f3a610 ${(toPosition / sliderWidth) * 100}%,
    #C6C6C6 ${(toPosition / sliderWidth) * 100}%,
    #C6C6C6 100%
  )`;
  }, [maxLimit, minLimit, minSelectedValue, maxSelectedValue]);

  const setToggleAccessible = useCallback(() => {
    if (!toSlider.current) return;

    if (Number(toInput.current.value) <= 0) {
      toSlider.current.style.zIndex = 2;
    } else {
      toSlider.current.style.zIndex = 0;
    }
  }, [toInput, toSlider]);

  const controlFromSlider = useCallback(() => {
    const [fromValue, toValue] = getParsed(fromSlider, toSlider);
    fillSlider(fromValue, toValue);
  }, [getParsed, fillSlider, fromSlider, toSlider]);

  const controlToSlider = useCallback(() => {
    const [fromValue, toValue] = getParsed(fromSlider, toSlider);
    fillSlider(fromValue, toValue);
    setToggleAccessible();
  }, [getParsed, fillSlider, setToggleAccessible, fromSlider, toSlider]);

  useEffect(() => {
    fillSlider();
    setToggleAccessible();
  }, [fillSlider, setToggleAccessible]);

  const onOkClick = e => {
    e.preventDefault();
    onSubmit && onSubmit(minSelectedValue, maxSelectedValue);
    setMinSelectedValue(minDigitValue);
    setMaxSelectedValue(maxDigitValue);
  };

  // if (maxLimit === minLimit) {
  //   return `Вартість усіх продуктів з такими параметрами пошуку ${minLimit} гривень`;
  // }

  return (
    <div className={styles.range_container}>
      <form className={styles.form_control} onSubmit={onOkClick}>
        <div className={styles.form_control_container}>
          <input
            className={styles.form_control_container__time__input}
            type="number"
            id={styles.fromInput}
            value={minDigitValue === undefined ? '' : minDigitValue}
            min={minPriceLimit}
            max={maxPriceLimit}
            ref={fromInput}
            step="0.1"
            onChange={e =>
              setMinDigitValue(
                e.target.value === '' ? undefined : Number(e.target.value)
              )
            }
            onBlur={e => {
              if (e.target.value < minPriceLimit) {
                setMinDigitValue(minPriceLimit);
              } else if (e.target.value > maxDigitValue) {
                setMinDigitValue(maxDigitValue);
              }
            }}
          />
        </div>
        <span aria-hidden="true" className={styles.slider_filter__divider}>
          -
        </span>
        <div className={styles.form_control_container}>
          <input
            className={styles.form_control_container__time__input}
            type="number"
            id={styles.toInput}
            value={maxDigitValue === undefined ? '' : maxDigitValue}
            min={minPriceLimit}
            max={maxPriceLimit}
            ref={toInput}
            step="0.1"
            onChange={e =>
              setMaxDigitValue(
                e.target.value === '' ? undefined : Number(e.target.value)
              )
            }
            onBlur={e => {
              if (e.target.value > maxPriceLimit) {
                setMaxDigitValue(maxPriceLimit);
              } else if (e.target.value < minDigitValue) {
                setMaxDigitValue(minDigitValue);
              }
            }}
          />
        </div>
        <button
          type="submit"
          className={`${styles.button} ${styles.button_color_accent} ${styles.button_size_small} ${styles.slider_filter__button}`}
        >
          Ok
        </button>
      </form>
      <div ref={controlSlider} className={styles.sliders_control}>
        <input
          id={styles.fromSlider}
          type="range"
          value={minRangeValue}
          min={minPriceLimit}
          max={maxPriceLimit}
          ref={fromSlider}
          onChange={e => {
            if (e.target.value > maxRangeValue) {
              return;
            }
            setMinSelectedValue(Number(e.target.value));
            controlFromSlider();
          }}
        />
        <input
          id={styles.toSlider}
          type="range"
          value={maxRangeValue}
          min={minPriceLimit}
          max={maxPriceLimit}
          ref={toSlider}
          onChange={e => {
            if (e.target.value < minRangeValue) {
              return;
            }
            setMaxSelectedValue(Number(e.target.value));
            controlToSlider();
          }}
        />
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
