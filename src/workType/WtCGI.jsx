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
        gsap.fromTo('.WtCGI ', {
            backgroundColor: '#0D0B10',
        }, {
            backgroundColor: '#0D0B1000',
            scrollTrigger: {
                // markers: true,
                trigger: '.WtCGI',
                scrub: true,
                start: '80% 100%',
                end: '100% 100%',
            }
        })
        gsap.fromTo('.WtCGI ', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            scrollTrigger: {
                trigger: '.WtCGI',
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

        gsap.to('.WtCGI', {
            scrollTrigger: {
                trigger: '.WtCGI',
                scrub: 0,
                markers: false,
                start: '-70% 0%',
                end: '30% 0%',
                onUpdate: self => {
                    parallaxStore.setSlideProgress(self.progress)
                }
            }
        })

        gsap.to('.WorkType_contentCGI_left', 
            {y: 50},
            {
            y: -50,
            scrollTrigger: {
                trigger: '.WtCGI',
                scrub: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });
        gsap.to('.WorkType_contentCGI_right', 
            {y: -50},
            {
            y: 50,
            scrollTrigger: {
                trigger: '.WtCGI',
                scrub: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });

    }, { scope: scope })

    return (
        <div ref={scope}>
            <div className='WorkType WtCGI'>
                <div className='WorkType_contentCGI container'>
                    <Title title={title} start />
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left '>

                            <div className='WorkType_mt120'>
                                <PinkTitle text={pinkTitle} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>

                                <WhiteText text={description} />
                            </div>
                            <div className='WorkType_mt40'>
                                <ShareBtn title={cta} black />
                            </div>
                            <div className='WorkType_mt120'>
                                <Player preview={img1} time={'1.36'} />
                            </div>
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_gap'>
                            {/* <BigPlayer video={'./secPreview.png'} time={'0.03'} /> */}
                            <Player preview={img2} big/>
                            <Player preview={img3} />
                        </div>
                    </div>
                </div>
                <WTMob title={title} title2={title2} pinkTitle={pinkTitle} description={description} cta={cta} img1={img1} img2={img2} img3={img3} />
            </div>
        </div>
    )
}