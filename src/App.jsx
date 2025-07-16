import gsap from 'gsap'
import './App.scss'
import ArrowDown from './ArrowDown'
import Header from './Header'
import Hero from './Hero'
import ContentCreation from './ContentCreation.jsx'
import TestBlock100vh from './TestBlock100vh'


import { useGSAP } from '@gsap/react';
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

function App() {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1,
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
        <ContentCreation />
        <TestBlock100vh />
      </div>
    </div>
  )
}

export default App
