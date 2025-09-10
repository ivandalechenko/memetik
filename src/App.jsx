import gsap from 'gsap'
import './styles/App.scss'
import ArrowDown from './ArrowDown'
import Header from './Header'
import Hero from './Hero.jsx'

import { useGSAP } from '@gsap/react';
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useEffect, useRef, useState } from 'react'
import WorkType from './workType/WorkType.jsx'
import { observer } from 'mobx-react-lite'
import Cases from './components/Cases/Cases.jsx'
import ModalGallery from './components/ModalGallery/ModalGallery.jsx'
import modalStore from './stores/modalStore.js'
import ModalMenu from './components/ModalMenu/ModalMenu.jsx'
import GetInTouch from './components/GetInTouch/GetInTouch.jsx'
import { autorun } from 'mobx'
import Canvases from './Canvases.jsx'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

function App() {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const smootherRef = useRef(null)

  // useGSAP(() => {
  //   smootherRef.current = ScrollSmoother.create({
  //     wrapper: wrapperRef.current,
  //     content: contentRef.current,
  //     smooth: 0.5,
  //     effects: true,
  //   })

  //   autorun(() => {
  //     // const isBlocked = myStore.isScrollBlocked
  //     const isBlocked = modalStore.isOpen
  //     smootherRef.current.paused(isBlocked)
  //   })
  // }, [])


  return (

    <>
      <div className='AppWrapper' ref={wrapperRef}>
        <ArrowDown />
        <Header />
        {/* <Cases /> */}
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


        <ModalGallery img={modalStore.img} />
        {/* <ModalMenu /> */}
      </div>
    </>
  )
}

export default observer(App)
