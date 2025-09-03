import gsap from 'gsap'
import './styles/App.scss'
import ArrowDown from './ArrowDown'
import Header from './Header'
import Hero from './Hero.jsx'
import NParallaxCanvas from './NParallaxCanvas.jsx'


import { useGSAP } from '@gsap/react';
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useRef } from 'react'
import WorkType from './WorkType.jsx'

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
      <div className='App' ref={contentRef}>
        <Hero />
        {/* <ContentCreation /> */}
        {/* <TestBlock100vh /> */}
        <WorkType componentName={'CGI/3D'} />
      </div>

      <NParallaxCanvas
      // blur={30 * (1 - gspop(progress, hideLogoFrom, hideLogoTo))}
      // position={.5 + 1 / 2}
      />
    </div>
  )
}

export default App
