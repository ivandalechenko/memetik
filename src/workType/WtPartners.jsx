import { useRef } from "react"
import PinkTitle from "../components/PinkTitle/PinkTitle"
import Title from "../components/Title/Title"
import WhiteText from "../components/WhiteText/WhiteText"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import parallaxStore from "../stores/parallaxStore"


const partners = [
    'https://x.com/magiceden',
    'https://x.com/pumpdotfun',
    'https://x.com/Backpack',
    'https://x.com/MeteoraAG',
    'https://x.com/SeedifyFund',
    'https://x.com/LineaBuild',
    'https://x.com/moonpay',
    'https://x.com/supercell',
    'https://x.com/Zerostage_io',
    'https://x.com/Ledger',
    'https://x.com/1inch',
    'https://x.com/phantom',
    'https://x.com/LayerZero_Core',
    'https://x.com/GFAL_Official',
    'https://x.com/RTFKT',
    'https://x.com/Aptos',
]


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

    const rowCounts = 5;
    const speed = .2;

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
                                    return <div key={`partner-row-${index}`} className='WorkType_partners_decor_inner_row free_img' style={{
                                        animation: `partnersRowAnim ${rowCounts * (1 / speed)}s ${index * (1 / speed)}s infinite linear`
                                    }}>
                                        <div className='WorkType_partners_decor_inner_row_inner'>
                                            {
                                                Array(3)
                                                    .fill(0)
                                                    .map((_, jndex) => {
                                                        return <a href={partners[index * jndex]} target="_blank" key={`partner-${index * jndex}-${Math.random()}`}> <img src={`/partners/${(index * 3 + jndex) + 1}.webp`} className="WorkType_partners_decor_inner_el" alt="" /></a>
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