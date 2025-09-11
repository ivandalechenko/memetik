import { useGSAP } from "@gsap/react"
import BigPlayer from "../components/BigPlayer/BigPlayer"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import Player from "../components/Player/Player"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useRef } from "react"
import parallaxStore from "../stores/parallaxStore"
import WTMob from "./WTMob/WTMob"

export default ({ from, to, title, title2, pinkTitle, description, cta, img1, img2, img3 }) => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtAnimations ', {
            backgroundColor: '#0D0B10',
        }, {
            backgroundColor: '#0D0B1000',
            scrollTrigger: {
                // markers: true,
                trigger: '.WtAnimations',
                scrub: true,
                start: '80% 60%',
                end: '90% 60%',
            }
        })
        gsap.fromTo('.WtAnimations ', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            scrollTrigger: {
                trigger: '.WtAnimations',
                scrub: true,
                // markers: true,
                start: '20% 50%',
                end: '30% 50%',
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
                    trigger: '.WtAnimations',
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
                    <Title title={title} start />
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left'>
                            <div className='WorkType_mt120'>
                                <PinkTitle text={pinkTitle} maxWidth />
                            </div>
                            <div className='WorkType_mt120' style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
                                {/* <BigPlayer video={'./preview.png'} left /> */}
                                <Player preview={img1} big left />
                                <Player preview={img2} end />
                            </div>
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_close'>
                            <Player preview={img3} />
                            <div className='WorkType_mt120'>
                                <WhiteText text={description} />
                            </div>
                            <div className='WorkType_mt40'>
                                <ShareBtn title={cta} black />
                            </div>
                        </div>
                    </div>
                </div>
                <WTMob title={title} title2={title2} pinkTitle={pinkTitle} description={description} cta={cta} img1={img1} img2={img2} img3={img3} />
            </div>
        </div>
    )
}