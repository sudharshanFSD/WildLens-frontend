import React from 'react'
import VideoCarousel from '../components/VideoCarousel'
import  Content  from '../components/Content'
import QuotesWithImages from '../components/QuotesWithImages'

import AppFooter from '../components/Footer'
import homeVideo from '../../public/images/carousel.mp4'
import TopPackages from '../components/TopPackages'
import Packages from '../components/Packages'

function Home() {
  return (
    <div>
        <VideoCarousel videoSrc={homeVideo}/>
        <Content/>
        <QuotesWithImages/>
        <TopPackages/>
        <Packages/>
        <AppFooter/>
    </div>
  )
}

export default Home