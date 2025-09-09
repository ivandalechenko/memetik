import { useGSAP } from "@gsap/react"
import BigPlayer from "../components/BigPlayer/BigPlayer"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import SmallPlayer from "../components/SmallPlayer/SmallPlayer"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useRef } from "react"
import gspop from "../getSpecificPercentOfProgress"
import parallaxStore from "../stores/parallaxStore"

export default ({ from, to }) => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtBranding ', {
            backgroundColor: '#0D0B10',
        }, {
            backgroundColor: '#0D0B1000',
            scrollTrigger: {
                // markers: true,
                trigger: '.WtBranding',
                scrub: 0,
                start: '80% 100%',
                end: '100% 100%',
            }
        })
        gsap.fromTo('.WtBranding ', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            scrollTrigger: {
                trigger: '.WtBranding',
                scrub: 0,
                // markers: true,
                start: '0% 0%',
                end: '20% 0%',
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
        gsap.to('.WorkType_contentCGI_left', {
            y: -50,
            scrollTrigger: {
                trigger: '.WtBranding',
                scrub: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });
        gsap.to('.WorkType_contentCGI_right', {
            y: 50,
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
                <div className='WorkType_contentCGI container'>
                    <Title title={'Branding + Narrative'} start />
                    <Title title={'creation'} start />
                    <div className='WorkType_contentCGI_content WorkType_mt120'>
                        <div className='WorkType_contentCGI_left'>
                            <SmallPlayer preview={'./preview.png'} />
                            <div className='WorkType_mt120'>
                                <PinkTitle text={<>Unique content<br />based on narrative<br /> of your token</>} />
                            </div>
                            <div className='WorkType_mt40'>
                                <WhiteText text={<>You need 10 posts per day? No problem.<br />Any request, any amount, any quality what you need GIF?<br /> ANIMATION?<br /> ILLUSTRATION? HAHAHA <br /> NO PROBLEM. <br />
                                    &nbsp;
                                    <br />
                                    If it works in a post, it works for the brand.
                                </>} />
                            </div>
                            <div className='WorkType_mt40'>
                                <ShareBtn title={'Show More'} black />
                            </div>
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_gap'>
                            {/* <BigPlayer video={'./secPreview.png'} pin/> Пример пин */}
                            <BigPlayer video={'./secPreview.png'} />
                            <SmallPlayer preview={'./preview.png'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}