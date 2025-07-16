import React, { useState, useEffect } from 'react';
import ButtonComponent from '../common/ButtonComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SlideComponent = ({ children }) => {
  const slides = React.Children.toArray(children);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div>
        {slides[current]}
      </div>
      <div style={{ position: 'absolute', left: -25, top: '45%' }}>
        <ButtonComponent
          text=""
          leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
          onClick={prevSlide}
          className='w-[50px] h-[50px] rounded-full flex items-center justify-center'
          bgColor='bg-white'
        />
      </div>
      <div style={{ position: 'absolute', right: -25, top: '45%' }}>
        <ButtonComponent
          text=""
          rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
          onClick={nextSlide}
          className='w-[50px] h-[50px] rounded-full flex items-center justify-center'
          bgColor='bg-white'
        />
      </div>
    </div>
  );
};

export default SlideComponent;
