import { useRef } from "react"
import BigPlayer from "../components/BigPlayer/BigPlayer"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import SmallPlayer from "../components/SmallPlayer/SmallPlayer"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import parallaxStore from "../stores/parallaxStore"

export default ({ from, to, NoPb }) => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtWeb ', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            scrollTrigger: {
                trigger: '.WtWeb',
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
        gsap.to('.WtWeb', {
            scrollTrigger: {
                trigger: '.WtWeb',
                scrub: true,
                markers: false,
                start: '-70% 0%',
                end: '30% 0%',
                onUpdate: self => {
                    parallaxStore.setSlideProgress(self.progress)
                }
            }
        })

        gsap.to('.WorkType_contentCGI_left', {
            y: -100,
            scrollTrigger: {
                trigger: '.WtWeb',
                scrub: true,
                // markers: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });
        gsap.to('.WorkType_contentCGI_right', {
            y: 100,
            scrollTrigger: {
                trigger: '.WtWeb',
                scrub: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });

    }, { scope: scope })


    return (
        <div ref={scope}>
            <div className={`WorkType WtWeb ${NoPb && 'WorkType_NoPb'}`}>
                <div className='WorkType_contentCGI container'>
                    <Title title={'Web/App Design '} mr />
                    <Title title={'+ development'} />
                    <div className='WorkType_contentCGI_content WorkType_mt120'>
                        <div className='WorkType_contentCGI_left WorkType_contentCGI_left_gap'>
                            <BigPlayer video={'./preview.png'} left />
                            <SmallPlayer preview={'./preview.png'} end />
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_close'>
                            <PinkTitle text={<>Web & dApps — <br /> from landing <br /> pages to smart <br /> contracts.</>} maxWidth />
                            <div className='WorkType_mt40'>

                                <WhiteText text={<>We build original, non-template <br /> websites and on-chain products <br /> that stand out and are <br /> engineered right. We deliver <br /> wild ideas fast and keep <br /> everything stable — no outages, <br /> no bugs.
                                <br />
                                   &nbsp; 
                                <br />
                                Need a rocket? We’ll build a <br /> rocket.
                                </>} />
                            </div>
                            <div className='WorkType_mt40'>

                                <ShareBtn title={'Show more'} black />
                            </div>
                            <div className='WorkType_mt120'>

                                <SmallPlayer preview={'./preview.png'} start />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}