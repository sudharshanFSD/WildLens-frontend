import React from 'react';
import styled from 'styled-components';
import VideoCarousel from '../components/VideoCarousel';
import Content from '../components/Content';
import QuotesWithImages from '../components/QuotesWithImages';
import AppFooter from '../components/Footer';
import homeVideo from '../../public/images/carousel.mp4';
import TopPackages from '../components/TopPackages';
import Packages from '../components/Packages';

// Styled component with media query
const FullWidthDiv = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  @media (min-width: 769px) {
    width: auto;
    margin: auto;
    padding: initial;
    box-sizing: content-box;
  }
`;

function Home() {
  return (
    <div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      <FullWidthDiv>
        <VideoCarousel videoSrc={homeVideo}/>
        <Content/>
        <QuotesWithImages/>
        <TopPackages/>
        <Packages/>
        <AppFooter/>
      </FullWidthDiv>
    </div>
  );
}

export default Home;
