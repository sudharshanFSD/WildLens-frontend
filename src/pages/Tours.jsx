import React from 'react';
import nat from '../../public/images/nat.mp4';
import VideoCarousel from '../components/VideoCarousel';
import SearchAndSort from '../components/SearchAndSort';
import AppFooter from '../components/Footer';

function Tours() {
  return (
    <div
      style={{
        backgroundColor: '#f0f2f5', 
        minHeight: '100vh', 
        padding: '20px', 
      }}
    >
      <VideoCarousel videoSrc={nat} />
      <SearchAndSort />
      <AppFooter />
    </div>
  );
}

export default Tours;
