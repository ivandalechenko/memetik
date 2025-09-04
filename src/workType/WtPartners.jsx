import { useRef } from "react"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default () => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtPartners', {
            backgroundColor: '#0D0B1000',
        }, {
            backgroundColor: '#0D0B10',
            scrollTrigger: {
                trigger: '.WtPartners',
                scrub: 0,
                markers: true,
                start: '0% 0%',
                end: '30% 0%',
            }
        })

    }, { scope: scope })

    return (
        <div ref={scope}>
            <div className='WorkType WtPartners'>
                <div className='container WorkType_cases_wrapper'>
                    <div className='WorkType_cases'>
                        <div className='leftContainer WorkType_cases_content'>
                            <Title title={'PARTNERS'} start />
                            <div className='WorkType_mt120'>
                                <PinkTitle text={<>Collabs that <br /> actually mattered</>} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>
                                <WhiteText text={<>We’ve worked with projects, <br /> brands, and communities across Web2 & Web3.<br /> Built campaigns, crafted content, launched things loud.<br /> Strategy? Check.<br /> Design? Always.<br /> Execution? Non-stop.</>} maxWidth />
                            </div>
                        </div>
                    </div>
                    <div className='WorkType_cases_decor WorkType_cases_decor_partners free_img'>
                        <div className='WorkType_partners_inner'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}