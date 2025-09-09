import { useGSAP } from "@gsap/react"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import ShareBtn from "../components/ShareBtn/ShareBtn"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useRef } from "react"

export default () => {

    const scope = useRef(null)



    return (
        <div ref={scope}>
            <div className='WorkType WtCases' style={{
                background: `#0D0B10`,
                paddingTop: `200px`,
                position: 'relative',
                top: `-10px`,
                minHeight: `10px`
            }}>
                <div className='container WorkType_cases_wrapper'>
                    <div className='WorkType_cases'>
                        <div className='leftContainer WorkType_cases_content'>
                            <Title title={'CASES'} start />
                            <div className='WorkType_mt120'>
                                <PinkTitle text={<>Stories worth <br /> showing</>} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>
                                <WhiteText text={<>From bold concepts to final delivery, <br /> we’ve crafted campaigns, designed worlds, <br /> and built products that speak for themselves. <br /> Ideas? Turned real. <br /> Design? Sharp. <br /> Impact? Measurable.</>} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>
                                <ShareBtn title={'See cases'} black />
                            </div>
                        </div>
                    </div>
                    <div className='WorkType_cases_decor free_img'>
                        <img src="./casesBack.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}