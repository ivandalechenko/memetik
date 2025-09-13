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

export default ({ from, to, NoPb, title, title2, pinkTitle, description, cta, img1, img2, img3 }) => {

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

        gsap.fromTo('.WorkType_contentCGI_left',
            { y: 50 },
            {
                y: -50,
                scrollTrigger: {
                    trigger: '.WtIllustrations',
                    scrub: true,
                    start: '0% 0%',
                    end: '100% 0%',
                }
            });
        gsap.fromTo('.WorkType_contentCGI_right',
            { y: -100 },
            {
                y: 200,
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
            <div className={`illustrations2d WorkType WtIllustrations ${NoPb && 'WorkType_NoPb'}`}>
                <div className='illustrations2d WorkType_contentCGI container' id="illustrations2d">
                    <Title title={title} start />
                    <Title title={title2} />
                    <div className='WorkType_contentCGI_content WorkType_mt120 '>
                        <div className='WorkType_contentCGI_left'>
                            <Player preview={img1} start />
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
                            <BigPlayer video={img2} />

                            <Player preview={img3} start />
                        </div>
                    </div>
                </div>
                <WTMob title={title} title2={title2} pinkTitle={pinkTitle} description={description} cta={cta} img1={img1} img2={img2} img3={img3} />
            </div>
        </div>
    )
}