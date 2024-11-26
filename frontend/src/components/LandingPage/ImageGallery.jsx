import { useState, useEffect } from 'react';
import './ImageGallery.css';

// Importing images directly since they're in the 'src/images' directory
import articleDetailsImage from './images/article-details.png';
import createArticleImage from './images/Create-Article.png';
import homepageImage from './images/homepage.png';
import searchImage from './images/Search.png'

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Using the imported images directly
  const images = [
    articleDetailsImage,
    createArticleImage,
    homepageImage,
    searchImage
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval); 
  }, [images.length]);

  return (
    <div className="gallery-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide showing image ${index + 1}`}
          className={`gallery-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
