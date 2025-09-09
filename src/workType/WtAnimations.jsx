import { useGSAP } from "@gsap/react"
import BigPlayer from "../components/BigPlayer/BigPlayer"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import SmallPlayer from "../components/SmallPlayer/SmallPlayer"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useRef } from "react"
import parallaxStore from "../stores/parallaxStore"

export default ({ from, to }) => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtAnimations ', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            scrollTrigger: {
                trigger: '.WtAnimations',
                scrub: 0,
                markers: false,
                start: '0% 0%',
                end: '30% 0%',
                onUpdate: self => {
                    if (self.progress < 1) {
                        parallaxStore.setSlide(from)
                    } else {
                        parallaxStore.setSlide(to)
                    }
                }
            }
        })
        gsap.to('.WtAnimations', {
            scrollTrigger: {
                trigger: '.WtAnimations',
                scrub: 0,
                markers: false,
                start: '-50% 0%',
                end: '30% 0%',
                onUpdate: self => {
                    parallaxStore.setSlideProgress(self.progress)
                }
            }
        })

                gsap.to('.WorkType_contentCGI_left', {
            y: -50, 
            scrollTrigger: {
                trigger: '.WtAnimations',
                scrub: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });
        gsap.to('.WorkType_contentCGI_right', {
            y: 50,
            scrollTrigger: {
                trigger: '.WtAnimations',
                scrub: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });

    }, { scope: scope })

    return (
        <div ref={scope}>
            <div className='WorkType WtAnimations'>
                <div className='WorkType_contentCGI container'>
                    <Title title={'Animations'} start />
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left'>
                            <div className='WorkType_mt120'>
                                <PinkTitle text={'Unique content based on narrative of your token'} maxWidth />
                            </div>
                            <div className='WorkType_mt120' style={{display: 'flex', flexWrap: 'wrap', gap: '40px'}}>
                                <BigPlayer video={'./preview.png'} left />
                                <SmallPlayer preview={'./preview.png'} end />
                            </div>
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_close'>
                            <SmallPlayer preview={'./preview.png'} />
                            <div className='WorkType_mt120'>
                                <WhiteText text={<>You need 10 posts per day? No problem.<br />Any request, any amount, any quality what you need GIF?<br /> ANIMATION?<br /> ILLUSTRATION? HAHAHA <br /> NO PROBLEM.</>} />
                            </div>
                            <div className='WorkType_mt40'>
                                <ShareBtn title={'Show More'} black />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}