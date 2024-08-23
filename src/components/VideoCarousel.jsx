import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles

const VideoCarousel = ({ videoSrc }) => {
  return (
    <Carousel autoplay effect="fade" dotPosition="bottom" dots={false} arrows={false} style={{ marginTop: '-20px' }}>
      <div>
        <video
          src={videoSrc}
          loop
          autoPlay
          muted
          style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
        />
      
      </div>
    </Carousel>
  );
};

export default VideoCarousel;
