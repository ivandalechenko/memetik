import gsap from 'gsap'
import './styles/App.scss'
import ArrowDown from './ArrowDown'
import Header from './Header'
import Hero from './Hero.jsx'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import WorkType from './workType/WorkType.jsx'
import { observer } from 'mobx-react-lite'
import MediaViewer from './components/MediaViewer/MediaViewer'
import imgViewerStore from './stores/imgViewerStore.js'
import GetInTouch from './components/GetInTouch/GetInTouch.jsx'
import { autorun } from 'mobx'
import Canvases from './Canvases.jsx'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

function App() {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const smootherRef = useRef(null)

  useGSAP(() => {
    const isMobile =
      ScrollTrigger.isTouch ||
      window.matchMedia('(hover: none), (pointer: coarse)').matches

    if (!isMobile) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 0.5,
        effects: true,
      })

      autorun(() => {
        const isBlocked = imgViewerStore.isOpen
        smootherRef.current?.paused?.(isBlocked)
      })
    }

    return () => {
      smootherRef.current?.kill()
      smootherRef.current = null
    }
  }, [])

  return (
    <>
      <div className='AppWrapper' ref={wrapperRef}>
        <ArrowDown />
        <Header />
        <div className='App' ref={contentRef}>
          <Hero />
          <WorkType componentName={'Branding'} from={'carCity'} to={'manCity'} />
          <WorkType componentName={'Illustrations'} from={'manCity'} to={'VR'} />
          <WorkType componentName={'CASES'} />
          <WorkType componentName={'CGI'} from={'VR'} to={'noteMan'} />
          <WorkType componentName={'Motion'} from={'noteMan'} to={'girl'} />
          <WorkType componentName={'Animations'} from={'girl'} to={'coder'} />
          <WorkType componentName={'Web'} from={'coder'} to={'cameraMan'} />
          <WorkType componentName={'PARTNERS'} />
          <GetInTouch />
        </div>
        <Canvases />
        <MediaViewer img={imgViewerStore.img} />
      </div>
    </>
  )
}

export default observer(App)
