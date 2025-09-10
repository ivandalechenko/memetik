import { useRef } from "react"
import BigPlayer from "../components/BigPlayer/BigPlayer"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import Player from "../components/Player/Player"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import parallaxStore from "../stores/parallaxStore"
import WTMob from "./WTMob/WTMob"

export default ({ from, to, NoPb, title, title2, pinkTitle, description, cta, img1, img2, img3 }) => {

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

        gsap.to('.WorkType_contentCGI_left',
            {y: 50}, 
            {
            y: -50,
            scrollTrigger: {
                trigger: '.WtWeb',
                scrub: true,
                // markers: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });
        gsap.to('.WorkType_contentCGI_right', 
            {y: -50},
            {
            y: 50,
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
                    <Title title={title} mr />
                    <Title title={title2} />
                    <div className='WorkType_contentCGI_content WorkType_mt120'>
                        <div className='WorkType_contentCGI_left WorkType_contentCGI_left_gap'>
                            <Player preview={img1} left />
                            <Player preview={img2} end />
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_close'>
                            <PinkTitle text={pinkTitle} maxWidth />
                            <div className='WorkType_mt40'>

                                <WhiteText text={description} />
                            </div>
                            <div className='WorkType_mt40'>

                                <ShareBtn title={cta} black />
                            </div>
                            <div className='WorkType_mt120'>

                                <Player preview={img3} start />
                            </div>
                        </div>
                    </div>
                </div>
                <WTMob title={title} title2={title2} pinkTitle={pinkTitle} description={description} cta={cta} img1={img1} img2={img2} img3={img3} />
            </div>
        </div>
    )
}