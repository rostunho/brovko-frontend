import { useState, useEffect } from 'react';

export default function useFadeOut(ms) {
  const [isVisible, setIsVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  const showComponent = () => {
    setIsVisible(true);
    setFadeOut(false);
  };

  const removeComponent = async () => {
    setFadeOut(true);

    const id = setTimeout(() => {
      setIsVisible(false);
      setFadeOut(false);
    }, ms);

    setTimerId(id);
  };

  const toggleShowComponent = async condition => {
    if (condition && !isVisible && !fadeOut) {
      showComponent();

      return;
    }

    if (!condition) {
      if (timerId) {
        clearTimeout(timerId);
      }
      await removeComponent();
    }
  };

  return [isVisible, fadeOut, toggleShowComponent];
}
