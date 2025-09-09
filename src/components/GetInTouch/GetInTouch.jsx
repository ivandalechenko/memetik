import { useState } from 'react';
import './GetInTouch.scss';
import { useRef } from 'react';

import gspop from "../../getSpecificPercentOfProgress";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ShareBtn from '../ShareBtn/ShareBtn';

// const textMaskFrom = .15;
// const textMaskTo = 1.15;

const textMaskFrom = .25;
const textMaskTo = .5;

const hideLogoFrom = .9;
const hideLogoTo = 100;

export default () => {

    const [progress, setprogress] = useState(0);
    
    const scope = useRef(null)

    useGSAP(() => {
        gsap.to('.GetInTouch', {
            // y: '0px',
            ease: 'none',
            scrollTrigger: {
                trigger: '.GetInTouch',
                scrub: 1,
                pin: '.GetInTouch',
                pinSpacing: false,
                start: 'top 0%',
                end: 'bottom 100%',
                onUpdate: self => {
                    setprogress(self.progress)
                }
            }
        })


    }, { scope: scope })

    return (
        <div ref={scope}>
            <div className='GetInTouch'>
                <div className='GetInTouch_img'>
                    <img src="./logoSky.webp" alt="" />
                </div>
                <div className='GetInTouch_text free_img' style={{
                    opacity: 1 - gspop(progress, hideLogoFrom, hideLogoTo),
                }}>
                    <div className='GetInTouch_text_inner' style={{
                        maskPosition: `0px ${-gspop(progress, textMaskFrom, textMaskTo) * 950}px`,
                        WebkitMaskPosition: `0px ${-gspop(progress, textMaskFrom, textMaskTo) * 950}px`,
                        transform: `scale(${0.7 + 0.15 * gspop(progress, textMaskFrom, 1)})`
                    }}>
                        <div className='GetInTouch_text_slogan' style={{
                            backgroundImage: `radial-gradient(circle at 50% ${100 - 100 * gspop(progress, textMaskFrom, textMaskTo * 1.5)}vh, rgb(255, 212, 130) 0vh, rgb(239, 72, 102) 50vh, rgb(129, 36, 103) 90vh)`
                        }}>
                            Get in touch with us Let’s create work people can’t ignore.
                        </div>
                        <div className='GetInTouch_btn'>
                            <ShareBtn title={'Request a Consultation'} white/>
                        </div>
                        <div className='GetInTouch_description' >
                            Fewer words. More results.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}