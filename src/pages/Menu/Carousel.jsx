import './Menu.css';
import { useState } from 'react';

export const Carousel = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // move to the next photo
  // if we are at the end, go to the first photo
  const next = () => {
    setCurrentIndex((currentIndex + 1) % photos.length);
  };

  setInterval(next, 10000);

  // move to the previous photo
  // if we are at the beginning, go to the last photo
  const prev = () => {
    setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
  };
  return (
    <div className="carousel">
      <div className="slider-container">
        {photos.map((photo) => (
          <div
            key={photo?.id}
            // if the photo is the current photo, show it
            className={photos[currentIndex]?.id === photo?.id ? 'fade' : 'slide fade'}>
            <img src={photo?.url} alt={photo?.title} className="photo" />
            {/* <div className="caption">{photo.title}</div> */}
          </div>
        ))}

        {/* Previous button */}
        <button onClick={prev} className="prev">
          &lt;
        </button>

        {/* Next button */}
        <button onClick={next} className="next">
          &gt;
        </button>
      </div>
    </div>
  );
};
