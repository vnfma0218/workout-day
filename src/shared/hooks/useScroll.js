import { useState, useEffect } from 'react';

export function useScroll() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState();

  function zoom(event) {
    setScrollDirection(event.deltaY > 0 ? 'down' : 'up');
    if (event.deltaY > 0) {
      setCurrentIndex((prev) => {
        if (prev === 2) return;
        return prev++;
      });
    } else {
      setCurrentIndex((prev) => {
        if (prev === 0) return;
        return prev--;
      });
    }
  }

  useEffect(() => {
    window.addEventListener('wheel', zoom);
    return () => {
      window.removeEventListener('wheel', zoom);
    };
  });

  return {
    scrollDirection,
    currentIndex,
  };
}
