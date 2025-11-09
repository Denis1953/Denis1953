import React, { useState, useEffect, useRef } from 'react';
import landscape1 from '@/assets/landscape1.jpg';
import landscape2 from '@/assets/landscape2.jpg';
import landscape3 from '@/assets/landscape3.jpg';
import landscape4 from '@/assets/landscape4.jpg';
import landscape5 from '@/assets/landscape5.jpg';
import landscape6 from '@/assets/landscape6.jpg';

const originalImages = [
  '/lovable-uploads/Mairie_1400x300.jpg',
  '/lovable-uploads/AnatoleF_1300x300.jpg',
  '/lovable-uploads/253d938a-5dbf-4db1-a3dc-f693982fcb68.png',
  '/lovable-uploads/18531b1a-cf2a-458d-8966-4f89c62e238c.png',
  '/lovable-uploads/Cycl_1300x400.jpg',
  '/lovable-uploads/606be2f0-5dba-459d-a3c3-534cd3b81258.png',
  '/lovable-uploads/AnatoleF_1400x300.jpg',
  '/lovable-uploads/e087dc77-562f-470f-bb07-3e4c5ac0ff99.png',
  '/lovable-uploads/9c398cd8-7b08-4012-9031-c51f22a133c9.png'
];

// Create infinite loop by adding duplicates
const images = [
  ...originalImages.slice(-2), // Last 2 images at the beginning
  ...originalImages,
  ...originalImages.slice(0, 2) // First 2 images at the end
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start at the first real image
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 6000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Handle infinite loop reset
    if (currentIndex >= images.length - 2) {
      // At the end duplicates, reset to beginning
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(2);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 1000);
    } else if (currentIndex <= 1) {
      // At the beginning duplicates, reset to end
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(originalImages.length + 1);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 1000);
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(200px, 23.08vw, 300px)' }}>
      <div 
        className={`flex h-full ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={index === images.length - 1 ? "Fontaine" : `Paysage ${((index - 2 + originalImages.length) % originalImages.length) + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;