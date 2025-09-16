import { useEffect, useRef, useState } from 'react';
import './styles/Hero.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import gspop from "./getSpecificPercentOfProgress";

import HeroMask from "./heroMask/HeroMask";
import parallaxStore from './stores/parallaxStore';
import createBezierEasing from './createBezier';
import { ScrollTrigger } from 'gsap/all';
const scaleCubic = createBezierEasing(0, 0.65, 0, 1);
// const scaleCubic = createBezierEasing(0, 0.5, 0, .65);
// const scaleCubic = createBezierEasing(1, 0, 0, 1);


const logoShowFrom = 0;
const logoShowTo = .4;

const textMaskFrom = .25;
const textMaskTo = .5;

const hideLogoFrom = .75;
const hideLogoTo = 1;


export default () => {

    const [progress, setprogress] = useState(0);


    const targetRef = useRef(0); // сюда пишем "истинное" значение
    const rafRef = useRef(null);

    // функция для изменения значения снаружи
    const updateProgress = (val) => {
        targetRef.current = val;
    };

    useEffect(() => {
        let prev = performance.now();

        const loop = (time) => {
            const dt = (time - prev) / 1000;
            prev = time;

            // сглаживаем анимацию
            setprogress((p) => p + (targetRef.current - p) * Math.min(1, dt * 3));

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);




    const scope = useRef(null)
    useGSAP(() => {

        gsap.to('.Hero_wrapper', {
            ease: 'none',
            scrollTrigger: {
                trigger: '.Hero_wrapper',
                scrub: 1,
                pin: '.Hero_wrapper',
                pinSpacing: true,
                start: 'top 0%',
                end: 'bottom 100%',
                onUpdate: self => {
                    if (self.progress < .5) {
                        parallaxStore.setSlide('nigga')
                        parallaxStore.setSlideScale(1 - self.progress * .4)
                    }
                    else if (self.progress >= .5 && self.progress <= .7) {
                        parallaxStore.setSlide('')
                    }
                    else {
                        parallaxStore.setSlide('carCity')
                    }
                    if (self.progress <= hideLogoTo && self.progress >= hideLogoFrom) {
                        parallaxStore.setSlideBlur(1 - gspop(self.progress, hideLogoFrom, hideLogoTo))
                    }
                    updateProgress(self.progress)
                    // setprogress(self.progress)
                }
            }
        })

    }, { scope: scope })

    const els = ['NARRATIVE & BRANDING', 'ART & STICKERS', '3D & CGI', 'MOTION DESIGN', 'ANIMATIONS', 'WEB DESIGN'];


    return (
        <div ref={scope}>
            <div className='Hero_wrapper'>
                <div className='Hero_bg free_img'>
                </div>
                <div className='Hero_mask free_img' style={{
                    opacity: 1 - gspop(progress, hideLogoFrom, hideLogoTo),
                }}>
                    <HeroMask
                        wPercent={(1 - scaleCubic(gspop(progress, logoShowFrom, logoShowTo))) * 1000 + (
                            window.innerWidth > 1800
                                ? 8
                                : window.innerWidth > 1200
                                    ? 12
                                    : window.innerWidth > 900
                                        ? 20
                                        : window.innerWidth > 600
                                            ? 30
                                            : 40
                        )}
                        cy={(1 - scaleCubic(gspop(progress, logoShowFrom, logoShowTo))) * 500 - 55}
                        progress={gspop(progress, logoShowFrom, logoShowTo)}
                    />
                </div>
                <div className='Hero_text free_img' style={{
                    // display: 'none',
                    opacity: 1 - gspop(progress, hideLogoFrom, hideLogoTo),
                }}  >
                    <div className='Hero_text_inner' style={{
                        maskPosition: `0px ${-gspop(progress, textMaskFrom, textMaskTo) * 1150}px`,
                        WebkitMaskPosition: `0px ${-gspop(progress, textMaskFrom, textMaskTo) * 1150}px`,
                        transform: `scale(${0.9 + 0.15 * gspop(progress, textMaskFrom, 1)})`
                    }}>
                        <div className='Hero_text_slogan' style={{
                            backgroundImage: `radial-gradient(circle at 50% ${100 - 100 * gspop(progress, textMaskFrom, textMaskTo * 1.5)}dvh, rgb(255, 212, 130) 0dvh, rgb(239, 72, 102) 50dvh, rgb(129, 36, 103) 90dvh)`
                        }}>
                            YOUR HIGH QUALITY FULL <br /> CYCLE PRODUCTION <br /> STUDIO
                        </div>
                        <div className='Hero_text_directions'>
                            {
                                els.map((el, index) => (
                                    <div className='Hero_text_directions_el' key={`Hero_text_directions_el_${index}`}>{el}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}