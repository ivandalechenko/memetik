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
                start: 'bottom 150%',
                end: 'bottom 90%',
            }
        })
        // gsap.fromTo('.WtPartners', {
        //     backgroundColor: '#0D0B1000',
        // }, {
        //     backgroundColor: '#0D0B10',
        //     scrollTrigger: {
        //         trigger: '.WtPartners',
        //         scrub: 0,
        //         markers: false,
        //         start: '0% 0%',
        //         end: '30% 0%',
        //         onUpdate: self => {
        //             if (self.progress < 1) {
        //                 parallaxStore.setSlide(from)
        //             } else {
        //                 parallaxStore.setSlide(to)
        //             }
        //         }
        //     }
        // })

        // gsap.to('.WtPartners', {
        //     scrollTrigger: {
        //         trigger: '.WtPartners',
        //         scrub: 0,
        //         markers: false,
        //         start: '-50% 0%',
        //         end: '30% 0%',
        //         onUpdate: self => {
        //             parallaxStore.setSlideProgress(self.progress)
        //         }
        //     }
        // })

    }, { scope: scope })

    return (
        <div ref={scope}>
            <div className='WorkType WtPartners' style={{
                background: `#0D0B10`,
                paddingTop: `200px`,
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
                    <div className='WorkType_cases_decor WorkType_cases_decor_partners free_img'>
                        <div className='WorkType_partners_inner'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}