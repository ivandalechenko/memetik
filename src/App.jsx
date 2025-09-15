import gsap from 'gsap'
import './styles/App.scss'
import ArrowDown from './ArrowDown'
import Header from './Header'
import Hero from './Hero.jsx'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import WorkType from './workType/WorkType.jsx'
import { observer } from 'mobx-react-lite'
import MediaViewer from './components/MediaViewer/MediaViewer'
import imgViewerStore from './stores/imgViewerStore.js'
import GetInTouch from './components/GetInTouch/GetInTouch.jsx'
import Cases from './components/Cases/Cases.jsx'
import { autorun } from 'mobx'
import Canvases from './Canvases.jsx'
import { smoothScrollTo } from "./scroller.js";
import parallaxStore from './stores/parallaxStore.js'
import pathStore from './stores/PathStore.js'

const DELAY_MS = 1000;
const OFFSET = 100;

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

function App() {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const smootherRef = useRef(null)

  // Плавный скролл и скролл с сайдбара до блока
  useGSAP(() => {
    const isMobile = ScrollTrigger.isTouch || window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (!isMobile) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 0.5,
        effects: true,
      });
      autorun(() => {
        const isBlocked = imgViewerStore.isOpen;
        smootherRef.current?.paused?.(isBlocked);
      });
    } else {
      // выключаем нативный smooth везде
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
    }

    // НИЖЕ ВСЁ ЧТО ПО СКРОЛЛУ
    const onAnchorClick = (e) => {
      const a = e.target.closest('a[href^="#"]:not([href="#"])');
      if (!a) return;

      const href = a.getAttribute('href');
      const className = decodeURIComponent(href).slice(1)
      if (!className) return

      e.preventDefault();
      parallaxStore.scrollBlock(3000)

      setTimeout(() => {
        scrollToClass(className)
      }, DELAY_MS);
    };

    document.addEventListener('click', onAnchorClick, { passive: false });

    return () => {
      document.removeEventListener('click', onAnchorClick);
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  const scrollToClass = (className) => {
    const target = document.querySelector(`.${className}`);
    if (!target) return;
    parallaxStore.scrollBlock(3000)
    smoothScrollTo(`.${[...target.classList][0]}`)
    pathStore.setPath(`/${[...target.classList][0]}`)
  }

  useEffect(() => {
    if (['BrandingAndNarrative', 'Illustrations2d', 'CgiAnd3d', 'MotionDesign', 'Animations', 'WebAndAppDesign'].includes(pathStore.getPath()[0])) {
      scrollToClass(pathStore.getPath()[0])
    }
  }, [])

  useEffect(() => {
    pathStore.updatePath()
  }, [window.location.pathname])

  useEffect(() => {
    if (pathStore.getPath()[0] === 'cases') {
      setshowCases(true)
    } else {
      setshowCases(false)
    }
  }, [pathStore.path])

  const [showCases, setshowCases] = useState(false);


  return (
    <div className='App_wrapper' ref={wrapperRef}>
      <ArrowDown />
      <Header />
      <div className='App' ref={contentRef}>
        {showCases ? <>
          <Cases />
        </> : <>
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
        </>}
      </div>
      {/* <Canvases test /> */}
      <Canvases />
      <MediaViewer img={imgViewerStore.img} />
    </div>
  )
}

export default observer(App)
