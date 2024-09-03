import { useState, useEffect } from 'react';
import styles from './TextSlider.module.css';

const TextSlider = ({ texts, duration = 10000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, duration);

    return () => clearInterval(slideInterval);
  }, [texts.length, duration]);

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${currentIndex * 100}%)`, transitionDuration: `${duration}ms` }}
      >
        {texts.map((text, index) => (
          <div key={index} className={styles.text}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextSlider;
