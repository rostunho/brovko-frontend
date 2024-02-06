import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './DoubleRangeSlider.module.scss';

const DoubleRangeSlider = ({ onSubmit, min, max }) => {
  const [sliderMinPrice, setSliderMinPrice] = useState(min || 0);
  const [sliderMaxPrice, setSliderMaxPrice] = useState(max || 100);

  const [fromInputValue, setFromInputValue] = useState(sliderMinPrice);
  const [toInputValue, setToInputValue] = useState(sliderMaxPrice);

  const fromSlider = useRef(null);
  const toSlider = useRef(null);
  const fromInput = useRef(null);
  const toInput = useRef(null);
  const controlSlider = useRef(null);

  useEffect(() => {
    if (min !== undefined) {
      setSliderMinPrice(min);
      setFromInputValue(min);
    }
    if (max !== undefined) {
      setSliderMaxPrice(max);
      setToInputValue(max);
    }
  }, [min, max]);

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

    const rangeDistance = toSlider.current.max - toSlider.current.min;
    const fromPosition = sliderMinPrice - toSlider.current.min;
    const toPosition = sliderMaxPrice - toSlider.current.min;

    controlSlider.current.style.background = `linear-gradient(
    to right,
    #C6C6C6 0%,
    #C6C6C6 ${(fromPosition / rangeDistance) * 100}%,
    #f3a610 ${(fromPosition / rangeDistance) * 100}%,
    #f3a610 ${(toPosition / rangeDistance) * 100}%,
    #C6C6C6 ${(toPosition / rangeDistance) * 100}%,
    #C6C6C6 100%
  )`;
  }, [sliderMinPrice, sliderMaxPrice, controlSlider, toSlider]);

  const setToggleAccessible = useCallback(() => {
    if (!toSlider.current) return;

    if (Number(toInput.current.value) <= 0) {
      toSlider.current.style.zIndex = 2;
    } else {
      toSlider.current.style.zIndex = 0;
    }
  }, [toInput, toSlider]);

  // const controlFromInput = useCallback(() => {
  //   const [fromValue, toValue] = getParsed(fromInput, toInput);
  //   fillSlider(fromValue, toValue);
  //   if (fromValue > toValue) {
  //     fromSlider.current.value = toValue;
  //     setSliderMinPrice(toValue);
  //     setFromInputValue(toValue);
  //   } else {
  //     fromSlider.current.value = fromValue;
  //     setSliderMinPrice(fromValue);
  //     setFromInputValue(fromValue);
  //   }
  // }, [getParsed, fillSlider, fromInput, fromSlider, toInput]);

  // const controlToInput = useCallback(() => {
  //   const [fromValue, toValue] = getParsed(fromInput, toInput);
  //   fillSlider(fromValue, toValue);
  //   setToggleAccessible();
  //   if (fromValue <= toValue) {
  //     toSlider.current.value = toValue;
  //     setSliderMaxPrice(toValue);
  //     setToInputValue(toValue);
  //   } else {
  //     toInput.current.value = fromValue;
  //     toSlider.current.value = fromValue;
  //     setToInputValue(fromValue);
  //   }
  // }, [
  //   getParsed,
  //   fillSlider,
  //   setToggleAccessible,
  //   fromInput,
  //   toInput,
  //   toSlider,
  // ]);

  const controlFromSlider = useCallback(() => {
    const [fromValue, toValue] = getParsed(fromSlider, toSlider);
    fillSlider(fromValue, toValue);
    if (fromValue > toValue) {
      fromSlider.current.value = toValue;
      fromInput.current.value = toValue;
      setSliderMinPrice(toValue);
      setFromInputValue(toValue);
    } else {
      fromInput.current.value = fromValue;
      setSliderMinPrice(fromValue);
      setFromInputValue(fromValue);
    }
  }, [getParsed, fillSlider, fromInput, fromSlider, toSlider]);

  const controlToSlider = useCallback(() => {
    const [fromValue, toValue] = getParsed(fromSlider, toSlider);
    fillSlider(fromValue, toValue);
    setToggleAccessible();
    if (fromValue <= toValue) {
      toSlider.current.value = toValue;
      toInput.current.value = toValue;
      setSliderMaxPrice(toValue);
      setToInputValue(toValue);
    } else {
      toInput.current.value = fromValue;
      toSlider.current.value = fromValue;
      setToInputValue(fromValue);
    }
  }, [
    getParsed,
    fillSlider,
    setToggleAccessible,
    fromSlider,
    toInput,
    toSlider,
  ]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(sliderMinPrice, sliderMaxPrice);
  };

  useEffect(() => {
    fillSlider();
    setToggleAccessible();
  }, [fillSlider, setToggleAccessible]);

  return (
    <div className={styles.range_container}>
      <form className={styles.form_control} onSubmit={handleSubmit}>
        <div className={styles.form_control_container}>
          <input
            className={styles.form_control_container__time__input}
            type="number"
            id={styles.fromInput}
            value={fromInputValue}
            min={min}
            max={max}
            ref={fromInput}
            step="0.1"
            onChange={e => {
              setFromInputValue(e.target.value);
              // controlFromInput();
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
            value={toInputValue}
            min={min}
            max={max}
            ref={toInput}
            step="0.1"
            onChange={e => {
              setToInputValue(e.target.value);
              // controlToInput();
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
          value={sliderMinPrice}
          min={min}
          max={max}
          ref={fromSlider}
          onChange={controlFromSlider}
        />
        <input
          id={styles.toSlider}
          type="range"
          value={sliderMaxPrice}
          min={min}
          max={max}
          ref={toSlider}
          onChange={controlToSlider}
        />
      </div>
      {/* <div className={styles.slidersWrapper}> */}

      {/* </div> */}
    </div>
  );
};

export default DoubleRangeSlider;
