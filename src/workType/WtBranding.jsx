import { useGSAP } from "@gsap/react"
import BigPlayer from "../components/BigPlayer/BigPlayer"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import Player from "../components/Player/Player"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import gspop from "../getSpecificPercentOfProgress"
import parallaxStore from "../stores/parallaxStore"
import WTMob from "./WTMob/WTMob"

export default ({ from, to, title, title2, pinkTitle, description, cta, img1, img2, img3 }) => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtBranding ', {
            backgroundColor: '#0D0B10',
        }, {
            backgroundColor: '#0D0B1000',
            ease: 'none',
            scrollTrigger: {
                // markers: true,
                trigger: '.WtBranding',
                scrub: true,
                start: '80% 60%',
                end: '90% 60%',
            }
        })
        gsap.fromTo('.WtBranding ', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            ease: 'none',
            scrollTrigger: {
                trigger: '.WtBranding',
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

        gsap.to('.WtBranding', {
            scrollTrigger: {
                trigger: '.WtBranding',
                scrub: 0,
                // markers: true,
                start: '-100% 0%',
                end: '30% 0%',
                onUpdate: self => {
                    parallaxStore.setSlideProgress(self.progress)
                }
            }
        })
        gsap.fromTo(
            ".WorkType_contentCGI_left",
            { y: -150 }, // начальное значение
            {
                y: 150,    // конечное значение
                scrollTrigger: {
                    trigger: ".WtBranding",
                    scrub: true,
                    start: "0% 0%",
                    end: "100% 0%",
                }
            }
        );
        gsap.fromTo('.WorkType_contentCGI_right',
            { y: 150 },
            {
                y: -150,
                scrollTrigger: {
                    trigger: '.WtBranding',
                    scrub: true,
                    start: '0% 0%',
                    end: '100% 0%',
                }
            });

    }, { scope: scope })

    return (
        <div ref={scope}>
            <div className='WorkType WtBranding' style={{
                backgroundColor: `#0D0B1000`
            }}>
                <div className='WorkType_contentCGI container' id="brandingAndNarrative">
                    <Title title={title} start />
                    <Title title={title2} start />
                    <div className='WorkType_contentCGI_content WorkType_mt120'
                    // style={{ display: 'none' }}
                    >
                        <div className='WorkType_contentCGI_left'>
                            <Player preview={img1} />
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
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_gap'>
                            <Player preview={img2} big />
                            <Player preview={img3} />
                        </div>
                    </div>
                </div>
                <WTMob title={title} title2={title2} pinkTitle={pinkTitle} description={description} cta={cta} img1={img1} img2={img2} img3={img3} />
            </div>
        </div>
    )
}