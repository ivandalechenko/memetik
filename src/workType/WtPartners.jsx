import { useRef } from "react"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import parallaxStore from "../stores/parallaxStore"

export default ({ from, to }) => {

    const scope = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.WtPartners ', {
            backgroundColor: '#0D0B10',
        }, {
            backgroundColor: '#0D0B1000',
            scrollTrigger: {
                trigger: '.WtPartners',
                scrub: 1,
                start: '80% 100%',
                end: '100% 100%',
                // markers: true
            }
        })

    }, { scope: scope })

    const rowCounts = window.innerWidth < 700 ? 6 : 4;
    const speed = .5;

    return (
        <div ref={scope}>
            <div className='WorkType WorkType_partnersPad WtPartners' style={{
                // background: `#0D0B10`,
                position: 'relative',
                top: `-10px`,
                minHeight: `10px`
            }}>
                <div className='container WorkType_cases_wrapper'>
                    <div className='WorkType_cases'>
                        <div className='leftContainer WorkType_cases_content'>
                            <Title title={'PARTNERS'} start />
                            <div className='WorkType_mt120'>
                                <PinkTitle text={<>WE PARTNER <br /> WITH BRANDS <br /> WE BELIEVE IN.</>} maxWidth />
                            </div>
                            <div className='WorkType_mt40'>
                                <WhiteText text={<>In the commercial world, we get <br /> to explore so many different techniques, <br /> tailoring styles specifically to <br /> each brand's audience.</>} maxWidth />
                            </div>
                        </div>
                    </div>
                    <div className='WorkType_partners_decor free_img'>
                        <div className='WorkType_partners_decor_inner'>
                            {Array(rowCounts)
                                .fill(0)
                                .map((_, index) => {
                                    return <div className='WorkType_partners_decor_inner_row free_img' style={{
                                        animation: `partnersRowAnim ${rowCounts * (1 / speed)}s ${index * (1 / speed)}s infinite linear`
                                    }}>
                                        <div className='WorkType_partners_decor_inner_row_inner'>
                                            {
                                                Array(3)
                                                    .fill(0)
                                                    .map((_, jndex) => {
                                                        return <img src="/partners/1.png" className="WorkType_partners_decor_inner_el" alt="" />
                                                    })
                                            }
                                        </div>
                                    </div>
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}