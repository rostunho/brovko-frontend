import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './DoubleRangeSlider.module.scss';

const DoubleRangeSlider = ({ onSubmit, min, max, keyword }) => {
  const [minPriceLimit, setMinPriceLimit] = useState(min || 0);
  const [maxPriceLimit, setMaxPriceLimit] = useState(max || 100);

  const [minSelectedValue, setMinSelectedValue] = useState(minPriceLimit);
  const [maxSelectedValue, setMaxSelectedValue] = useState(maxPriceLimit);
  const [minDigitValue, setMinDigitValue] = useState(minPriceLimit);
  const [maxDigitValue, setMaxDigitValue] = useState(maxPriceLimit);
  const [minRangeValue, setMinRangeValue] = useState(minPriceLimit);
  const [maxRangeValue, setMaxRangeValue] = useState(maxPriceLimit);

  // const [sliderMinPrice, setSliderMinPrice] = useState(min || 0);
  // const [sliderMaxPrice, setSliderMaxPrice] = useState(max || 100);
  // const [fromInputValue, setFromInputValue] = useState(sliderMinPrice);
  // const [toInputValue, setToInputValue] = useState(sliderMaxPrice);

  const fromSlider = useRef(null);
  const toSlider = useRef(null);
  const fromInput = useRef(null);
  const toInput = useRef(null);
  const controlSlider = useRef(null);

  // useEffect(() => {
  //   if (min !== undefined) {
  //     setSliderMinPrice(min);
  //     setFromInputValue(min);
  //   }
  //   if (max !== undefined) {
  //     setSliderMaxPrice(max);
  //     setToInputValue(max);
  //   }
  // }, [min, max]);

  useEffect(() => {
    setMinPriceLimit(min);
    setMaxPriceLimit(max);
  }, [min, max]);

  useEffect(() => {
    setMinSelectedValue(minPriceLimit);
  }, [minPriceLimit]);

  useEffect(() => {
    setMaxSelectedValue(maxPriceLimit);
  }, [maxPriceLimit]);

  useEffect(() => {
    setMinDigitValue(minSelectedValue);
    setMinRangeValue(minSelectedValue);
  }, [minSelectedValue]);

  useEffect(() => {
    setMaxDigitValue(maxSelectedValue);
    setMaxRangeValue(maxSelectedValue);
  }, [maxSelectedValue]);

  const getParsed = useCallback((currentFrom, currentTo) => {
    console.log('getParsed works');
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

    const rangeDistance = max - min;

    if (!rangeDistance) {
      controlSlider.current.style.background = '#C6C6C6';
      return;
    }

    const sliderWidth = toSlider.current.offsetWidth;
    const fromPosition =
      ((minSelectedValue - min) / rangeDistance) * (sliderWidth - 15);
    const toPosition = ((maxSelectedValue - min) / rangeDistance) * sliderWidth;

    // console.log('sliderWidth :>> ', sliderWidth);
    // console.log('rangeDistance :>> ', rangeDistance);
    // console.log('fromPosition :>> ', fromPosition);
    // console.log('toPosition :>> ', toPosition);

    controlSlider.current.style.background = `linear-gradient(
    to right,
    #C6C6C6 0%,
    #C6C6C6 ${(fromPosition / sliderWidth) * 100}%,
    #f3a610 ${(fromPosition / sliderWidth) * 100}%,
    #f3a610 ${(toPosition / sliderWidth) * 100}%,
    #C6C6C6 ${(toPosition / sliderWidth) * 100}%,
    #C6C6C6 100%
  )`;
  }, [max, min, minSelectedValue, maxSelectedValue]);

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
    // if (fromValue > toValue) {
    //   fromSlider.current.value = toValue;
    //   fromInput.current.value = toValue;
    //   setSliderMinPrice(toValue);
    //   setFromInputValue(toValue);
    // } else {
    //   fromInput.current.value = fromValue;
    //   setSliderMinPrice(fromValue);
    //   setFromInputValue(fromValue);
    // }
  }, [getParsed, fillSlider, fromSlider, toSlider]);

  const controlToSlider = useCallback(() => {
    const [fromValue, toValue] = getParsed(fromSlider, toSlider);
    fillSlider(fromValue, toValue);
    setToggleAccessible();
    // if (fromValue <= toValue) {
    //   toSlider.current.value = toValue;
    //   toInput.current.value = toValue;
    //   setSliderMaxPrice(toValue);
    //   setToInputValue(toValue);
    // } else {
    //   toInput.current.value = fromValue;
    //   toSlider.current.value = fromValue;
    //   setToInputValue(fromValue);
    // }
  }, [getParsed, fillSlider, setToggleAccessible, fromSlider, toSlider]);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   onSubmit(sliderMinPrice, sliderMaxPrice);
  // };

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

  // if (max === min) {
  //   return `За пошуком "${keyword}" усі продукти лише по ${min} гривень`;
  // }

  return (
    <div className={styles.range_container}>
      <form
        className={styles.form_control}
        // onSubmit={handleSubmit}
        onSubmit={onOkClick}
      >
        <div className={styles.form_control_container}>
          <input
            className={styles.form_control_container__time__input}
            type="number"
            id={styles.fromInput}
            // value={fromInputValue}
            value={minDigitValue || 0}
            // min={min}
            min={minPriceLimit}
            // max={max}
            max={maxPriceLimit}
            ref={fromInput}
            step="0.1"
            // onChange={e => {
            //   setFromInputValue(e.target.value);
            //   // controlFromInput();
            // }}
            onChange={e => setMinDigitValue(Number(e.target.value))}
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
            // value={toInputValue}
            // defaultValue={minPriceLimit}
            value={maxDigitValue || 100}
            min={minPriceLimit}
            max={maxPriceLimit}
            ref={toInput}
            step="0.1"
            // onChange={e => {
            //   setToInputValue(e.target.value);
            //   // controlToInput();
            // }}
            onChange={e => setMaxDigitValue(Number(e.target.value))}
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
          // onClick={onOkClick}
        >
          Ok
        </button>
      </form>
      <div ref={controlSlider} className={styles.sliders_control}>
        <input
          id={styles.fromSlider}
          type="range"
          value={minRangeValue || 0}
          min={minPriceLimit}
          max={maxPriceLimit}
          ref={fromSlider}
          // onChange={controlFromSlider}
          onChange={e => {
            if (e.target.value > maxRangeValue) {
              return;
            }
            setMinSelectedValue(Number(e.target.value));
            // setMinRangeValue(Number(e.target.value));
            controlFromSlider();
          }}
        />
        <input
          id={styles.toSlider}
          type="range"
          value={maxRangeValue || 100}
          min={minPriceLimit}
          max={maxPriceLimit}
          ref={toSlider}
          // onChange={controlToSlider}
          onChange={e => {
            if (e.target.value < minRangeValue) {
              return;
            }
            setMaxSelectedValue(Number(e.target.value));
            // setMaxRangeValue(Number(e.target.value));
            controlToSlider();
          }}
        />
      </div>
      {/* <div className={styles.slidersWrapper}> */}

      {/* </div> */}
    </div>
  );
};

export default DoubleRangeSlider;
