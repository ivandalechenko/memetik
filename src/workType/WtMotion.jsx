import { useRef } from "react"
import BigPlayer from "../components/BigPlayer/BigPlayer"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import Player from "../components/Player/Player"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import parallaxStore from "../stores/parallaxStore"
import WTMob from "./WTMob/WTMob"

export default ({ from, to, title, title2, pinkTitle, description, cta, img1, img2, img3 }) => {

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
                start: '80% 60%',
                end: '90% 60%',
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
                start: '20% 50%',
                end: '30% 50%',
            }
        })
        gsap.to('.WtMotion ', {
            scrollTrigger: {
                trigger: '.WtMotion',
                scrub: true,
                // markers: true,
                start: '20% 50%',
                end: '40% 50%',
                onUpdate: self => {
                    if (self.progress < .5) {
                        parallaxStore.setSlide(from)
                    } else if (self.progress >= .5 && self.progress < 1) {
                        parallaxStore.setSlide('')
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

        gsap.fromTo('.WorkType_contentCGI_left',
            { y: 100 },
            {
                y: -100,
                scrollTrigger: {
                    trigger: '.WtMotion',
                    scrub: true,
                    start: '0% 0%',
                    end: '100% 0%',
                }
            });
        gsap.fromTo('.WorkType_contentCGI_right',
            { y: -100 },
            {
                y: 100,
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
            <div className='MotionDesign WorkType WtMotion'>
                <div className='MotionDesign WorkType_contentCGI container' id="MotionDesign">
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left'>
                            <BigPlayer video={img1} left />
                            <div className='WorkType_mt120'>
                                <PinkTitle text={pinkTitle} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>
                                <WhiteText text={description} />
                            </div>
                            <div className='WorkType_mt40'>
                                <ShareBtn title={cta} black />
                            </div>
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_close WorkType_contentCGI_right_gap'>
                            <Title title={title} />
                            <div className='WorkType_mt120'>
                                <BigPlayer video={img2} />
                            </div>
                            <Player preview={img3} end />
                        </div>
                    </div>
                </div>
                <WTMob title={title} title2={title2} pinkTitle={pinkTitle} description={description} cta={cta} img1={img1} img2={img2} img3={img3} />
            </div>
        </div>
    )
}