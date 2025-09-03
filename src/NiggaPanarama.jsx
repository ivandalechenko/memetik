import { useEffect, useRef, useState } from 'react';
import './styles/NiggaPanarama.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
export default () => {

    const scope = useRef(null)

    const [progress, setprogress] = useState(0);

    useGSAP(() => {
        gsap.to('.NiggaPanarama', {
            y: '0px',
            ease: 'none',
            scrollTrigger: {
                trigger: '.NiggaPanarama',
                scrub: 0,
                markers: true,
                start: '50% 50%',
                end: '250% 50%',
                onUpdate: self => {
                    setprogress(self.progress)
                }
            }
        })

    }, { scope: scope })

    useEffect(() => {
        console.log(progress - .5);

    }, [progress])

    return (
        <div ref={scope} className='NiggaPanarama_wrapper'>
            <div className='NiggaPanarama'>

                <div className='NiggaPanarama_bg free_img' style={{
                    transform: `translate(0px, ${-(progress - .7) * 10}vh)`
                }}>
                    <img src="/nPanarama/bg.webp" alt="" />
                </div>
                <div className='NiggaPanarama_room free_img' style={{
                    transform: `translate(0px, ${-(progress - .4) * 15}vh)`
                }}>
                    <img src="/nPanarama/room.webp" alt="" />
                </div>
                <div className='NiggaPanarama_man free_img' style={{
                    transform: `translate(0px, ${-(progress - .7) * 20}vh)`
                }}>
                    <img src="/nPanarama/man.webp" alt="" />
                </div>
                <div className='NiggaPanarama_papers free_img' style={{
                    transform: `translate(0px, ${-(progress - .8) * 30}vh)`
                }}>
                    <img src="/nPanarama/papers.webp" alt="" />
                </div>

            </div>
        </div >
    )
}