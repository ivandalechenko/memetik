import { useState } from 'react';
import './GetInTouch.scss';
import { useRef } from 'react';

import gspop from "../../getSpecificPercentOfProgress";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ShareBtn from '../ShareBtn/ShareBtn';
import parallaxStore from '../../stores/parallaxStore';

const cameraManBlinkFrom = 0
const cameraManBlinkTo = .2

const contentBgShowFrom = .3
const contentBgShowTo = .55


export default () => {

    const [progress, setprogress] = useState(0);

    const scope = useRef(null)

    useGSAP(() => {
        gsap.to('.GetInTouch_wrapper', {
            // y: '0px',
            ease: 'none',
            scrollTrigger: {
                trigger: '.GetInTouch_wrapper',
                scrub: 1,
                pin: '.GetInTouch_wrapper',
                pinSpacing: false,
                start: 'top 0%',
                end: 'bottom 100%',
                // markers: true,
                onUpdate: self => {
                    parallaxStore.setBlinkProgress(gspop(self.progress, cameraManBlinkFrom, cameraManBlinkTo))
                    setprogress(self.progress)
                }
            }
        })

        // gsap.to('.GetInTouch_wrapper', {
        //     // y: '0px',
        //     ease: 'none',
        //     scrollTrigger: {
        //         trigger: '.GetInTouch_wrapper',
        //         scrub: 1,
        //         start: '-50% 0%',
        //         end: '20% 0%',
        //         // markers: true,
        //         onUpdate: self => {
        //             // setprogress(self.progress)
        //             parallaxStore.setSlideProgress(self.progress)
        //         }
        //     }
        // })


    }, { scope: scope })

    return (
        <div ref={scope}>
            <div className='GetInTouch_wrapper' style={{ opacity: gspop(progress, contentBgShowFrom, contentBgShowTo) }}>
                <div className='GetInTouch'>
                    <div className='GetInTouch_text free_img'>
                        <div className='GetInTouch_text_inner' style={{
                            maskPosition: `0px ${-gspop(progress, contentBgShowFrom, 1) * 150 + 10}dvh`,
                            WebkitMaskPosition: `0px ${-gspop(progress, contentBgShowFrom, 1) * 150 + 10}dvh`,
                            transform: `scale(${0.7 + 0.15 * gspop(progress, contentBgShowFrom, 1)})`
                        }}>
                            <div className='GetInTouch_img'>
                                <img src="./logoSky.webp" alt="" />
                            </div>
                            <div className='GetInTouch_text_slogan' style={{
                                backgroundImage: `radial-gradient(circle at 50% ${100 - 100 * gspop(progress, contentBgShowFrom, 1)}dvh, rgb(255, 212, 130) 0dvh, rgb(239, 72, 102) 50dvh, rgb(129, 36, 103) 90dvh)`
                            }}>
                                GET IN TOUCH WITH US <br /> LET'S CREATE WORK PEOPLE <br /> CAN'T IGNORE.
                            </div>
                            <div className='GetInTouch_btn'>
                                <ShareBtn title={'Request a Consultation'} white last/>
                            </div>
                            <div className='GetInTouch_description' >
                                Fewer words. More results.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}