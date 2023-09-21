// NavigationLogic.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const useNavigationLogic = (initialState, navigateTo) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isExpandedFromLocation = location.state?.[initialState] || false;
  const backLinkHref = location.state?.from ?? navigateTo;

  // Оновлення стану при завантаженні компонента
  useEffect(() => {
    if (!isExpandedFromLocation) {
      // Перейти назад на попередню сторінку
      navigate(navigateTo, { state: { [initialState]: false } });
    }
  }, [navigate, isExpandedFromLocation, navigateTo, initialState]);

  return backLinkHref;
};

export default useNavigationLogic;
