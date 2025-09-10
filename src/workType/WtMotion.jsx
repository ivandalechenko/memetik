import { useRef } from "react"
import BigPlayer from "../components/BigPlayer/BigPlayer"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import SmallPlayer from "../components/SmallPlayer/SmallPlayer"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import parallaxStore from "../stores/parallaxStore"

export default ({ from, to }) => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtMotion ', {
            backgroundColor: '#0D0B10',
        }, {
            backgroundColor: '#0D0B1000',
            scrollTrigger: {
                // markers: true,
                trigger: '.WtMotion',
                scrub: true,
                start: '80% 100%',
                end: '100% 100%',
            }
        })
        gsap.fromTo('.WtMotion ', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            scrollTrigger: {
                trigger: '.WtMotion',
                scrub: true,
                // markers: true,
                start: '0% 0%',
                end: '40% 0%',
                onUpdate: self => {
                    if (self.progress < 1) {
                        parallaxStore.setSlide(from)
                    } else {
                        parallaxStore.setSlide(to)
                    }
                }
            }
        })

        gsap.to('.WtMotion', {
            scrollTrigger: {
                trigger: '.WtMotion',
                scrub: 0,
                markers: false,
                start: '-70% 0%',
                end: '30% 0%',
                onUpdate: self => {
                    parallaxStore.setSlideProgress(self.progress)
                }
            }
        })

        gsap.to('.WorkType_contentCGI_left', {
            y: -50,
            scrollTrigger: {
                trigger: '.WtMotion',
                scrub: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });
        gsap.to('.WorkType_contentCGI_right', {
            y: 50,
            scrollTrigger: {
                trigger: '.WtMotion',
                scrub: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });

    }, { scope: scope })

    return (
        <div ref={scope}>
            <div className='WorkType WtMotion'>
                <div className='WorkType_contentCGI container'>
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left'>
                            <BigPlayer video={'./preview.png'} left />
                            <div className='WorkType_mt120'>
                                <PinkTitle text={<>Motion design to <br /> bring your project <br /> alive.</>} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>
                                <WhiteText text={<>We build a unified language of <br /> movement around your idea: <br /> titles, transitions, logo behavior, <br /> and UI animation — all as one <br /> system. Instantly readable, <br /> rhythm-driven, and always <br /> focused. 
                                <br />
                                    &nbsp;
                                <br />
                                    And also yes — we craft custom <br /> Rive animations for websites <br /> and apps, for a truly unique user <br /> experience.  
                                </>} />
                            </div>
                            <div className='WorkType_mt40'>
                                <ShareBtn title={'Show more'} black />
                            </div>
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_close WorkType_contentCGI_right_gap'>
                            <Title title={'Motion design'} />
                            <div className='WorkType_mt120'>
                                <BigPlayer video={'./preview.png'} />
                            </div>
                            <SmallPlayer preview={'./preview.png'} end />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}