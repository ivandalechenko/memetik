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
        gsap.fromTo('.WtCGI ', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            scrollTrigger: {
                trigger: '.WtCGI',
                scrub: 0,
                markers: false,
                start: '0% 0%',
                end: '30% 0%',
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
                start: '-50% 0%',
                end: '30% 0%',
                onUpdate: self => {
                    parallaxStore.setSlideProgress(self.progress)
                }
            }
        })

                gsap.to('.WorkType_contentCGI_left', {
            y: -50, 
            scrollTrigger: {
                trigger: '.WtCGI',
                scrub: true,
                start: '0% 0%',
                end: '100% 0%',
            }
        });
        gsap.to('.WorkType_contentCGI_right', {
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
                    <Title title={'CGI/3D'} start />
                    <div className='WorkType_contentCGI_content'>
                        <div className='WorkType_contentCGI_left '>

                            <div className='WorkType_mt120'>
                                <PinkTitle text={'Unique content based on narrative of your token'} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>

                                <WhiteText text={<>You need 10 posts per day? No problem. <br /> Any request, any amount, any quality what you need <br />GIF? ANIMATION? ILLUSTRATION? HAHAHA <br /> NO PROBLEM.</>} />
                            </div>
                            <div className='WorkType_mt40'>
                                <ShareBtn title={'Show More'} black />
                            </div>
                            <div className='WorkType_mt120'>
                                <SmallPlayer preview={'./preview.png'} time={'1.36'} />
                            </div>
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_gap'>
                            <BigPlayer video={'./secPreview.png'} time={'0.03'} />
                            <SmallPlayer preview={'./thirdPreview.png'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}