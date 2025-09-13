import { useGSAP } from "@gsap/react"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useRef } from "react"

export default () => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtCases ', {
            backgroundColor: '#0D0B10',
        }, {
            backgroundColor: '#0D0B1000',
            scrollTrigger: {
                trigger: '.WtCases',
                scrub: true,
                start: '80% 100%',
                end: '110% 100%',
            }
        })
    })

    return (
        <div ref={scope}>
            <div className='WorkType WorkType_casesPad WtCases' style={{
                background: `#0D0B10`,
                position: 'relative',
                top: `-10px`,
                minHeight: `10px`
            }}>
                <div className='container WorkType_cases_wrapper'>
                    <div className='WorkType_cases'>
                        <div className='leftContainer WorkType_cases_content'>
                            <Title title={'CASES'} start />
                            <div className='WorkType_mt120'>
                                <PinkTitle text={<>Work worth seeing</>} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>
                                <WhiteText text={<>From bold concepts to final <br /> delivery, we craft campaigns, <br /> design worlds, and ship <br /> products that speak for <br /> themselves. <br /> Ideas? Made real. <br /> Design? Sharp. <br /> Impact? Measurable.</>} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>
                                <ShareBtn title={'See cases'} black />
                            </div>
                        </div>
                    </div>
                    <div className='WorkType_cases_decor free_img'>
                        <div className='WorkType_cases_decor_inner'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}