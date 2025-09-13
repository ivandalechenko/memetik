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
import { smoothScrollTo } from "./scroller.js";
import parallaxStore from './stores/parallaxStore.js'

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
      // выключаем нативный smooth везде
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
    }

    // НИЖЕ ВСЁ ЧТО ПО СКРОЛЛУ

    const DELAY_MS = 1000;
    const OFFSET = 100;
    const delayForThisDevice = DELAY_MS; // на телефонах — без задержки

    const isScrollable = (el) => {
      if (!el) return false;
      const s = getComputedStyle(el);
      const canScroll = /(auto|scroll)/.test(s.overflowY);
      return canScroll && el.scrollHeight > el.clientHeight;
    };

    const getScroller = () => {
      if (smootherRef.current) return 'smoother';
      if (isScrollable(wrapperRef.current)) return wrapperRef.current;
      return window;
    };

    // абсолютная Y-цель (числом), чтобы Safari не терялся
    const computeY = (scroller, target, offset) => {
      if (scroller === window) {
        return window.pageYOffset + target.getBoundingClientRect().top - offset;
      }
      const r = scroller.getBoundingClientRect();
      return scroller.scrollTop + (target.getBoundingClientRect().top - r.top) - offset;
    };

    // двойная коррекция после анимации (iOS бар)
    const adjustAfterIOSBars = (scroller, target, tries = 2) => {
      const tick = (n) => {
        if (n <= 0) return;
        requestAnimationFrame(() => {
          const yNow = scroller === window
            ? window.pageYOffset + target.getBoundingClientRect().top
            : scroller.scrollTop + (target.getBoundingClientRect().top - scroller.getBoundingClientRect().top);

          const delta = yNow - OFFSET;
          if (Math.abs(delta) > 1) {
            const yFix = computeY(scroller, target, OFFSET);
            if (scroller === window) window.scrollTo({ top: yFix, behavior: 'auto' });
            else scroller.scrollTo({ top: yFix, behavior: 'auto' });
          }
          tick(n - 1);
        });
      };
      tick(tries);
    };

    const onAnchorClick = (e) => {

      const a = e.target.closest('a[href^="#"]:not([href="#"])');
      if (!a) return;

      const href = a.getAttribute('href');
      const target = document.querySelector(decodeURIComponent(href));
      if (!target) return;

      e.preventDefault();





      setTimeout(() => {
        parallaxStore.scrollBlock()
        const scroller = getScroller();
        if (scroller === 'smoother') {
          let y = smootherRef.current.offset(target, 'top top') - OFFSET;
          if (y < 0) y = 0;
          smootherRef.current.scrollTo(y, true);
          requestAnimationFrame(() => adjustAfterIOSBars(window, target));
        } else {
          smoothScrollTo(`.${[...target.classList][0]}`, { offset: -700 })
        }

        history.pushState(null, '', href);
      }, delayForThisDevice);
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
      <Canvases />
      <MediaViewer img={imgViewerStore.img} />
    </div>
  )
}

export default observer(App)
