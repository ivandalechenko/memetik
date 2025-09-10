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

export default ({ from, to, NoPb }) => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtIllustrations ', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            scrollTrigger: {
                trigger: '.WtIllustrations',
                scrub: true,
                markers: false,
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
        gsap.to('.WtIllustrations', {
            scrollTrigger: {
                trigger: '.WtIllustrations',
                scrub: true,
                // markers: true,
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
                trigger: '.WtIllustrations',
                scrub: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });
        gsap.to('.WorkType_contentCGI_right', {
            y: 50,
            scrollTrigger: {
                trigger: '.WtIllustrations',
                scrub: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });

    }, { scope: scope })

    return (
        <div ref={scope}>
            <div className={`WorkType WtIllustrations ${NoPb && 'WorkType_NoPb'}`}>
                <div className='WorkType_contentCGI container'>
                    <Title title={'Illustrations'} start />
                    <Title title={'+ stickers + banners'} />
                    <div className='WorkType_contentCGI_content WorkType_mt120 '>
                        <div className='WorkType_contentCGI_left'>
                            <SmallPlayer preview={'./preview.png'} start />
                            <div className='WorkType_mt120'>

                                <PinkTitle text={<>Visual ammo for <br /> your daily growth.</>} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>

                                <WhiteText text={<>What helps push a brand and a <br /> mascot better than art or eye-<br />catching banners on X? Exactly<br /> — nothing. Or almost nothing<br /> and those rare exceptions are <br /> listed below on our site. <br /> We create visual content <br /> tailored to your needs. 
                                <br />
                                    &nbsp;
                                <br />
                                    God is in the details — that’s <br /> what keeps you ahead.
                                </>} />
                            </div>
                            <div className='WorkType_mt40'>

                                <ShareBtn title={'Show more'} black />
                            </div>
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_close WorkType_contentCGI_right_gap'>
                            <BigPlayer video={'./preview.png'} />

                            <SmallPlayer preview={'./preview.png'} start />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}