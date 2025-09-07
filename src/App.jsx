import gsap from 'gsap'
import './styles/App.scss'
import ArrowDown from './ArrowDown'
import Header from './Header'
import Hero from './Hero.jsx'
import VRParallaxCanvas from './VRParallaxCanvas.jsx'


import { useGSAP } from '@gsap/react';
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useEffect, useRef } from 'react'
import WorkType from './workType/WorkType.jsx'
import { observer } from 'mobx-react-lite'
import parallaxStore from './stores/parallaxStore.js'
import Cases from './components/Cases/Cases.jsx'
import ModalGallery from './components/ModalGallery/ModalGallery.jsx'
import modalStore from './stores/modalStore.js'

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

    <div className='AppWrapper' ref={wrapperRef}>
      <ArrowDown />
      <Header />
      <Cases />
      <div className='App' ref={contentRef}>
        {/* <Hero /> */}
        {/* <ContentCreation /> */}
        {/* <TestBlock100vh /> */}

        {/* <WorkType componentName={'Branding'} />
        <WorkType componentName={'CGI'} />
        <WorkType componentName={'Animations'} />
        <WorkType componentName={'CASES'} />
        <WorkType componentName={'Motion'} />
        <WorkType componentName={'Web'} />
        <WorkType componentName={'Illustrations'} />
        <WorkType componentName={'PARTNERS'} /> */}

      </div>


      {/* <VRParallaxCanvas
        blur={parallaxStore.currentSlideBlur * 30}
        opacity={parallaxStore.currentSlide === 'vr' ? 1 : 0}
        position={parallaxStore.currentSlideProgress}
      /> */}
      {/* {parallaxStore.currentSlide === 'vr' && <VRParallaxCanvas blur={parallaxStore.currentSlideBlur * 30} />} */}
      {/* {parallaxStore.currentSlide === 'vr' && <VRParallaxCanvas blur={parallaxStore.currentSlideBlur * 30} />} */}
      <ModalGallery img={modalStore.img} />
    </div>
  )
}

export default observer(App)
