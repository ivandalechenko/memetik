import { useEffect, useRef, useState } from 'react';
import './styles/Hero.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import gspop from "./getSpecificPercentOfProgress";

import HeroMask from "./HeroMask";
import NParallaxCanvas from './NParallaxCanvas';
import parallaxStore from './stores/parallaxStore';


const logoShowFrom = 0;
const logoShowTo = .4;

const textMaskFrom = .25;
const textMaskTo = .5;

const hideLogoFrom = .75;
const hideLogoTo = 1;


export default () => {

    const [progress, setprogress] = useState(0);

    const scope = useRef(null)

    useGSAP(() => {
        gsap.to('.Hero_wrapper', {
            // y: '0px',
            ease: 'none',
            scrollTrigger: {
                trigger: '.Hero_wrapper',
                scrub: 1,
                pin: '.Hero_wrapper',
                pinSpacing: false,
                start: 'top 0%',
                end: 'bottom 100%',
                onUpdate: self => {
                    if (self.progress < .5) {
                        parallaxStore.setSlide('nigga')
                    } else {
                        parallaxStore.setSlide('vr')
                    }
                    if (self.progress <= hideLogoTo && self.progress >= hideLogoFrom) {
                        parallaxStore.setSlideBlur(1 - gspop(self.progress, hideLogoFrom, hideLogoTo))
                    }
                    setprogress(self.progress)
                }
            }
        })


    }, { scope: scope })


    return (
        <div ref={scope}>
            <div className='Hero_wrapper'>
                <div className='Hero_bg free_img'>
                    {/* { */}
                    {/* progress < .5 &&  */}
                    {/* } */}
                    <NParallaxCanvas scale={1 - progress * .4} opacity={progress < .5 ? 1 : 0} />
                </div>
                <div className='Hero_maskWrapper' style={{
                    opacity: 1 - gspop(progress, hideLogoFrom, hideLogoTo),
                }}>
                    <HeroMask totalProgress={progress} from={logoShowFrom} to={logoShowTo} />
                </div>
                <div className='Hero_content free_img'>
                    <div className='Hero_content_inner' style={{
                        opacity: 1 - gspop(progress, logoShowFrom, logoShowTo / 2)
                    }}>
                        {/* Memetik */}
                    </div>
                </div>
                <div className='Hero_text free_img' style={{
                    opacity: 1 - gspop(progress, hideLogoFrom, hideLogoTo),
                }}  >
                    <div className='Hero_text_inner' style={{
                        maskPosition: `0px ${-gspop(progress, textMaskFrom, textMaskTo) * 1150}px`,
                        WebkitMaskPosition: `0px ${-gspop(progress, textMaskFrom, textMaskTo) * 1150}px`,
                        transform: `scale(${0.9 + 0.15 * gspop(progress, textMaskFrom, 1)})`
                    }}>
                        <div className='Hero_text_slogan' style={{
                            backgroundImage: `radial-gradient(circle at 50% ${100 - 100 * gspop(progress, textMaskFrom, textMaskTo * 1.5)}vh, rgb(255, 212, 130) 0vh, rgb(239, 72, 102) 50vh, rgb(129, 36, 103) 90vh)`
                        }}>
                            YOUR HIGH QUALITY FULL CYCLE PRODUCTION STUDIO
                        </div>
                        <div className='Hero_text_directions'>
                            <div className='Hero_text_directions_el'>
                                2D GRAPHICS
                            </div>
                            <div className='Hero_text_directions_el'>
                                3D/CGI
                            </div>
                            <div className='Hero_text_directions_el'>
                                WEB DESIGN
                            </div>
                            <div className='Hero_text_directions_el'>
                                ANIMATION
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}