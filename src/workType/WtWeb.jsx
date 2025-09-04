import { useRef } from "react"
import BigPlayer from "../components/BigPlayer/BigPlayer"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import SmallPlayer from "../components/SmallPlayer/SmallPlayer"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default () => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtWeb ', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            scrollTrigger: {
                trigger: '.WtWeb',
                scrub: 0,
                markers: true,
                start: '0% 0%',
                end: '30% 0%',
            }
        })

    }, { scope: scope })


    return (
        <div ref={scope}>
            <div className='WorkType WtWeb'>
                <div className='WorkType_contentCGI container'>
                    <Title title={'Web/App Design '} mr />
                    <Title title={'+ development'} />
                    <div className='WorkType_contentCGI_content WorkType_mt120'>
                        <div className='WorkType_contentCGI_left'>
                            <BigPlayer video={'./preview.png'} left />
                            <SmallPlayer preview={'./preview.png'} end />
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_close'>
                            <PinkTitle text={<>Unique content<br /> based on narrative <br /> of your token</>} maxWidth />
                            <div className='WorkType_mt40'>

                                <WhiteText text={<>You need 10 posts per day? No problem.<br /> Any request, any amount, any quality what you need <br />GIF? ANIMATION?<br /> ILLUSTRATION? HAHAHA <br /> NO PROBLEM.</>} />
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