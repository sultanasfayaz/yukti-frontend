import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import './gallery.css'; // Optional: for additional custom styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Sample images – replace with your actual image paths
import img1 from '../../Assets/gallery/1.JPG';
import img2 from '../../Assets/gallery/2.JPG';
import img3 from '../../Assets/gallery/3.JPG';
import img4 from '../../Assets/gallery/4.JPG';
import img5 from '../../Assets/gallery/5.JPG';
import img6 from '../../Assets/gallery/6.JPG';
import img7 from '../../Assets/gallery/7.JPG';
import img8 from '../../Assets/gallery/8.JPG';

const Gallery = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <section className="w-full py-10 px-4 bg-white min-h-screen">
      <h2 className="Gallery-text">Yukti Event Photos</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="max-w-4xl mx-auto"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="gallery-image-wrapper">
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="gallery-image"
              />
            </div>
          </SwiperSlide>

        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;