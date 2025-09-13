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
      // отключаем нативную плавность, чтоб не конфликтовала с GSAP
      document.documentElement.style.scrollBehavior = 'auto';
    }

    // якоря: задержка 1000ms и оффсет 100px выше
    const DELAY_MS = 1000;
    const OFFSET = 100;
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    const onAnchorClick = (e) => {
      const a = e.target.closest('a[href^="#"]:not([href="#"])');
      if (!a) return;

      const href = a.getAttribute('href');
      const target = document.querySelector(decodeURIComponent(href));
      if (!target) return;

      e.preventDefault();

      setTimeout(() => {
        const smoother = smootherRef.current;

        if (smoother) {
          // desktop + ScrollSmoother
          let y = smoother.offset(target, 'top top') - OFFSET;
          if (y < 0) y = 0;
          smoother.scrollTo(y, true);
        } else {
          // mobile / без Smoother
          const y = Math.max(window.pageYOffset + target.getBoundingClientRect().top - OFFSET, 0);

          gsap.to(window, {
            duration: 0.9,
            scrollTo: y,
            ease: 'power1.out',
            onComplete: () => {
              // iOS: фикс "прыжка" из-за коллапса адресной строки
              if (isiOS) {
                setTimeout(() => window.scrollTo({ top: y, behavior: 'auto' }), 50);
                setTimeout(() => window.scrollTo({ top: y, behavior: 'auto' }), 400);
              }
            }
          });
        }

        history.pushState(null, '', href);
      }, DELAY_MS);
    };

    document.addEventListener('click', onAnchorClick, { passive: false });

    return () => {
      document.removeEventListener('click', onAnchorClick);
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  return (
    <div className='App_wrapper' ref={wrapperRef}>
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
        {/* <GetInTouch /> */}
      </div>
      {/* <Canvases /> */}
      <MediaViewer img={imgViewerStore.img} />
    </div>
  )
}

export default observer(App)
