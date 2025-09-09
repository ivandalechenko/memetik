import gsap from 'gsap'
import './styles/App.scss'
import ArrowDown from './ArrowDown'
import Header from './Header'
import Hero from './Hero.jsx'
import VRParallaxCanvas from './VRParallaxCanvas.jsx'
import CoderParallaxCanvas from './CoderParallaxCanvas.jsx'
import GirlParallaxCanvas from './GirlParallaxCanvas.jsx'
import NParallaxCanvas from './NParallaxCanvas.jsx'
import CarCityParallaxCanvas from './CarCityParallaxCanvas.jsx'
import ManCityParallaxCanvas from './ManCityParallaxCanvas.jsx'
import NoteManParallaxCanvas from './NoteManParallaxCanvas.jsx'
import CameraManParallaxCanvas from './CameraManParallaxCanvas.jsx'


import { useGSAP } from '@gsap/react';
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useEffect, useRef } from 'react'
import WorkType from './workType/WorkType.jsx'
import Footer from './Footer.jsx'
import { observer } from 'mobx-react-lite'
import parallaxStore from './stores/parallaxStore.js'
import Cases from './components/Cases/Cases.jsx'
import ModalGallery from './components/ModalGallery/ModalGallery.jsx'
import modalStore from './stores/modalStore.js'
import ModalMenu from './components/ModalMenu/ModalMenu.jsx'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

function App() {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: .5,
      effects: true
    })
    ScrollTrigger.refresh()
  }, [])


  return (

    <>
      <div className='AppWrapper' ref={wrapperRef}>
        <ArrowDown />
        <Header />
        {/* <Cases /> */}
        <div className='App' ref={contentRef}>
          {/* nigga */}
          <Hero />
          {/* carCity */}
          <WorkType componentName={'Branding'} from={'carCity'} to={'manCity'} />
          {/* manCity */}
          <WorkType componentName={'Illustrations'} from={'manCity'} to={'VR'} />
          <WorkType componentName={'CASES'} />
          {/* VR */}
          <WorkType componentName={'CGI'} from={'VR'} to={'noteMan'} />
          {/* noteMan */}
          <WorkType componentName={'Motion'} from={'noteMan'} to={'girl'} />
          {/* girl */}
          <WorkType componentName={'Animations'} from={'girl'} to={'coder'} />
          {/* coder */}
          <WorkType componentName={'Web'} from={'coder'} to={'cameraMan'} />
          <WorkType componentName={'PARTNERS'} />
          {/* cameraMan */}
          {/* <Footer /> */}
        </div>

        <NParallaxCanvas
          scale={parallaxStore.currentSlideScale}
          opacity={parallaxStore.currentSlide === 'nigga' ? 1 : 0}
        />
        <CarCityParallaxCanvas
          blur={parallaxStore.currentSlideBlur * 30}
          opacity={parallaxStore.currentSlide === 'carCity' ? 1 : 0}
          position={parallaxStore.currentSlideProgress}
        />
        <ManCityParallaxCanvas
          opacity={parallaxStore.currentSlide === 'manCity' ? 1 : 0}
          position={parallaxStore.currentSlideProgress}
        />
        <VRParallaxCanvas
          // <NoteManParallaxCanvas
          opacity={parallaxStore.currentSlide === 'VR' ? 1 : 0}
          position={parallaxStore.currentSlideProgress}
        />
        <NoteManParallaxCanvas
          opacity={parallaxStore.currentSlide === 'noteMan' ? 1 : 0}
          position={parallaxStore.currentSlideProgress}
        />
        <GirlParallaxCanvas
          opacity={parallaxStore.currentSlide === 'girl' ? 1 : 0}
          position={parallaxStore.currentSlideProgress}
        />
        <CoderParallaxCanvas
          opacity={parallaxStore.currentSlide === 'coder' ? 1 : 0}
          position={parallaxStore.currentSlideProgress}
        />
        <CameraManParallaxCanvas
          opacity={parallaxStore.currentSlide === 'cameraMan' ? 1 : 0}
          position={parallaxStore.currentSlideProgress}
        />

        {/* <ModalGallery img={modalStore.img} /> */}
        {/* <ModalMenu /> */}
      </div>
    </>
  )
}

export default observer(App)
