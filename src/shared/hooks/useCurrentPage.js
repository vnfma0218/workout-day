import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useCurrentPage(
  setDropdownIsActive,
  setSidebarIsActive
) {
  const [crrentPage, setCurrentPage] = useState();
  const location = useLocation();
  useEffect(() => {
    setSidebarIsActive(false);
    setDropdownIsActive(false);
    switch (location.pathname) {
      case '/':
        setCurrentPage(null);
        break;
      case '/calendar':
        setCurrentPage('My Calendar');
        break;

      case '/record':
        setCurrentPage('Today`s Workout');
        break;

      case '/userinfo':
        setCurrentPage('My Page');
        break;

      case '/chart':
        setCurrentPage('Chart');
        break;

      case '/photo':
        setCurrentPage('Workout Photo');
        break;
      case '/diet':
        setCurrentPage('Diet Photo');
        break;
      case '/auth':
        setCurrentPage('Login');
        break;

      default:
        break;
    }
  }, [location, setSidebarIsActive, setDropdownIsActive]);

  return crrentPage;
}
