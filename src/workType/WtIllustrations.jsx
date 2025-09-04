import { useRef } from "react"
import BigPlayer from "../components/BigPlayer/BigPlayer"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import SmallPlayer from "../components/SmallPlayer/SmallPlayer"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default () => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtIllustrations ', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            scrollTrigger: {
                trigger: '.WtIllustrations',
                scrub: 0,
                markers: true,
                start: '0% 0%',
                end: '30% 0%',
            }
        })

    }, { scope: scope })

    return (
        <div ref={scope}>
            <div className='WorkType WtIllustrations'>
                <div className='WorkType_contentCGI container'>
                    <Title title={'Illustrations'} start />
                    <Title title={'+ stickers + banners'} />
                    <div className='WorkType_contentCGI_content WorkType_mt120 '>
                        <div className='WorkType_contentCGI_left'>
                            <SmallPlayer preview={'./preview.png'} start />
                            <div className='WorkType_mt120'>

                                <PinkTitle text={<>Unique content<br /> based on narrative <br /> of your token</>} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>

                                <WhiteText text={<>You need 10 posts per day? No problem.<br /> Any request, any amount, any quality what you need <br />GIF? ANIMATION?<br /> ILLUSTRATION? HAHAHA <br /> NO PROBLEM.</>} />
                            </div>
                            <div className='WorkType_mt40'>

                                <ShareBtn title={'Show more'} black />
                            </div>
                        </div>
                        <div className='WorkType_contentCGI_right WorkType_contentCGI_right_close'>
                            <BigPlayer video={'./preview.png'} />

                            <SmallPlayer preview={'./preview.png'} start />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}