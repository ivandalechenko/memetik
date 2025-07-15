import { useEffect, useRef, useState } from 'react';
import './Hero.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import HeroMask from "./HeroMask";


export default () => {

    const [progress, setprogress] = useState(0);

    const scope = useRef(null)

    useGSAP(() => {
        gsap.to('.Hero_wrapper', {
            y: '0px',
            ease: 'none',
            scrollTrigger: {
                trigger: '.Hero_wrapper',
                scrub: 0,
                pin: '.Hero_wrapper',
                pinSpacing: false,
                start: 'top 0%',
                end: 'bottom 100%',
                onUpdate: self => {
                    setprogress(self.progress)
                }
            }
        })

    }, { scope: scope })

    const [maskY, setmaskY] = useState(0);

    useEffect(() => {

        const maskStart = .35

        const maskProgress = Math.min(Math.max(progress - maskStart, 0) * (1 / maskStart), 1)
        setmaskY(-maskProgress * 1150)


    }, [progress])


    return (
        <div ref={scope}>
            <div className='Hero_wrapper'>
                <div className='Hero_bg free_img'>
                    <img src="/heroBg.webp" alt="" style={{
                        transform: `scale(${1 - progress * .4})`
                    }} />
                </div>
                <HeroMask totalProgress={progress} />
                <div className='Hero_content free_img'>
                    <div className='Hero_content_inner' style={{
                        opacity: 1 - progress * 5
                    }}>
                        Memetik
                        {/* - {progress.toFixed(2)} */}
                    </div>
                </div>
                <div className='Hero_text free_img'>
                    <div className='Hero_text_inner' style={{
                        maskPosition: `0px ${maskY}px`,
                        WebkitMaskPosition: `0px ${maskY}px`,
                    }}>
                        <div className='Hero_text_slogan' style={{

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
        </div>
    )
}